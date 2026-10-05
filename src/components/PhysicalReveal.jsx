import React, { useState, useEffect } from 'react';
import { friendshipData } from '../data/friendshipData';
import { soundFx } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';

export default function PhysicalReveal({ onNext }) {
  const [phase, setPhase] = useState(0); // 0: pause1, 1: pause2, 2: pause3, 3: LOOK BEHIND YOU
  const data = friendshipData.physicalReveal;

  useEffect(() => {
    const t1 = setTimeout(() => {
      setPhase(1);
      soundFx.playPencilStroke();
    }, 1200);

    const t2 = setTimeout(() => {
      setPhase(2);
      soundFx.playPencilStroke();
    }, 2800);

    const t3 = setTimeout(() => {
      setPhase(3);
      soundFx.playUnlock();
    }, 4200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleProceed = () => {
    soundFx.playUnlock();
    soundFx.playChime();
    
    try {
      confetti({
        particleCount: 110,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#C47C68', '#C5A059', '#E8C5B8', '#FAF0E8']
      });
    } catch {
      // safe fallback
    }

    onNext();
  };

  return (
    <section className="min-h-[85vh] py-12 px-4 max-w-3xl mx-auto flex flex-col items-center justify-center text-center relative">
      
      {/* Narrative Pause Sequence */}
      <div className="space-y-8 animate-fade-in w-full">
        
        <div className="min-h-[140px] flex flex-col items-center justify-center space-y-4">
          {phase >= 0 && (
            <p className="font-serif text-2xl sm:text-3xl text-[#2A2421]/75 italic animate-fade-in">
              "{data.pause1}"
            </p>
          )}

          {phase >= 1 && (
            <p className="font-serif text-2xl sm:text-3xl text-[#2A2421] font-medium animate-fade-in">
              "{data.pause2}"
            </p>
          )}

          {phase >= 2 && (
            <p className="font-editorial text-3xl sm:text-4xl text-[#C47C68] font-semibold animate-fade-in uppercase tracking-wider">
              {data.pause3}
            </p>
          )}
        </div>

        {phase >= 3 && (
          <div className="space-y-8 pt-4 animate-fade-in">
            <div className="p-8 sm:p-14 luxury-content-card sketch-border shadow-2xl relative rounded-2xl">
              <div className="tape-top" />
              
              <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl text-[#2A2421] font-bold tracking-tight mb-4 uppercase">
                {data.headline} 🌸
              </h1>
              
              <p className="font-serif text-xl sm:text-2xl text-[#C47C68] italic font-medium">
                Your real hand-drawn portrait is waiting for you in the physical world!
              </p>
            </div>

            <button
              onClick={handleProceed}
              className="px-12 py-4 bg-[#D8B878] text-[#1D0B16] font-bold rounded-full font-mono text-sm sm:text-base uppercase tracking-[0.25em] flex items-center gap-3 mx-auto shadow-lg hover:bg-[#EBD096] transition-all cursor-pointer group hover:scale-105"
            >
              <span>{data.cta}</span>
              <ArrowRight className="w-5 h-5 text-[#1D0B16] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

      </div>

    </section>
  );
}
