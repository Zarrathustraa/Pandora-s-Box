from flask import Blueprint, redirect, request, jsonify, url_for
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt, get_jwt_identity
from flask_bcrypt import Bcrypt
from backend import users_collection, jwt
from flask_dance.contrib.google import google
import logging
from datetime import datetime, timedelta
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

# Initialize Bcrypt for password hashing
bcrypt = Bcrypt()

# Blueprint for authentication routes
auth = Blueprint('auth', __name__)

# Simple set to hold blacklisted tokens
BLACKLIST = set()

limiter = Limiter(get_remote_address)

# Set up logging
logging.basicConfig(filename='auth.log', level=logging.INFO, format='%(asctime)s %(levelname)s: %(message)s')

@auth.route('/signup', methods=['POST'])
def signup_post():
    # Get form data
    data = request.get_json()
    email = data.get('email')
    name = data.get('name')
    password = data.get('password')
    role = data.get('role', 'student')  # Default role is 'student'

    print(f"Received signup request with data: {data}") 

    # Check if user exists
    if users_collection.find_one({"email": email}):
        logging.warning(f"Signup attempt with existing email: {email}")
        return jsonify({"error": "Email address already exists"}), 400

    # Hash the password
    password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    # Create a new user document
    new_user = {
        "email": email,
        "name": name,
        "password_hash": password_hash,
        "role": role,
        "created_at": datetime.now()
    }

    # Insert the new user into MongoDB
    try:
        users_collection.insert_one(new_user)
        logging.info(f"New user registered: {email}, Role: {role}")
    except Exception as e:
        logging.error(f"Error inserting user into MongoDB: {str(e)}")
        return jsonify({"error": "Database insertion failed"}), 500

    return jsonify({"message": "User registered successfully"}), 201

@auth.route('/login', methods=['POST'])
@limiter.limit("5 per minute")  # Example rate limit
def login_post():
    try:
        # Retrieve the JSON payload from the request
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        # Validate that both fields are provided
        if not email or not password:
            logging.warning(f"Login attempt with missing fields: email={email}")
            return jsonify({"error": "Email and password are required"}), 400

        # Query for the user in the MongoDB collection
        user = users_collection.find_one({"email": email})

        # Validate user and password
        if not user or not bcrypt.check_password_hash(user['password_hash'], password):
            logging.warning(f"Invalid login attempt for email: {email}")
            return jsonify({"error": "Invalid login credentials"}), 401

        # Create access and refresh tokens
        access_token = create_access_token(identity={"email": user['email'], "role": user['role']}, expires_delta=timedelta(minutes=15))
        refresh_token = create_refresh_token(identity={"email": user['email'], "role": user['role']}, expires_delta=timedelta(days=7))

        response_data = {
            "message": "Login successful",
            "access_token": access_token,
            "refresh_token": refresh_token,
            "role": user['role']
        }

        logging.info(f"User logged in: {email}")
        return jsonify(response_data), 200

    except Exception as e:
        logging.error(f"Internal server error during login for email={email}: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@auth.route('/google_login')
def google_login():
    if not google.authorized:
        return redirect(url_for("google.login"))

    response = google.get("/userinfo")
    if response.ok:
        user_info = response.json()
        email = user_info["email"]

        # Check if user already exists in MongoDB
        user = users_collection.find_one({"email": email})
        if not user:
            new_user = {
                "email": email,
                "name": user_info.get("name", ""),
                "role": "student",  # Default role
                "created_at": datetime.now()
            }
            users_collection.insert_one(new_user)

        access_token = create_access_token(identity={"email": email, "role": "student"}, expires_delta=timedelta(minutes=15))
        refresh_token = create_refresh_token(identity={"email": email, "role": "student"}, expires_delta=timedelta(days=7))

        logging.info(f"Google login successful for user: {email}")
        return jsonify({
            "message": "Google login successful",
            "access_token": access_token,
            "refresh_token": refresh_token,
            "email": email
        }), 200


    return jsonify({"error": "Google login failed"}), 500


# Logout route
@auth.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    jwt_payload = get_jwt()
    jti = jwt_payload["jti"]
    BLACKLIST.add(jti)
    return jsonify({"message": "Logout successful"}), 200

@jwt.token_in_blocklist_loader
def check_if_token_in_blacklist(jwt_header, jwt_payload):
    jti = jwt_payload["jti"]
    return jti in BLACKLIST
