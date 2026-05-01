'use client';
import { useState } from 'react';
import { IInvitation } from '@/models/Invitation';
import { motion } from 'framer-motion';
import MusicPlayer from './MusicPlayer';
import RSVPModal from './RSVPModal';
import FloatingRings from './FloatingRings';
import Countdown from './Countdown';
import { Heart, MapPin } from 'lucide-react';

interface Props {
  data: Partial<IInvitation>;
}

export default function WeddingTemplate1({ data }: Props) {
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
    eventSubHead = 'Together with their families',
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

  const scrollFade: any = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: 'easeOut' } }
  };

  const scaleUp: any = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.5, ease: 'easeOut' } }
  };

  const [isRSVPOpen, setIsRSVPOpen] = useState(false);

  return (
    <div className="min-h-full bg-zinc-950 text-amber-50 font-serif flex flex-col items-center py-10 md:py-20 relative overflow-hidden">
      
      {/* Blended Background Image */}
      {coverImage && (
        <div 
          className="absolute top-0 left-0 w-full h-[70vh] z-0 opacity-30 mix-blend-screen pointer-events-none transition-all duration-1000"
          style={{ 
            backgroundImage: `url(${coverImage})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center top',
            WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)'
          }}
        />
      )}

      {/* 3D Floating Rings Background */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <FloatingRings />
      </div>

      <MusicPlayer url={musicUrl || "/wedding_nasheed.mp3"} brideName={brideName} groomName={groomName} primarySide={data.primarySide} />
      <RSVPModal isOpen={isRSVPOpen} onClose={() => setIsRSVPOpen(false)} invitationId={data._id?.toString()} />

      {/* Content Container */}
      <div className="z-10 w-full px-6 flex flex-col items-center relative mt-10 md:mt-20">

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={scrollFade}
          className="text-center w-full"
        >
          <p className="text-amber-500 tracking-[0.3em] uppercase text-xs font-sans mb-8 md:mb-16">
            {eventSubHead}
          </p>

          {data.primarySide === 'groom' ? (
            <>
              {/* Groom Details */}
              <motion.div variants={scrollFade} className="mb-8 md:mb-16">
                <h1 className="font-pinyon text-7xl sm:text-6xl md:text-7xl text-amber-400 mb-4 drop-shadow-md break-words w-full px-4 leading-tight">
                  {groomName}
                </h1>
                <p className="text-sm text-zinc-400 font-sans tracking-widest uppercase mb-2">S/O</p>
                {groomFatherName && groomMotherName && <p className="text-base font-light text-zinc-200">{groomFatherName} & {groomMotherName}</p>}
                {groomAddress && <p className="text-sm font-light text-zinc-400 mt-2 max-w-xs mx-auto">{groomAddress}</p>}
              </motion.div>

              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.5 }}
                className="text-3xl text-amber-500 my-6 md:my-12 font-light flex items-center justify-center gap-6"
              >
                <span className="w-16 h-px bg-gradient-to-r from-transparent to-amber-500/50 block"></span>
                &
                <span className="w-16 h-px bg-gradient-to-l from-transparent to-amber-500/50 block"></span>
              </motion.div>

              {/* Bride Details */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={scrollFade}
                className="mb-8 md:mb-16"
              >
                <h1 className="font-pinyon text-7xl sm:text-6xl md:text-7xl text-amber-400 mb-4 drop-shadow-md break-words w-full px-4 leading-tight">
                  {brideName}
                </h1>
                <p className="text-sm text-zinc-400 font-sans tracking-widest uppercase mb-2">D/O</p>
                {brideFatherName && brideMotherName && <p className="text-base font-light text-zinc-200">{brideFatherName} & {brideMotherName}</p>}
                {brideAddress && <p className="text-sm font-light text-zinc-400 mt-2 max-w-xs mx-auto">{brideAddress}</p>}
              </motion.div>
            </>
          ) : (
            <>
              {/* Bride Details */}
              <motion.div variants={scrollFade} className="mb-8 md:mb-16">
                <h1 className="font-pinyon text-7xl sm:text-6xl md:text-7xl text-amber-400 mb-4 drop-shadow-md break-words w-full px-4 leading-tight">
                  {brideName}
                </h1>
                <p className="text-sm text-zinc-400 font-sans tracking-widest uppercase mb-2">D/O</p>
                {brideFatherName && brideMotherName && <p className="text-base font-light text-zinc-200">{brideFatherName} & {brideMotherName}</p>}
                {brideAddress && <p className="text-sm font-light text-zinc-400 mt-2 max-w-xs mx-auto">{brideAddress}</p>}
              </motion.div>

              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.5 }}
                className="text-3xl text-amber-500 my-6 md:my-12 font-light flex items-center justify-center gap-6"
              >
                <span className="w-16 h-px bg-gradient-to-r from-transparent to-amber-500/50 block"></span>
                &
                <span className="w-16 h-px bg-gradient-to-l from-transparent to-amber-500/50 block"></span>
              </motion.div>

              {/* Groom Details */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={scrollFade}
                className="mb-8 md:mb-16"
              >
                <h1 className="font-pinyon text-7xl sm:text-6xl md:text-7xl text-amber-400 mb-4 drop-shadow-md break-words w-full px-4 leading-tight">
                  {groomName}
                </h1>
                <p className="text-sm text-zinc-400 font-sans tracking-widest uppercase mb-2">S/O</p>
                {groomFatherName && groomMotherName && <p className="text-base font-light text-zinc-200">{groomFatherName} & {groomMotherName}</p>}
                {groomAddress && <p className="text-sm font-light text-zinc-400 mt-2 max-w-xs mx-auto">{groomAddress}</p>}
              </motion.div>
            </>
          )}

          {familyAddress && (
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1 }}
              className="text-sm font-light text-zinc-400 mt-8 mb-10 max-w-sm mx-auto border-t border-b border-amber-900/30 py-4"
            >
              {familyAddress}
            </motion.p>
          )}

          <motion.p 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={scrollFade}
            className="text-zinc-300 font-sans font-light leading-relaxed mb-10 max-w-md mx-auto text-sm md:text-base px-4"
          >
            {eventDescription}
          </motion.p>

          {/* Countdown Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={scaleUp}
            className="my-16"
          >
            <h3 className="text-amber-500 tracking-[0.2em] uppercase text-xs font-sans mb-6">Countdown to the Big Day</h3>
            <Countdown dateString={eventDate} timeString={eventTime} />
          </motion.div>

          {/* Event Venue */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={scrollFade}
            className="bg-zinc-900/50 border border-amber-900/30 p-10 rounded-2xl backdrop-blur-sm max-w-md mx-auto w-full mb-8 md:mb-16 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-600/10 rounded-bl-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-600/10 rounded-tr-full blur-2xl"></div>
            
            <div className="relative z-10">
              <p className="text-amber-400 uppercase tracking-widest text-xs font-sans mb-3">When</p>
              <p className="text-2xl mb-1">{formatDate(eventDate)}</p>
              <p className="text-base text-zinc-400 mb-10">{formatTime(eventTime)}</p>
              
              <p className="text-amber-400 uppercase tracking-widest text-xs font-sans mb-3">Where</p>
              <p className="text-xl mb-8">{locationName}</p>

              {googleMapLink && (
                <a 
                  href={googleMapLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center justify-center w-full gap-2 text-sm text-zinc-950 bg-amber-500 hover:bg-amber-400 px-6 py-4 rounded-xl font-sans uppercase tracking-widest font-bold transition-all shadow-lg hover:shadow-amber-500/50"
                >
                  <MapPin size={18} /> Open in Google Maps
                </a>
              )}
            </div>
          </motion.div>

          {/* Sharing Happiness & With Love */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={scrollFade}
            className="mb-8 md:mb-16"
          >
            <p className="font-pinyon text-4xl text-amber-500 mb-8 px-4 leading-relaxed">
              {sharingHappinessText}
            </p>

            {withLove && (
              <div className="mt-16">
                <p className="text-xs font-sans uppercase tracking-[0.3em] text-amber-600 mb-4">With Love</p>
                <p className="font-serif text-xl text-zinc-300">{withLove}</p>
              </div>
            )}
          </motion.div>

          {/* RSVP Button */}
          <motion.button 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onClick={() => setIsRSVPOpen(true)}
            className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-zinc-950 px-12 py-5 rounded-full font-sans tracking-[0.2em] uppercase text-sm font-bold transition-all shadow-[0_0_30px_rgba(217,119,6,0.4)] hover:shadow-[0_0_50px_rgba(217,119,6,0.6)] hover:-translate-y-1 mb-10 md:mb-20"
          >
            RSVP Now
          </motion.button>
          
          <div className="pb-10 flex flex-col items-center justify-center gap-2 opacity-40">
            <a href="/" className="text-[10px] tracking-widest uppercase hover:text-amber-500 transition-colors flex items-center gap-2">
              Created by Diginvite <Heart size={10} fill="currentColor" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
