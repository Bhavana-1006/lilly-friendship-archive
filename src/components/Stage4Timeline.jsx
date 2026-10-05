import React, { useState } from 'react';
import { friendshipConfig } from '../config/friendshipConfig';
import { soundFx } from '../utils/soundEffects';
import { Calendar, ArrowRight, ArrowLeft, Image as ImageIcon, Sparkles, MapPin } from 'lucide-react';

export default function Stage4Timeline({ onNext, onPrev }) {
  const events = friendshipConfig.timelineEvents;
  const [selectedImage, setSelectedImage] = useState(null);

  const handleNext = () => {
    soundFx.playClick();
    onNext();
  };

  const handlePrev = () => {
    soundFx.playClick();
    onPrev();
  };

  return (
    <section className="min-h-screen py-20 px-4 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="text-center mb-16 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-paper-200 border border-charcoal/20 rounded-full text-xs font-mono tracking-widest text-charcoal/70">
          <Calendar className="w-3.5 h-3.5 text-accentGold" />
          <span>CHRONOLOGY // DOSSIER 01</span>
        </div>
        
        <h2 className="font-editorial text-3xl sm:text-5xl text-charcoal font-medium tracking-tight">
          WHERE IT ALL STARTED
        </h2>
        
        <div className="flex items-center justify-center gap-2 font-mono text-xs sm:text-sm text-sepiaTone font-bold tracking-widest uppercase">
          <span>{friendshipConfig.meetingDateFullDisplay}</span>
          <span>•</span>
          <span>THE BEGINNING</span>
        </div>

        <p className="font-serif text-lg text-charcoal/70 italic max-w-lg mx-auto">
          "A handwritten record of chapters that built who we are today."
        </p>
      </div>

      {/* Vertical Scrapbook Timeline */}
      <div className="relative border-l-2 border-charcoal/25 ml-4 sm:ml-32 md:ml-40 space-y-12 pb-12">
        {events.map((ev, index) => {
          return (
            <div key={ev.id || index} className="relative pl-6 sm:pl-10 group">
              
              {/* Timeline Pin/Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-paper-100 border-2 border-charcoal group-hover:bg-accentGold group-hover:scale-125 transition-all duration-300 shadow-sm" />

              {/* Date tag for larger screens (positioned left) */}
              <div className="hidden sm:block absolute -left-36 top-1 text-right w-28">
                <span className="font-mono text-xs font-bold text-charcoal/80 bg-paper-200 px-2 py-0.5 rounded border border-charcoal/15">
                  {ev.date}
                </span>
              </div>

              {/* Scrapbook Card */}
              <div className="bg-paper-50 sketch-border p-5 sm:p-7 shadow-paper-elevated relative transition-all duration-300 hover:shadow-paper-deep">
                
                {/* Tape element */}
                <div className="tape-top" />

                {/* Mobile Date indicator */}
                <div className="sm:hidden mb-2">
                  <span className="font-mono text-[11px] font-bold text-charcoal bg-paper-200 px-2 py-0.5 rounded border border-charcoal/15">
                    {ev.date}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-semibold">
                    {ev.title}
                  </h3>
                  {ev.tag && (
                    <span className="font-mono text-[10px] tracking-widest text-accentGold border border-accentGold/40 px-2 py-0.5 rounded">
                      {ev.tag}
                    </span>
                  )}
                </div>

                <p className="font-sans text-sm sm:text-base text-charcoal/80 leading-relaxed mb-5">
                  {ev.description}
                </p>

                {/* Scrapbook Polaroid Photo Slot */}
                {ev.image && (
                  <div className="mt-4 pt-4 border-t border-charcoal/10">
                    <div className="bg-paper-100 p-2.5 pb-5 sketch-border shadow-sm max-w-sm rotate-[-1deg] scrapbook-polaroid group-hover:rotate-0 transition-all duration-300">
                      <div className="overflow-hidden rounded-sm bg-paper-300 aspect-[4/3] relative photo-shimmer">
                        <img
                          src={ev.image}
                          alt={ev.title}
                          loading="lazy"
                          className="w-full h-full object-cover polaroid-develop grayscale contrast-105 hover:grayscale-0 transition-all duration-500 cursor-pointer"
                          onClick={() => setSelectedImage(ev.image)}
                        />
                      </div>
                      <p className="font-handwritten text-center text-lg text-charcoal/85 mt-2.5">
                        {ev.imageCaption || ev.title}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox for photo inspection */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-charcoal/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-2xl bg-paper-50 p-4 sketch-border shadow-paper-deep">
            <img src={selectedImage} alt="Archive Enlarged" className="w-full h-auto max-h-[80vh] object-contain rounded" />
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
          <span>Back to Counter</span>
        </button>

        <button
          onClick={handleNext}
          className="w-full sm:w-auto px-8 py-3.5 bg-charcoal text-paper-50 rounded font-mono text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-sketch hover:bg-charcoal-deep transition-all cursor-pointer group"
        >
          <span>OPEN MEMORY ARCHIVE</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-accentGold" />
        </button>
      </div>

    </section>
  );
}
