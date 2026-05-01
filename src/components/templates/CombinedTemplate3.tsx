'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Calendar, Clock, Home, Heart } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import MusicPlayer from './MusicPlayer';
import RSVPModal from './RSVPModal';
import FloatingEffect from './FloatingEffect';
import Countdown from './Countdown';

interface Props {
  data: any;
}

export default function CombinedTemplate3({ data }: Props) {
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);

  const formatTime = (time: string) => {
    if (!time) return '';
    try {
      // Handle HH:MM format
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

  if (!data) return <div className="p-20 text-center">Loading invitation...</div>;

  const {
    brideName = 'Bride', 
    brideFatherName = '',
    brideMotherName = '',
    brideAddress = '',
    groomName = 'Groom', 
    groomFatherName = '',
    groomMotherName = '',
    groomAddress = '',
    houseName = 'New Home', 
    houseAddress = '',
    eventDate = '2027-12-15', 
    eventTime = '10:00 AM', 
    locationName = 'Location',
    googleMapLink = '', 
    eventDescription = 'Description', 
    musicUrl = '', 
    eventSubHead = 'Together with their families', 
    withLove = '', 
    sharingHappinessText = 'Sharing our joy'
  } = data;

  const fadeUp: any = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
  };

  const lineReveal: any = {
    hidden: { width: 0 },
    visible: { width: "100%", transition: { duration: 1.5, ease: "easeInOut" } }
  };

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-white text-slate-800 font-sans overflow-x-hidden">
      
      {/* Unique Floating Petals/Bokeh Effect */}
      <FloatingEffect count={20} />
      
      <MusicPlayer url={musicUrl || "/wedding_nasheed.mp3"} brideName={brideName} groomName={groomName} primarySide={data.primarySide} />
      <RSVPModal isOpen={isRSVPOpen} onClose={() => setIsRSVPOpen(false)} invitationId={data._id?.toString() || ''} />

      {/* Hero Section with Parallax Reveal */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 sticky top-0">
        <motion.div
          style={{ opacity, scale }}
          className="z-10 flex flex-col items-center"
        >
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-12"
          >
            <div className="text-[10px] uppercase tracking-[0.8em] text-slate-400 font-cinzel">The Union of Two Souls</div>
            <motion.div 
              variants={lineReveal}
              initial="hidden"
              animate="visible"
              className="h-px bg-slate-200 mt-4 mx-auto"
            />
          </motion.div>
          
          <h1 className="font-pinyon text-5xl md:text-[7rem] lg:text-[8rem] text-slate-900 leading-tight drop-shadow-sm px-4">
            {data.primarySide === 'groom' ? groomName : brideName}
          </h1>
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center gap-6 my-4"
          >
            <div className="w-12 h-px bg-slate-200" />
            <span className="font-serif text-3xl md:text-5xl text-slate-400 italic">&</span>
            <div className="w-12 h-px bg-slate-200" />
          </motion.div>
          <h1 className="font-pinyon text-5xl md:text-[7rem] lg:text-[8rem] text-slate-900 leading-tight drop-shadow-sm px-4">
            {data.primarySide === 'groom' ? brideName : groomName}
          </h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 flex flex-col items-center"
          >
            <h2 className="font-cinzel text-xl md:text-2xl tracking-[0.4em] text-slate-700 uppercase font-light">
              Nikah & Housewarming
            </h2>
          </motion.div>
        </motion.div>

        {/* Extraordinary Glassmorphism Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="absolute bottom-12 flex flex-col items-center gap-4 text-slate-300"
        >
          <div className="w-6 h-10 rounded-full border border-slate-200 flex justify-center p-1">
             <motion.div 
               animate={{ y: [0, 16, 0] }}
               transition={{ repeat: Infinity, duration: 1.5 }}
               className="w-1 h-2 bg-slate-200 rounded-full" 
             />
          </div>
        </motion.div>
      </section>

      {/* Main Content with Extraordinary Overlap */}
      <div className="relative z-20 bg-white/60 backdrop-blur-3xl rounded-t-[100px] md:rounded-t-[200px] shadow-[0_-50px_100px_-20px_rgba(0,0,0,0.05)]">
        
        {/* Intro Message */}
        <section className="py-20 md:py-40 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="space-y-16"
            >
              <div className="flex justify-center items-center gap-8 opacity-20">
                 <div className="w-20 h-px bg-slate-900" />
                 <Heart size={32} />
                 <div className="w-20 h-px bg-slate-900" />
              </div>
              <p className="font-serif text-3xl md:text-5xl text-slate-600 leading-[1.4] italic px-4 font-light">
                 "{eventDescription}"
              </p>
            </motion.div>
          </div>
        </section>

        {/* Split Cards Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
             {/* Wedding Card */}
             <motion.div 
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={fadeUp}
               className="group relative bg-white p-16 rounded-[4rem] border border-slate-50 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.02)] overflow-hidden"
             >
                <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-32 -mt-32 transition-transform group-hover:scale-110 duration-700" />
                <div className="relative z-10 text-center">
                  <h3 className="font-cinzel text-xs tracking-[0.5em] text-slate-400 mb-16 uppercase">The Ceremony of Love</h3>
                  <div className="space-y-10">
                    {data.primarySide === 'groom' ? (
                      <>
                        <div>
                          <p className="font-pinyon text-6xl text-slate-800">{groomName}</p>
                          {groomFatherName && groomMotherName && (
                            <p className="font-cinzel text-[10px] text-center uppercase tracking-[0.2em] text-slate-800 mt-4 leading-relaxed">
                              Son of <br/> {groomFatherName} & {groomMotherName}
                            </p>
                          )}
                          {groomAddress && (
                            <p className="font-cinzel text-[10px] text-center uppercase tracking-[0.1em] text-slate-400 mt-4 max-w-[250px] mx-auto leading-relaxed break-words">
                              {groomAddress}
                            </p>
                          )}
                        </div>
                        <div className="text-slate-100 font-serif text-4xl italic text-center">with</div>
                        <div>
                          <p className="font-pinyon text-6xl text-slate-800">{brideName}</p>
                          {brideFatherName && brideMotherName && (
                            <p className="font-cinzel text-[10px] uppercase tracking-[0.2em] text-slate-800 mt-4 leading-relaxed">
                              Daughter of <br/> {brideFatherName} & {brideMotherName}
                            </p>
                          )}
                          {brideAddress && (
                            <p className="font-cinzel text-[10px] text-center uppercase tracking-[0.1em] text-slate-400 mt-4 max-w-[250px] mx-auto leading-relaxed break-words">
                              {brideAddress}
                            </p>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <p className="font-pinyon text-6xl text-slate-800">{brideName}</p>
                          {brideFatherName && brideMotherName && (
                            <p className="font-cinzel text-[10px] uppercase tracking-[0.2em] text-slate-800 mt-4 leading-relaxed">
                              Daughter of <br/> {brideFatherName} & {brideMotherName}
                            </p>
                          )}
                          {brideAddress && (
                            <p className="font-cinzel text-[10px] text-center uppercase tracking-[0.1em] text-slate-400 mt-4 max-w-[250px] mx-auto leading-relaxed break-words">
                              {brideAddress}
                            </p>
                          )}
                        </div>
                        <div className="text-slate-100 font-serif text-4xl italic text-center">with</div>
                        <div>
                          <p className="font-pinyon text-6xl text-slate-800 text-center">{groomName}</p>
                          {groomFatherName && groomMotherName && (
                            <p className="font-cinzel text-[10px] text-center uppercase tracking-[0.2em] text-slate-800 mt-4 leading-relaxed">
                              Son of <br/> {groomFatherName} & {groomMotherName}
                            </p>
                          )}
                          {groomAddress && (
                            <p className="font-cinzel text-[10px] text-center uppercase tracking-[0.1em] text-slate-400 mt-4 max-w-[250px] mx-auto leading-relaxed break-words">
                              {groomAddress}
                            </p>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
             </motion.div>

             {/* Housewarming Card */}
             <motion.div 
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={fadeUp}
               className="group relative bg-slate-900 p-16 rounded-[4rem] text-white shadow-2xl overflow-hidden"
             >
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32 transition-transform group-hover:scale-110 duration-700" />
                <div className="relative z-10 text-center">
                  <h3 className="font-cinzel text-xs tracking-[0.5em] text-slate-500 mb-16 uppercase">The Opening of Doors</h3>
                  <div className="space-y-8">
                     <p className="font-cinzel text-5xl md:text-7xl text-white drop-shadow-md">{houseName}</p>
                     <div className="w-12 h-px bg-white/20 mx-auto my-10" />
                     <p className="text-slate-400 font-cinzel leading-relaxed max-w-sm mx-auto text-lg italic">
                       {houseAddress || "Join us as we step into our new journey together."}
                     </p>
                  </div>
                </div>
             </motion.div>
          </div>
        </section>

        {/* Floating Details Banner */}
        <section className="py-20 md:py-40 px-6">
          <div className="max-w-5xl mx-auto">
             <motion.div 
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={fadeUp}
               className="grid grid-cols-1 md:grid-cols-3 gap-20 items-center text-center"
             >
                <div className="space-y-4">
                   <Calendar className="mx-auto text-slate-200" size={32} />
                   <p className="font-cinzel text-2xl text-slate-900 tracking-tighter">{formatDate(eventDate)}</p>
                   <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Mark the Date</p>
                </div>
                
                <div className="flex justify-center">
                   <div className="w-px h-24 bg-gradient-to-b from-transparent via-slate-200 to-transparent" />
                </div>

                <div className="space-y-4">
                   <Clock className="mx-auto text-slate-200" size={32} />
                   <p className="font-cinzel text-2xl text-slate-900 tracking-tighter">{formatTime(eventTime)}</p>
                   <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500">The Moment</p>
                </div>
             </motion.div>

             <motion.div 
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={fadeUp}
               className="mt-32 text-center space-y-10"
             >
                <MapPin className="mx-auto text-slate-200" size={40} />
                <h4 className="font-cinzel text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight max-w-2xl mx-auto">{locationName}</h4>
                {googleMapLink && (
                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={googleMapLink} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-block px-14 py-5 bg-slate-900 text-white rounded-2xl text-[11px] font-bold uppercase tracking-[0.4em] shadow-2xl transition-all"
                  >
                    Navigate to Venue
                  </motion.a>
                )}
             </motion.div>
          </div>
        </section>

        {/* Countdown - Extra Ordinary Style */}
        <section className="py-40 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-20 space-y-4">
              <h2 className="font-cinzel text-xs tracking-[0.6em] text-slate-300 uppercase">Counting Every Heartbeat</h2>
              <div className="w-12 h-px bg-slate-100 mx-auto" />
            </div>
            <Countdown dateString={eventDate} timeString={eventTime} theme="minimal" />
          </div>
        </section>

        {/* Final Statement */}
        <section className="py-20 md:py-60 px-6 text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="max-w-3xl mx-auto space-y-16"
          >
             <h2 className="font-pinyon text-7xl md:text-9xl text-slate-900 leading-tight">{sharingHappinessText}</h2>
             <p className="text-slate-400 text-lg md:text-xl font-light tracking-wide max-w-xl mx-auto leading-relaxed">
               Your presence is the most precious gift we could receive. Join us for an extraordinary day of love.
             </p>
             <button 
               onClick={() => setIsRSVPOpen(true)}
               className="group relative px-20 py-7 bg-slate-950 text-white rounded-[2rem] font-cinzel text-xs tracking-[0.5em] uppercase overflow-hidden shadow-2xl transition-all duration-500 hover:bg-white hover:text-slate-950 border border-slate-950"
             >
               <span className="relative z-10 transition-colors duration-500">Confirm Your Presence</span>
               <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
             </button>
          </motion.div>
        </section>

        {/* Extraordinary Footer */}
        <section className="py-20 md:py-40 text-center border-t border-slate-50 relative overflow-hidden">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-slate-200 to-transparent" />
           <div className="space-y-6 pt-10">
              <p className="font-cinzel text-[10px] tracking-[0.6em] text-slate-300 uppercase">Gratitude & Love</p>
              <p className="font-pinyon text-5xl text-slate-800">{withLove || "The Family"}</p>
           </div>
           
           <div className="mt-20 pb-10">
              <a 
                href="/" 
                className="font-cinzel text-[8px] tracking-[0.4em] text-slate-300 hover:text-slate-600 transition-colors flex items-center justify-center gap-2"
              >
                Created by Diginvite <Heart size={8} fill="currentColor" className="text-rose-400" />
              </a>
           </div>
        </section>
      </div>

    </div>
  );
}
