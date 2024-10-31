from flask import Flask, jsonify, redirect, url_for
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_dance.contrib.google import make_google_blueprint, google
import os
import logging
from pymongo import MongoClient
import urllib.parse
from dotenv import load_dotenv
from firebase_admin import credentials, initialize_app, db, firestore

# Load environment variables
load_dotenv()

# Get credentials from .env
username = os.getenv("MONGO_USER")
password = urllib.parse.quote(os.getenv("MONGO_PASSWORD"))
cluster = os.getenv("MONGO_CLUSTER")

# Create the MongoDB URI
mongo_uri = os.getenv("MONGO_URI")

# Connect to MongoDB Atlas
# client = MongoClient(mongo_uri)
# db = client.get_database('athenasai_dev')
# users_collection = db['user']
# roles_collection = db['roles']

# Ensure required environment variables are set
required_vars = ["SECRET_KEY", "JWT_SECRET_KEY", "MONGO_DEV_URI", "APP_CONFIG", "GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET"]
missing_vars = [var for var in required_vars if not os.getenv(var)]
if missing_vars:
    raise EnvironmentError(f"Missing required environment variables: {', '.join(missing_vars)}")

# Initialize extensions
jwt = JWTManager()
limiter = Limiter(
    key_func=get_remote_address,
    storage_uri=os.getenv("RATE_LIMIT_STORAGE_URI", "memory://"),
    default_limits=["100 per hour"]
)

# Initialize Flask app and PyMongo
mongo = PyMongo()
def create_app():
    # Create the Flask app
    app = Flask(__name__)

    # Load configuration from environment variables
    config_class = os.getenv('APP_CONFIG')
    app.config.from_object(config_class)
    certif= os.
    # Set MongoDB URI
    app.config["MONGO_DEV"] = os.getenv('MONGO_DEV')
    cred = credentials.Certificate("path/to/serviceAccountKey.json")
    initialize_app(cred)
    db = firestore.client()

    app.config['FIREBASE_DB'] = db
    # Initialize the extensions
    mongo.init_app(app)
    jwt.init_app(app)
    limiter.init_app(app)

    # Setup Google OAuth
    google_blueprint = make_google_blueprint(
        client_id=os.getenv("GOOGLE_CLIENT_ID"),
        client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
        redirect_to="google_login"
    )
    app.register_blueprint(google_blueprint, url_prefix="/google")

    # Import blueprints after app and extensions are created
    from .auth_route import check_if_token_in_blacklist, auth as auth_blueprint
    from .main_route import main as main_blueprint
    from .dashboard_route import dashboard as dashboard_blueprint
    from .llama_route import llama as llama_blueprint

    # Register blacklisted token checker
    jwt.token_in_blocklist_loader(check_if_token_in_blacklist)

    # Register blueprints
    app.register_blueprint(auth_blueprint, url_prefix='/api/v1/auth')
    app.register_blueprint(main_blueprint, url_prefix='/api/v1/main')
    app.register_blueprint(dashboard_blueprint, url_prefix='/api/v1/dashboard')
    app.register_blueprint(llama_blueprint, url_prefix='/api/ai')

    # Set up logging
    logging.basicConfig(filename='error.log', level=logging.ERROR)

    # Error handlers with logging
    @app.errorhandler(404)
    def not_found_error(error):
        logging.error(f"404 Error: {error}")
        return jsonify({'error': 'Resource not found'}), 404

    @app.errorhandler(500)
    def internal_error(error):
        logging.error(f"500 Error: {error}")
        return jsonify({'error': 'Internal server error'}), 500

    return app
