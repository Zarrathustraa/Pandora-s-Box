import uuid
from flask_bcrypt import Bcrypt
from . import mongo

bcrypt = Bcrypt()

def verify_password(password_hash, password):
    return bcrypt.check_password_hash(password_hash, password)

def create_user(email, name, password, role, additional_info=None):
    user = {
        "_id": str(uuid.uuid4()),
        "email": email,
        "name": name,
        "password_hash": bcrypt.generate_password_hash(password).decode('utf-8'),
        "role": role
    }
    
    # Add extra info based on role
    if additional_info:
        user.update(additional_info)

    mongo.db.users.insert_one(user)


def get_user_by_email(email):
    return mongo.db.users.find_one({"email": email}, {"password_hash": 0})


