'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { birthdayConfig } from '../../config';

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAnswer = (index) => {
    if (index === birthdayConfig.quizQuestions[currentQuestion].correctAnswer) {
      setErrorMsg('');
      if (currentQuestion < birthdayConfig.quizQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        router.push('/riddle');
      }
    } else {
      setErrorMsg('Jawaban salah! Coba lagi.');
    }
  };

  const q = birthdayConfig.quizQuestions[currentQuestion];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="z-10 bg-black/80 p-10 rounded-2xl border-4 glass-container w-full max-w-lg" style={{ borderColor: 'var(--star-wars-blue)' }}>
        <h1 className="text-2xl text-center mb-8 retro-text" style={{ color: 'var(--star-wars-blue)' }}>
          STAGE 1: QUIZ
        </h1>
        
        <p className="mb-4 text-white">Pertanyaan {currentQuestion + 1} dari {birthdayConfig.quizQuestions.length}:</p>
        <p className="text-xl mb-8 text-mustard">{q.question}</p>
        
        <div className="flex flex-col gap-4">
          {q.options.map((opt, idx) => (
            <button 
              key={idx} 
              onClick={() => handleAnswer(idx)}
              className="btn-retro p-4 text-left hover:bg-mustard hover:text-black transition-colors"
              style={{ borderColor: 'var(--star-wars-blue)', color: 'var(--light-text)' }}
            >
              {opt}
            </button>
          ))}
        </div>
        
        {errorMsg && (
          <p className="mt-4 text-center retro-text" style={{ color: 'var(--star-wars-red)', fontSize: '12px' }}>
            {errorMsg}
          </p>
        )}
      </div>
      
      {/* Background stars */}
      <div className="absolute inset-0 pointer-events-none opacity-20" 
           style={{
             backgroundImage: 'radial-gradient(circle, #00E5FF 1px, transparent 1px)',
             backgroundSize: '50px 50px'
           }}
      />
    </main>
  );
}
