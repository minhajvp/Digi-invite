'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Props {
  dateString: string;
  timeString: string;
  theme?: 'default' | 'pastel' | 'emerald' | 'minimal';
}

export default function Countdown({ dateString, timeString, theme = 'default' }: Props) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!dateString) return;

    let targetDate = new Date(`${dateString}T00:00:00`);
    if (isNaN(targetDate.getTime())) {
      // Fallback for different date formats
      targetDate = new Date(dateString);
    }

    if (timeString) {
      try {
        const d = new Date(`${dateString} ${timeString}`);
        if (!isNaN(d.getTime())) targetDate = d;
      } catch (e) {}
    }

    if (isNaN(targetDate.getTime())) return;

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [dateString, timeString]);

  if (!mounted) return <div className="h-24"></div>;

  const themes = {
    default: {
      box: 'border-amber-500/30 bg-zinc-900/50 rounded-lg',
      number: 'font-serif text-amber-400',
      label: 'text-zinc-500'
    },
    pastel: {
      box: 'border-rose-200 bg-white/70 rounded-2xl shadow-sm',
      number: 'font-[\'var(--font-cinzel)\'] text-rose-700',
      label: 'text-rose-400'
    },
    emerald: {
      box: 'border-emerald-500/30 bg-emerald-900/40 rounded-none',
      number: 'font-[\'var(--font-cormorant)\'] text-amber-400',
      label: 'text-emerald-500'
    },
    minimal: {
      box: 'border-slate-100 bg-white/50 rounded-xl shadow-sm',
      number: 'font-[\'var(--font-cinzel)\'] text-slate-800',
      label: 'text-slate-400'
    }
  };

  const currentTheme = themes[theme];

  return (
    <div className="flex gap-4 justify-center my-8 text-center">
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Mins', value: timeLeft.minutes },
        { label: 'Secs', value: timeLeft.seconds },
      ].map((item, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <motion.div 
            key={item.value}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`w-16 h-16 border flex items-center justify-center backdrop-blur-sm ${currentTheme.box}`}
          >
            <span className={`text-2xl ${currentTheme.number}`}>{item.value.toString().padStart(2, '0')}</span>
          </motion.div>
          <span className={`text-[10px] uppercase tracking-widest mt-2 ${currentTheme.label}`}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
