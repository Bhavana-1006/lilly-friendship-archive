import React from 'react';
import { friendshipData } from '../data/friendshipData';
import { useFriendshipCounter } from '../hooks/useFriendshipCounter';
import { soundFx } from '../utils/soundEffects';
import { Clock, ArrowRight, ArrowLeft, Heart, Sparkles } from 'lucide-react';

export default function FriendshipCounter({ onNext, onPrev }) {
  const duration = useFriendshipCounter(friendshipData.meetingDate);

  const handleNext = () => {
    soundFx.playClick();
    onNext();
  };

  const handlePrev = () => {
    soundFx.playClick();
    onPrev();
  };

  return (
    <section className="min-h-[85vh] py-12 px-4 max-w-4xl mx-auto flex flex-col justify-center">
      
      {/* Header */}
      <div className="text-center mb-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-4 py-1 bg-[#3A0D1E]/80 border border-[#D8B878]/40 rounded-full font-mono text-[11px] text-[#D8B878] uppercase tracking-widest shadow-md backdrop-blur-sm">
          <Clock className="w-3.5 h-3.5 text-[#D8B878]" />
          <span>REAL-TIME TELEMETRY</span>
        </div>

        <h2 className="font-editorial text-3xl sm:text-5xl text-[#2A2421] font-bold tracking-tight uppercase">
          {friendshipData.counter.title}
        </h2>

        <p className="font-serif text-lg sm:text-xl text-[#C47C68] italic font-medium">
          "{friendshipData.counter.subtitle}"
        </p>
      </div>

      {/* Main Counter Card */}
      <div className="luxury-content-card sketch-border shadow-2xl p-6 sm:p-12 mb-8 relative text-center rounded-2xl overflow-hidden">
        <div className="tape-top" />

        {/* Ambient subtle card glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#D8B878]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Years, Months, Days Grid */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-8 border-b border-[#E5D5C5] pb-8 relative z-10">
          <div className="flex flex-col items-center p-4 bg-[#FCF9F6] rounded-2xl border border-[#D8B878]/40 shadow-md transform transition-transform hover:scale-105 duration-300 relative group">
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#D8B878] rounded-full animate-ping opacity-60 pointer-events-none" />
            <span className="font-editorial text-4xl sm:text-6xl md:text-7xl font-bold text-[#2A2421] tracking-tight drop-shadow-xs" aria-live="polite">
              {String(duration.years).padStart(2, '0')}
            </span>
            <span className="font-mono text-[10px] sm:text-xs text-[#C47C68] uppercase tracking-widest mt-1 font-bold">
              YEARS
            </span>
          </div>

          <div className="flex flex-col items-center p-4 bg-[#FCF9F6] rounded-2xl border border-[#D8B878]/40 shadow-md transform transition-transform hover:scale-105 duration-300 relative group">
            <span className="font-editorial text-4xl sm:text-6xl md:text-7xl font-bold text-[#2A2421] tracking-tight drop-shadow-xs" aria-live="polite">
              {String(duration.months).padStart(2, '0')}
            </span>
            <span className="font-mono text-[10px] sm:text-xs text-[#C47C68] uppercase tracking-widest mt-1 font-bold">
              MONTHS
            </span>
          </div>

          <div className="flex flex-col items-center p-4 bg-[#FCF9F6] rounded-2xl border border-[#D8B878]/40 shadow-md transform transition-transform hover:scale-105 duration-300 relative group">
            <span className="font-editorial text-4xl sm:text-6xl md:text-7xl font-bold text-[#2A2421] tracking-tight drop-shadow-xs" aria-live="polite">
              {String(duration.days).padStart(2, '0')}
            </span>
            <span className="font-mono text-[10px] sm:text-xs text-[#C47C68] uppercase tracking-widest mt-1 font-bold">
              DAYS
            </span>
          </div>
        </div>

        {/* Real-time Animated Hours : Minutes : Seconds Counter with Live Ticking Pulse */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 font-mono text-xl sm:text-3xl text-[#2A2421] mb-6 relative z-10">
          <div className="bg-[#FCF9F6] px-4 py-2.5 rounded-xl border border-[#D8B878]/40 font-bold shadow-md">
            {duration.formattedHours}
            <span className="text-[10px] block text-[#2A2421]/50 font-normal uppercase tracking-wider">HRS</span>
          </div>
          <span className="text-[#C5A059] font-bold animate-pulse text-2xl">:</span>
          <div className="bg-[#FCF9F6] px-4 py-2.5 rounded-xl border border-[#D8B878]/40 font-bold shadow-md">
            {duration.formattedMinutes}
            <span className="text-[10px] block text-[#2A2421]/50 font-normal uppercase tracking-wider">MIN</span>
          </div>
          <span className="text-[#C5A059] font-bold animate-pulse text-2xl">:</span>
          <div key={duration.seconds} className="bg-[#3A0D1E] text-[#FFF8ED] px-4 py-2.5 rounded-xl border border-[#D8B878] font-bold shadow-lg transform transition-all duration-300 scale-105 ring-2 ring-[#D8B878]/50">
            {duration.formattedSeconds}
            <span className="text-[10px] block text-[#D8B878] font-normal uppercase tracking-wider">SEC</span>
          </div>
        </div>

        {/* Total Days Telemetry with live pulse */}
        <div className="pt-4 border-t border-[#E5D5C5] font-mono text-xs sm:text-sm text-[#2A2421]/80 flex flex-col sm:flex-row items-center justify-center gap-2 relative z-10">
          <span className="text-[#2A2421]/70 uppercase tracking-widest font-medium">{friendshipData.counter.totalDaysLabel}</span>
          <span className="font-bold text-[#1D0B16] bg-gradient-to-r from-[#D8B878]/30 via-[#FCF9F6] to-[#D8B878]/30 px-4 py-1.5 rounded-full border border-[#D8B878] font-mono shadow-sm inline-flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C47C68] animate-spin" />
            {duration.totalDays.toLocaleString()} DAYS TOGETHER
          </span>
        </div>

        {/* Delicate hand-drawn animated line */}
        <div className="mt-6 flex justify-center relative z-10">
          <svg className="w-64 h-3 pointer-events-none" viewBox="0 0 200 12" fill="none">
            <path d="M4 8C50 3 150 11 196 5" stroke="#C47C68" strokeWidth="2" strokeLinecap="round" className="pencil-draw-line" />
          </svg>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handlePrev}
          className="px-6 py-3.5 border border-[#D8B878]/30 hover:border-[#D8B878] text-[#FFF8ED] rounded-full font-mono text-xs uppercase tracking-wider flex items-center gap-2 bg-[#3A0D1E]/70 hover:bg-[#3A0D1E] transition-all cursor-pointer backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          onClick={handleNext}
          className="px-8 py-3.5 bg-[#D8B878] text-[#1D0B16] font-bold rounded-full font-mono text-xs sm:text-sm uppercase tracking-[0.2em] flex items-center gap-2 shadow-lg hover:bg-[#EBD096] hover:scale-105 transition-all cursor-pointer group"
        >
          <span>OPEN 10-PAGE MAGAZINE</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#1D0B16]" />
        </button>
      </div>

    </section>
  );
}
