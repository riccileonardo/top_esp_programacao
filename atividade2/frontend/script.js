document.addEventListener('DOMContentLoaded', () => {
    const audioFile = document.getElementById('audioFile');
    const transcribeButton = document.getElementById('transcribeButton');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const resultContainer = document.getElementById('resultContainer');
    const transcriptionText = document.getElementById('transcriptionText');
    const messageBox = document.getElementById('messageBox');

    // URL do seu servidor backend. No ambiente de desenvolvimento, será localhost:5000.
    const BACKEND_URL = "http://127.0.0.1:5000/transcribe";

    transcribeButton.addEventListener('click', async () => {
        const file = audioFile.files[0];
        if (!file) {
            showMessage("Por favor, selecione um arquivo de áudio.", 'bg-red-500');
            return;
        }
        
        // Exibe o estado de carregamento
        loadingIndicator.classList.remove('hidden');
        transcribeButton.disabled = true;
        resultContainer.classList.add('hidden');
        messageBox.classList.add('hidden');

        const formData = new FormData();
        formData.append('audio', file); // O nome 'audio' deve corresponder ao esperado no backend (request.files['audio'])

        try {
            const response = await fetch(BACKEND_URL, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Erro de rede: ${response.status}`);
            }

            const data = await response.json();
            
            transcriptionText.value = data.transcription;
            resultContainer.classList.remove('hidden');
            showMessage("Transcrição concluída com sucesso!", 'bg-green-500');

        } catch (error) {
            console.error("Erro na transcrição:", error);
            transcriptionText.value = "";
            resultContainer.classList.add('hidden');
            showMessage(`Falha na transcrição: ${error.message}`, 'bg-red-500');

        } finally {
            // Esconde o estado de carregamento e reativa o botão
            loadingIndicator.classList.add('hidden');
            transcribeButton.disabled = false;
        }
    });

    function showMessage(message, colorClass) {
        messageBox.textContent = message;
        messageBox.className = `mt-4 p-3 rounded-lg text-sm text-center ${colorClass}`;
        messageBox.classList.remove('hidden');
    }
});
