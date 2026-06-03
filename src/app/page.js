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
      <div className="z-10 bg-black/80 p-8 rounded-2xl border-4 glass-container max-w-2xl text-center relative" style={{ borderColor: 'var(--mustard-yellow)' }}>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 retro-text tracking-widest text-mustard" style={{ color: 'var(--mustard-yellow)' }}>
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
