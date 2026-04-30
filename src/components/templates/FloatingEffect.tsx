'use client';
import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { Heart } from 'lucide-react';

export default function FloatingEffect({ count = 30 }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const elements = useMemo(() => {
    return [...Array(count)].map((_, i) => ({
      id: i,
      left: (Math.random() * 100) + "%",
      delay: Math.random() * 20,
      duration: Math.random() * 15 + 10,
      scale: Math.random() * 1.5 + 0.8, // Increased size
      opacity: Math.random() * 0.4 + 0.1,
      type: Math.random() > 0.5 ? 'float' : 'drop'
    }));
  }, [count]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden w-full h-full">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          initial={{ 
            opacity: 0,
            y: el.type === 'float' ? "120vh" : "-20vh",
            rotate: 0,
            scale: el.scale,
          }}
          animate={{ 
            opacity: [0, el.opacity, el.opacity, 0],
            y: el.type === 'float' ? "-20vh" : "120vh",
            rotate: 360,
          }}
          transition={{ 
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: "linear"
          }}
          className="absolute"
          style={{ 
            left: el.left,
            color: '#fecdd3' // rose-200 for better visibility
          }}
        >
          <Heart size={48} fill="currentColor" strokeWidth={0.5} />
        </motion.div>
      ))}
    </div>
  );
}
