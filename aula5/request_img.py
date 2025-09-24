import os
import requests
import base64
from dotenv import load_dotenv

# 🔹 Carrega variáveis do arquivo .env
load_dotenv()

ACCOUNT_ID = os.getenv("CLOUDFLARE_ACCOUNT_ID")
API_TOKEN  = os.getenv("CLOUDFLARE_API_KEY")

# 🔹 Monta a URL com o Account ID vindo do .env
API_URL = f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/black-forest-labs/flux-1-schnell"

# 🔹 Cabeçalhos com o token do .env
HEADERS = {
    "Authorization": f"Bearer {API_TOKEN}",
    "Content-Type": "application/json"
}

# 🔹 Prompt para gerar a imagem
DATA = {
    "prompt": "A futuristic superbike at sunset, with neon lights reflecting on the horizon.",
    "width": 1024,
    "height": 1024,
    "num_inference_steps": 30
}

# 🔹 Faz a requisição
response = requests.post(API_URL, json=DATA, headers=HEADERS)

# 🔹 Trata a resposta
if response.status_code == 200:
    result = response.json()
    image_base64 = result["result"]["image"]

    if image_base64:
        try:
            with open("output.png", "wb") as img_file:
                img_file.write(base64.b64decode(image_base64))
            print("✅ Imagem salva como output.png")
        except Exception as e:
            print(f"❌ Erro ao decodificar a imagem: {e}")
    else:
        print("❌ Não veio imagem na resposta.")
else:
    print(f"❌ Erro {response.status_code}: {response.text}")
