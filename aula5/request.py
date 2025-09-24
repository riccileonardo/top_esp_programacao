import os
import base64
import requests
from dotenv import load_dotenv
from groq import Groq

load_dotenv()
client = Groq(api_key=os.environ["GROQ_API_KEY"])

img_url = "https://upload.wikimedia.org/wikipedia/commons/f/f2/LPU-v1-die.jpg"

headers = {"User-Agent": "Mozilla/5.0"}

resp = requests.get(img_url, headers=headers, timeout=20)
resp.raise_for_status()

img_bytes = resp.content
img_b64 = base64.b64encode(img_bytes).decode("utf-8")
data_url = f"data:image/jpeg;base64,{img_b64}"

completion = client.chat.completions.create(
    model="meta-llama/llama-4-scout-17b-16e-instruct",
    messages=[{
        "role": "user",
        "content": [
            {"type": "text", "text": "oque é essa imagem? responda em portugues."},
            {"type": "image_url", "image_url": {"url": data_url}},
        ],
    }],
    max_completion_tokens=512,
)

print(completion.choices[0].message.content)
