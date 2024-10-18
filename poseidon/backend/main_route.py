from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend import users_collection
import logging

main = Blueprint('main', __name__)

# Set up logging
logging.basicConfig(filename='main.log', level=logging.INFO, format='%(asctime)s %(levelname)s: %(message)s')

@main.route('/home')
def index():
    logging.info("Index route accessed")
    return jsonify({'message': 'Hello, I am Athena'})

@main.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    user_identity = get_jwt_identity()
    user = users_collection.find_one({"email": user_identity['email']})

    if not user:
        logging.warning(f"Profile access failed - user not found for email: {user_identity['email']}")
        return jsonify({"error": "User not found"}), 404

    logging.info(f"Profile accessed for user: {user['email']}")
    return jsonify({
        "email": user["email"],
        "name": user["name"],
        "role": user["role"]
    }), 200
