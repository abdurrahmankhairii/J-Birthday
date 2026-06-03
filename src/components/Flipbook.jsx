'use client';
import React, { forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';

const Page = forwardRef((props, ref) => {
  return (
    <div 
      className="page flex items-center justify-center p-4 md:p-8" 
      ref={ref} 
      style={{ 
        backgroundColor: '#Fdf6e3', // Warna kertas vintage
        backgroundImage: 'radial-gradient(#e0d5c1 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        border: '1px solid #d4c5b0',
        boxShadow: 'inset 0 0 30px rgba(0,0,0,0.1), 0 0 10px rgba(0,0,0,0.5)',
      }}
    >
      {props.children}
    </div>
  );
});

Page.displayName = 'Page';

export default function Flipbook({ mediaFiles }) {
  // Filter media files that start with 'love'
  const loveFiles = mediaFiles.filter(f => f.toLowerCase().startsWith('love')).sort();

  if (loveFiles.length === 0) {
    return null;
  }

  const renderPageContent = (file, index) => {
    const isVideo = file.toLowerCase().endsWith('.mp4');
    // Rotasi acak sedikit untuk efek polaroid yang ditempel manual
    const rotation = index % 2 === 0 ? '-2deg' : '2deg';
    
    return (
      <div 
        className="w-full h-full relative bg-white p-3 md:p-5 shadow-xl flex flex-col"
        style={{ 
          border: '1px solid #e2e8f0', 
          transform: `rotate(${rotation})` 
        }}
      >
        {/* Selotip dekoratif di atas */}
        <div 
          className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-white/50 backdrop-blur-sm z-10"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transform: 'translateX(-50%) rotate(-3deg)' }}
        ></div>

        <div className="w-full flex-grow relative overflow-hidden bg-gray-200 border border-gray-300">
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

        {/* Bagian bawah polaroid buat nulis teks / nomor */}
        <div className="w-full h-12 md:h-16 flex items-center justify-center mt-2">
          <span className="retro-text text-gray-800 text-[10px] md:text-xs tracking-widest opacity-80" style={{ color: '#333' }}>
            MEMORY #{index + 1}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center mt-20 mb-20 relative z-10">
      <h2 className="text-center text-2xl text-mustard mb-10 retro-text" style={{ color: 'var(--mustard-yellow)' }}>
        OUR LOVE STORY
      </h2>
      
      {/* Desktop View */}
      <div className="hidden md:block">
        <HTMLFlipBook 
          width={400} 
          height={550} 
          size="fixed" 
          minWidth={300} 
          maxWidth={500} 
          minHeight={400} 
          maxHeight={600} 
          maxShadowOpacity={0.5} 
          showCover={true} 
          mobileScrollSupport={true}
          className="mx-auto"
        >
          {loveFiles.map((file, index) => (
            <Page key={index}>
              {renderPageContent(file, index)}
            </Page>
          ))}
        </HTMLFlipBook>
      </div>
      
      {/* Mobile View */}
      <div className="block md:hidden">
        <HTMLFlipBook 
          width={300} 
          height={420} 
          size="fixed" 
          maxShadowOpacity={0.5} 
          showCover={true} 
          mobileScrollSupport={true}
          className="mx-auto"
        >
          {loveFiles.map((file, index) => (
            <Page key={index}>
              {renderPageContent(file, index)}
            </Page>
          ))}
        </HTMLFlipBook>
      </div>
      
      <p className="mt-8 text-white italic text-sm bg-black/50 px-4 py-2 rounded-full border border-gray-700">
        (Geser/Swipe halaman seperti membaca buku)
      </p>
    </div>
  );
}
