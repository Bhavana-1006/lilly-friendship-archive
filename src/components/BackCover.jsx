import React from 'react';
import { friendshipData } from '../data/friendshipData';
import { soundFx } from '../utils/soundEffects';
import { RotateCcw, Feather, Heart } from 'lucide-react';

export default function BackCover({ onRestart }) {
  const cover = friendshipData.backCover;

  return (
    <section className="min-h-screen py-24 px-4 max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
      
      {/* Luxury Back Cover Card */}
      <div className="w-full bg-paper-50 sketch-border shadow-paper-deep p-8 sm:p-16 text-center space-y-10 relative">
        <div className="tape-top" />

        {/* Editorial Top Badge */}
        <div className="flex items-center justify-center gap-2 font-mono text-xs text-charcoal/50 uppercase tracking-[0.3em]">
          <span>{friendshipData.volume}</span>
          <span>•</span>
          <span>{friendshipData.archiveId}</span>
        </div>

        {/* Headlines */}
        <div className="space-y-4">
          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl text-charcoal font-bold tracking-tight uppercase">
            {cover.title}
          </h1>

          <p className="font-editorial text-2xl sm:text-4xl text-accentGold font-medium tracking-wide uppercase">
            {cover.subtitle.split('\n').map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </p>
        </div>

        {/* Date Span */}
        <div className="font-mono text-base sm:text-lg text-charcoal font-bold tracking-[0.3em]">
          {cover.dateSpan}
        </div>

        {/* Closing Sincere Note */}
        <div className="pt-6 border-t border-charcoal/15 max-w-lg mx-auto space-y-3">
          <p className="font-serif text-2xl sm:text-3xl text-charcoal italic leading-relaxed">
            "{cover.closingNote}"
          </p>

          <div className="pt-2 font-mono text-xs text-charcoal/50 uppercase tracking-widest">
            {friendshipData.myName} & {friendshipData.friendName}
          </div>
        </div>

        {/* Replay Action */}
        <div className="pt-8">
          <button
            onClick={() => {
              soundFx.playClick();
              onRestart();
            }}
            className="px-8 py-3 border border-charcoal/30 hover:border-charcoal bg-paper-100 text-charcoal rounded-none font-mono text-xs uppercase tracking-[0.2em] inline-flex items-center gap-2 transition-all cursor-pointer hover:bg-paper-200"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>REPLAY THE ARCHIVE</span>
          </button>
        </div>

      </div>

    </section>
  );
}
