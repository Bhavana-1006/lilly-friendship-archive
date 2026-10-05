import React, { useState, useEffect } from 'react';
import { friendshipData } from '../data/friendshipData';
import { soundFx } from '../utils/soundEffects';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';

export default function CinematicIntro({ onNext }) {
  const [step, setStep] = useState(0);
  const content = friendshipData.intro;

  useEffect(() => {
    const t1 = setTimeout(() => {
      setStep(1); // "A STORY DEDICATED TO ONE EXTRAORDINARY PERSON."
      soundFx.playPencilStroke();
    }, 400);

    const t2 = setTimeout(() => {
      setStep(2); // "TWENTY-ONE YEARS OF SUNSHINE."
      soundFx.playPencilStroke();
    }, 1600);

    const t3 = setTimeout(() => {
      setStep(3); // "LILLY"
      soundFx.playUnlock();
    }, 3000);

    const t4 = setTimeout(() => {
      setStep(4); // "And a friendship that became my favorite chapter."
      soundFx.playChime();
    }, 4400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleSkip = () => {
    setStep(4);
  };

  const handleBegin = () => {
    soundFx.playClick();
    soundFx.playUnlock();
    onNext();
  };

  return (
    <section className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-20 text-center relative overflow-hidden">
      
      {/* Editorial Top Badge */}
      <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 bg-[#3A0D1E]/80 border border-[#D8B878]/40 rounded-full font-mono text-xs text-[#D8B878] tracking-widest uppercase shadow-md backdrop-blur-sm">
        <Sparkles className="w-3.5 h-3.5 text-[#D8B878]" />
        <span>{content.badge}</span>
      </div>

      {/* Narrative Sequence Box with Soft Readability Backdrop */}
      <div className="max-w-3xl w-full p-8 sm:p-12 rounded-2xl bg-[#1D0B16]/75 border border-[#D8B878]/30 backdrop-blur-md shadow-2xl space-y-6 min-h-[220px] flex flex-col items-center justify-center mb-8 relative">
        {step >= 1 && (
          <p className="font-editorial text-xl sm:text-3xl text-[#FFF8ED]/85 tracking-wider uppercase animate-fade-in">
            {content.line1}
          </p>
        )}

        {step >= 2 && (
          <p className="font-serif text-lg sm:text-2xl text-[#C9828F] italic animate-fade-in">
            "{content.line2}"
          </p>
        )}

        {step >= 3 && (
          <div className="py-2 animate-fade-in">
            <h1 className="font-editorial text-5xl sm:text-7xl md:text-8xl text-[#FFF8ED] font-bold tracking-widest uppercase border-y border-[#D8B878]/40 py-3 px-6 inline-block drop-shadow-md">
              {content.line3}
            </h1>
          </div>
        )}

        {step >= 4 && (
          <p className="font-serif text-lg sm:text-2xl text-[#D8B878] font-medium italic animate-fade-in max-w-xl leading-relaxed">
            "{content.line4}"
          </p>
        )}
      </div>

      {/* Button */}
      {step >= 4 ? (
        <div className="space-y-6 animate-fade-in max-w-md pt-2">
          <button
            onClick={handleBegin}
            className="px-10 py-4 bg-[#D8B878] text-[#1D0B16] font-bold rounded-full font-mono text-xs sm:text-sm tracking-[0.25em] uppercase flex items-center gap-3 mx-auto shadow-lg hover:bg-[#EBD096] hover:shadow-[#D8B878]/25 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group"
          >
            <span>{content.cta}</span>
            <ArrowRight className="w-4 h-4 text-[#1D0B16] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      ) : (
        <div className="pt-4">
          <button
            onClick={handleSkip}
            className="font-mono text-xs text-[#FFF8ED]/40 hover:text-[#D8B878] underline underline-offset-4 cursor-pointer transition-colors"
          >
            [ Skip intro ]
          </button>
        </div>
      )}

      {/* Bottom Editorial Watermark */}
      <div className="pt-10 font-mono text-[10px] text-[#FFF8ED]/40 tracking-[0.25em] uppercase">
        CURATED WITH LOVE • EDITION NO. 21 • FOR LILLY
      </div>

    </section>
  );
}
