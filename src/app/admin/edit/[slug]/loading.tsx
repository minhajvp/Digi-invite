'use client';
import { motion } from 'framer-motion';
import Sidebar from '@/components/admin/Sidebar';
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex overflow-hidden">
        <div className="w-1/2 p-8 space-y-8">
           <div className="h-10 w-48 bg-slate-200 rounded-lg animate-pulse" />
           <div className="space-y-4">
              <div className="h-32 w-full bg-slate-100 rounded-xl animate-pulse" />
              <div className="h-32 w-full bg-slate-100 rounded-xl animate-pulse" />
              <div className="h-32 w-full bg-slate-100 rounded-xl animate-pulse" />
           </div>
        </div>
        <div className="w-1/2 bg-slate-200 flex items-center justify-center">
           <div className="flex flex-col items-center gap-4">
              <Loader2 className="animate-spin text-slate-400" size={32} />
              <p className="text-slate-500 text-sm">Loading Preview...</p>
           </div>
        </div>
      </div>
    </div>
  );
}
