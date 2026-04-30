'use client';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, Home, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import MusicPlayer from './MusicPlayer';
import RSVPModal from './RSVPModal';
import FloatingPetals from './FloatingPetals';

interface Props {
  data: any;
}

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
    houseName, houseAddress, eventDate, eventTime, locationName,
    googleMapLink, eventDescription, musicUrl, brideName, groomName
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
    <div className="relative w-full min-h-screen bg-stone-50 text-stone-800 font-sans overflow-x-hidden">
      
      <FloatingPetals count={20} colors={['#d4d6d9', '#e5e7eb', '#f3f4f6']} />
      
      <MusicPlayer url={musicUrl || "/wedding_nasheed.mp3"} brideName={houseName || "New Home"} groomName="Celebration" />
      <RSVPModal isOpen={isRSVPOpen} onClose={() => setIsRSVPOpen(false)} invitationId={data._id?.toString()} />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="z-10"
        >
          <div className="w-20 h-20 bg-stone-800 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
            <Home size={40} />
          </div>
          <p className="text-stone-500 uppercase tracking-[0.4em] text-xs mb-4">We are moving!</p>
          <h1 className="text-5xl md:text-7xl font-serif text-stone-900 mb-6 italic">
            Housewarming Ceremony
          </h1>
          <p className="text-xl text-stone-600 font-light max-w-lg mx-auto leading-relaxed">
            Every house is built of bricks and beams, but a home is made of hopes and dreams.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-400"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll to explore</span>
          <div className="w-[1px] h-12 bg-stone-200" />
        </motion.div>
      </section>

      {/* Detail Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl font-serif mb-10 text-stone-900">{houseName}</h2>
            <div className="w-16 h-[1px] bg-stone-300 mx-auto mb-10" />
            <p className="text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
              {eventDescription || "We cordially invite you to join us as we celebrate the beginning of our new journey in our new home."}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
            <div className="space-y-6">
              <div className="w-12 h-12 bg-stone-50 rounded-xl flex items-center justify-center mx-auto text-stone-600">
                <Calendar size={24} />
              </div>
              <h3 className="uppercase tracking-widest text-xs font-bold text-stone-400">Date & Time</h3>
              <p className="text-2xl font-serif text-stone-800">{formatDate(eventDate)}</p>
              <p className="text-stone-500">{formatTime(eventTime)}</p>
            </div>
            <div className="space-y-6">
              <div className="w-12 h-12 bg-stone-50 rounded-xl flex items-center justify-center mx-auto text-stone-600">
                <MapPin size={24} />
              </div>
              <h3 className="uppercase tracking-widest text-xs font-bold text-stone-400">Venue</h3>
              <p className="text-2xl font-serif text-stone-800">{locationName}</p>
              <p className="text-stone-500 max-w-xs mx-auto">{houseAddress}</p>
            </div>
          </div>

          {googleMapLink && (
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={googleMapLink}
              target="_blank"
              rel="noreferrer"
              className="inline-block px-10 py-4 bg-stone-900 text-white rounded-full text-sm font-bold uppercase tracking-widest shadow-xl hover:bg-stone-800 transition-all"
            >
              Open in Maps
            </motion.a>
          )}
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-24 px-6 bg-stone-900 text-white text-center">
        <h2 className="text-sm uppercase tracking-[0.5em] mb-16 text-stone-400 font-bold">Counting Down</h2>
        <div className="flex justify-center gap-6 md:gap-12">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Mins', value: timeLeft.minutes },
            { label: 'Secs', value: timeLeft.seconds },
          ].map((item) => (
            <div key={item.label}>
              <div className="text-4xl md:text-6xl font-serif mb-2">{item.value}</div>
              <div className="text-[10px] uppercase tracking-widest text-stone-500">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* RSVP Section */}
      <section className="py-32 px-6 bg-stone-50 text-center">
        <div className="max-w-xl mx-auto p-12 bg-white rounded-3xl shadow-sm border border-stone-100">
           <Users size={32} className="mx-auto mb-6 text-stone-400" />
           <h2 className="text-3xl font-serif mb-6 text-stone-900">Are you joining us?</h2>
           <p className="text-stone-500 mb-10 leading-relaxed italic">
             "Please favor us with your presence as we celebrate this milestone."
           </p>
           <button 
             onClick={() => setIsRSVPOpen(true)}
             className="px-12 py-4 border border-stone-900 text-stone-900 rounded-full hover:bg-stone-900 hover:text-white transition-all font-bold uppercase tracking-widest text-sm"
           >
             RSVP Now
           </button>
        </div>
      </section>

      <footer className="py-20 text-center border-t border-stone-100">
         <p className="font-serif text-2xl text-stone-800 mb-4">{data.withLove || "With Love, The Family"}</p>
         <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400">Created with Love</p>
         
         <div className="mt-12 flex flex-col items-center justify-center gap-2 opacity-40">
           <a href="/" className="text-[10px] tracking-widest uppercase hover:text-stone-600 transition-colors flex items-center gap-2">
             Created by Diginvite <Heart size={10} fill="currentColor" />
           </a>
         </div>
      </footer>

    </div>
  );
}
