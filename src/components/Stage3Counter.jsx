import React, { useState, useEffect } from 'react';
import { friendshipConfig } from '../config/friendshipConfig';
import { calculateFriendshipDuration, padZero } from '../utils/dateCounter';
import { soundFx } from '../utils/soundEffects';
import { Clock, Calendar, ArrowRight, ArrowLeft, Hourglass, Heart } from 'lucide-react';

export default function Stage3Counter({ onNext, onPrev }) {
  const [duration, setDuration] = useState(() => 
    calculateFriendshipDuration(friendshipConfig.meetingDate)
  );

  useEffect(() => {
    // Immediate calculation
    setDuration(calculateFriendshipDuration(friendshipConfig.meetingDate));

    // Update every single second
    const interval = setInterval(() => {
      setDuration(calculateFriendshipDuration(friendshipConfig.meetingDate));
    }, 1000);

    return () => clearInterval(interval);
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
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center max-w-4xl mx-auto">
      
      {/* Dossier timestamp badge */}
      <div className="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 bg-paper-50 sketch-border-subtle rounded-full text-xs font-mono text-charcoal/80 shadow-sm animate-fade-in">
        <Clock className="w-3.5 h-3.5 text-accentGold animate-spin" style={{ animationDuration: '10s' }} />
        <span className="tracking-widest uppercase">LIVE TEMPORAL TELEMETRY</span>
      </div>

      {/* Main Title */}
      <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-charcoal font-medium tracking-tight mb-3">
        {friendshipConfig.counterSection.heading}
      </h2>

      <p className="font-serif text-lg sm:text-xl text-charcoal/70 italic mb-10 max-w-lg">
        {friendshipConfig.counterSection.subheading}
      </p>

      {/* Primary Counter Box */}
      <div className="w-full bg-paper-50 sketch-border shadow-paper-elevated p-6 sm:p-10 mb-8 relative">
        <div className="tape-top" />

        {/* Years, Months, Days Grid */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-8 border-b border-charcoal/10 pb-8">
          <div className="flex flex-col items-center p-3 sm:p-4 bg-paper-100 rounded sketch-border-subtle">
            <span className="font-mono text-3xl sm:text-5xl md:text-6xl font-bold text-charcoal tracking-tight" aria-live="polite">
              {duration.years}
            </span>
            <span className="font-mono text-[10px] sm:text-xs text-sepiaTone uppercase tracking-widest mt-1">
              YEARS
            </span>
          </div>

          <div className="flex flex-col items-center p-3 sm:p-4 bg-paper-100 rounded sketch-border-subtle">
            <span className="font-mono text-3xl sm:text-5xl md:text-6xl font-bold text-charcoal tracking-tight" aria-live="polite">
              {duration.months}
            </span>
            <span className="font-mono text-[10px] sm:text-xs text-sepiaTone uppercase tracking-widest mt-1">
              MONTHS
            </span>
          </div>

          <div className="flex flex-col items-center p-3 sm:p-4 bg-paper-100 rounded sketch-border-subtle">
            <span className="font-mono text-3xl sm:text-5xl md:text-6xl font-bold text-charcoal tracking-tight" aria-live="polite">
              {duration.days}
            </span>
            <span className="font-mono text-[10px] sm:text-xs text-sepiaTone uppercase tracking-widest mt-1">
              DAYS
            </span>
          </div>
        </div>

        {/* Real-time Hours : Minutes : Seconds Counter */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 font-mono text-xl sm:text-3xl text-charcoal-light mb-6">
          <div className="bg-paper-200/80 px-3 py-1.5 rounded border border-charcoal/15 font-bold">
            {padZero(duration.hours)}
            <span className="text-[10px] block text-charcoal/50 font-normal uppercase">HRS</span>
          </div>
          <span className="text-accentGold font-bold">:</span>
          <div className="bg-paper-200/80 px-3 py-1.5 rounded border border-charcoal/15 font-bold">
            {padZero(duration.minutes)}
            <span className="text-[10px] block text-charcoal/50 font-normal uppercase">MIN</span>
          </div>
          <span className="text-accentGold font-bold">:</span>
          <div className="bg-paper-200/80 px-3 py-1.5 rounded border border-charcoal/15 font-bold text-accentGold">
            {padZero(duration.seconds)}
            <span className="text-[10px] block text-charcoal/50 font-normal uppercase">SEC</span>
          </div>
        </div>

        {/* Origin Stamp */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs font-mono text-charcoal/70 pt-2 border-t border-charcoal/10">
          <span className="tracking-widest uppercase text-charcoal/50">ORIGIN SINCE:</span>
          <span className="font-bold text-charcoal bg-paper-200 px-2.5 py-0.5 rounded border border-charcoal/15">
            {friendshipConfig.meetingDateDisplay}
          </span>
        </div>

        {/* Hand-drawn pencil sketch line under the counter */}
        <div className="mt-6 flex justify-center">
          <svg className="w-56 h-3 pointer-events-none" viewBox="0 0 200 12" fill="none">
            <path d="M4 8C50 3 150 11 196 5" stroke="#3B3835" strokeWidth="1.5" strokeLinecap="round" className="pencil-draw-line" />
          </svg>
        </div>
      </div>

      {/* Secondary Playful Statistic */}
      <div className="max-w-md mx-auto p-4 bg-paper-50/60 sketch-border-subtle rounded text-center mb-10">
        <p className="font-handwritten text-xl sm:text-2xl text-charcoal leading-relaxed">
          {friendshipConfig.counterSection.totalDaysCaption.replace(
            '{totalDays}',
            duration.totalDays.toLocaleString()
          )}
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={handlePrev}
          className="px-5 py-3 border border-charcoal/30 hover:border-charcoal text-charcoal rounded font-mono text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-paper-200 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          onClick={handleNext}
          className="px-8 py-3.5 bg-charcoal text-paper-50 rounded font-mono text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2 shadow-sketch hover:bg-charcoal-deep transition-all cursor-pointer group"
        >
          <span>WHERE IT ALL STARTED</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-accentGold" />
        </button>
      </div>
    </section>
  );
}
