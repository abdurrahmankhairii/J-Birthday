'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { birthdayConfig } from '../../config';

export default function JigsawPage() {
  const router = useRouter();
  const gridSize = birthdayConfig.imagePuzzle.gridSize || 5;
  const numPieces = gridSize * gridSize;
  
  const [pieces, setPieces] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [isSolved, setIsSolved] = useState(false);
  const [puzzleImageFile, setPuzzleImageFile] = useState(null);

  // Fetch puzzle image name from API
  useEffect(() => {
    fetch('/api/media')
      .then(res => res.json())
      .then(data => {
        const imageName = birthdayConfig.imagePuzzle.imageName.toLowerCase();
        const file = data.find(f => f.toLowerCase().startsWith(imageName));
        if (file) {
          setPuzzleImageFile(file);
        } else {
          // Fallback if not found
          setPuzzleImageFile(`${birthdayConfig.imagePuzzle.imageName}.jpg`);
        }
      })
      .catch(err => console.error("Error fetching media:", err));
  }, []);

  // Initialize and shuffle
  useEffect(() => {
    let initialPieces = Array.from({ length: numPieces }, (_, i) => i);
    // Shuffle logic
    for (let i = initialPieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [initialPieces[i], initialPieces[j]] = [initialPieces[j], initialPieces[i]];
    }
    setPieces(initialPieces);
  }, [numPieces]);

  const handlePieceClick = (index) => {
    if (isSolved) return;

    if (selectedIdx === null) {
      setSelectedIdx(index);
    } else {
      // Swap
      const newPieces = [...pieces];
      const temp = newPieces[selectedIdx];
      newPieces[selectedIdx] = newPieces[index];
      newPieces[index] = temp;
      setPieces(newPieces);
      setSelectedIdx(null);

      // Check win condition
      if (newPieces.every((val, i) => val === i)) {
        setIsSolved(true);
        setTimeout(() => {
          router.push('/puzzle');
        }, 1500);
      }
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 md:p-6 text-center">
      <div className="z-10 bg-black/80 p-6 md:p-10 rounded-2xl border-4 glass-container w-full max-w-2xl" style={{ borderColor: 'var(--mustard-yellow)' }}>
        <h1 className="text-xl md:text-2xl text-center mb-6 retro-text" style={{ color: 'var(--mustard-yellow)' }}>
          STAGE 3: JIGSAW PUZZLE
        </h1>
        
        <p className="mb-6 text-white text-sm md:text-base">
          Susun gambar ini! Klik satu kotak, lalu klik kotak lain untuk menukar posisinya.
        </p>

        {isSolved && (
          <p className="mb-4 text-green-400 font-bold animate-pulse text-lg">
            BERHASIL! Melanjutkan ke stage berikutnya...
          </p>
        )}

        <div 
          className="mx-auto bg-gray-900 border-2 border-white/20"
          style={{ 
            display: 'grid', 
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            width: '100%',
            maxWidth: '500px',
            aspectRatio: '1/1',
            gap: '2px'
          }}
        >
          {pieces.map((val, idx) => {
            // Hitung posisi background
            const row = Math.floor(val / gridSize);
            const col = val % gridSize;
            const bgPosX = (col / (gridSize - 1)) * 100;
            const bgPosY = (row / (gridSize - 1)) * 100;

            const isSelected = selectedIdx === idx;

            return (
              <div 
                key={idx}
                onClick={() => handlePieceClick(idx)}
                className={`cursor-pointer transition-transform duration-200 ${isSelected ? 'scale-90 border-2 border-red-500 z-10 relative' : ''}`}
                style={{
                  backgroundImage: puzzleImageFile ? `url(/media/${puzzleImageFile})` : 'none',
                  backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                  backgroundPosition: `${bgPosX}% ${bgPosY}%`,
                  backgroundColor: '#444', // Fallback if image not loaded
                  width: '100%',
                  height: '100%'
                }}
              />
            );
          })}
        </div>

        <button 
          onClick={() => {
            // Fitur skip khusus untuk test/debug jika user pusing
            if(window.confirm('Nyerah dan mau skip?')) {
              router.push('/puzzle');
            }
          }}
          className="mt-8 text-gray-500 text-xs underline hover:text-white"
        >
          Skip (Cheat)
        </button>
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-20" 
           style={{
             backgroundImage: 'radial-gradient(circle, #E6B31E 1px, transparent 1px)',
             backgroundSize: '30px 30px'
           }}
      />
    </main>
  );
}
