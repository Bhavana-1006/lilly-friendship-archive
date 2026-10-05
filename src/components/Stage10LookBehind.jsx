import React, { useState, useEffect } from 'react';
import { friendshipConfig } from '../config/friendshipConfig';
import { soundFx } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { Heart, Gift, Sparkles, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';

export default function Stage10LookBehind({ onRestart }) {
  const [phase, setPhase] = useState(0); // 0: Problem intro, 1: Not enough, 2: So..., 3: LOOK BEHIND YOU, 4: Final Archive Complete
  const content = friendshipConfig.finalPhysicalGiftMoment;

  useEffect(() => {
    const t1 = setTimeout(() => {
      setPhase(1);
      soundFx.playPencilStroke();
    }, 1200);

    const t2 = setTimeout(() => {
      setPhase(2);
      soundFx.playPencilStroke();
    }, 2800);

    const t3 = setTimeout(() => {
      setPhase(3);
      soundFx.playUnlock();
    }, 4200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleImReady = () => {
    soundFx.playUnlock();
    soundFx.playChime();
    
    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#262422', '#9A7846', '#D5C4AD', '#8A725A']
      });
    } catch {
      // safe fallback
    }

    setPhase(4);
  };

  return (
    <section className="min-h-screen py-20 px-4 max-w-3xl mx-auto flex flex-col items-center justify-center text-center relative">
      
      {phase < 4 ? (
        /* Dramatic Reveal Sequence */
        <div className="space-y-8 animate-fade-in w-full">
          
          <div className="min-h-[140px] flex flex-col items-center justify-center space-y-4">
            {phase >= 0 && (
              <p className="font-serif text-2xl sm:text-3xl text-charcoal/70 italic animate-fade-in">
                "{content.pauseLine1}"
              </p>
            )}

            {phase >= 1 && (
              <p className="font-serif text-2xl sm:text-3xl text-charcoal font-medium animate-fade-in">
                "{content.pauseLine2}"
              </p>
            )}

            {phase >= 2 && (
              <p className="font-editorial text-3xl sm:text-4xl text-accentGold font-semibold animate-fade-in">
                "{content.pauseLine3}"
              </p>
            )}
          </div>

          {phase >= 3 && (
            <div className="space-y-8 pt-6 animate-fade-in">
              <div className="p-8 sm:p-12 bg-paper-50 sketch-border shadow-paper-deep relative">
                <div className="tape-top" />
                
                <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl text-charcoal font-bold tracking-tight mb-4">
                  {content.hugeHeadline}
                </h1>
                
                <p className="font-serif text-xl sm:text-2xl text-sepiaTone italic">
                  {content.completionMessage}
                </p>
              </div>

              <button
                onClick={handleImReady}
                className="px-10 py-4 bg-charcoal text-paper-50 rounded font-mono text-sm sm:text-base uppercase tracking-widest flex items-center gap-3 mx-auto shadow-sketch hover:bg-charcoal-deep transition-all cursor-pointer group hover:scale-105"
              >
                <span>{content.ctaButton}</span>
                <ArrowRight className="w-5 h-5 text-accentGold group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Final Ending / Archive Complete Screen */
        <div className="w-full bg-paper-50 sketch-border shadow-paper-deep p-8 sm:p-14 text-center space-y-8 animate-fade-in relative">
          <div className="tape-top" />

          {/* Stamp */}
          <div className="inline-block classified-stamp text-xs sm:text-sm font-bold">
            ✓ {content.endingTitle}
          </div>

          {/* Date */}
          <div className="font-mono text-base sm:text-lg text-accentGold font-bold tracking-widest">
            {content.endingDate}
          </div>

          {/* Core sincere gratitude */}
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal leading-relaxed">
            "{content.thankYouText}"
          </p>

          {/* Birthday Wish */}
          <div className="pt-4 border-t border-charcoal/15">
            <h2 className="font-handwritten text-4xl sm:text-6xl text-charcoal font-bold">
              {content.birthdayWish.replace('{friendName}', friendshipConfig.friendName)}
            </h2>
            <div className="mt-2 flex items-center justify-center gap-2 text-charcoal/60 font-mono text-xs">
              <Heart className="w-4 h-4 text-accentGold fill-accentGold" />
              <span>Forever your best friend, {friendshipConfig.myName}</span>
            </div>
          </div>

          {/* Replay experience */}
          <div className="pt-8">
            <button
              onClick={onRestart}
              className="px-6 py-2.5 border border-charcoal/30 hover:border-charcoal bg-paper-100 text-charcoal rounded font-mono text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-all cursor-pointer hover:bg-paper-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>REPLAY EXPERIENCE FROM BEGINNING</span>
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
