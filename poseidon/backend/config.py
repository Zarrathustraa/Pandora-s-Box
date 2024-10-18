import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

class Config:
    """Base configuration with common settings."""
    SECRET_KEY = os.getenv('SECRET_KEY')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
    JWT_TOKEN_LOCATION = ['headers']  # Only use headers to send the JWT
    JWT_HEADER_NAME = 'Authorization'  # The name of the header containing the JWT
    JWT_HEADER_TYPE = 'Bearer'  # Expected type for the Authorization header ('Bearer <JWT>')
    MONGO_URI = os.getenv('MONGO_URI')  # MongoDB URI from .env file

class DevelopmentConfig(Config):
    """Development configuration."""
    DEBUG = True  # Enable debug mode in development

class TestingConfig(Config):
    """Testing configuration."""
    TESTING = True  # Enable testing mode

class ProductionConfig(Config):
    """Production configuration."""
    DEBUG = False  # Disable debug mode in production
    # Add production-specific settings like secure cookies, strict CORS, etc.
    SESSION_COOKIE_SECURE = True  # Only transmit cookie over HTTPS
    REMEMBER_COOKIE_SECURE = True  # Only transmit 'remember me' cookie over HTTPS
    SESSION_COOKIE_HTTPONLY = True  # Helps prevent XSS attacks by not allowing JavaScript access

# Dictionary to easily get the correct config class
config_by_name = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig
}
