'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart, Music, MessageSquare, MapPin, Sparkles, ChevronRight, CheckCircle2, Camera, ExternalLink, Phone } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
              <Heart size={20} fill="currentColor" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-rose-500 bg-clip-text text-transparent">
              Diginvite
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#templates" className="hover:text-indigo-600 transition-colors">Templates</a>
            <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
            <a href="https://wa.me/918714123703" target="_blank" rel="noreferrer" className="px-6 py-2.5 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
              Contact Us
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-rose-50 to-transparent -z-10" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50 -z-10" />
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-widest mb-8">
              <Sparkles size={14} /> The Future of Event Invitations
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8 text-slate-900">
              Create Magical <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-rose-500">Digital</span> Invitations.
            </h1>
            <p className="text-lg md:text-xl text-slate-500 leading-relaxed mb-10 max-w-lg">
              Impress your guests with stunning 3D animations, music, and seamless RSVP tracking. All in one beautiful digital experience by <span className="font-bold text-indigo-600">Diginvite</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://wa.me/918714123703" target="_blank" rel="noreferrer" className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-2 group">
                Get Your Invitation <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#templates" className="px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center">
                Explore Templates
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-200 border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1000" 
                alt="Premium Wedding"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8 text-white">
                <p className="font-serif text-3xl mb-2">Meera & Arjun</p>
                <p className="text-sm uppercase tracking-widest opacity-80">Royal Gold Template</p>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-rose-500 rounded-3xl -z-10 rotate-12" />
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-600 rounded-full blur-2xl opacity-20 -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Exquisite Templates</h2>
            <p className="text-slate-500 text-lg">Choose from our curated collection of premium designs, including Wedding, Housewarming, and Combined invitations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { id: 'wedding-1', name: 'Royal Gold', theme: 'Wedding Classic', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600' },
              { id: 'housewarming-1', name: 'Modern Stone', theme: 'Housewarming Minimal', img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=600' },
              { id: 'combined-3', name: 'White Elegance', theme: 'Combined Celebration', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=600' },
            ].map((tmpl, i) => (
              <motion.div
                key={tmpl.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img src={tmpl.img} alt={tmpl.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-2">{tmpl.name}</h3>
                  <p className="text-sm text-slate-500 mb-6">{tmpl.theme}</p>
                  <a href="https://wa.me/918714123703" target="_blank" rel="noreferrer" className="text-indigo-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                    Order Now <ChevronRight size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-10 leading-tight">Everything You Need for a <span className="text-indigo-600">Perfect</span> Invitation.</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { icon: <Music className="text-rose-500" />, title: 'Music Support', desc: 'Background audio for atmosphere.' },
                  { icon: <Sparkles className="text-amber-500" />, title: '3D Animations', desc: 'Crystals, petals, and floating hearts.' },
                  { icon: <MessageSquare className="text-indigo-500" />, title: 'RSVP Tracking', desc: 'Manage your guest list easily.' },
                  { icon: <MapPin className="text-emerald-500" />, title: 'Google Maps', desc: 'One-click directions for guests.' },
                ].map((feat, i) => (
                  <div key={i} className="space-y-3">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center shadow-sm">
                      {feat.icon}
                    </div>
                    <h4 className="font-bold">{feat.title}</h4>
                    <p className="text-sm text-slate-500">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 blur-3xl" />
              <h3 className="text-3xl font-serif mb-8">Premium Invitations</h3>
              <ul className="space-y-6">
                {[
                  'Eco-friendly & Cost Effective',
                  'Instant Updates & Corrections',
                  'Interactive 3D Experience',
                  'Mobile-First Responsive Design',
                  'Zero Delivery Delays'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <CheckCircle2 size={20} className="text-emerald-400" />
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-12 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <p className="text-sm italic text-slate-400">"The easiest way to invite our friends across the globe. Everyone was amazed by the crystal constellation animations!"</p>
                <p className="mt-4 text-xs font-bold uppercase tracking-widest">— Sarah & Michael</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-r from-indigo-600 to-rose-500 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-indigo-100">
             <motion.div
               animate={{ scale: [1, 1.05, 1] }}
               transition={{ repeat: Infinity, duration: 4 }}
               className="absolute top-10 right-10 opacity-20"
             >
               <Heart size={120} fill="currentColor" />
             </motion.div>
             <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to Share Your Joy?</h2>
             <p className="text-lg md:text-xl mb-12 opacity-90 max-w-2xl mx-auto">
               Join thousands of couples who have created beautiful digital memories with <span className="font-bold">Diginvite</span>.
             </p>
             <a href="https://wa.me/918714123703" target="_blank" rel="noreferrer" className="px-10 py-5 bg-white text-indigo-600 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all shadow-xl inline-block">
               Contact to Order Now
             </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                 <Heart size={16} fill="currentColor" />
               </div>
               <span className="text-xl font-bold tracking-tight">Diginvite</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Premium digital invitations crafted with love and technology to make your special moments unforgettable.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400">Connect With Us</h4>
            <div className="flex flex-col gap-4 text-slate-600">
               <a href="https://wa.me/918714123703" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-indigo-600 transition-colors">
                  <Phone size={18} /> +91 8714123703
               </a>
               <a href="https://www.instagram.com/we.unlocked?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-indigo-600 transition-colors">
                  <Camera size={18} /> @we.unlocked
               </a>
               <a href="https://www.linkedin.com/company/weunlocked" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-indigo-600 transition-colors">
                  <ExternalLink size={18} /> Diginvite
               </a>
            </div>
          </div>

          <div className="space-y-6 md:text-right">
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400">Made With Love</h4>
            <p className="text-slate-500 text-sm italic">"Bringing your celebrations to life digitally."</p>
            <p className="text-xs text-slate-400 font-medium">© 2024 Diginvite. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
