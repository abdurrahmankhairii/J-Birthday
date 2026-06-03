'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { birthdayConfig } from '../../config';

export default function RiddlePage() {
  const router = useRouter();
  const [answer, setAnswer] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.toLowerCase().trim() === birthdayConfig.riddle.correctAnswer.toLowerCase().trim()) {
      router.push('/puzzle');
    } else {
      setErrorMsg('Tebakanmu masih salah! Coba pikir lagi.');
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="z-10 bg-black/80 p-10 rounded-2xl border-4 glass-container w-full max-w-lg" style={{ borderColor: 'var(--retro-green)' }}>
        <h1 className="text-2xl text-center mb-8 retro-text" style={{ color: 'var(--retro-green)' }}>
          STAGE 2: RIDDLE
        </h1>
        
        <p className="text-xl mb-8 text-white italic text-center">
          "{birthdayConfig.riddle.question}"
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
            type="text" 
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Ketik jawabanmu di sini..."
            className="p-4 bg-transparent border-2 text-white outline-none font-semibold text-center rounded-xl"
            style={{ borderColor: 'var(--retro-green)' }}
          />
          <button 
            type="submit"
            className="btn-retro p-4 hover:bg-green-500 hover:text-black transition-colors"
            style={{ borderColor: 'var(--retro-green)', color: 'var(--retro-green)' }}
          >
            JAWAB
          </button>
        </form>
        
        {errorMsg && (
          <p className="mt-4 text-center retro-text" style={{ color: 'var(--star-wars-red)', fontSize: '12px' }}>
            {errorMsg}
          </p>
        )}
      </div>
      
      {/* Background Matrix/Retro effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20" 
           style={{
             backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(57, 255, 20, .3) 25%, rgba(57, 255, 20, .3) 26%, transparent 27%, transparent 74%, rgba(57, 255, 20, .3) 75%, rgba(57, 255, 20, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(57, 255, 20, .3) 25%, rgba(57, 255, 20, .3) 26%, transparent 27%, transparent 74%, rgba(57, 255, 20, .3) 75%, rgba(57, 255, 20, .3) 76%, transparent 77%, transparent)',
             backgroundSize: '50px 50px'
           }}
      />
    </main>
  );
}
