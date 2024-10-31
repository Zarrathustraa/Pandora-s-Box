from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
import os
from werkzeug.utils import secure_filename
import uuid
import datetime

handle_file = Blueprint('upload', __name__)

# Define the folder to store uploads
UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'pdf', 'docx'}

# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Helper function to validate allowed file types
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@handle_file.route('/upload', methods=['POST'])
@jwt_required()
def upload_file():
    """Handle file uploads with authentication."""
    try:
        # Check if a file is provided in the request
        if 'file' not in request.files:
            return jsonify({"error": "No file provided"}), 400

        file = request.files['file']

        # Validate the file type
        if file and allowed_file(file.filename):
            # Generate a unique filename using UUID
            filename = f"{uuid.uuid4()}_{secure_filename(file.filename)}"
            filepath = os.path.join(UPLOAD_FOLDER, filename)

            # Save the file
            file.save(filepath)

            # File metadata
            file_metadata = {
                "filename": filename,
                "file_path": filepath,
                "uploaded_by": get_jwt_identity()["email"],
                "upload_date": datetime.datetime.utcnow().isoformat()
            }

            return jsonify({
                "message": "File uploaded successfully",
                "file_metadata": file_metadata
            }), 201

        return jsonify({"error": "Invalid file type"}), 400

    except Exception as e:
        # Handle unexpected errors
        return jsonify({"error": f"File upload failed: {str(e)}"}), 500
