import React, { useState } from 'react';
import { Volume2, VolumeX, RotateCcw, Sparkles, Heart } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

const stages = [
  "Prologue",
  "Counter",
  "10-Page Magazine",
  "21st Birthday",
  "The Suspense",
  "Cinematic Film",
  "The Artwork",
  "Look Behind",
  "Grand Finale"
];

export default function EditorialNav({
  currentStage = 1,
  totalStages = 9,
  onSelectStage,
  onRestart
}) {
  const [soundActive, setSoundActive] = useState(false);
  const [showRestartModal, setShowRestartModal] = useState(false);

  const handleToggleSound = () => {
    const isEnabled = soundFx.toggleSound();
    setSoundActive(isEnabled);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3 bg-[#1D0B16]/85 backdrop-blur-md border-b border-[#D8B878]/25 text-[#FFF8ED] transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Left: Lilly's Archive Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#3A0D1E]/90 rounded-full font-mono text-[11px] text-[#D8B878] border border-[#D8B878]/40 shadow-sm">
            <Heart className="w-3.5 h-3.5 fill-[#C9828F] text-[#C9828F]" />
            <span className="font-semibold tracking-wider">LILLY'S ARCHIVE</span>
          </div>

          <div className="font-mono text-[11px] tracking-widest text-[#FFF8ED]/80 uppercase hidden sm:inline">
            STAGE <span className="font-bold text-[#D8B878]">{String(currentStage).padStart(2, '0')}</span> / {String(totalStages).padStart(2, '0')}
            <span className="text-[#FFF8ED]/50 ml-2">— {stages[currentStage - 1] || "Chapter"}</span>
          </div>
        </div>

        {/* Center: Stage Dots */}
        <div className="hidden lg:flex items-center gap-1.5" aria-label="Experience Progress">
          {Array.from({ length: totalStages }).map((_, idx) => {
            const stepNum = idx + 1;
            const isCurrent = stepNum === currentStage;
            const isPast = stepNum < currentStage;

            return (
              <button
                key={idx}
                onClick={() => onSelectStage(stepNum)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  isCurrent
                    ? 'w-7 bg-[#D8B878] ring-2 ring-[#D8B878]/40 shadow-sm'
                    : isPast
                    ? 'w-2.5 bg-[#C9828F] hover:bg-[#D8B878]'
                    : 'w-2 bg-[#FFF8ED]/20 hover:bg-[#FFF8ED]/60'
                }`}
                title={`Jump to ${stages[idx]}`}
                aria-label={`Jump to Stage ${stepNum}`}
              />
            );
          })}
        </div>

        {/* Right: Audio Toggle & Restart */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleSound}
            className={`px-3 py-1.5 rounded-full font-mono text-[11px] tracking-wider border transition-all flex items-center gap-1.5 cursor-pointer ${
              soundActive
                ? 'bg-[#D8B878] text-[#1D0B16] font-bold border-[#D8B878] shadow-md'
                : 'bg-[#3A0D1E]/70 text-[#FFF8ED]/80 border-[#D8B878]/30 hover:border-[#D8B878]'
            }`}
            title={soundActive ? "Mute audio" : "Enable organic sounds"}
          >
            {soundActive ? <Volume2 className="w-3.5 h-3.5 text-[#1D0B16]" /> : <VolumeX className="w-3.5 h-3.5 text-[#D8B878]" />}
            <span className="hidden sm:inline">{soundActive ? "AUDIO ON" : "AUDIO OFF"}</span>
          </button>

          <button
            onClick={() => setShowRestartModal(true)}
            className="p-1.5 rounded-full border border-[#D8B878]/30 text-[#FFF8ED]/70 hover:text-[#FFF8ED] hover:border-[#D8B878] bg-[#3A0D1E]/70 transition-all cursor-pointer"
            title="Restart Experience"
            aria-label="Restart Experience"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Restart Modal */}
      {showRestartModal && (
        <div className="fixed inset-0 bg-[#0F040A]/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#1D0B16] max-w-sm w-full p-6 border border-[#D8B878]/40 shadow-2xl text-center rounded-xl animate-fade-in text-[#FFF8ED]">
            <h3 className="font-editorial text-2xl text-[#D8B878] mb-2 font-semibold">RESTART THE ARCHIVE?</h3>
            <p className="text-xs font-sans text-[#FFF8ED]/70 mb-6">
              You will return to the date-of-birth entry screen.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowRestartModal(false)}
                className="px-4 py-2 text-xs font-mono uppercase tracking-wider rounded border border-[#D8B878]/30 hover:bg-[#3A0D1E] text-[#FFF8ED]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowRestartModal(false);
                  onRestart();
                }}
                className="px-4 py-2 text-xs font-mono uppercase tracking-wider bg-[#D8B878] text-[#1D0B16] font-bold rounded hover:bg-[#EBD096] shadow-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
