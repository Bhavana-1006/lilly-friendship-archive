import React, { useState } from 'react';
import ChapterHeader from './ChapterHeader';
import { friendshipData } from '../data/friendshipData';
import { soundFx } from '../utils/soundEffects';
import { ArrowRight, ArrowLeft, Bookmark, Sparkles } from 'lucide-react';

export default function MagazineCover({ onNext, onPrev }) {
  const cover = friendshipData.magazineCover;
  const [imgSrc, setImgSrc] = useState(cover.coverImage);

  const handleNext = () => {
    soundFx.playClick();
    onNext();
  };

  const handlePrev = () => {
    soundFx.playClick();
    onPrev();
  };

  return (
    <section className="min-h-screen py-24 px-4 max-w-4xl mx-auto flex flex-col justify-center">
      
      {/* Chapter 02 Header */}
      <ChapterHeader
        chapterNum="02"
        title="THE EDITORIAL COVER"
        metadata="PRINT ISSUE // ARCHIVE EDITION"
        subtitle="Our story, presented like a luxury publication."
      />

      {/* Luxury Magazine Cover Layout */}
      <div className="bg-[#F6F2EA] sketch-border shadow-paper-deep p-6 sm:p-12 mb-10 relative overflow-hidden">
        <div className="tape-top" />

        {/* Masthead Header */}
        <div className="border-b-2 border-charcoal pb-4 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="font-mono text-[10px] text-accentGold font-bold tracking-[0.3em] uppercase block mb-1">
              {friendshipData.volume} • {friendshipData.edition}
            </span>
            <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl text-charcoal font-bold tracking-tight uppercase leading-none">
              {cover.issueTitle}
            </h1>
          </div>
          
          <div className="text-left sm:text-right font-mono text-[11px] text-charcoal/70 tracking-widest uppercase">
            <span>{cover.dateSpan}</span>
          </div>
        </div>

        {/* Cover Grid: Feature Image & Editorial Headline */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-8">
          
          {/* Main Cover Photograph */}
          <div className="md:col-span-7 bg-paper-200 p-3 sketch-border shadow-sm scrapbook-polaroid">
            <div className="aspect-[4/5] overflow-hidden rounded-sm bg-paper-300 relative photo-shimmer">
              <img
                src={imgSrc}
                alt="The Friendship Issue Cover"
                onError={() => setImgSrc(cover.fallbackCover)}
                className="w-full h-full object-cover polaroid-develop grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>

          {/* Editorial Column */}
          <div className="md:col-span-5 space-y-6">
            <div className="border-l-2 border-accentGold pl-4 space-y-2">
              <span className="font-mono text-[10px] tracking-[0.25em] text-sepiaTone font-bold uppercase block">
                MAIN FEATURE
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-charcoal font-semibold tracking-tight uppercase leading-snug">
                {cover.headline.split('\n').map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </h2>
            </div>

            <p className="font-serif text-base sm:text-lg text-charcoal/80 italic leading-relaxed">
              "{cover.quote}"
            </p>

            {/* Barcode & Archival Stamp */}
            <div className="pt-4 border-t border-charcoal/15 flex items-center justify-between font-mono text-[10px] text-charcoal/50">
              <div className="tracking-widest">
                <span>ISBN: 25-09-2023-ARCHIVE</span>
              </div>
              <div className="classified-stamp text-[9px] font-bold">
                CIRCULATION: ONE OF ONE
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handlePrev}
          className="px-5 py-3 border border-charcoal/30 hover:border-charcoal text-charcoal rounded font-mono text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-paper-200 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          onClick={handleNext}
          className="px-8 py-3.5 bg-charcoal text-paper-50 rounded font-mono text-xs sm:text-sm uppercase tracking-[0.2em] flex items-center gap-2 shadow-sketch hover:bg-charcoal-deep transition-all cursor-pointer group"
        >
          <span>OPEN SCENES TIMELINE</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-accentGold" />
        </button>
      </div>

    </section>
  );
}
