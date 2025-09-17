from dotenv import load_dotenv
import os
# Carrega as variáveis do arquivo .env
load_dotenv()
# Acessa as variáveis com os.getenv()
api_key = os.getenv("GROQ_API_KEY")
print("GROQ Key:", api_key)