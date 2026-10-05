import React, { useState } from 'react';
import { Volume2, VolumeX, RotateCcw, Sparkles, Feather } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export default function HeaderNav({
  currentStage,
  totalStages = 10,
  onRestart,
  onPencilClick,
  pencilClicks,
  targetClicks = 5
}) {
  const [soundActive, setSoundActive] = useState(false);
  const [showRestartConfirm, setShowRestartConfirm] = useState(false);

  const handleToggleSound = () => {
    const isEnabled = soundFx.toggleSound();
    setSoundActive(isEnabled);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-paper-50/85 backdrop-blur-md border-b border-charcoal/10 transition-all duration-300">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        
        {/* Left: Secret Pencil Easter Egg & Stage badge */}
        <div className="flex items-center gap-3">
          <button
            onClick={onPencilClick}
            title="A delicate graphite pencil..."
            className="group flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-paper-200/70 hover:bg-paper-300/80 transition-all text-xs font-mono text-charcoal border border-charcoal/15 cursor-pointer active:scale-95"
            aria-label="Pencil Easter Egg"
          >
            <Feather className="w-3.5 h-3.5 text-accentGold group-hover:rotate-12 transition-transform duration-300" />
            <span className="hidden sm:inline font-mono text-[11px] tracking-wider">DOSSIER</span>
            {pencilClicks > 0 && pencilClicks < targetClicks && (
              <span className="text-[10px] text-sepiaTone font-bold">({pencilClicks}/{targetClicks})</span>
            )}
          </button>

          <div className="text-[11px] font-mono tracking-widest text-charcoal/60 uppercase">
            STAGE <span className="font-bold text-charcoal">{String(currentStage).padStart(2, '0')}</span> / {String(totalStages).padStart(2, '0')}
          </div>
        </div>

        {/* Center: Stage Progress Dots with click-to-jump */}
        <div className="flex items-center gap-1 sm:gap-1.5" aria-label="Experience Progress">
          {Array.from({ length: totalStages }).map((_, idx) => {
            const stepNum = idx + 1;
            const isCompleted = stepNum < currentStage;
            const isCurrent = stepNum === currentStage;
            return (
              <button
                key={idx}
                onClick={() => onSelectStage && onSelectStage(stepNum)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  isCurrent
                    ? 'w-6 bg-charcoal ring-2 ring-charcoal/20'
                    : isCompleted
                    ? 'w-2 sm:w-3 bg-accentGold hover:bg-charcoal'
                    : 'w-2 bg-charcoal/20 hover:bg-charcoal/50'
                }`}
                title={`Jump to Stage ${stepNum}`}
                aria-label={`Jump to Stage ${stepNum}`}
              />
            );
          })}
        </div>

        {/* Right: Audio Toggle & Restart */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleSound}
            className={`p-2 rounded-full border transition-all text-xs flex items-center gap-1.5 ${
              soundActive
                ? 'bg-charcoal text-paper-50 border-charcoal shadow-sm'
                : 'bg-paper-100 text-charcoal/70 border-charcoal/20 hover:border-charcoal/40'
            }`}
            title={soundActive ? "Mute audio" : "Enable ambient sounds"}
            aria-label="Toggle sound"
          >
            {soundActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline text-[11px] font-mono">{soundActive ? 'SOUND ON' : 'SOUND OFF'}</span>
          </button>

          <button
            onClick={() => setShowRestartConfirm(true)}
            className="p-2 rounded-full border border-charcoal/20 text-charcoal/60 hover:text-charcoal hover:border-charcoal/50 bg-paper-100 transition-all text-xs"
            title="Restart Experience"
            aria-label="Restart Experience"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Restart confirmation modal */}
      {showRestartConfirm && (
        <div className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-paper-50 max-w-sm w-full p-6 sketch-border shadow-paper-deep text-center animate-fade-in">
            <h3 className="font-serif text-2xl text-charcoal mb-2 font-semibold">Restart the Archive?</h3>
            <p className="text-xs font-sans text-charcoal/70 mb-6">
              You will return to the opening sequence. Your journey will begin fresh.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowRestartConfirm(false)}
                className="px-4 py-2 text-xs font-mono uppercase tracking-wider rounded border border-charcoal/30 hover:bg-paper-200 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowRestartConfirm(false);
                  onRestart();
                }}
                className="px-4 py-2 text-xs font-mono uppercase tracking-wider bg-charcoal text-paper-50 rounded hover:bg-charcoal-deep transition-all shadow-sketch"
              >
                Confirm Restart
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
