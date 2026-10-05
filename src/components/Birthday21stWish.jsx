import React, { useEffect } from 'react';
import { friendshipData } from '../data/friendshipData';
import { soundFx } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, ArrowRight, ArrowLeft, Cake, Gift } from 'lucide-react';

export default function Birthday21stWish({ onNext, onPrev }) {
  const bday = friendshipData.birthday21;

  useEffect(() => {
    soundFx.playChime();
    soundFx.playUnlock();

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D8B878', '#C9828F', '#FFF8ED', '#EBD096']
      });
    } catch {
      // safe fallback
    }
  }, []);

  const handleNext = () => {
    soundFx.playClick();
    onNext();
  };

  const handlePrev = () => {
    soundFx.playClick();
    onPrev();
  };

  return (
    <section className="min-h-[85vh] py-12 px-4 max-w-4xl mx-auto flex flex-col justify-center text-center">
      
      {/* 21st Birthday Card */}
      <div className="luxury-content-card sketch-border shadow-2xl p-8 sm:p-14 relative space-y-8 rounded-2xl">
        <div className="tape-top" />

        {/* Milestone Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#3A0D1E]/90 border border-[#D8B878]/40 rounded-full font-mono text-xs text-[#D8B878] tracking-widest uppercase shadow-sm">
          <Sparkles className="w-4 h-4 text-[#D8B878]" />
          <span>{bday.badge}</span>
        </div>

        {/* Grand Headline */}
        <div className="space-y-3">
          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl text-[#2A2421] font-bold tracking-tight uppercase leading-tight">
            {bday.headline}
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-[#C47C68] italic max-w-xl mx-auto font-medium">
            "{bday.subheadline}"
          </p>
        </div>

        {/* Heartfelt Letter Box */}
        <div className="bg-[#FCF9F6] p-6 sm:p-10 rounded-xl sketch-border-subtle shadow-md max-w-2xl mx-auto text-left space-y-4">
          <p className="font-sans text-base sm:text-lg text-[#2A2421]/90 leading-relaxed">
            {bday.letterParagraph1}
          </p>
          <p className="font-sans text-base sm:text-lg text-[#2A2421]/90 leading-relaxed">
            {bday.letterParagraph2}
          </p>
          <p className="font-sans text-base sm:text-lg text-[#2A2421]/90 leading-relaxed">
            {bday.letterParagraph3}
          </p>

          <div className="pt-4 border-t border-[#E5D5C5]">
            <p className="font-serif text-lg sm:text-xl text-[#C47C68] italic text-center font-medium">
              "{bday.highlightQuote}"
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <button
            onClick={handlePrev}
            className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#E8C5B8] bg-[#FCF9F6] text-[#2A2421] font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#FAF0E8] transition-all cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Magazine</span>
          </button>

          <button
            onClick={handleNext}
            className="w-full sm:w-auto px-10 py-4 bg-[#D8B878] text-[#1D0B16] font-bold rounded-full font-mono text-xs sm:text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-lg hover:bg-[#EBD096] transition-all cursor-pointer group hover:scale-105"
          >
            <span>{bday.cta}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#1D0B16]" />
          </button>
        </div>

      </div>

    </section>
  );
}
