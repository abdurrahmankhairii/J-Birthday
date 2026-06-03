'use client';
import '../app/animated-bg.css';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-[-5] overflow-hidden pointer-events-none" style={{ position: 'fixed', zIndex: -5 }}>
      {/* Latar belakang bintang bergerak (Star Wars) */}
      <div className="stars"></div>
      <div className="twinkling"></div>
      
      {/* Bulan */}
      <div className="moon"></div>
      
      {/* Pesawat / Karakter melayang */}
      <img src="/media/spaceship1.png" className="spaceship ship-1" alt="Spaceship 1" onError={(e) => e.target.style.display='none'} />
      <img src="/media/spaceship2.png" className="spaceship ship-2" alt="Spaceship 2" onError={(e) => e.target.style.display='none'} />
      <img src="/media/spaceship3.png" className="spaceship ship-3" alt="Spaceship 3" onError={(e) => e.target.style.display='none'} />
    </div>
  );
}
