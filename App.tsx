import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Spinner } from './components/Spinner';
import { ErrorDisplay } from './components/ErrorDisplay';
import { SummaryDisplay } from './components/ScriptDisplay'; // Renamed component, kept file name
import { generateVideoSummary } from './services/geminiService';
import { VideoSummary } from './types';

const App: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoSummary, setVideoSummary] = useState<VideoSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSummary = useCallback(async () => {
    if (!videoUrl.trim()) {
      setError('Please enter a YouTube video URL.');
      return;
    }
    // Basic URL validation
    try {
        new URL(videoUrl);
    } catch (_) {
        setError('Please enter a valid URL.');
        return;
    }


    setIsLoading(true);
    setError(null);
    setVideoSummary(null);

    try {
      const summary = await generateVideoSummary(videoUrl);
      setVideoSummary(summary);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [videoUrl]);
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleGenerateSummary();
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <Header />
      <main className="w-full max-w-4xl mx-auto flex-grow flex flex-col items-center">
        <div className="w-full p-6 bg-slate-800/50 rounded-2xl shadow-2xl border border-slate-700 backdrop-blur-sm mt-8">
          <p className="text-lg text-center text-slate-300 mb-4">
            Enter a YouTube link and let AI summarize it for you using first principles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g., https://www.youtube.com/watch?v=..."
              className="flex-grow bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-200"
              disabled={isLoading}
              aria-label="YouTube video URL"
            />
            <button
              onClick={handleGenerateSummary}
              disabled={isLoading}
              className="bg-sky-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-sky-500 disabled:bg-slate-700 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 transform hover:scale-105"
            >
              {isLoading ? 'Summarizing...' : 'Summarize Video'}
            </button>
          </div>
           <p className="text-xs text-center text-slate-500 mt-3 px-2">
            *Note: The AI generates a plausible summary based on the video's topic, as it cannot access the video content directly.
          </p>
        </div>

        <div className="w-full mt-8">
          {isLoading && <Spinner />}
          {error && <ErrorDisplay message={error} />}
          {videoSummary && <SummaryDisplay summary={videoSummary} />}
        </div>
      </main>
    </div>
  );
};

export default App;