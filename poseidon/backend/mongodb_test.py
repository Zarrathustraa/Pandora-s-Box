from pymongo import MongoClient

# Replace with your MongoDB Atlas connection string, including the password
mongo_uri = "mongodb+srv://prajnyiqueghimire:2Vl7FIeFYDk2KNe3@prajnyiquecluster.ymsnlrm.mongodb.net/athenasai_dev?retryWrites=true&w=majority"
client = MongoClient(mongo_uri)

# Use your database
db = client.get_database('athenasai_dev')

# Check if connection is successful by printing the list of collections
print(db.list_collection_names())
