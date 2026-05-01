'use client';
import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicPlayer({ url, brideName, groomName, primarySide }: { url?: string; brideName?: string; groomName?: string; primarySide?: 'bride' | 'groom' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (url) {
      audioRef.current = new Audio(url);
      audioRef.current.loop = true;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [url]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          // Ignore play errors (e.g. invalid blob URLs from past sessions)
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const startInteraction = () => {
    setShowOverlay(false);
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // Ignore play errors
      });
      setIsPlaying(true);
    }
  };

  if (!url) return null;

  return (
    <>
      <AnimatePresence>
        {showOverlay && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-sm flex flex-col items-center justify-center text-amber-50"
          >
            <motion.button
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              onClick={startInteraction}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-20 h-20 bg-amber-600/20 border border-amber-500/50 rounded-full flex items-center justify-center">
                <Music className="w-8 h-8 text-amber-400" />
              </div>
              <p className="font-pinyon text-4xl text-amber-400">
                {brideName && groomName ? (primarySide === 'groom' ? `${groomName} & ${brideName}` : `${brideName} & ${groomName}`) : 'Welcome'}
              </p>
              <p className="font-serif text-lg tracking-wider text-amber-500/80 mt-2">A Heartfelt Welcome to Our Big Day</p>
              <p className="text-[10px] text-zinc-500 font-sans uppercase tracking-[0.3em] mt-8 animate-pulse">Tap to Open</p>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-zinc-900/80 backdrop-blur border border-amber-900/50 rounded-full flex items-center justify-center text-amber-400 shadow-lg"
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
    </>
  );
}
