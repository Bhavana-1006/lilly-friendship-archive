import React, { useState, useEffect } from 'react';
import { friendshipData } from '../data/friendshipData';
import { soundFx } from '../utils/soundEffects';
import { Sparkles, ArrowRight, ArrowLeft, Check, Film, Eye } from 'lucide-react';

export default function CuriosityTeaser({ onNext, onPrev }) {
  const [completedCount, setCompletedCount] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const content = friendshipData.curiosity;
  const items = content.loaderItems;

  useEffect(() => {
    let timer;
    if (completedCount < items.length) {
      timer = setTimeout(() => {
        setCompletedCount(prev => {
          const next = prev + 1;
          soundFx.playPencilStroke();
          if (next >= items.length) {
            setIsDone(true);
            soundFx.playUnlock();
          }
          return next;
        });
      }, 450);
    }
    return () => clearTimeout(timer);
  }, [completedCount, items.length]);

  // Clean auto-advance
  useEffect(() => {
    if (!isDone) return;
    const interval = setInterval(() => {
      setCountdown(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isDone]);

  useEffect(() => {
    if (isDone && countdown === 0) {
      onNext();
    }
  }, [isDone, countdown, onNext]);

  const handleSkip = () => {
    setCompletedCount(items.length);
    setIsDone(true);
    soundFx.playUnlock();
  };

  const handleContinue = () => {
    soundFx.playClick();
    onNext();
  };

  const progressPercent = Math.min(100, Math.round((completedCount / items.length) * 100));

  return (
    <section className="min-h-[85vh] py-12 px-4 max-w-3xl mx-auto flex flex-col justify-center text-center">
      
      {/* Suspense Teaser Card */}
      <div className="luxury-content-card sketch-border shadow-2xl p-8 sm:p-12 relative space-y-8 rounded-2xl">
        <div className="tape-top" />

        {/* Eye-Catching Curiosity Statements */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#3A0D1E]/90 border border-[#D8B878]/40 rounded-full font-mono text-xs text-[#D8B878] tracking-widest uppercase shadow-sm">
            <Eye className="w-3.5 h-3.5 text-[#D8B878]" />
            <span>SUSPENSE PROTOCOL</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#2A2421] font-bold uppercase tracking-tight leading-snug">
            "{content.question1}"
          </h2>

          <p className="font-serif text-xl sm:text-2xl text-[#C47C68] italic font-medium">
            {content.teaser1}
          </p>

          <div className="p-4 bg-[#FCF9F6] rounded-xl sketch-border-subtle max-w-xl mx-auto space-y-1 shadow-sm">
            <p className="font-editorial text-lg sm:text-xl text-[#2A2421] font-semibold">
              "{content.question2}"
            </p>
            <p className="font-serif text-base sm:text-lg text-[#C5A059] italic">
              {content.teaser2}
            </p>
          </div>
        </div>

        {/* Animated Processing Section */}
        <div className="border-t border-[#E5D5C5] pt-6 space-y-5">
          <div className="flex justify-between text-xs font-mono text-[#2A2421]/80">
            <span className="font-bold tracking-wider">{content.loaderTitle}</span>
            <span className="font-bold text-[#C47C68]">{progressPercent}%</span>
          </div>

          <div className="w-full h-2.5 bg-[#FCF9F6] border border-[#E8C5B8] rounded-full overflow-hidden p-0.5">
            <div 
              className="h-full bg-gradient-to-r from-[#C47C68] to-[#D8B878] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* List */}
          <div className="space-y-2 text-left font-mono text-xs text-[#2A2421]">
            {items.map((it, idx) => {
              const isChecked = idx < completedCount;
              return (
                <div 
                  key={idx}
                  className={`flex items-center justify-between p-2.5 rounded-lg transition-all ${
                    isChecked ? 'bg-[#FCF9F6] text-[#2A2421] shadow-xs' : 'text-[#2A2421]/30'
                  }`}
                >
                  <span className={isChecked ? 'font-medium' : ''}>{it}</span>
                  {isChecked ? (
                    <span className="inline-flex items-center gap-1 text-emerald-800 font-bold bg-emerald-100/80 px-2.5 py-0.5 rounded text-[11px]">
                      <Check className="w-3 h-3" /> READY
                    </span>
                  ) : (
                    <span className="text-[#2A2421]/30 text-[10px]">PENDING</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Completion CTA */}
        {isDone ? (
          <div className="pt-4 border-t border-[#E5D5C5] space-y-4 animate-fade-in">
            <button
              onClick={handleContinue}
              className="px-10 py-4 bg-[#D8B878] text-[#1D0B16] font-bold rounded-full font-mono text-xs sm:text-sm uppercase tracking-[0.2em] flex items-center gap-3 mx-auto shadow-lg hover:bg-[#EBD096] transition-all cursor-pointer group hover:scale-105"
            >
              <span>{content.cta}</span>
              <ArrowRight className="w-4 h-4 text-[#1D0B16] group-hover:translate-x-1 transition-transform" />
            </button>

            <span className="text-xs font-mono text-[#2A2421]/70 block">
              Auto-advancing in <span className="font-bold text-[#C47C68]">{countdown}s</span>...
            </span>
          </div>
        ) : (
          <div className="flex justify-end pt-2">
            <button
              onClick={handleSkip}
              className="text-xs font-mono text-[#2A2421]/50 hover:text-[#2A2421] underline underline-offset-4 cursor-pointer"
            >
              [ Skip processing animation ]
            </button>
          </div>
        )}

      </div>

    </section>
  );
}
