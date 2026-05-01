'use client';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-950">
      <div className="relative flex flex-col items-center">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotateY: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-amber-500 mb-8"
        >
          <Heart size={60} fill="currentColor" />
        </motion.div>
        
        <div className="w-48 h-[1px] bg-zinc-800 relative overflow-hidden">
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"
          />
        </div>
        
        <motion.p 
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
          className="mt-6 font-serif text-amber-100/60 tracking-widest text-sm"
        >
          Preparing your invitation...
        </motion.p>
      </div>
    </div>
  );
}
