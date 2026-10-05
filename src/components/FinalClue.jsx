import React, { useState, useEffect } from 'react';
import { friendshipData } from '../data/friendshipData';
import { soundFx } from '../utils/soundEffects';
import { ArrowRight } from 'lucide-react';

export default function FinalClue({ onNext }) {
  const [step, setStep] = useState(0);
  const data = friendshipData.finalClue;

  useEffect(() => {
    const t1 = setTimeout(() => {
      setStep(1); // "You found everything."
      soundFx.playPencilStroke();
    }, 600);

    const t2 = setTimeout(() => {
      setStep(2); // "But there is one thing left."
      soundFx.playPencilStroke();
    }, 2000);

    const t3 = setTimeout(() => {
      setStep(3); // 25 / 09 / 2023
      soundFx.playUnlock();
    }, 3600);

    const t4 = setTimeout(() => {
      setStep(4); // "Every story has a beginning..."
      soundFx.playPencilStroke();
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
    <section className="min-h-screen py-24 px-4 max-w-3xl mx-auto flex flex-col items-center justify-center text-center relative">
      
      {/* Editorial Chapter Tag */}
      <div className="font-mono text-xs text-sepiaTone font-bold tracking-[0.3em] uppercase mb-6">
        {data.chapter} // {data.title}
      </div>

      {/* Sequential Reveal */}
      <div className="space-y-4 mb-8 min-h-[90px]">
        {step >= 1 && (
          <p className="font-serif text-2xl sm:text-3xl text-charcoal/60 italic animate-fade-in">
            "{data.line1}"
          </p>
        )}
        {step >= 2 && (
          <p className="font-editorial text-3xl sm:text-4xl text-charcoal font-semibold uppercase animate-fade-in">
            {data.line2}
          </p>
        )}
      </div>

      {/* Date Display with pencil line */}
      {step >= 3 && (
        <div className="my-6 space-y-4 animate-fade-in">
          <div className="flex items-center justify-center gap-6 sm:gap-10 font-editorial text-4xl sm:text-6xl text-charcoal tracking-widest font-bold">
            <span className="p-2 border-b-2 border-charcoal/20">25</span>
            <span className="text-accentGold text-2xl sm:text-4xl font-mono">•</span>
            <span className="p-2 border-b-2 border-charcoal/20">09</span>
            <span className="text-accentGold text-2xl sm:text-4xl font-mono">•</span>
            <span className="p-2 border-b-2 border-charcoal/20">2023</span>
          </div>

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

      {/* Emotional Bridge & CTA */}
      {step >= 4 && (
        <div className="space-y-6 animate-fade-in max-w-xl">
          <div className="space-y-2 font-serif text-xl sm:text-2xl text-charcoal/90 italic leading-relaxed">
            <p>"{data.line3}"</p>
            <p>"{data.line4}"</p>
            <p className="font-bold text-charcoal font-editorial not-italic uppercase tracking-wide">
              {data.line5}
            </p>
          </div>

          <div className="pt-6">
            <button
              onClick={handleReveal}
              className="px-10 py-4 bg-charcoal text-paper-50 rounded-none font-mono text-xs sm:text-sm tracking-[0.25em] uppercase flex items-center gap-3 mx-auto shadow-paper-deep hover:bg-charcoal-deep transition-all cursor-pointer group hover:scale-105"
            >
              <span>REVEAL THE ARTWORK</span>
              <ArrowRight className="w-4 h-4 text-accentGold group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
