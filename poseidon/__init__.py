from flask import Flask, jsonify, redirect, url_for
import os
import logging
import urllib.parse
from dotenv import load_dotenv
from firebase_admin import credentials, initialize_app, db, firestore

# Load environment variables
load_dotenv()

# Ensure required environment variables are set
# required_vars = ["SECRET_KEY", "JWT_SECRET_KEY", "MONGO_DEV_URI", "APP_CONFIG", "GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET"]
# missing_vars = [var for var in required_vars if not os.getenv(var)]
# if missing_vars:
#     raise EnvironmentError(f"Missing required environment variables: {', '.join(missing_vars)}")


def create_app():
    # Create the Flask app
    app = Flask(__name__)

    # Load configuration from environment variables
    config_class = os.getenv('APP_CONFIG')
    app.config.from_object(config_class)

    app.config["MONGO_DEV"] = os.getenv('MONGO_DEV')
    cred = credentials.Certificate("path/to/serviceAccountKey.json")
    initialize_app(cred)
    db = firestore.client()

    app.config['FIREBASE_DB'] = db
    from .llama_route import llama as llama_blueprint

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
