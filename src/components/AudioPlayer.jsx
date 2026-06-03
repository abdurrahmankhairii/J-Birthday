'use client';
import { useEffect, useRef, useState } from 'react';

export default function AudioPlayer({ isPlaying }) {
  const audioRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (isPlaying && audioRef.current && !hasStarted) {
      // Browser requires user interaction, but since isPlaying is true, 
      // we assume the user has clicked a "Start" button which triggered this state
      audioRef.current.play().then(() => {
        setHasStarted(true);
      }).catch(err => {
        console.warn("Audio autoplay blocked by browser. User interaction needed.", err);
      });
    }
  }, [isPlaying, hasStarted]);

  return (
    <audio ref={audioRef} loop>
      <source src="/audio/Niki.mp3" type="audio/mpeg" />
    </audio>
  );
}
