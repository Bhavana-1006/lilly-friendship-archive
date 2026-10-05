import React, { useState } from 'react';
import { friendshipConfig } from '../config/friendshipConfig';
import { soundFx } from '../utils/soundEffects';
import { Folder, FolderOpen, Mail, X, ArrowRight, ArrowLeft, Heart, Sparkles, BookOpen } from 'lucide-react';

export default function Stage5Memories({ onNext, onPrev }) {
  const memories = friendshipConfig.memories;
  const [activeMemory, setActiveMemory] = useState(null);
  const [openedMemories, setOpenedMemories] = useState(new Set());

  const handleOpenMemory = (memory) => {
    soundFx.playClick();
    soundFx.playPencilStroke();
    setActiveMemory(memory);
    setOpenedMemories(prev => new Set(prev).add(memory.id));
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
    <section className="min-h-screen py-20 px-4 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="text-center mb-14 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-paper-200 border border-charcoal/20 rounded-full text-xs font-mono tracking-widest text-charcoal/70">
          <BookOpen className="w-3.5 h-3.5 text-accentGold" />
          <span>VAULT // LEVEL 02</span>
        </div>

        <h2 className="font-editorial text-3xl sm:text-5xl text-charcoal font-medium tracking-tight">
          MEMORY ARCHIVE
        </h2>

        <p className="font-serif text-lg sm:text-xl text-charcoal/70 italic max-w-md mx-auto">
          "Some memories deserve to be opened."
        </p>

        <div className="font-mono text-xs text-charcoal/50">
          Opened: {openedMemories.size} / {memories.length} files
        </div>
      </div>

      {/* Grid of Interactive Memory Envelopes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {memories.map((mem) => {
          const isOpened = openedMemories.has(mem.id);

          return (
            <div
              key={mem.id}
              onClick={() => handleOpenMemory(mem)}
              className={`cursor-pointer group relative bg-paper-50 sketch-border p-6 shadow-paper-elevated hover:shadow-paper-deep transition-all duration-300 transform hover:-translate-y-1 ${
                isOpened ? 'border-accentGold/60 bg-paper-100/80' : ''
              }`}
            >
              {/* Paper Folder Tab Accent */}
              <div className="absolute top-0 right-6 -translate-y-1/2 bg-paper-200 border border-charcoal/20 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest text-charcoal/60 group-hover:bg-charcoal group-hover:text-paper-50 transition-colors">
                {mem.stamp || 'CONFIDENTIAL'}
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-paper-200 rounded sketch-border-subtle group-hover:bg-paper-300 transition-colors">
                  {isOpened ? (
                    <FolderOpen className="w-5 h-5 text-accentGold" />
                  ) : (
                    <Mail className="w-5 h-5 text-charcoal/70 group-hover:text-charcoal" />
                  )}
                </div>
                <div>
                  <span className="font-mono text-[11px] text-sepiaTone font-bold tracking-wider uppercase block">
                    {mem.code}
                  </span>
                  <h3 className="font-serif text-xl text-charcoal font-semibold leading-snug">
                    {mem.title}
                  </h3>
                </div>
              </div>

              <p className="font-sans text-xs text-charcoal/70 italic mb-4 line-clamp-2">
                "{mem.tagline}"
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-charcoal/10 text-xs font-mono">
                <span className="text-charcoal/50">{mem.date}</span>
                <span className="text-accentGold font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  OPEN FILE →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Memory Modal / Expanded Envelope */}
      {activeMemory && (
        <div 
          className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={handleCloseMemory}
        >
          <div 
            className="bg-paper-50 sketch-border shadow-paper-deep max-w-2xl w-full p-6 sm:p-8 relative my-8 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseMemory}
              className="absolute top-4 right-4 p-2 rounded-full border border-charcoal/20 hover:bg-paper-200 text-charcoal/70 hover:text-charcoal transition-all"
              aria-label="Close memory"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="border-b border-charcoal/15 pb-4 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-bold text-accentGold uppercase tracking-widest bg-paper-200 px-2 py-0.5 rounded">
                  {activeMemory.code}
                </span>
                <span className="font-mono text-xs text-charcoal/50">•</span>
                <span className="font-mono text-xs text-charcoal/70">{activeMemory.date}</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-charcoal font-semibold">
                {activeMemory.title}
              </h3>
            </div>

            {/* Photo / Visual */}
            {activeMemory.image && (
              <div className="mb-6 bg-paper-100 p-3 sketch-border shadow-sm scrapbook-polaroid">
                <div className="aspect-[16/9] overflow-hidden rounded-sm bg-paper-300 relative photo-shimmer">
                  <img
                    src={activeMemory.image}
                    alt={activeMemory.title}
                    className="w-full h-full object-cover polaroid-develop grayscale contrast-105 hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
            )}

            {/* Full Personal Message */}
            <div className="space-y-4 mb-6">
              <p className="font-sans text-sm sm:text-base text-charcoal leading-relaxed">
                {activeMemory.fullMessage}
              </p>

              {activeMemory.note && (
                <div className="p-3.5 bg-paper-200/70 sketch-border-subtle rounded text-xs font-mono text-charcoal-light">
                  <span className="text-sepiaTone font-bold uppercase tracking-wider block mb-1">MARGIN NOTE:</span>
                  {activeMemory.note}
                </div>
              )}

              {activeMemory.quote && (
                <p className="font-serif text-base sm:text-lg text-charcoal/80 italic border-l-2 border-accentGold pl-4 my-2">
                  "{activeMemory.quote}"
                </p>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end pt-4 border-t border-charcoal/10">
              <button
                onClick={handleCloseMemory}
                className="px-6 py-2.5 bg-charcoal text-paper-50 rounded font-mono text-xs uppercase tracking-wider hover:bg-charcoal-deep transition-all shadow-sketch"
              >
                RETURN TO ARCHIVE
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
          <span>Back to Timeline</span>
        </button>

        <button
          onClick={handleNext}
          className="w-full sm:w-auto px-8 py-3.5 bg-charcoal text-paper-50 rounded font-mono text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-sketch hover:bg-charcoal-deep transition-all cursor-pointer group"
        >
          <span>HOW WELL DO YOU KNOW US?</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-accentGold" />
        </button>
      </div>

    </section>
  );
}
