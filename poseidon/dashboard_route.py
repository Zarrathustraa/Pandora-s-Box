# from flask import Blueprint, jsonify
# from flask_jwt_extended import jwt_required, get_jwt_identity
# from backend import users_collection
# import logging

# dashboard = Blueprint('dashboard', __name__)

# # Set up logging
# logging.basicConfig(filename='dashboard.log', level=logging.INFO, format='%(asctime)s %(levelname)s: %(message)s')

# @dashboard.route('/student-dashboard', methods=['GET'])
# @jwt_required()
# def student_dashboard():
#     user_identity = get_jwt_identity()
#     user = users_collection.find_one({"email": user_identity['email']})

#     if user['role'] != 'student':
#         return jsonify({"error": "Access denied. This resource is only for students."}), 403

#     logging.info(f"Student dashboard accessed by: {user['email']}")
#     return jsonify({"message": "Welcome to the student dashboard!", "role": user['role']})

# @dashboard.route('/teacher-dashboard', methods=['GET'])
# @jwt_required()
# def teacher_dashboard():
#     user_identity = get_jwt_identity()
#     user = users_collection.find_one({"email": user_identity['email']})

#     if user['role'] != 'teacher':
#         return jsonify({"error": "Access denied. This resource is only for teachers."}), 403

#     logging.info(f"Teacher dashboard accessed by: {user['email']}")
#     return jsonify({"message": "Welcome to the teacher dashboard!", "role": user['role']})
