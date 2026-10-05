import React, { useState } from 'react';
import { friendshipConfig } from '../config/friendshipConfig';
import { soundFx } from '../utils/soundEffects';
import { 
  Key, 
  Search, 
  HelpCircle, 
  Check, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  Compass, 
  Lock, 
  Unlock,
  FileQuestion
} from 'lucide-react';

export default function Stage7TreasureHunt({ onNext, onPrev }) {
  const clues = friendshipConfig.treasureHuntClues;
  const [currentClueIndex, setCurrentClueIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [clueStatus, setClueStatus] = useState('idle'); // 'idle' | 'correct' | 'wrong'
  const [unlockedClues, setUnlockedClues] = useState([]);

  const currentClue = clues[currentClueIndex];

  const handleCheckAnswer = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const sanitizedInput = userInput.trim().toLowerCase();
    const isMatched = currentClue.acceptableAnswers.some(ans => 
      sanitizedInput.includes(ans.toLowerCase()) || ans.toLowerCase().includes(sanitizedInput)
    );

    if (isMatched) {
      soundFx.playUnlock();
      setClueStatus('correct');
      if (!unlockedClues.includes(currentClue.id)) {
        setUnlockedClues(prev => [...prev, currentClue.id]);
      }
    } else {
      soundFx.playClick();
      setClueStatus('wrong');
    }
  };

  const handleNextClue = () => {
    soundFx.playClick();
    if (currentClueIndex < clues.length - 1) {
      setCurrentClueIndex(prev => prev + 1);
      setUserInput('');
      setShowHint(false);
      setClueStatus('idle');
    } else {
      // Proceed to stage 8 (Final Clue transition)
      onNext();
    }
  };

  return (
    <section className="min-h-screen py-20 px-4 max-w-3xl mx-auto flex flex-col items-center justify-center">
      
      {/* Header */}
      <div className="text-center mb-10 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-paper-200 border border-charcoal/20 rounded-full text-xs font-mono tracking-widest text-sepiaTone font-bold">
          <Compass className="w-3.5 h-3.5" />
          <span>MISSION OBJECTIVE // OFFLINE PROTOCOL</span>
        </div>

        <h2 className="font-editorial text-3xl sm:text-5xl text-charcoal font-medium tracking-tight">
          THE FINAL SURPRISE ISN'T HERE.
        </h2>

        <div className="max-w-md mx-auto space-y-1 font-serif text-lg sm:text-xl text-charcoal/80 italic">
          <p>"You've unlocked the archive."</p>
          <p>"But there is something I couldn't put inside a website."</p>
          <p className="font-semibold text-charcoal">"You'll have to find it."</p>
        </div>
      </div>

      {/* Secret Classified Clue Dossier */}
      <div className="w-full bg-paper-50 sketch-border shadow-paper-deep p-6 sm:p-10 relative">
        <div className="tape-top" />

        {/* Top classified stamp header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-charcoal/15 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="classified-stamp text-[10px] font-bold">
              {currentClue.badge || `CLUE 0${currentClueIndex + 1}`}
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-charcoal/60">
            <span>SEAL: {currentClueIndex + 1} / {clues.length}</span>
            <div className="flex gap-1">
              {clues.map((c, i) => (
                <span key={i} className="text-sm">
                  {unlockedClues.includes(c.id) ? '🔓' : '🔒'}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Clue Title & Hand-drawn Riddle */}
        <div className="space-y-4 mb-8">
          <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-semibold">
            {currentClue.title}
          </h3>

          <div className="p-5 bg-paper-100/90 sketch-border-subtle rounded relative">
            <p className="font-handwritten text-2xl sm:text-3xl text-charcoal leading-relaxed">
              "{currentClue.riddle}"
            </p>
          </div>
        </div>

        {/* Clue Form */}
        <form onSubmit={handleCheckAnswer} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={userInput}
                onChange={(e) => {
                  setUserInput(e.target.value);
                  if (clueStatus === 'wrong') setClueStatus('idle');
                }}
                disabled={clueStatus === 'correct'}
                placeholder="Enter password / answer..."
                className="w-full px-4 py-3.5 bg-paper-100 rounded border border-charcoal/30 font-mono text-sm text-charcoal focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal"
              />
              <Key className="w-4 h-4 text-charcoal/40 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {clueStatus !== 'correct' ? (
              <button
                type="submit"
                className="px-6 py-3.5 bg-charcoal text-paper-50 rounded font-mono text-xs uppercase tracking-wider hover:bg-charcoal-deep shadow-sketch transition-all cursor-pointer"
              >
                UNLOCK SEAL
              </button>
            ) : null}
          </div>

          {/* Hint Toggle */}
          {currentClue.hint && clueStatus !== 'correct' && (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="text-xs font-mono text-charcoal/60 hover:text-charcoal flex items-center gap-1.5 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-accentGold" />
                <span>{showHint ? "Hide hint" : "Need a subtle hint?"}</span>
              </button>

              {showHint && (
                <div className="mt-2 p-3 bg-paper-200/80 rounded sketch-border-subtle text-xs font-mono text-charcoal-light animate-fade-in">
                  💡 <span className="font-bold">HINT:</span> {currentClue.hint}
                </div>
              )}
            </div>
          )}

          {/* Feedback messages */}
          {clueStatus === 'correct' && (
            <div className="p-4 bg-emerald-100/90 sketch-border-subtle rounded space-y-3 animate-fade-in border-emerald-600">
              <div className="flex items-center gap-2 text-emerald-900 font-mono text-xs sm:text-sm font-bold">
                <Check className="w-5 h-5 text-emerald-700" />
                <span>CLUE UNLOCKED ✓</span>
              </div>
              <p className="font-mono text-xs text-emerald-950">
                {currentClue.unlockedMessage || "Access verified. Target coordinates recorded."}
              </p>
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleNextClue}
                  className="px-6 py-2.5 bg-emerald-900 text-paper-50 rounded font-mono text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-emerald-950 shadow-sketch cursor-pointer"
                >
                  <span>{currentClueIndex < clues.length - 1 ? "Next Clue →" : "Proceed to Final Reveal →"}</span>
                </button>
              </div>
            </div>
          )}

          {clueStatus === 'wrong' && (
            <div className="p-3 bg-rose-100/90 sketch-border-subtle rounded flex items-center gap-2 text-rose-900 font-mono text-xs animate-fade-in">
              <AlertCircle className="w-4 h-4 text-rose-700 shrink-0" />
              <span>Not quite. Think carefully and try again.</span>
            </div>
          )}
        </form>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4 mt-8">
        <button
          onClick={onPrev}
          className="px-5 py-2.5 border border-charcoal/30 hover:border-charcoal text-charcoal rounded font-mono text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-paper-200 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Quiz</span>
        </button>
      </div>

    </section>
  );
}
