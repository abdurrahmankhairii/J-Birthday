'use client';
import { useAudio } from './AudioContext';

export default function MusicPlayer() {
  const { isPlaying, toggleAudio } = useAudio();

  return (
    <div className="fixed top-6 left-6 md:top-8 md:left-8 z-[100] flex items-center bg-black/60 backdrop-blur-lg border border-yellow-500/30 rounded-full p-2 pr-5 shadow-[0_0_15px_rgba(230,179,30,0.3)] hover:bg-black/80 transition-all duration-300 transform hover:scale-105 group cursor-pointer" onClick={toggleAudio}>
      <button 
        className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-mustard shadow-[0_0_10px_rgba(230,179,30,0.5)] transition-transform group-hover:scale-110"
        style={{ backgroundColor: 'var(--mustard-yellow)', color: 'black' }}
      >
        {isPlaying ? (
          // Pause Icon
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
          </svg>
        ) : (
          // Play Icon
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-1">
            <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      <div className="ml-4 flex flex-col justify-center">
        <span className="text-white text-sm font-bold tracking-wide">Keeping Tabs</span>
        <span className="text-yellow-400 text-xs font-medium tracking-widest uppercase">NIKI</span>
      </div>

      {/* Indikator animasi audio visualizer kecil */}
      {isPlaying && (
        <div className="ml-4 flex items-end h-4 gap-[3px]">
          <div className="w-1 bg-yellow-400 animate-[bounce_1s_infinite] h-full rounded-t-sm shadow-[0_0_5px_rgba(250,204,21,0.8)]"></div>
          <div className="w-1 bg-yellow-400 animate-[bounce_0.8s_infinite] h-2/3 rounded-t-sm shadow-[0_0_5px_rgba(250,204,21,0.8)]"></div>
          <div className="w-1 bg-yellow-400 animate-[bounce_1.2s_infinite] h-full rounded-t-sm shadow-[0_0_5px_rgba(250,204,21,0.8)]"></div>
        </div>
      )}
    </div>
  );
}
