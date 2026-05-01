'use client';
import { motion } from 'framer-motion';
import Sidebar from '@/components/admin/Sidebar';
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 p-8 flex flex-col items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="text-indigo-600 mb-4"
        >
          <Loader2 size={40} />
        </motion.div>
        <p className="text-slate-500 font-medium animate-pulse">Loading your invitations...</p>
      </div>
    </div>
  );
}
