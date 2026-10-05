import React, { useState, useEffect } from 'react';
import { friendshipConfig } from '../config/friendshipConfig';
import { soundFx } from '../utils/soundEffects';
import { ArrowRight, Sparkles, Feather, Heart } from 'lucide-react';

export default function Stage9PortraitReveal({ onNext }) {
  const [sketchStage, setSketchStage] = useState(0); // 0: Blank, 1: Outlines, 2: Shading, 3: Complete
  const [imgSrc, setImgSrc] = useState(friendshipConfig.portrait.imagePath);

  useEffect(() => {
    // Progressive pencil sketching phases
    const t1 = setTimeout(() => {
      setSketchStage(1);
      soundFx.playPencilStroke();
    }, 700);

    const t2 = setTimeout(() => {
      setSketchStage(2);
      soundFx.playPencilStroke();
    }, 2200);

    const t3 = setTimeout(() => {
      setSketchStage(3);
      soundFx.playUnlock();
    }, 4000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleImageError = () => {
    // Fallback to high quality artistic sketch if custom local asset is not yet placed
    if (imgSrc !== friendshipConfig.portrait.fallbackImage) {
      setImgSrc(friendshipConfig.portrait.fallbackImage);
    }
  };

  const handleNext = () => {
    soundFx.playClick();
    onNext();
  };

  return (
    <section className="min-h-screen py-20 px-4 max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
      
      {/* Title */}
      <div className="mb-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-paper-200 border border-charcoal/20 rounded-full text-xs font-mono tracking-widest text-charcoal/70">
          <Feather className="w-3.5 h-3.5 text-accentGold" />
          <span>GRAPHITE & PAPER // FINAL CREATION</span>
        </div>
        
        <h2 className="font-editorial text-3xl sm:text-5xl text-charcoal font-medium tracking-tight">
          THE ARTWORK
        </h2>
      </div>

      {/* Hand-Drawn Portrait Frame */}
      <div className="w-full max-w-lg bg-paper-50 sketch-border shadow-paper-deep p-6 sm:p-8 relative mb-8">
        <div className="tape-top" />

        {/* Sketch Canvas Container */}
        <div className="relative aspect-[3/4] bg-[#F4EFE6] rounded sketch-border overflow-hidden flex items-center justify-center">
          
          {/* Paper Texture Overlay */}
          <div className="absolute inset-0 paper-grain pointer-events-none opacity-50" />

          {/* Stage 0: Blank Paper */}
          {sketchStage === 0 && (
            <div className="text-center p-6 text-charcoal/40 font-mono text-xs">
              <Feather className="w-8 h-8 mx-auto mb-2 animate-bounce" />
              <span>Preparing graphite canvas...</span>
            </div>
          )}

          {/* Stage 1: Preliminary Sketch Outlines */}
          {sketchStage === 1 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
              <svg className="w-full h-full opacity-35" viewBox="0 0 300 400" fill="none">
                <path d="M70 120 C90 80, 210 80, 230 120 C240 180, 200 280, 150 290 C100 280, 60 180, 70 120 Z" stroke="#3B3835" strokeWidth="1.5" strokeDasharray="6 4" />
                <path d="M110 160 Q150 140 190 160" stroke="#3B3835" strokeWidth="1.2" strokeDasharray="4 4" />
                <path d="M120 230 Q150 250 180 230" stroke="#3B3835" strokeWidth="1.2" strokeDasharray="4 4" />
              </svg>
              <span className="font-mono text-xs text-charcoal/60 bg-paper-100/90 px-3 py-1 rounded shadow-sm">
                Tracing initial graphite lines...
              </span>
            </div>
          )}

          {/* Stage 2 & 3: Shading into Full Pencil Portrait */}
          {sketchStage >= 2 && (
            <div className={`w-full h-full relative transition-all duration-1000 ${
              sketchStage === 2 ? 'opacity-55 filter contrast-125 grayscale' : 'opacity-100 grayscale contrast-110'
            }`}>
              <img
                src={imgSrc}
                alt="Hand-drawn pencil portrait"
                onError={handleImageError}
                className="w-full h-full object-cover"
              />
              {/* Subtle pencil sketch grid lines texture */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 via-transparent to-transparent pointer-events-none" />
            </div>
          )}
        </div>

        {/* Caption beneath drawing */}
        {sketchStage === 3 && (
          <div className="mt-6 pt-4 border-t border-charcoal/15 text-center space-y-2 animate-fade-in">
            <p className="font-handwritten text-3xl sm:text-4xl text-charcoal">
              "{friendshipConfig.portrait.artistNote}"
            </p>
          </div>
        )}
      </div>

      {/* Sincere Emotional Text */}
      {sketchStage === 3 && (
        <div className="max-w-md space-y-4 mb-10 animate-fade-in">
          <p className="font-serif text-xl sm:text-2xl text-charcoal/90 italic">
            "{friendshipConfig.portrait.subtextLine1}"
          </p>
          <p className="font-serif text-lg sm:text-xl text-charcoal font-medium">
            "{friendshipConfig.portrait.subtextLine2}"
          </p>
          <div className="pt-2 font-mono text-sm tracking-widest text-accentGold font-bold">
            {friendshipConfig.portrait.infinitySignature}
          </div>

          <div className="pt-6">
            <button
              onClick={handleNext}
              className="px-8 py-4 bg-charcoal text-paper-50 rounded font-mono text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2 mx-auto shadow-sketch hover:bg-charcoal-deep transition-all cursor-pointer group"
            >
              <span>CONTINUE</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-accentGold" />
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
