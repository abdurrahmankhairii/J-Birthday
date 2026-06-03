'use client';
import { createContext, useContext, useState, useRef, useEffect } from 'react';

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const playAudio = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn("Autoplay blocked:", err);
      });
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, playAudio }}>
      {children}
      <audio ref={audioRef} loop>
        <source src="/audio/Niki.mp3" type="audio/mpeg" />
      </audio>
    </AudioContext.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContext);
}
