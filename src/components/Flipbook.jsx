'use client';
import React, { forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';

const Page = forwardRef((props, ref) => {
  return (
    <div className="page bg-black border-2 flex items-center justify-center overflow-hidden" ref={ref} style={{ borderColor: 'var(--mustard-yellow)' }}>
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

  return (
    <div className="w-full flex flex-col items-center mt-20 mb-20">
      <h2 className="text-center text-2xl text-mustard mb-10 retro-text" style={{ color: 'var(--mustard-yellow)' }}>
        OUR LOVE STORY
      </h2>
      <div className="hidden md:block">
        <HTMLFlipBook width={400} height={500} size="fixed" minWidth={300} maxWidth={500} minHeight={400} maxHeight={600} maxShadowOpacity={0.5} showCover={true} mobileScrollSupport={true}>
          {loveFiles.map((file, index) => {
            const isVideo = file.toLowerCase().endsWith('.mp4');
            return (
              <Page key={index}>
                <div className="w-full h-full relative">
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
                  {/* Page number */}
                  <div className="absolute bottom-2 right-2 bg-black/50 text-mustard px-2 rounded-md font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
              </Page>
            );
          })}
        </HTMLFlipBook>
      </div>
      
      {/* Mobile view fallback or smaller flipbook */}
      <div className="block md:hidden">
        <HTMLFlipBook width={280} height={350} size="fixed" maxShadowOpacity={0.5} showCover={true} mobileScrollSupport={true}>
          {loveFiles.map((file, index) => {
            const isVideo = file.toLowerCase().endsWith('.mp4');
            return (
              <Page key={index}>
                <div className="w-full h-full relative">
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
                  <div className="absolute bottom-2 right-2 bg-black/50 text-mustard px-2 rounded-md font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
              </Page>
            );
          })}
        </HTMLFlipBook>
      </div>
      
      <p className="mt-8 text-white italic text-sm">(Geser/Swipe halaman seperti membaca buku)</p>
    </div>
  );
}
