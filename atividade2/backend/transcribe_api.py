import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq

# Carrega as variáveis de ambiente do arquivo .env
load_dotenv()

# Inicializa o cliente Groq
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# Inicializa o aplicativo Flask
app = Flask(__name__)
# Habilita o CORS para permitir requisições do front-end
CORS(app)

@app.route("/transcribe", methods=["POST"])
def transcribe_audio():
    """
    Endpoint para transcrever um arquivo de áudio recebido.
    """
    if "audio" not in request.files:
        return jsonify({"error": "Nenhum arquivo de áudio enviado"}), 400

    audio_file = request.files["audio"]
    # Valida o tipo do arquivo, se necessário, antes de processar
    if audio_file.filename == "":
        return jsonify({"error": "Nome do arquivo inválido"}), 400

    try:
        # A API Groq requer um arquivo em formato de bytes.
        # Em vez de usar .stream, que pode ser problemático, lemos todo o conteúdo.
        file_bytes = audio_file.read()
        
        resp = client.audio.transcriptions.create(
            file=("audio.mp3", file_bytes),
            model="whisper-large-v3-turbo",
            language="pt",
            response_format="text"
        )

        texto = resp if isinstance(resp, str) else getattr(resp, "text", "")
        
        return jsonify({"transcription": texto}), 200

    except Exception as e:
        print(f"Erro na transcrição: {e}")
        return jsonify({"error": f"Erro na transcrição: {str(e)}"}), 500

if __name__ == "__main__":
    # Certifique-se de definir a porta e o host corretamente
    # No ambiente local, você pode usar host="127.0.0.1" e port=5000
    app.run(debug=True, host="0.0.0.0", port=5000)
