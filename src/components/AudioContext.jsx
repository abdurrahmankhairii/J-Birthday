'use client';
import { createContext, useContext, useState, useRef, useEffect } from 'react';

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.warn("Audio play blocked:", err);
        });
      }
    }
  };

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
    <AudioContext.Provider value={{ isPlaying, toggleAudio, playAudio }}>
      {children}
      <audio ref={audioRef} loop>
        <source src="/media/Niki.mp3" type="audio/mpeg" />
      </audio>
    </AudioContext.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContext);
}
