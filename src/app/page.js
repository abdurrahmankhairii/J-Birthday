'use client';
import { useRouter } from 'next/navigation';
import { useAudio } from '../components/AudioContext';

export default function LandingPage() {
  const router = useRouter();
  const { playAudio } = useAudio();

  const startAdventure = () => {
    playAudio();
    router.push('/quiz');
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center p-6 star-wars-crawl-container relative">
      <div className="z-10 bg-black/60 p-10 rounded-2xl border-4 border-mustard-yellow glass-container relative" style={{ borderColor: 'var(--mustard-yellow)' }}>
        
        {/* Tombol Play Musik Manual di awal */}
        <button 
          onClick={playAudio}
          className="absolute top-4 right-4 bg-mustard text-black rounded-full w-12 h-12 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg"
          title="Play Music"
        >
          {/* Ikon Play sederhana (SVG) */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        </button>

        <h1 className="text-4xl md:text-6xl text-mustard mb-4 retro-text" style={{ color: 'var(--mustard-yellow)' }}>
          LEVEL 25
        </h1>
        <h2 className="text-xl md:text-2xl mb-8 font-semibold text-white">
          A Long Time Ago In a Galaxy Far, Far Away...
        </h2>
        <p className="mb-10 text-lg md:text-xl text-gray-300 max-w-lg mx-auto">
          Halo Jordan! Sebelum kamu melihat hadiah utamanya, kamu harus melewati beberapa tantangan retro ini. Siap?
        </p>
        <button 
          onClick={startAdventure}
          className="btn-retro text-xl px-8 py-4 animate-shake"
        >
          START ADVENTURE
        </button>
      </div>

      {/* Decorative stars / retro background elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20" 
           style={{
             backgroundImage: 'radial-gradient(circle, #E6B31E 2px, transparent 2px)',
             backgroundSize: '100px 100px'
           }}
      />
    </main>
  );
}
