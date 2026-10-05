import React, { useState } from 'react';
import ChapterHeader from './ChapterHeader';
import { friendshipData } from '../data/friendshipData';
import { soundFx } from '../utils/soundEffects';
import { Archive, X, ArrowRight, ArrowLeft, Eye, Tag } from 'lucide-react';

export default function MemoryArchive({ onNext, onPrev }) {
  const memories = friendshipData.memories;
  const [activeMemory, setActiveMemory] = useState(null);
  const [viewedCount, setViewedCount] = useState(new Set());

  const handleOpenMemory = (mem) => {
    soundFx.playClick();
    soundFx.playPencilStroke();
    setActiveMemory(mem);
    setViewedCount(prev => new Set(prev).add(mem.id));
  };

  const handleCloseMemory = () => {
    soundFx.playClick();
    setActiveMemory(null);
  };

  const handleNext = () => {
    soundFx.playClick();
    onNext();
  };

  const handlePrev = () => {
    soundFx.playClick();
    onPrev();
  };

  return (
    <section className="min-h-screen py-24 px-4 max-w-5xl mx-auto">
      
      {/* Chapter 04 Header */}
      <ChapterHeader
        chapterNum="04"
        title="THE MEMORY VAULT"
        metadata="PHYSICAL ARCHIVE // EPHEMERA"
        subtitle="Pieces of the past, preserved in varied formats."
      />

      <div className="flex justify-between items-center font-mono text-xs text-charcoal/60 mb-6 border-b border-charcoal/10 pb-2">
        <span>ARCHIVED FILES: {memories.length} ENTRIES</span>
        <span>OPENED: {viewedCount.size} / {memories.length}</span>
      </div>

      {/* Varied Layout Memory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {memories.map((mem) => {
          const isOpened = viewedCount.has(mem.id);

          return (
            <div
              key={mem.id}
              onClick={() => handleOpenMemory(mem)}
              className={`group cursor-pointer bg-paper-50 sketch-border p-6 shadow-paper-elevated hover:shadow-paper-deep transition-all duration-300 relative transform hover:-translate-y-1 ${
                isOpened ? 'border-accentGold/60 bg-paper-100/70' : ''
              }`}
            >
              {/* Format Badge */}
              <div className="flex items-center justify-between font-mono text-[10px] text-charcoal/50 uppercase tracking-widest border-b border-charcoal/10 pb-2 mb-4">
                <span>{mem.number}</span>
                <span className="bg-paper-200 px-2 py-0.5 rounded text-accentGold font-bold">
                  {mem.format}
                </span>
              </div>

              {/* Title & Tagline */}
              <h3 className="font-editorial text-xl sm:text-2xl text-charcoal font-semibold mb-2 leading-snug">
                {mem.title}
              </h3>

              <p className="font-serif text-xs sm:text-sm text-charcoal/70 italic mb-4">
                "{mem.tagline}"
              </p>

              <div className="font-mono text-[10px] text-sepiaTone mb-4">
                {mem.annotation}
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-charcoal/10 font-mono text-xs">
                <span className="text-charcoal/50">{mem.date}</span>
                <span className="text-accentGold font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  EXAMINE FILE →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Memory Modal Overlay */}
      {activeMemory && (
        <div 
          className="fixed inset-0 bg-charcoal/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={handleCloseMemory}
        >
          <div 
            className="bg-paper-50 sketch-border shadow-paper-deep max-w-2xl w-full p-6 sm:p-8 relative my-8 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseMemory}
              className="absolute top-4 right-4 p-2 rounded-full border border-charcoal/20 hover:bg-paper-200 text-charcoal"
              aria-label="Close memory modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-charcoal/15 pb-4 mb-6">
              <div className="flex items-center gap-2 font-mono text-xs text-accentGold font-bold uppercase tracking-widest mb-1">
                <span>{activeMemory.number}</span>
                <span>•</span>
                <span>{activeMemory.format}</span>
                <span>•</span>
                <span className="text-charcoal/60">{activeMemory.date}</span>
              </div>
              <h3 className="font-editorial text-3xl sm:text-4xl text-charcoal font-semibold">
                {activeMemory.title}
              </h3>
            </div>

            {/* Photo slot */}
            <div className="mb-6 bg-paper-100 p-3 sketch-border shadow-sm scrapbook-polaroid">
              <div className="aspect-[16/9] overflow-hidden rounded-sm bg-paper-300 relative photo-shimmer">
                <img
                  src={activeMemory.image}
                  alt={activeMemory.title}
                  onError={(e) => {
                    if (activeMemory.fallbackImage && e.target.src !== activeMemory.fallbackImage) {
                      e.target.src = activeMemory.fallbackImage;
                    }
                  }}
                  className="w-full h-full object-cover polaroid-develop grayscale contrast-105 hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <p className="font-sans text-sm sm:text-base text-charcoal leading-relaxed">
                {activeMemory.content}
              </p>

              <div className="p-3 bg-paper-200/80 rounded sketch-border-subtle font-mono text-xs text-charcoal-light">
                <span className="text-accentGold font-bold uppercase block mb-1">CURATOR NOTE:</span>
                {activeMemory.annotation}
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-charcoal/10">
              <button
                onClick={handleCloseMemory}
                className="px-6 py-2.5 bg-charcoal text-paper-50 rounded font-mono text-xs uppercase tracking-wider hover:bg-charcoal-deep shadow-sketch"
              >
                RETURN TO VAULT
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 border-t border-charcoal/15">
        <button
          onClick={handlePrev}
          className="w-full sm:w-auto px-5 py-3 border border-charcoal/30 hover:border-charcoal text-charcoal rounded font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-paper-200 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Scenes</span>
        </button>

        <button
          onClick={handleNext}
          className="w-full sm:w-auto px-8 py-3.5 bg-charcoal text-paper-50 rounded font-mono text-xs sm:text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-sketch hover:bg-charcoal-deep transition-all cursor-pointer group"
        >
          <span>TAKE THE FRIENDSHIP TEST</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-accentGold" />
        </button>
      </div>

    </section>
  );
}
