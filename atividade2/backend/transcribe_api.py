import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

app = Flask(__name__)
CORS(app)

@app.route("/transcribe", methods=["POST"])
def transcribe_audio():
    """
    Endpoint para transcrever um arquivo de áudio recebido.
    """
    if "audio" not in request.files:
        return jsonify({"error": "Nenhum arquivo de áudio enviado"}), 400

    audio_file = request.files["audio"]
    if audio_file.filename == "":
        return jsonify({"error": "Nome do arquivo inválido"}), 400

    try:
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
    app.run(debug=True, host="0.0.0.0", port=5000)
