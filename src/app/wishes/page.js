'use client';
import { useEffect, useState } from 'react';
import { birthdayConfig } from '../../config';
import GiftBox from '../../components/GiftBox';
import Flipbook from '../../components/Flipbook';

export default function WishesPage() {
  const [mediaFiles, setMediaFiles] = useState([]);
  
  useEffect(() => {
    // Fetch daftar file dari API route
    fetch('/api/media')
      .then(res => res.json())
      .then(data => {
        if (data.files) {
          setMediaFiles(data.files);
        }
      })
      .catch(err => console.error("Error fetching media:", err));
  }, []);

  // Deteksi foto utama (bernama persis 'Jordan' atau 'Main')
  const mainMedia = mediaFiles.find(f => {
    const name = f.split('.')[0].toLowerCase();
    return name === 'jordan' || name === 'main';
  });

  // Gallery: foto bernama 'Jordan1' s.d 'Jordan20'
  const galleryMedia = mediaFiles.filter(f => {
    const name = f.split('.')[0].toLowerCase();
    return name.startsWith('jordan') && name !== 'jordan';
  }).sort((a, b) => {
    const numA = parseInt(a.replace(/\D/g, '')) || 0;
    const numB = parseInt(b.replace(/\D/g, '')) || 0;
    return numA - numB;
  });

  return (
    <main className="min-h-screen p-6 flex flex-col items-center">
      
      {/* HEADER WISHES */}
      <div className="w-full max-w-3xl text-center mt-10 mb-16 glass-container border-2 border-mustard-yellow" style={{ borderColor: 'var(--mustard-yellow)' }}>
        <h1 className="text-3xl md:text-5xl text-mustard mb-6 retro-text" style={{ color: 'var(--mustard-yellow)' }}>
          LEVEL 25 UNLOCKED!
        </h1>
        
        {mainMedia && (
          <div className="mb-8 w-full max-w-md mx-auto rounded-xl overflow-hidden border-4 border-mustard-yellow shadow-2xl" style={{ borderColor: 'var(--mustard-yellow)', boxShadow: '0 0 20px rgba(230,179,30,0.5)' }}>
            {mainMedia.endsWith('.mp4') ? (
              <video src={`/media/${mainMedia}`} autoPlay loop muted playsInline className="w-full h-auto object-cover" />
            ) : (
              <img src={`/media/${mainMedia}`} alt="Main Photo" className="w-full h-auto object-cover" />
            )}
          </div>
        )}
        
        <p className="text-lg md:text-xl text-white leading-relaxed font-medium">
          {birthdayConfig.wishesText}
        </p>
      </div>

      {/* GALLERY GRID */}
      <div className="w-full max-w-6xl mb-20">
        <h2 className="text-center text-2xl text-mustard mb-10 retro-text" style={{ color: 'var(--star-wars-blue)' }}>
          MEMORY LANE
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {galleryMedia.length > 0 ? galleryMedia.map((file, idx) => {
            const isVideo = file.endsWith('.mp4');
            return (
              <div 
                key={idx} 
                className="relative group overflow-hidden transition-all duration-500 hover:scale-105 hover:z-10 cursor-pointer"
                style={{ 
                  aspectRatio: '1/1',
                  border: '4px solid var(--mustard-yellow)',
                  borderRadius: '16px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.8), 0 0 15px rgba(230,179,30,0.4)',
                  padding: '5px',
                  background: 'linear-gradient(135deg, #2a2a2a, #000)'
                }}
              >
                <div className="w-full h-full relative rounded-lg overflow-hidden border border-gray-700">
                  {isVideo ? (
                    <video 
                      src={`/media/${file}`} 
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      autoPlay loop muted playsInline
                    />
                  ) : (
                    <img 
                      src={`/media/${file}`} 
                      alt={`Memory ${idx}`} 
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                  )}
                  {/* Overlay gradien elegan yang menghilang saat di-hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-0 transition-opacity duration-500"></div>
                  {/* Efek kilauan emas di sudut */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-yellow-300 opacity-50 m-2"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-yellow-300 opacity-50 m-2"></div>
                </div>
              </div>
            );
          }) : (
            <p className="col-span-full text-center text-gray-400 italic">Belum ada foto yang dimasukkan ke folder /public/media</p>
          )}
        </div>
      </div>

      {/* FLIPBOOK LOVE ALBUM */}
      <Flipbook mediaFiles={mediaFiles} />

      {/* GIFT BOX */}
      <GiftBox />
      
    </main>
  );
}
