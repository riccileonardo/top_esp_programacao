import os
import requests
from dotenv import load_dotenv

# Carrega variáveis do .env
load_dotenv()

ACCOUNT_ID = os.getenv("CLOUDFLARE_ACCOUNT_ID")
API_BASE_URL = f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/"
API_TOKEN = os.getenv("CLOUDFLARE_API_KEY")

headers = {"Authorization": f"Bearer {API_TOKEN}"}

def run(model, inputs):
    payload = {"messages": inputs}
    response = requests.post(f"{API_BASE_URL}{model}", headers=headers, json=payload)
    return response.json()

inputs = [
    {"role": "system", "content": "You are a friendly assistant that helps write stories"},
    {"role": "user", "content": "Write a short story about a llama that goes on a journey to find an orange cloud"}
]

output = run("@cf/meta/llama-3-8b-instruct", inputs)
print(output)