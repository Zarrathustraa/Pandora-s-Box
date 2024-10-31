from googleapiclient.discovery import build

# Replace with your API credentials
credentials_file = 'your_credentials.json'

# Build the service object for the desired API
service = build('drive', 'v3', credentials_file=credentials_file)

# Use the service object to interact with the API
results = service.files().list().execute()
print(results)