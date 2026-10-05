import React, { useState } from 'react';
import ChapterHeader from './ChapterHeader';
import { friendshipData } from '../data/friendshipData';
import { soundFx } from '../utils/soundEffects';
import { Film, ArrowRight, ArrowLeft, Clapperboard, X } from 'lucide-react';

export default function Timeline({ onNext, onPrev }) {
  const events = friendshipData.timelineEvents;
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleNext = () => {
    soundFx.playClick();
    onNext();
  };

  const handlePrev = () => {
    soundFx.playClick();
    onPrev();
  };

  return (
    <section className="min-h-screen py-24 px-4 max-w-4xl mx-auto">
      
      {/* Chapter 03 Header */}
      <ChapterHeader
        chapterNum="03"
        title="ROLLING CREDITS OF OUR STORY"
        metadata="CHRONOLOGICAL FRAMES // 35MM"
        subtitle="Scenes from our friendship, unrolling one frame at a time."
      />

      {/* Cinematic Film Timeline */}
      <div className="relative border-l-2 border-charcoal/20 ml-4 sm:ml-28 md:ml-36 space-y-14 pb-12">
        {events.map((ev, index) => {
          return (
            <div key={index} className="relative pl-6 sm:pl-10 group">
              
              {/* Timeline Slate Pin */}
              <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-paper-100 border-2 border-charcoal group-hover:bg-accentGold group-hover:scale-125 transition-all duration-300" />

              {/* Scene Number on Left (Desktop) */}
              <div className="hidden sm:block absolute -left-32 top-1 text-right w-24">
                <span className="font-mono text-xs font-bold text-accentGold bg-paper-200 px-2 py-0.5 rounded border border-charcoal/10 block">
                  SCENE {ev.scene}
                </span>
                <span className="font-mono text-[10px] text-charcoal/50 block mt-1">
                  {ev.date}
                </span>
              </div>

              {/* Film Frame Scene Card */}
              <div className="bg-paper-50 sketch-border p-6 sm:p-8 shadow-paper-elevated relative transition-all duration-300 hover:shadow-paper-deep">
                <div className="tape-top" />

                {/* Mobile Scene & Date */}
                <div className="sm:hidden flex items-center justify-between mb-3 border-b border-charcoal/10 pb-2">
                  <span className="font-mono text-xs font-bold text-accentGold bg-paper-200 px-2 py-0.5 rounded">
                    SCENE {ev.scene}
                  </span>
                  <span className="font-mono text-xs text-charcoal/60">{ev.date}</span>
                </div>

                {/* Scene Title */}
                <h3 className="font-editorial text-2xl sm:text-3xl text-charcoal font-semibold mb-3 tracking-tight">
                  {ev.title}
                </h3>

                {/* Scene Description */}
                <p className="font-sans text-sm sm:text-base text-charcoal/80 leading-relaxed mb-6">
                  {ev.description}
                </p>

                {/* Film Still / Photo Frame */}
                {ev.image && (
                  <div className="bg-paper-100 p-3 pb-5 sketch-border shadow-sm max-w-md scrapbook-polaroid">
                    <div className="aspect-[16/10] overflow-hidden rounded-sm bg-paper-300 relative photo-shimmer cursor-pointer"
                      onClick={() => setSelectedPhoto(ev.image)}
                    >
                      <img
                        src={ev.image}
                        alt={ev.title}
                        onError={(e) => {
                          if (ev.fallbackImage && e.target.src !== ev.fallbackImage) {
                            e.target.src = ev.fallbackImage;
                          }
                        }}
                        className="w-full h-full object-cover polaroid-develop grayscale contrast-105 hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-charcoal/60">
                      <span>{ev.caption || `SCENE ${ev.scene}`}</span>
                      <span>35MM • RAW</span>
                    </div>
                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>

      {/* Photo Lightbox */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-charcoal/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="max-w-2xl bg-paper-50 p-4 sketch-border shadow-paper-deep relative">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-2 right-2 p-1.5 rounded-full border border-charcoal/20 bg-paper-100 text-charcoal"
            >
              <X className="w-4 h-4" />
            </button>
            <img src={selectedPhoto} alt="Scene Still" className="w-full h-auto max-h-[80vh] object-contain rounded" />
            <p className="font-mono text-xs text-center text-charcoal/60 mt-3">[ Click anywhere to close ]</p>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10 border-t border-charcoal/15 mt-8">
        <button
          onClick={handlePrev}
          className="w-full sm:w-auto px-5 py-3 border border-charcoal/30 hover:border-charcoal text-charcoal rounded font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-paper-200 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cover</span>
        </button>

        <button
          onClick={handleNext}
          className="w-full sm:w-auto px-8 py-3.5 bg-charcoal text-paper-50 rounded font-mono text-xs sm:text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-sketch hover:bg-charcoal-deep transition-all cursor-pointer group"
        >
          <span>OPEN THE MEMORY ARCHIVE</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-accentGold" />
        </button>
      </div>

    </section>
  );
}
