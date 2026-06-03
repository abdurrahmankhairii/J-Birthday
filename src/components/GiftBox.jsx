'use client';
import { useState } from 'react';
import { birthdayConfig } from '../config';

export default function GiftBox() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center mt-20 mb-20">
      <div 
        className={`relative cursor-pointer transition-transform duration-500 ${isOpen ? 'scale-110' : 'animate-shake'}`}
        onClick={() => setIsOpen(true)}
      >
        {!isOpen ? (
          <div className="w-32 h-32 bg-red-600 rounded-lg shadow-2xl flex items-center justify-center relative border-4 border-yellow-400"
               style={{ backgroundColor: '#FF3366', borderColor: '#E6B31E' }}>
            {/* Pita vertikal */}
            <div className="absolute w-6 h-full bg-yellow-400" style={{ backgroundColor: '#E6B31E' }}></div>
            {/* Pita horizontal */}
            <div className="absolute w-full h-6 bg-yellow-400" style={{ backgroundColor: '#E6B31E' }}></div>
            <div className="absolute -top-6 w-12 h-12 bg-yellow-400 rounded-full" style={{ backgroundColor: '#E6B31E' }}></div>
          </div>
        ) : (
          <div className="w-40 h-40 bg-white/10 backdrop-blur-md rounded-2xl p-6 border-4 border-mustard-yellow flex flex-col items-center justify-center text-center animate-pulse"
               style={{ borderColor: 'var(--mustard-yellow)' }}>
            <span className="text-4xl mb-2">🎁</span>
            <p className="text-mustard font-bold text-sm">{birthdayConfig.giftClue}</p>
          </div>
        )}
      </div>
      {!isOpen && <p className="mt-6 text-mustard retro-text text-sm">KLIK KADONYA!</p>}
    </div>
  );
}
