import ollama

stream = ollama.chat(
    model='llama3.2:1b',
    messages=[{'role': 'user', 'content': 'Who is athena?'}],
    stream=True,
)

for chunk in stream:
  print(chunk['message']['content'], end='', flush=True)