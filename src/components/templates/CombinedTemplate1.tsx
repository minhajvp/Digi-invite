'use client';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, Home, Users, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import MusicPlayer from './MusicPlayer';
import RSVPModal from './RSVPModal';
import FloatingHearts from './FloatingHearts';

interface Props {
  data: any;
}

export default function CombinedTemplate1({ data }: Props) {
  const formatTime = (time: string) => {
    if (!time) return '';
    try {
      const [hours, minutes] = time.split(':');
      let h = parseInt(hours);
      const m = minutes || '00';
      const ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12;
      h = h ? h : 12;
      return `${h}:${m} ${ampm}`;
    } catch (e) {
      return time;
    }
  };

  const formatDate = (date: string) => {
    if (!date) return '';
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(date)) return date;
    try {
      if (date.includes('-')) {
        const parts = date.split('-');
        if (parts.length === 3) {
          const [y, m, d] = parts;
          return `${d.padStart(2, '0')}/${m.padStart(2, '0')}/${y}`;
        }
      }
      const d = new Date(date);
      if (isNaN(d.getTime())) return date;
      const day = d.getDate().toString().padStart(2, '0');
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    } catch (e) {
      return date;
    }
  };

  const [isRSVPOpen, setIsRSVPOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const {
    brideName, groomName, houseName, houseAddress, eventDate, eventTime, locationName,
    googleMapLink, eventDescription, musicUrl, eventSubHead
  } = data;

  useEffect(() => {
    if (!eventDate) return;
    const target = new Date(`${eventDate}T${eventTime || '00:00'}:00`);
    
    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();
      
      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [eventDate, eventTime]);

  return (
    <div className="relative w-full min-h-screen bg-zinc-950 text-amber-50 font-sans overflow-x-hidden">
      
      <FloatingHearts count={15} colors={['#7c3aed', '#db2777', '#fbbf24']} />
      
      <MusicPlayer url={musicUrl || "/wedding_nasheed.mp3"} brideName={brideName} groomName={groomName} />
      <RSVPModal isOpen={isRSVPOpen} onClose={() => setIsRSVPOpen(false)} invitationId={data._id?.toString()} />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="z-10"
        >
          <div className="flex justify-center gap-4 mb-8">
             <div className="w-14 h-14 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center border border-amber-500/30">
               <Heart size={24} />
             </div>
             <div className="w-14 h-14 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center border border-indigo-500/30">
               <Home size={24} />
             </div>
          </div>
          <p className="text-amber-400 uppercase tracking-[0.5em] text-[10px] mb-8 font-bold">A Double Celebration</p>
          <h1 className="text-5xl md:text-8xl font-serif text-white mb-6 italic leading-tight">
             {brideName} & {groomName}
          </h1>
          <div className="w-24 h-[1px] bg-amber-500/50 mx-auto mb-6" />
          <h2 className="text-2xl md:text-4xl font-serif text-amber-200 italic">
            Wedding & Housewarming
          </h2>
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/20 to-zinc-950" />
      </section>

      {/* Intro Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <p className="text-amber-400 uppercase tracking-widest text-xs font-bold">{eventSubHead || "Together with their families"}</p>
            <p className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed italic">
              "We invite you to witness the union of two hearts and the opening of our new home. A day of love, laughter, and new beginnings."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Wedding & House Details */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="p-10 bg-zinc-900/50 rounded-3xl border border-white/5 backdrop-blur-sm"
           >
              <Heart className="text-rose-500 mb-6" size={32} />
              <h3 className="text-2xl font-serif text-white mb-4">The Wedding</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Join us as we take our vows and start our lifelong journey together as husband and wife.
              </p>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="p-10 bg-zinc-900/50 rounded-3xl border border-white/5 backdrop-blur-sm"
           >
              <Home className="text-indigo-400 mb-6" size={32} />
              <h3 className="text-2xl font-serif text-white mb-4">The New Home</h3>
              <p className="text-zinc-400 leading-relaxed mb-4">
                We are excited to welcome you to our new sanctuary:
              </p>
              <p className="text-amber-200 font-pinyon text-5xl md:text-7xl drop-shadow-md">{houseName}</p>
              <p className="text-zinc-500 text-sm mt-2">{houseAddress}</p>
           </motion.div>
        </div>
      </section>

      {/* Date & Location */}
      <section className="py-24 px-6 bg-zinc-900/30">
        <div className="max-w-4xl mx-auto text-center space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <Calendar className="mx-auto text-amber-500" size={28} />
              <p className="text-3xl font-serif">{formatDate(eventDate)}</p>
            </div>
            <div className="space-y-4">
              <Clock className="mx-auto text-amber-500" size={28} />
              <p className="text-3xl font-serif">{formatTime(eventTime)}</p>
            </div>
            <div className="space-y-4">
              <MapPin className="mx-auto text-amber-500" size={28} />
              <p className="text-2xl font-serif">{locationName}</p>
            </div>
          </div>

          {googleMapLink && (
            <a href={googleMapLink} target="_blank" rel="noreferrer" className="inline-block px-12 py-4 bg-amber-600 text-zinc-950 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-amber-500 transition-colors">
              View on Google Maps
            </a>
          )}
        </div>
      </section>

      {/* Countdown */}
      <section className="py-24 text-center">
         <div className="flex justify-center gap-8 md:gap-16">
            {[{v:timeLeft.days, l:'Days'}, {v:timeLeft.hours, l:'Hours'}, {v:timeLeft.minutes, l:'Mins'}, {v:timeLeft.seconds, l:'Secs'}].map(i => (
              <div key={i.l}>
                <div className="text-4xl md:text-7xl font-serif text-amber-500">{i.v}</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mt-2">{i.l}</div>
              </div>
            ))}
         </div>
      </section>

      {/* RSVP */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto p-16 bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-[3rem] border border-white/5 text-center shadow-2xl">
           <h2 className="text-4xl font-serif mb-8 italic text-white">We'd love to see you there!</h2>
           <button 
             onClick={() => setIsRSVPOpen(true)}
             className="w-full md:w-auto px-16 py-5 bg-white text-zinc-950 rounded-2xl font-bold uppercase tracking-[0.2em] text-sm hover:bg-amber-500 transition-all shadow-xl shadow-white/5"
           >
             Submit RSVP
           </button>
        </div>
      </section>

      <footer className="py-24 text-center">
         <div className="w-16 h-[1px] bg-amber-500/30 mx-auto mb-10" />
         <p className="font-serif text-3xl italic text-white mb-4">{data.withLove || "The Family"}</p>
         <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-500">Creating Memories Together</p>
         
         <div className="mt-20 flex flex-col items-center justify-center gap-2 opacity-40">
           <a href="/" className="text-[10px] tracking-widest uppercase hover:text-amber-500 transition-colors flex items-center gap-2">
             Created by Diginvite <Heart size={10} fill="currentColor" />
           </a>
         </div>
      </footer>

    </div>
  );
}
