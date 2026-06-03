'use client';
import { useAudio } from './AudioContext';

export default function MusicPlayer() {
  const { isPlaying, toggleAudio } = useAudio();

  return (
    <div className="fixed top-4 left-4 z-[100] flex items-center bg-black/40 backdrop-blur-md border border-white/10 rounded-full p-2 pr-4 shadow-lg hover:bg-black/60 transition-colors">
      <button 
        onClick={toggleAudio}
        className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-mustard hover:scale-105 transition-transform"
        style={{ backgroundColor: 'var(--mustard-yellow)', color: 'black' }}
      >
        {isPlaying ? (
          // Pause Icon
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
          </svg>
        ) : (
          // Play Icon
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-1">
            <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      <div className="ml-3 flex flex-col justify-center">
        <span className="text-white text-xs font-bold leading-tight">Keeping Tabs</span>
        <span className="text-gray-400 text-[10px] leading-tight">NIKI</span>
      </div>

      {/* Indikator animasi audio visualizer kecil */}
      {isPlaying && (
        <div className="ml-3 flex items-end h-3 gap-[2px]">
          <div className="w-1 bg-yellow-400 animate-[bounce_1s_infinite] h-full"></div>
          <div className="w-1 bg-yellow-400 animate-[bounce_0.8s_infinite] h-2/3"></div>
          <div className="w-1 bg-yellow-400 animate-[bounce_1.2s_infinite] h-full"></div>
        </div>
      )}
    </div>
  );
}
