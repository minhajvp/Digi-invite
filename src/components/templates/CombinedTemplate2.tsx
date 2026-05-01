'use client';
import { useState } from 'react';
import { IInvitation } from '@/models/Invitation';
import { motion, useScroll, useTransform } from 'framer-motion';
import MusicPlayer from './MusicPlayer';
import RSVPModal from './RSVPModal';
import FloatingHearts from './FloatingHearts';
import Countdown from './Countdown';
import { MapPin, CalendarHeart, Home, Heart } from 'lucide-react';

interface Props {
  data: Partial<IInvitation>;
}

export default function CombinedTemplate2({ data }: Props) {
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

  const {
    eventSubHead = 'You are invited to celebrate',
    brideName = 'Bride',
    brideAddress = '',
    brideFatherName = '',
    brideMotherName = '',
    groomName = 'Groom',
    groomAddress = '',
    groomFatherName = '',
    groomMotherName = '',
    houseName = 'Our New Home',
    houseAddress = '',
    familyAddress = '',
    eventDate = '2027-12-15',
    eventTime = '10:00 AM',
    locationName = 'Location',
    googleMapLink = '',
    eventDescription = 'Description',
    sharingHappinessText = 'Sharing our happiness',
    withLove = '',
    musicUrl = '',
    coverImage = '',
  } = data;

  const [isRSVPOpen, setIsRSVPOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const yHeroText = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacityHeroText = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const yHeroImage = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const fadeUp: any = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="min-h-screen bg-[#fcf9f6] text-slate-800 font-sans flex flex-col items-center relative overflow-x-hidden">
      
      {/* 3D Floating Hearts */}
      <FloatingHearts count={20} colors={['#ffb3c6', '#ffcbf2', '#fde2e4', '#fad2e1']} />

      <MusicPlayer url={musicUrl || "/wedding_nasheed.mp3"} brideName={brideName} groomName={groomName} primarySide={data.primarySide} />
      <RSVPModal isOpen={isRSVPOpen} onClose={() => setIsRSVPOpen(false)} invitationId={data._id?.toString()} />

      {/* Hero Section */}
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-10">
        {coverImage && (
          <motion.div 
            className="absolute -top-[20vh] -bottom-[20vh] left-0 right-0 z-0"
            style={{ y: yHeroImage }}
          >
            <div 
              className="w-full h-full object-cover"
              style={{ 
                backgroundImage: `url(${coverImage})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                filter: 'brightness(1.05) saturate(0.9)'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-[#fcf9f6] z-10" />
          </motion.div>
        )}
        
        <motion.div 
          style={{ y: yHeroText, opacity: opacityHeroText }}
          className="relative z-20 flex flex-col items-center text-center px-6 mt-1 md:mt-20"
        >
          <div className="flex justify-center gap-4 mb-8 opacity-60">
             <Heart className="text-rose-400" size={20} />
             <Home className="text-rose-400" size={20} />
          </div>
          <p className="font-cinzel text-xs md:text-sm tracking-[0.4em] uppercase text-rose-900/70 mb-12 md:mb-8">
            {eventSubHead}
          </p>
          
          <div className="flex flex-col items-center justify-center">
            <h1 className="font-pinyon text-7xl md:text-8xl lg:text-9xl text-rose-950 font-normal tracking-tight leading-none drop-shadow-sm">
              {data.primarySide === 'groom' ? groomName.split(' ')[0] : brideName.split(' ')[0]}
            </h1>
            <span className="font-cinzel text-2xl md:text-3xl text-rose-800/60 my-2 italic">
              &
            </span>
            <h1 className="font-pinyon text-7xl md:text-8xl lg:text-9xl text-rose-950 font-normal tracking-tight leading-none drop-shadow-sm">
              {data.primarySide === 'groom' ? brideName.split(' ')[0] : groomName.split(' ')[0]}
            </h1>
          </div>
          
          <div className="mt-8 px-6 py-2 bg-rose-900/5 backdrop-blur-sm border border-rose-900/10 rounded-full">
            <p className="font-cinzel text-[10px] tracking-[0.3em] uppercase text-rose-900/60">
              Wedding & Housewarming Ceremony
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-10 z-20 flex flex-col items-center text-rose-900/50"
        >
          <span className="font-cinzel text-[10px] tracking-widest uppercase mb-2">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-rose-900/50 to-transparent" />
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="z-10 w-full max-w-4xl px-6 py-12 md:py-24 flex flex-col items-center relative bg-[#fcf9f6]/80 backdrop-blur-md rounded-t-[4rem] shadow-[0_-20px_40px_rgba(0,0,0,0.03)] -mt-20">
        
        {/* Intro Message */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="text-center mb-12 md:mb-24 max-w-2xl"
        >
          <p className="font-serif text-lg leading-loose text-slate-600 italic">
            "Join us as we witness the union of two hearts and the opening of our new sanctuary. A double celebration of love and new beginnings."
          </p>
        </motion.div>

        {/* Wedding Details */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="text-center w-full max-w-2xl mx-auto mb-12 md:mb-24"
        >
          <div className="flex items-center justify-center gap-4 mb-10">
             <div className="w-10 h-[1px] bg-rose-200" />
             <Heart className="text-rose-300" size={24} />
             <div className="w-10 h-[1px] bg-rose-200" />
          </div>
          <h2 className="font-cinzel text-xl text-rose-900 mb-12 tracking-[0.3em] uppercase">
            The Wedding
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {data.primarySide === 'groom' ? (
              <>
                <div className="flex flex-col items-center text-center">
                  <h3 className="font-pinyon text-4xl sm:text-5xl md:text-6xl text-rose-800 mb-4 break-words w-full px-2 leading-tight">{groomName}</h3>
                  {groomFatherName && groomMotherName && (
                    <p className="font-cinzel text-sm tracking-wider text-slate-500 uppercase mb-2">
                      Son of<br/>{groomFatherName} & {groomMotherName}
                    </p>
                  )}
                  {groomAddress && <p className="font-cinzel text-xs text-slate-400 mt-4 leading-relaxed break-words max-w-[250px] mx-auto uppercase tracking-wider">{groomAddress}</p>}
                </div>
                <div className="flex flex-col items-center text-center mt-12 md:mt-0">
                  <h3 className="font-pinyon text-4xl sm:text-5xl md:text-6xl text-rose-800 mb-4 break-words w-full px-2 leading-tight">{brideName}</h3>
                  {brideFatherName && brideMotherName && (
                    <p className="font-cinzel text-sm tracking-wider text-slate-500 uppercase mb-2">
                      Daughter of<br/>{brideFatherName} & {brideMotherName}
                    </p>
                  )}
                  {brideAddress && <p className="font-cinzel text-xs text-slate-400 mt-4 leading-relaxed break-words max-w-[250px] mx-auto uppercase tracking-wider">{brideAddress}</p>}
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center text-center">
                  <h3 className="font-pinyon text-4xl sm:text-5xl md:text-6xl text-rose-800 mb-4 break-words w-full px-2 leading-tight">{brideName}</h3>
                  {brideFatherName && brideMotherName && (
                    <p className="font-cinzel text-sm tracking-wider text-slate-500 uppercase mb-2">
                      Daughter of<br/>{brideFatherName} & {brideMotherName}
                    </p>
                  )}
                  {brideAddress && <p className="font-cinzel text-xs text-slate-400 mt-4 leading-relaxed break-words max-w-[250px] mx-auto uppercase tracking-wider">{brideAddress}</p>}
                </div>
                <div className="flex flex-col items-center text-center mt-12 md:mt-0">
                  <h3 className="font-pinyon text-4xl sm:text-5xl md:text-6xl text-rose-800 mb-4 break-words w-full px-2 leading-tight">{groomName}</h3>
                  {groomFatherName && groomMotherName && (
                    <p className="font-cinzel text-sm tracking-wider text-slate-500 uppercase mb-2">
                      Son of<br/>{groomFatherName} & {groomMotherName}
                    </p>
                  )}
                  {groomAddress && <p className="font-cinzel text-xs text-slate-400 mt-4 leading-relaxed break-words max-w-[250px] mx-auto uppercase tracking-wider">{groomAddress}</p>}
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Housewarming Details */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="text-center w-full max-w-2xl mx-auto mb-12 md:mb-24 p-10 bg-rose-900/5 rounded-[3rem] border border-rose-900/10"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
             <div className="w-8 h-[1px] bg-rose-200" />
             <Home className="text-rose-300" size={24} />
             <div className="w-8 h-[1px] bg-rose-200" />
          </div>
          <h2 className="font-cinzel text-lg text-rose-900 mb-8 tracking-[0.3em] uppercase">
            The New Home
          </h2>
          <h3 className="font-pinyon text-5xl md:text-7xl text-rose-800 drop-shadow-sm">
            {houseName}
          </h3>
          {houseAddress && (
            <p className="text-sm font-cinzel text-slate-500 max-w-sm mx-auto leading-relaxed">
              {houseAddress}
            </p>
          )}
        </motion.div>

        {/* Story Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="text-center mb-12 md:mb-24 max-w-2xl"
        >
          <CalendarHeart className="w-8 h-8 text-rose-300 mx-auto mb-6" strokeWidth={1} />
          <p className="font-serif text-lg leading-loose text-slate-600 italic">
            "{eventDescription}"
          </p>
        </motion.div>

        {/* Event Details Card */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="w-full max-w-xl bg-white p-12 rounded-[2rem] shadow-xl shadow-rose-100/50 border border-rose-50 relative overflow-hidden mb-12 md:mb-24"
        >
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-rose-200 rounded-tl-[2rem] m-2"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-rose-200 rounded-br-[2rem] m-2"></div>

          <div className="text-center relative z-10">
            <h2 className="font-cinzel text-2xl text-rose-900 mb-10 tracking-widest uppercase">
              When & Where
            </h2>
            
            <div className="mb-8">
              <p className="font-cinzel text-sm text-rose-400 tracking-[0.2em] uppercase mb-2">Date</p>
              <p className="font-cinzel text-2xl text-slate-800">{formatDate(eventDate)}</p>
              <p className="font-cinzel text-slate-500 mt-1">{formatTime(eventTime)}</p>
            </div>
            
            <div className="w-12 h-[1px] bg-rose-200 mx-auto my-8"></div>
            
            <div className="mb-10">
              <p className="font-cinzel text-sm text-rose-400 tracking-[0.2em] uppercase mb-2">Venue</p>
              <p className="font-cinzel text-lg text-slate-800 leading-relaxed max-w-[250px] mx-auto">{locationName}</p>
            </div>

            {googleMapLink && (
              <a 
                href={googleMapLink} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-cinzel uppercase tracking-widest text-rose-700 bg-rose-50 hover:bg-rose-100 px-8 py-4 rounded-full transition-colors border border-rose-100"
              >
                <MapPin size={16} /> Get Directions
              </a>
            )}
          </div>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="mb-12 md:mb-24 w-full"
        >
          <div className="bg-rose-900/5 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-sm border border-rose-900/10 shadow-lg shadow-rose-100/50">
            <p className="font-cinzel text-center text-rose-800 tracking-[0.3em] uppercase text-xs mb-8">The Countdown Begins</p>
            <Countdown dateString={eventDate} timeString={eventTime} theme="pastel" />
          </div>
        </motion.div>

        {/* Footer / RSVP */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="text-center w-full max-w-lg mx-auto"
        >
          <h2 className="font-pinyon text-5xl md:text-6xl text-rose-900 mb-6">
            {sharingHappinessText}
          </h2>

          <button 
            onClick={() => setIsRSVPOpen(true)}
            className="mt-8 mb-16 bg-rose-900 hover:bg-rose-800 text-white px-14 py-5 rounded-full font-cinzel tracking-[0.2em] uppercase text-sm transition-all shadow-xl shadow-rose-900/20 hover:-translate-y-1 hover:shadow-rose-900/30"
          >
            Confirm Your Presence
          </button>

          {familyAddress && (
             <p className="text-sm font-cinzel text-slate-400 mb-12 max-w-xs mx-auto italic">{familyAddress}</p>
          )}

          {withLove && (
            <div className="border-t border-rose-900/10 pt-12">
              <p className="font-cinzel text-xs uppercase tracking-[0.4em] text-rose-400 mb-4">With Love</p>
              <p className="font-pinyon text-3xl text-rose-800">{withLove}</p>
            </div>
          )}
        </motion.div>

        <div className="py-10 flex flex-col items-center justify-center gap-2 opacity-40">
          <a href="/" className="text-[10px] tracking-widest uppercase hover:text-rose-600 transition-colors flex items-center gap-2">
            Created by Diginvite <Heart size={10} fill="currentColor" />
          </a>
        </div>
      </div>
    </div>
  );
}
