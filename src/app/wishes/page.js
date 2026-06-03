'use client';
import { useEffect, useState } from 'react';
import { birthdayConfig } from '../../config';
import GiftBox from '../../components/GiftBox';

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

  // Pisahkan file utama jika ada (misal Main.jpg) dan file lainnya (Jordan1 - Jordan20)
  const mainMedia = mediaFiles.find(f => f.toLowerCase().startsWith('main'));
  const galleryMedia = mediaFiles.filter(f => f.toLowerCase().startsWith('jordan')).sort();

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
                className="relative group rounded-xl overflow-hidden border-2 transition-transform duration-300 hover:scale-105 hover:z-10"
                style={{ borderColor: 'var(--dark-bg)', aspectRatio: '1/1' }}
              >
                {isVideo ? (
                  <video 
                    src={`/media/${file}`} 
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                    autoPlay loop muted playsInline
                  />
                ) : (
                  <img 
                    src={`/media/${file}`} 
                    alt={`Memory ${idx}`} 
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  />
                )}
                {/* Overlay vintage retro style */}
                <div className="absolute inset-0 bg-yellow-600 mix-blend-overlay opacity-20 group-hover:opacity-0 transition-opacity duration-300"></div>
              </div>
            );
          }) : (
            <p className="col-span-full text-center text-gray-400 italic">Belum ada foto yang dimasukkan ke folder /public/media</p>
          )}
        </div>
      </div>

      {/* GIFT BOX */}
      <GiftBox />
      
    </main>
  );
}
