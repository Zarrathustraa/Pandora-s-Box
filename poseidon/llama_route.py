from flask import Blueprint, request, jsonify
import ollama

llama = Blueprint('llama', __name__)

@llama.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message')

    if not user_message:
        return jsonify({'error': 'No message provided'}), 400

    # Collect the stream response into one string
    response_content = ""
    stream = ollama.chat(
        model='llama3.2:1b',
        messages=[{'role': 'user', 'content': user_message}],
        stream=True,
    )

    for chunk in stream:
        response_content += chunk['message']['content']

    print(f"AI Response: {response_content}")  # For debugging in the backend

    # Send the full response back to the frontend
    return jsonify({'response': response_content})
