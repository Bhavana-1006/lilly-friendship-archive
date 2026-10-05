import React, { useState, useEffect } from 'react';
import { friendshipConfig } from '../config/friendshipConfig';
import { soundFx } from '../utils/soundEffects';
import { ShieldAlert, ArrowRight, Sparkles, Terminal } from 'lucide-react';

export default function Stage1Opening({ onNext }) {
  const [typedTitle, setTypedTitle] = useState('');
  const [showStatus, setShowStatus] = useState(false);
  const [showNote1, setShowNote1] = useState(false);
  const [showNote2, setShowNote2] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const fullTitle = friendshipConfig.prologue.encryptedTitle;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullTitle.length) {
        setTypedTitle(fullTitle.slice(0, index));
        soundFx.playPencilStroke();
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowStatus(true), 400);
        setTimeout(() => setShowNote1(true), 1200);
        setTimeout(() => setShowNote2(true), 2400);
        setTimeout(() => setShowButton(true), 3200);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [fullTitle]);

  const handleSkip = () => {
    setTypedTitle(fullTitle);
    setShowStatus(true);
    setShowNote1(true);
    setShowNote2(true);
    setShowButton(true);
  };

  const handleProceed = () => {
    soundFx.playClick();
    soundFx.playUnlock();
    onNext();
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center relative overflow-hidden">
      
      {/* Background Subtle Atmosphere */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_center,rgba(154,120,70,0.08)_0%,transparent_70%)]" />
      
      {/* Top Secret Stamp */}
      <div className="mb-8 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-paper-200 border border-charcoal/20 rounded text-[11px] font-mono tracking-widest text-sepiaTone">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>{friendshipConfig.prologue.badge}</span>
        </div>
      </div>

      {/* Main Encrypted Title */}
      <div className="max-w-3xl mb-8 min-h-[72px] flex items-center justify-center">
        <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-charcoal tracking-tight font-medium">
          {typedTitle}
          {typedTitle.length < fullTitle.length && <span className="blinking-cursor" />}
        </h1>
      </div>

      {/* Classified Status Box */}
      {showStatus && (
        <div className="w-full max-w-md p-4 mb-10 bg-paper-50 sketch-border shadow-sm text-left font-mono text-xs space-y-1.5 border-charcoal/20 animate-fade-in">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-charcoal/10 text-charcoal/60">
            <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5" /> DOSSIER // RECON</span>
            <span className="text-accentGold font-semibold">CONFIDENTIAL</span>
          </div>
          <div className="text-charcoal-light flex justify-between">
            <span className="text-charcoal/50">ARCHIVE NAME:</span>
            <span className="font-bold text-charcoal">FRIENDSHIP ARCHIVE</span>
          </div>
          <div className="text-charcoal-light flex justify-between">
            <span className="text-charcoal/50">ENCRYPTION STATUS:</span>
            <span className="text-sepiaTone font-bold">{friendshipConfig.prologue.status}</span>
          </div>
          <div className="text-charcoal-light flex justify-between">
            <span className="text-charcoal/50">TEMPORAL ORIGIN:</span>
            <span className="font-bold text-charcoal">{friendshipConfig.prologue.originCode}</span>
          </div>
          <div className="text-charcoal-light flex justify-between">
            <span className="text-charcoal/50">MEMORIES:</span>
            <span className="text-accentGold font-bold">{friendshipConfig.prologue.classification}</span>
          </div>
        </div>
      )}

      {/* Intimate Story Subtext */}
      <div className="max-w-xl space-y-4 mb-12 min-h-[90px]">
        {showNote1 && (
          <p className="font-serif text-xl sm:text-2xl text-charcoal/90 italic animate-fade-in">
            "{friendshipConfig.prologue.subtextLine1}"
          </p>
        )}
        {showNote2 && (
          <p className="font-serif text-xl sm:text-2xl text-charcoal font-semibold animate-fade-in">
            "{friendshipConfig.prologue.subtextLine2}"
          </p>
        )}
      </div>

      {/* CTA Button */}
      {showButton ? (
        <div className="relative group animate-fade-in">
          <button
            onClick={handleProceed}
            className="relative px-8 py-4 bg-charcoal text-paper-50 rounded-sm font-mono text-xs sm:text-sm tracking-widest uppercase flex items-center gap-3 shadow-sketch hover:bg-charcoal-deep transition-all duration-300 hover:translate-x-0.5 hover:-translate-y-0.5 cursor-pointer"
          >
            <span>{friendshipConfig.prologue.ctaButton}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300 text-accentGold" />
          </button>
          
          {/* Subtle Pencil Underline Decoration */}
          <svg className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-44 h-3 pointer-events-none" viewBox="0 0 160 12" fill="none">
            <path d="M2 7C40 2 120 11 158 5" stroke="#3B3835" strokeWidth="1.5" strokeLinecap="round" className="pencil-draw-line" />
          </svg>
        </div>
      ) : (
        <button
          onClick={handleSkip}
          className="text-xs font-mono text-charcoal/40 hover:text-charcoal underline underline-offset-4 cursor-pointer mt-4"
        >
          [ Skip intro typing ]
        </button>
      )}

      {/* Bottom Subtle Origin Watermark */}
      <div className="absolute bottom-4 text-center font-mono text-[10px] text-charcoal/40 tracking-widest uppercase">
        ARCHIVE ORIGIN • 25.09.2023 • CONFIDENTIAL
      </div>
    </section>
  );
}
