import { Outfit, Press_Start_2P } from 'next/font/google';
import './globals.css';
import { AudioProvider } from '../components/AudioContext';
import AnimatedBackground from '../components/AnimatedBackground';
import MusicPlayer from '../components/MusicPlayer';

export const metadata = {
  title: "Jordan's 26th Adventure",
  description: "A retro birthday adventure for Jordan Nathaniel Dermawan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <AnimatedBackground />
        <AudioProvider>
          <MusicPlayer />
          {children}
        </AudioProvider>
      </body>
    </html>
  );
}
