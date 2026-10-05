import React, { useState, useEffect } from 'react';
import { friendshipData } from '../data/friendshipData';
import { soundFx } from '../utils/soundEffects';
import { Check, ArrowRight, Terminal } from 'lucide-react';

export default function ArchiveLoader({ onNext }) {
  const items = friendshipData.loaderItems;
  const [completedCount, setCompletedCount] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [countdown, setCountdown] = useState(3);

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
      }, 380);
    }
    return () => clearTimeout(timer);
  }, [completedCount, items.length]);

  // Clean countdown auto-advance
  useEffect(() => {
    if (!isDone) return;
    const timer = setInterval(() => {
      setCountdown(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
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
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 max-w-3xl mx-auto">
      
      {/* Editorial dossier box */}
      <div className="w-full bg-paper-50 sketch-border shadow-paper-elevated p-6 sm:p-10 relative">
        <div className="tape-top" />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-charcoal/15 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-accentGold" />
            <h2 className="font-mono text-xs sm:text-sm tracking-[0.25em] text-charcoal font-bold uppercase">
              {friendshipData.loaderTitle}
            </h2>
          </div>
          <span className="font-mono text-[11px] text-charcoal/60 bg-paper-200 px-2.5 py-0.5 rounded border border-charcoal/10 uppercase">
            ARCHIVE ID: 25092023
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs font-mono text-charcoal/70 mb-2">
            <span className="tracking-widest uppercase">CATALOGUING STORY ASSETS...</span>
            <span className="font-bold text-charcoal">{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-paper-200 border border-charcoal/20 rounded-full overflow-hidden p-0.5">
            <div 
              className="h-full bg-charcoal rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Index list */}
        <div className="space-y-2.5 font-mono text-xs text-charcoal mb-8">
          {items.map((text, idx) => {
            const isInstalled = idx < completedCount;

            return (
              <div 
                key={idx}
                className={`flex items-center justify-between p-2 rounded transition-all duration-300 ${
                  isInstalled ? 'bg-paper-100 text-charcoal' : 'text-charcoal/30'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] text-charcoal/40 font-mono">0{idx + 1}.</span>
                  <span className={isInstalled ? 'font-medium' : ''}>{text}</span>
                </div>

                <div>
                  {isInstalled ? (
                    <span className="inline-flex items-center gap-1 text-emerald-800 font-bold bg-emerald-100/70 px-2 py-0.5 rounded text-[11px] border border-emerald-300">
                      <Check className="w-3 h-3" /> INDEXED
                    </span>
                  ) : (
                    <span className="text-charcoal/30 text-[10px]">PENDING</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Completed state */}
        {isDone ? (
          <div className="border-t border-charcoal/15 pt-6 text-center space-y-4 animate-fade-in">
            <div className="inline-block classified-stamp text-xs font-mono font-bold">
              ✓ {friendshipData.loaderCompleteText}
            </div>

            <p className="font-serif text-xl sm:text-2xl text-charcoal italic">
              "Every frame of our story, preserved exactly as it happened."
            </p>

            <div className="pt-2 flex flex-col items-center justify-center gap-3">
              <button
                onClick={handleContinue}
                className="w-full sm:w-auto px-8 py-3.5 bg-charcoal text-paper-50 rounded font-mono text-xs sm:text-sm tracking-widest uppercase flex items-center justify-center gap-2 shadow-sketch hover:bg-charcoal-deep transition-all cursor-pointer ring-2 ring-accentGold/40 animate-pulse"
              >
                <span>OPEN CHAPTER 01</span>
                <ArrowRight className="w-4 h-4 text-accentGold" />
              </button>

              <span className="text-[11px] font-mono text-charcoal/60">
                Auto-advancing in <span className="font-bold text-accentGold">{countdown}s</span>...
              </span>
            </div>
          </div>
        ) : (
          <div className="flex justify-end border-t border-charcoal/10 pt-4">
            <button
              onClick={handleSkip}
              className="font-mono text-xs text-charcoal/50 hover:text-charcoal underline underline-offset-4 cursor-pointer"
            >
              [ Skip indexing animation ]
            </button>
          </div>
        )}

      </div>

    </section>
  );
}
