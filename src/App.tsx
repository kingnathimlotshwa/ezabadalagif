import { useState } from 'react';
import { SearchBar } from './components/search/SearchBar';
import { Gallery } from './components/gallery/Gallery';
import { VideoPlayer } from './components/player/VideoPlayer';
import { useGifs } from './hooks/useGifs';
import type { RedGif } from './types/redgifs';

function App() {
  const [selectedGif, setSelectedGif] = useState<RedGif | null>(null);
  const { gifs, loading, error, authError, query, setQuery, loadMore } = useGifs();

  return (
    <div className="h-screen w-screen bg-black text-white relative overflow-hidden">
      {/* Floating Search Overlay */}
      <div className="fixed top-4 left-0 right-0 z-50 px-4 pointer-events-none">
        <div className="max-w-md mx-auto bg-black/40 backdrop-blur-md p-2 rounded-2xl border border-white/10 pointer-events-auto">
          <SearchBar query={query} setQuery={setQuery} />
        </div>
      </div>

      <main className="h-screen w-full overflow-y-auto snap-y snap-mandatory scroll-smooth">
        {authError && (
          <div className="h-screen w-full flex items-center justify-center text-red-500 p-4 text-center snap-start">
            {authError}
          </div>
        )}

        {error && (
          <div className="h-screen w-full flex items-center justify-center text-red-500 p-4 text-center snap-start">
            {error}
          </div>
        )}

        <Gallery gifs={gifs} onGifClick={setSelectedGif} />

        {loading && (
          <div className="h-screen w-full flex items-center justify-center text-gray-400 snap-start">
            Loading amazing loops...
          </div>
        )}

        {!loading && gifs.length > 0 && (
          <div className="h-screen w-full flex items-center justify-center snap-start">
            <button
              onClick={loadMore}
              className="px-6 py-2 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors"
            >
              Load More
            </button>
          </div>
        )}
      </main>

      <VideoPlayer gif={selectedGif} onClose={() => setSelectedGif(null)} />
    </div>
  );
}

export default App;
