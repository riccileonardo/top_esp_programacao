import React, { useState, useCallback } from 'react';
import { generateImage } from './services/geminiService';
import { SparklesIcon, ImageIcon, DownloadIcon } from './components/icons';
import { Spinner } from './components/Spinner';

interface PromptFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const PromptForm: React.FC<PromptFormProps> = ({ prompt, setPrompt, onSubmit, isLoading }) => {
  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Uma vibrante pintura a óleo de um gato robô tocando piano em um planeta distante..."
          className="w-full h-32 p-4 pr-32 text-slate-200 bg-slate-800 border-2 border-slate-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300 resize-none"
          disabled={isLoading}
          aria-label="Prompt de imagem"
        />
        <button
          type="submit"
          disabled={isLoading || !prompt}
          className="absolute top-1/2 right-4 -translate-y-1/2 flex items-center justify-center gap-2 px-4 py-2 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-300"
        >
          {isLoading ? (
            <>
              <Spinner className="w-5 h-5" />
              <span>Gerando...</span>
            </>
          ) : (
            <>
              <SparklesIcon className="w-5 h-5" />
              <span>Gerar</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

interface ImageDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
  prompt: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, isLoading, error, prompt }) => {
    const handleDownload = useCallback(() => {
        if (!imageUrl) return;
        const link = document.createElement('a');
        link.href = imageUrl;
        const fileName = prompt.substring(0, 30).replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'imagem-gerada-ia';
        link.download = `${fileName}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, [imageUrl, prompt]);


  return (
    <div className="w-full aspect-square bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-lg flex items-center justify-center flex-col p-4 text-slate-500 relative overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm flex flex-col items-center justify-center gap-4 z-10">
          <Spinner className="w-12 h-12 text-sky-400" />
          <p className="text-slate-300 text-lg">Sua criação está ganhando vida...</p>
        </div>
      )}
      {error && (
        <div className="text-center text-red-400">
          <h3 className="font-bold text-lg mb-2">Falha na Geração</h3>
          <p className="text-sm">{error}</p>
        </div>
      )}
      {!isLoading && !error && imageUrl && (
        <>
            <div className="absolute inset-2 bg-white rounded-md shadow-lg">
                <img
                  key={imageUrl}
                  src={imageUrl} 
                  alt={prompt || 'Imagem gerada por IA'} 
                  className="w-full h-full object-contain rounded-md animate-print"
                />
            </div>
            <button
                onClick={handleDownload}
                className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 bg-slate-800/70 text-white rounded-md hover:bg-slate-700 transition-all duration-300 backdrop-blur-sm z-10"
                aria-label="Salvar imagem"
            >
                <DownloadIcon className="w-5 h-5" />
                <span>Salvar</span>
            </button>
        </>
      )}
      {!isLoading && !error && !imageUrl && (
        <>
          <ImageIcon className="w-16 h-16 mb-4" />
          <h3 className="text-lg font-medium">Sua imagem gerada aparecerá aqui</h3>
          <p className="text-sm">Insira um prompt acima e clique em "Gerar"</p>
        </>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateImage = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt || isLoading) return;

    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const generatedImageUrl = await generateImage(prompt);
      setImageUrl(generatedImageUrl);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro inesperado.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4">
      <main className="container mx-auto max-w-2xl flex flex-col items-center gap-8">
        <header className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">
            Gerador de Imagens IA
          </h1>
          <p className="text-slate-400 mt-2">
            Transforme suas ideias em visuais deslumbrantes. Desenvolvido com Gemini.
          </p>
        </header>

        <div className="w-full p-6 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl shadow-slate-950/50 flex flex-col gap-6">
          <PromptForm 
            prompt={prompt}
            setPrompt={setPrompt}
            onSubmit={handleGenerateImage}
            isLoading={isLoading}
          />
          <ImageDisplay
            imageUrl={imageUrl}
            isLoading={isLoading}
            error={error}
            prompt={prompt}
          />
        </div>
        
        <footer className="text-center text-slate-500 text-sm">
          <p>Criado com React, Tailwind CSS e a API Google Gemini.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;