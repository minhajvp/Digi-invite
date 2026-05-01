'use client';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="relative">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-indigo-600"
        >
          <Heart size={64} fill="currentColor" />
        </motion.div>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-8 left-0 h-[2px] bg-gradient-to-r from-indigo-600 to-rose-500 rounded-full"
        />
        
        <p className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-xs font-bold uppercase tracking-[0.3em] text-slate-400 whitespace-nowrap">
          Diginvite
        </p>
      </div>
    </div>
  );
}
