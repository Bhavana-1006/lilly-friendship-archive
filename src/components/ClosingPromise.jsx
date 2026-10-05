import React from 'react';
import { friendshipData } from '../data/friendshipData';
import { soundFx } from '../utils/soundEffects';
import { RotateCcw, Heart, Sparkles } from 'lucide-react';

export default function ClosingPromise({ onRestart }) {
  const closing = friendshipData.closing;

  return (
    <section className="min-h-[85vh] py-12 px-4 max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
      
      {/* Grand Finale Card */}
      <div className="w-full luxury-content-card sketch-border shadow-2xl p-8 sm:p-14 text-center space-y-8 relative rounded-2xl">
        <div className="tape-top" />

        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#3A0D1E]/90 border border-[#D8B878]/40 rounded-full font-mono text-xs text-[#D8B878] tracking-widest uppercase shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#D8B878]" />
          <span>CHAPTER 21 // ETERNAL BOND</span>
        </div>

        {/* Headlines */}
        <div className="space-y-3">
          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl text-[#2A2421] font-bold tracking-tight uppercase leading-tight">
            {closing.title}
          </h1>

          <p className="font-editorial text-2xl sm:text-3xl text-[#C47C68] font-semibold tracking-wide uppercase">
            {closing.promiseHeading}
          </p>
        </div>

        {/* Closing Keepsake Photo */}
        <div className="max-w-sm mx-auto bg-[#FCF9F6] p-4 sm:p-5 sketch-border shadow-xl scrapbook-polaroid rotate-[-1deg] hover:rotate-0 transition-transform duration-300 rounded-xl">
          <div className="aspect-[3/4] overflow-hidden rounded-lg bg-[#FAF0E8] relative">
            <img
              src="/assets/lilly-memory-10.jpg"
              alt="Lilly and Best Friend"
              className="w-full h-full object-cover polaroid-develop"
            />
          </div>
          <div className="mt-3 text-center">
            <p className="font-serif italic text-sm sm:text-base text-[#C47C68] font-medium">
              "Side by side or miles apart, always best friends at heart 🌸"
            </p>
          </div>
        </div>

        {/* Heartfelt Promise Body */}
        <div className="bg-[#FCF9F6] p-6 sm:p-10 rounded-xl sketch-border-subtle shadow-md max-w-2xl mx-auto space-y-4 text-center">
          <p className="font-sans text-base sm:text-xl text-[#2A2421]/90 leading-relaxed">
            "{closing.promiseBody}"
          </p>

          <p className="font-serif text-xl sm:text-2xl text-[#C5A059] italic font-semibold pt-2">
            {closing.toContinue}
          </p>
        </div>

        {/* Signature */}
        <div className="pt-4 border-t border-[#E5D5C5] flex items-center justify-center gap-2 font-mono text-xs text-[#2A2421]/80 uppercase tracking-widest font-semibold">
          <Heart className="w-4 h-4 text-[#C47C68] fill-[#C47C68]" />
          <span>{closing.signature}, {friendshipData.myName}</span>
        </div>

        {/* Replay */}
        <div className="pt-4">
          <button
            onClick={() => {
              soundFx.playClick();
              onRestart();
            }}
            className="px-8 py-3.5 border border-[#D8B878]/40 hover:border-[#D8B878] bg-[#3A0D1E]/80 text-[#FFF8ED] rounded-full font-mono text-xs uppercase tracking-[0.2em] inline-flex items-center gap-2 transition-all cursor-pointer hover:bg-[#3A0D1E] shadow-sm backdrop-blur-sm"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#D8B878]" />
            <span>REPLAY THE EXPERIENCE</span>
          </button>
        </div>

      </div>

    </section>
  );
}
