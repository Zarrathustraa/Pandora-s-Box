import os
import sys
from sqlalchemy import inspect

# Add current directory to Python path to ensure imports work
sys.path.append('.')

# Import create_app and db from the backend package
from backend import create_app, db

# Load environment variables from .env file
from dotenv import load_dotenv
load_dotenv()

# Create the app context to access the database
app = create_app()

with app.app_context():
    # Use SQLAlchemy inspector to get the table names
    inspector = inspect(db.engine)
    tables = inspector.get_table_names()
    print("Tables in the database:", tables)
