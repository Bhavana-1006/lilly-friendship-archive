import React, { useState, useEffect } from 'react';
import { friendshipConfig } from '../config/friendshipConfig';
import { soundFx } from '../utils/soundEffects';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Stage8FinalClue({ onNext }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Stage sequence timer
    const t1 = setTimeout(() => {
      setStep(1); // "That's everything."
      soundFx.playPencilStroke();
    }, 600);

    const t2 = setTimeout(() => {
      setStep(2); // "Except one thing."
      soundFx.playPencilStroke();
    }, 2000);

    const t3 = setTimeout(() => {
      setStep(3); // 25 / 09 / 2023
      soundFx.playUnlock();
    }, 3600);

    const t4 = setTimeout(() => {
      setStep(4); // "Some memories are better when you can hold them."
    }, 5200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleReveal = () => {
    soundFx.playClick();
    soundFx.playUnlock();
    onNext();
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center max-w-2xl mx-auto relative">
      
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_at_center,rgba(154,120,70,0.12)_0%,transparent_65%)]" />

      {/* Step 1 & 2: Quiet Text */}
      <div className="space-y-4 mb-10 min-h-[90px]">
        {step >= 1 && (
          <p className="font-serif text-2xl sm:text-3xl text-charcoal/60 italic animate-fade-in">
            "That's everything."
          </p>
        )}
        {step >= 2 && (
          <p className="font-serif text-3xl sm:text-4xl text-charcoal font-semibold animate-fade-in">
            "Except one thing."
          </p>
        )}
      </div>

      {/* Step 3: 25 09 2023 Display with animated pencil stroke */}
      {step >= 3 && (
        <div className="my-6 space-y-4 animate-fade-in">
          <div className="flex items-center justify-center gap-6 sm:gap-10 font-editorial text-4xl sm:text-6xl text-charcoal tracking-widest font-bold">
            <span className="p-2 border-b-2 border-charcoal/20">25</span>
            <span className="text-accentGold text-2xl sm:text-4xl font-mono">•</span>
            <span className="p-2 border-b-2 border-charcoal/20">09</span>
            <span className="text-accentGold text-2xl sm:text-4xl font-mono">•</span>
            <span className="p-2 border-b-2 border-charcoal/20">2023</span>
          </div>

          <p className="font-mono text-xs text-sepiaTone tracking-widest uppercase">
            THE DATE THIS ALL STARTED.
          </p>

          {/* Animated Pencil Stroke across the screen */}
          <div className="py-4 flex justify-center">
            <svg className="w-72 sm:w-96 h-4 pointer-events-none" viewBox="0 0 380 16" fill="none">
              <path 
                d="M4 12C90 3 270 14 376 6" 
                stroke="#262422" 
                strokeWidth="2" 
                strokeLinecap="round" 
                className="pencil-draw-line" 
              />
            </svg>
          </div>
        </div>
      )}

      {/* Step 4: Final emotional bridge & Reveal CTA */}
      {step >= 4 && (
        <div className="space-y-8 animate-fade-in mt-4">
          <p className="font-serif text-xl sm:text-2xl text-charcoal font-medium italic max-w-lg leading-relaxed">
            "Some memories are better when you can hold them in your hands."
          </p>

          <div>
            <button
              onClick={handleReveal}
              className="px-10 py-4 bg-charcoal text-paper-50 rounded font-mono text-sm uppercase tracking-widest flex items-center gap-3 mx-auto shadow-paper-deep hover:bg-charcoal-deep transition-all cursor-pointer group hover:scale-105"
            >
              <span>REVEAL</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-accentGold" />
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
