'use client';
import React, { forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';

// Komponen Halaman Sampul (Buku Depan/Belakang)
const BookCover = forwardRef((props, ref) => {
  return (
    <div 
      className="page page-cover" 
      ref={ref} 
      data-density="hard"
      style={{ 
        backgroundColor: '#3e2723', // Warna kulit coklat gelap
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/leather-1.png")',
        border: '2px solid #1f1209',
        boxShadow: 'inset 4px 0 10px rgba(0,0,0,0.5), inset -4px 0 10px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div 
        style={{
          border: '2px solid #d4af37', // Emas
          padding: '20px',
          width: '80%',
          height: '80%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          borderRadius: '8px'
        }}
      >
        {props.children}
      </div>
    </div>
  );
});
BookCover.displayName = 'BookCover';

// Komponen Halaman Dalam (Kertas Vintage)
const BookPage = forwardRef((props, ref) => {
  return (
    <div 
      className="page" 
      ref={ref} 
      style={{ 
        backgroundColor: '#Fdf6e3', // Warna kertas vintage
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")',
        border: '1px solid #d4c5b0',
        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem', // Memberikan jarak agar polaroid fit di dalam halaman
      }}
    >
      {/* Efek lipatan buku (Spine shadow) */}
      <div 
        className="absolute inset-y-0 left-0 w-8 pointer-events-none z-10" 
        style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.15) 0%, transparent 100%)' }} 
      />
      {props.children}
    </div>
  );
});
BookPage.displayName = 'BookPage';

export default function Flipbook({ mediaFiles }) {
  // Filter media files that start with 'love'
  const loveFiles = mediaFiles.filter(f => f.toLowerCase().startsWith('love')).sort();

  if (loveFiles.length === 0) {
    return null;
  }

  const renderPageContent = (file, index) => {
    const isVideo = file.toLowerCase().endsWith('.mp4');
    const rotation = index % 2 === 0 ? '-2deg' : '3deg'; // Variasi kemiringan polaroid
    
    return (
      <div 
        className="relative bg-white shadow-lg flex flex-col"
        style={{ 
          border: '1px solid #e2e8f0', 
          transform: `rotate(${rotation})`,
          padding: '10px 10px 40px 10px', // Padding polaroid (bawah lebih lebar)
          width: '100%',
          maxHeight: '100%',
        }}
      >
        {/* Selotip dekoratif di atas */}
        <div 
          className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-12 h-5 z-20"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', border: '1px solid rgba(0,0,0,0.1)', transform: 'translateX(-50%) rotate(-4deg)' }}
        ></div>

        <div className="w-full relative overflow-hidden bg-gray-200 border border-gray-300" style={{ aspectRatio: '3/4' }}>
          {isVideo ? (
            <video 
              src={`/media/${file}`} 
              autoPlay loop muted playsInline 
              className="w-full h-full object-cover"
            />
          ) : (
            <img 
              src={`/media/${file}`} 
              alt={`Love ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Teks polaroid */}
        <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center">
          <span className="retro-text text-gray-800 text-[10px] md:text-xs tracking-widest opacity-80" style={{ color: '#333' }}>
            MEMORY #{index + 1}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center mt-20 mb-20 relative z-10">
      <h2 className="text-center text-3xl mb-8 retro-text drop-shadow-[0_0_10px_rgba(230,179,30,0.8)]" style={{ color: 'var(--mustard-yellow)' }}>
        OUR LOVE STORY
      </h2>
      
      {/* Desktop View */}
      <div className="hidden md:flex justify-center w-full">
        <HTMLFlipBook 
          width={400} 
          height={550} 
          size="fixed" 
          minWidth={300} 
          maxWidth={500} 
          minHeight={400} 
          maxHeight={600} 
          maxShadowOpacity={0.4} 
          showCover={true} 
          mobileScrollSupport={true}
          className="shadow-2xl"
        >
          {/* Cover Depan */}
          <BookCover>
            <h1 className="retro-text text-yellow-500 text-3xl">OUR<br/><br/>MEMORIES</h1>
          </BookCover>

          {/* Halaman Dalam */}
          {loveFiles.map((file, index) => (
            <BookPage key={index}>
              {renderPageContent(file, index)}
            </BookPage>
          ))}

          {/* Jika jumlah halaman dalam ganjil, tambahkan 1 halaman kosong agar cover belakang jatuh di sisi kanan */}
          {loveFiles.length % 2 !== 0 && (
            <BookPage>
              <div className="opacity-50 retro-text text-xs text-gray-500">The End...</div>
            </BookPage>
          )}

          {/* Cover Belakang */}
          <BookCover>
            <h1 className="retro-text text-yellow-600 text-xl">Made With Love</h1>
          </BookCover>
        </HTMLFlipBook>
      </div>
      
      {/* Mobile View */}
      <div className="flex md:hidden justify-center w-full">
        <HTMLFlipBook 
          width={300} 
          height={450} 
          size="fixed" 
          maxShadowOpacity={0.4} 
          showCover={true} 
          mobileScrollSupport={true}
          className="shadow-2xl"
        >
          {/* Cover Depan */}
          <BookCover>
            <h1 className="retro-text text-yellow-500 text-2xl">OUR<br/><br/>MEMORIES</h1>
          </BookCover>

          {/* Halaman Dalam */}
          {loveFiles.map((file, index) => (
            <BookPage key={index}>
              {renderPageContent(file, index)}
            </BookPage>
          ))}

          {loveFiles.length % 2 !== 0 && (
            <BookPage>
              <div className="opacity-50 retro-text text-xs text-gray-500">The End...</div>
            </BookPage>
          )}

          {/* Cover Belakang */}
          <BookCover>
            <h1 className="retro-text text-yellow-600 text-lg">Made With Love</h1>
          </BookCover>
        </HTMLFlipBook>
      </div>
      
      <p className="mt-8 text-white italic text-sm bg-black/50 px-4 py-2 rounded-full border border-gray-700 shadow-lg">
        (Geser / Swipe ujung kertas untuk membalik halaman)
      </p>
    </div>
  );
}
