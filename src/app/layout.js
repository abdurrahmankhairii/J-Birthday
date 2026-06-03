import { Outfit, Press_Start_2P } from 'next/font/google';
import './globals.css';
import { AudioProvider } from '../components/AudioContext';

export const metadata = {
  title: "Jordan's 26th Adventure",
  description: "A retro birthday adventure for Jordan Nathaniel Dermawan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <AudioProvider>
          {children}
        </AudioProvider>
      </body>
    </html>
  );
}
