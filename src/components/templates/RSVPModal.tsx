'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  invitationId?: string;
}

export default function RSVPModal({ isOpen, onClose, invitationId }: Props) {
  const [name, setName] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const [attending, setAttending] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!invitationId) {
      console.error('No invitation ID provided');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invitationId,
          name,
          attending,
          guestCount
        })
      });

      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          onClose();
          setSubmitted(false);
          setName('');
          setGuestCount(1);
          setAttending(null);
        }, 3000);
      }
    } catch (err) {
      console.error('Submission failed', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-zinc-900 border border-amber-900/50 rounded-2xl p-6 md:p-8 shadow-2xl font-sans"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-amber-400">
              <X size={24} />
            </button>

            {submitted ? (
              <div className="text-center py-10">
                <h2 className="text-3xl font-serif text-amber-400 mb-4">Thank You!</h2>
                <p className="text-zinc-300">Your Confirmation has been saved. We can't wait to see you.</p>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-serif text-amber-400 mb-6 text-center">Confirm</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm uppercase tracking-widest text-zinc-400 mb-2">Name</label>
                    <input 
                      required
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-amber-50 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm uppercase tracking-widest text-zinc-400 mb-2">Will you attend?</label>
                    <div className="flex gap-4">
                      <button 
                        type="button"
                        onClick={() => setAttending(true)}
                        className={`flex-1 py-3 rounded-lg border transition-all ${attending === true ? 'bg-amber-600 border-amber-500 text-zinc-950 font-semibold' : 'border-zinc-700 text-zinc-400 hover:border-amber-900'}`}
                      >
                        Joyfully Accept
                      </button>
                      <button 
                        type="button"
                        onClick={() => setAttending(false)}
                        className={`flex-1 py-3 rounded-lg border transition-all ${attending === false ? 'bg-zinc-800 border-zinc-600 text-white' : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'}`}
                      >
                        Regretfully Decline
                      </button>
                    </div>
                  </div>

                  {attending && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                      <label className="block text-sm uppercase tracking-widest text-zinc-400 mb-2">Number of Guests</label>
                      <input 
                        type="number" 
                        min="1"
                        max="10"
                        value={guestCount}
                        onChange={(e) => setGuestCount(parseInt(e.target.value))}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-amber-50 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                      />
                    </motion.div>
                  )}

                  <button 
                    disabled={attending === null || isSubmitting}
                    type="submit" 
                    className="w-full bg-amber-600 hover:bg-amber-500 text-zinc-950 py-4 rounded-lg font-bold tracking-widest uppercase text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? 'Submitting...' : 'Confirm Presence'}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
