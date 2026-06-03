'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { birthdayConfig } from '../../config';

export default function PuzzlePage() {
  const router = useRouter();
  const [passcode, setPasscode] = useState(['', '', '', '', '', '', '', '']);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // hanya angka
    if (value.length <= 1) {
      const newPasscode = [...passcode];
      newPasscode[index] = value;
      setPasscode(newPasscode);

      // Auto-focus ke input berikutnya
      if (value && index < 7) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !passcode[index] && index > 0) {
      document.getElementById(`code-${index - 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const joinedCode = passcode.join('');
    if (joinedCode === birthdayConfig.puzzlePassword.correctAnswer) {
      router.push('/wishes');
    } else {
      setErrorMsg('Akses Ditolak! Coba ingat-ingat lagi.');
      setPasscode(['', '', '', '', '', '', '', '']);
      document.getElementById('code-0').focus();
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="z-10 bg-black/80 p-10 rounded-2xl border-4 glass-container w-full max-w-lg" style={{ borderColor: 'var(--star-wars-red)' }}>
        <h1 className="text-2xl text-center mb-8 retro-text" style={{ color: 'var(--star-wars-red)' }}>
          STAGE 3: FINAL PUZZLE
        </h1>
        
        <p className="text-xl mb-8 text-white text-center">
          {birthdayConfig.puzzlePassword.clue}
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-8">
          <div className="flex gap-2 justify-center">
            {passcode.map((num, idx) => (
              <input
                key={idx}
                id={`code-${idx}`}
                type="text"
                value={num}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="w-10 h-12 md:w-12 md:h-14 bg-transparent border-b-4 text-center text-2xl text-white outline-none font-bold"
                style={{ borderColor: 'var(--star-wars-red)' }}
                maxLength={1}
              />
            ))}
          </div>
          
          <button 
            type="submit"
            className="btn-retro p-4 hover:bg-red-500 hover:text-black transition-colors w-full"
            style={{ borderColor: 'var(--star-wars-red)', color: 'var(--star-wars-red)' }}
          >
            UNLOCK
          </button>
        </form>
        
        {errorMsg && (
          <p className="mt-6 text-center retro-text" style={{ color: 'var(--star-wars-red)', fontSize: '12px' }}>
            {errorMsg}
          </p>
        )}
      </div>
    </main>
  );
}
