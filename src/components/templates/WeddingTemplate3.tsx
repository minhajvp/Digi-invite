'use client';
import { useState } from 'react';
import { IInvitation } from '@/models/Invitation';
import { motion, useScroll, useTransform } from 'framer-motion';
import MusicPlayer from './MusicPlayer';
import RSVPModal from './RSVPModal';
import FloatingPetals from './FloatingPetals';
import Countdown from './Countdown';
import { MapPin,Heart} from 'lucide-react';

interface Props {
  data: Partial<IInvitation>;
}

export default function WeddingTemplate3({ data }: Props) {
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

  const {
    eventSubHead = 'Join us for a magical evening',
    brideName = 'Bride',
    brideAddress = '',
    brideFatherName = '',
    brideMotherName = '',
    groomName = 'Groom',
    groomAddress = '',
    groomFatherName = '',
    groomMotherName = '',
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
  const scaleHeroImage = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  
  const revealVariant: any = {
    hidden: { opacity: 0, filter: 'blur(10px)', y: 30 },
    visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 1.2, ease: 'easeOut' } }
  };

  return (
    <div className="min-h-screen bg-[#0a1a14] text-emerald-50 flex flex-col items-center relative overflow-hidden font-montserrat">
      
      {/* 3D Floating Petals/Leaves */}
      <FloatingPetals count={30} colors={['#059669', '#10b981', '#fbbf24', '#f59e0b']} />

      <MusicPlayer url={musicUrl || "/wedding_nasheed.mp3"} brideName={brideName} groomName={groomName} />
      <RSVPModal isOpen={isRSVPOpen} onClose={() => setIsRSVPOpen(false)} invitationId={data._id?.toString()} />

      {/* Hero Section */}
      <div className="relative w-full h-150 flex items-center justify-center  overflow-hidden">
        {coverImage && (
          <motion.div 
            className="absolute inset-0 z-0"
            style={{ scale: scaleHeroImage }}
          >
            <div 
              className="w-full h-full object-cover"
              style={{ 
                backgroundImage: `url(${coverImage})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                filter: 'brightness(0.6) contrast(1.1)'
              }}
            />
            {/* Dark Emerald Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a1a14_100%)] z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a14] via-transparent to-[#0a1a14]/50 z-10" />
          </motion.div>
        )}

        <motion.div 
          style={{ y: yHeroText }}
          className="relative z-20 flex flex-col items-center gap-6 text-center px-4 w-full max-w-5xl"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="border-y border-emerald-500/30 py-2 mb-2 md:mb-4 w-full max-w-xs mx-auto"
          >
            <p className="text-emerald-400 tracking-[0.2em] md:tracking-[0.3em] uppercase text-[10px] md:text-xs">
              {eventSubHead}
            </p>
          </motion.div>

          <h1 className="font-cormorant text-7xl sm:text-7xl md:text-9xl lg:text-10xl text-amber-300/90 font-medium mb-2 md:mb-4 drop-shadow-2xl break-words max-w-full px-2 leading-tight">
            {brideName.split(' ')[0]}
          </h1>
          <span className="font-cormorant text-2xl md:text-3xl text-emerald-500 italic my-1 md:my-2">
            &
          </span>
          <h1 className="font-cormorant text-7xl sm:text-7xl md:text-9xl lg:text-10xl text-amber-300/90 font-medium mt-2 md:mt-4 drop-shadow-2xl break-words max-w-full px-2 leading-tight">
            {groomName.split(' ')[0]}
          </h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-6 md:mt-12 flex items-center justify-center gap-4 text-emerald-100 w-full"
          >
            <div className="hidden sm:block w-12 h-px bg-emerald-500/50"></div>
            <p className="tracking-widest uppercase text-xs font-light truncate px-2">{eventDate}</p>
            <div className="hidden sm:block w-12 h-px bg-emerald-500/50"></div>
          </motion.div>
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="z-10 w-full px-0 flex flex-col items-center relative">
        
        {/* Story Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={revealVariant}
          className="max-w-2xl text-center mb-12 md:mb-32"
        >
          <div className="text-amber-500 text-4xl mb-6 font-serif">✧</div>
          <p className="font-cormorant text-2xl md:text-3xl text-emerald-100/90 leading-relaxed italic">
            "{eventDescription}"
          </p>
        </motion.div>

        {/* The Couple Details */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mb-12 md:mb-32 overflow-hidden px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="text-center pb-8 md:pb-0 flex flex-col items-center w-full"
          >
            <h2 className="font-pinyon text-5xl md:text-6xl text-amber-300 mb-6 font-normal tracking-wide break-words w-full px-2 leading-tight">{brideName}</h2>
            <div className="text-emerald-100/90 text-lg md:text-xl font-cormorant leading-relaxed w-full">
              {brideFatherName && brideMotherName && <p className="uppercase tracking-[0.2em] text-[10px] text-emerald-500/60 mb-2">Daughter of</p>}
              {brideFatherName && brideMotherName && <p className="text-2xl italic">{brideFatherName} & {brideMotherName}</p>}
              {brideAddress && <p className="mt-6 text-emerald-200/40 text-[11px] uppercase tracking-[0.2em] max-w-[280px] mx-auto leading-loose break-words">{brideAddress}</p>}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center pb-8 md:pb-0 flex flex-col items-center w-full"
          >
            <h2 className="font-pinyon text-5xl md:text-6xl text-amber-300 mb-6 font-normal tracking-wide break-words w-full px-2 leading-tight">{groomName}</h2>
            <div className="text-emerald-100/90 text-lg md:text-xl font-cormorant leading-relaxed w-full">
              {groomFatherName && groomMotherName && <p className="uppercase tracking-[0.2em] text-[10px] text-emerald-500/60 mb-2">Son of</p>}
              {groomFatherName && groomMotherName && <p className="text-2xl italic">{groomFatherName} & {groomMotherName}</p>}
              {groomAddress && <p className="mt-6 text-emerald-200/40 text-[11px] uppercase tracking-[0.2em] max-w-[280px] mx-auto leading-loose break-words">{groomAddress}</p>}
            </div>
          </motion.div>
        </div>

        {familyAddress && (
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariant}
            className="text-center text-emerald-500/60 text-sm max-w-md mx-auto mb-12 md:mb-32 border-y border-emerald-900/50 py-6"
          >
            {familyAddress}
          </motion.div>
        )}

        {/* The Event Details */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={revealVariant}
          className="w-full max-w-3xl relative mb-12 md:mb-32"
        >
          {/* Glassmorphism Card */}
          <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-md rounded-3xl border border-emerald-700/30 transform -skew-y-2"></div>
          
          <div className="relative p-12 md:p-16 text-center z-10 flex flex-col items-center">
            <h2 className="font-cormorant text-4xl text-amber-400 mb-12">The Celebration</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
              <div className="flex flex-col items-center">
                <p className="text-emerald-500 tracking-[0.2em] text-xs uppercase mb-4">When</p>
                <p className="font-cormorant text-2xl text-emerald-50 mb-2">{eventDate}</p>
                <p className="text-emerald-200/60 font-light">{formatTime(eventTime)}</p>
              </div>
              
              <div className="flex flex-col items-center">
                <p className="text-emerald-500 tracking-[0.2em] text-xs uppercase mb-4">Where</p>
                <p className="font-cormorant text-2xl text-emerald-50 mb-2 max-w-[200px] leading-tight">{locationName}</p>
              </div>
            </div>

            {googleMapLink && (
              <a 
                href={googleMapLink} 
                target="_blank" 
                rel="noreferrer"
                className="mt-12 inline-flex items-center gap-3 text-sm font-light uppercase tracking-widest text-amber-950 bg-amber-400 hover:bg-amber-300 px-8 py-4 rounded-none transition-all"
              >
                <MapPin size={16} /> View Map
              </a>
            )}
          </div>
        </motion.div>

        {/* Countdown */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariant}
          className="w-full max-w-4xl mb-12 md:mb-32"
        >
           <Countdown dateString={eventDate} timeString={eventTime} theme="emerald" />
        </motion.div>

        {/* RSVP & Footer */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={revealVariant}
          className="text-center mb-12 md:mb-32 flex flex-col items-center"
        >
          <h2 className="font-cormorant text-4xl md:text-5xl text-amber-400 mb-10 italic">
            {sharingHappinessText}
          </h2>

          <button 
            onClick={() => setIsRSVPOpen(true)}
            className="relative overflow-hidden group border border-amber-400/50 bg-transparent text-amber-400 px-16 py-5 uppercase tracking-[0.3em] text-xs transition-all hover:border-amber-400"
          >
            <span className="relative z-10 group-hover:text-amber-950 transition-colors duration-500">RSVP Online</span>
            <div className="absolute inset-0 h-full w-0 bg-amber-400 transition-all duration-500 ease-out group-hover:w-full z-0"></div>
          </button>

          {withLove && (
            <div className="mt-24 text-center">
              <div className="w-px h-16 bg-gradient-to-b from-emerald-500/50 to-transparent mx-auto mb-8"></div>
              <p className="font-cormorant text-2xl text-emerald-200/80">{withLove}</p>
            </div>
          )}
        </motion.div>

        <div className="py-10 flex flex-col items-center justify-center gap-2 opacity-40">
          <a href="/" className="text-[10px] tracking-widest uppercase hover:text-amber-500 transition-colors flex items-center gap-2">
            Created by Diginvite <Heart size={10} fill="currentColor" />
          </a>
        </div>
      </div>
    </div>
  );
}
