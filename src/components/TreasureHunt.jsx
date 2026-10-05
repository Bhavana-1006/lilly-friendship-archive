import React, { useState } from 'react';
import ChapterHeader from './ChapterHeader';
import { friendshipData } from '../data/friendshipData';
import { soundFx } from '../utils/soundEffects';
import { Compass, Key, HelpCircle, Check, AlertCircle, ArrowRight, ArrowLeft, Lock } from 'lucide-react';

export default function TreasureHunt({ onNext, onPrev }) {
  const clues = friendshipData.treasureHuntClues;
  const [currentClueIdx, setCurrentClueIdx] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle' | 'verified' | 'denied'
  const [unlockedClues, setUnlockedClues] = useState([]);

  const currentClue = clues[currentClueIdx];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const query = userInput.trim().toLowerCase();
    const isCorrect = currentClue.acceptableAnswers.some(ans => 
      query.includes(ans.toLowerCase()) || ans.toLowerCase().includes(query)
    );

    if (isCorrect) {
      soundFx.playUnlock();
      setStatus('verified');
      if (!unlockedClues.includes(currentClue.id)) {
        setUnlockedClues(prev => [...prev, currentClue.id]);
      }
    } else {
      soundFx.playClick();
      setStatus('denied');
    }
  };

  const handleNextClue = () => {
    soundFx.playClick();
    if (currentClueIdx < clues.length - 1) {
      setCurrentClueIdx(prev => prev + 1);
      setUserInput('');
      setShowHint(false);
      setStatus('idle');
    } else {
      onNext();
    }
  };

  return (
    <section className="min-h-screen py-24 px-4 max-w-3xl mx-auto flex flex-col justify-center">
      
      {/* Chapter 06 Header */}
      <ChapterHeader
        chapterNum="06"
        title="RESTRICTED FILE"
        metadata="CLASSIFIED DOSSIER // DECLASSIFICATION"
        subtitle="Every story leaves clues. Something exists outside this website."
      />

      {/* Clue Secret Document */}
      <div className="bg-paper-50 sketch-border shadow-paper-deep p-6 sm:p-10 relative">
        <div className="tape-top" />

        {/* Dossier Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-charcoal/15 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="classified-stamp text-[10px] font-bold">
              {currentClue.code}
            </span>
            <span className="font-mono text-xs text-charcoal/60 uppercase">
              {currentClue.locationTag}
            </span>
          </div>

          <div className="font-mono text-xs text-charcoal/50">
            OBJECTIVE: {currentClueIdx + 1} / {clues.length}
          </div>
        </div>

        {/* Clue Title & Riddle */}
        <div className="space-y-4 mb-8">
          <h3 className="font-editorial text-2xl sm:text-3xl text-charcoal font-semibold">
            {currentClue.title}
          </h3>

          <div className="p-5 bg-paper-100 sketch-border-subtle rounded">
            <p className="font-serif text-lg sm:text-xl text-charcoal italic leading-relaxed">
              "{currentClue.riddle}"
            </p>
          </div>
        </div>

        {/* Answer Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={userInput}
                onChange={(e) => {
                  setUserInput(e.target.value);
                  if (status === 'denied') setStatus('idle');
                }}
                disabled={status === 'verified'}
                placeholder="Enter coordinate / password..."
                className="w-full px-4 py-3.5 bg-paper-100 rounded border border-charcoal/30 font-mono text-sm text-charcoal focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal"
              />
              <Key className="w-4 h-4 text-charcoal/40 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {status !== 'verified' && (
              <button
                type="submit"
                className="px-8 py-3.5 bg-charcoal text-paper-50 rounded font-mono text-xs uppercase tracking-widest hover:bg-charcoal-deep shadow-sketch transition-all cursor-pointer"
              >
                SUBMIT
              </button>
            )}
          </div>

          {/* Hint Trigger */}
          {currentClue.hint && status !== 'verified' && (
            <div>
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="text-xs font-mono text-charcoal/60 hover:text-charcoal flex items-center gap-1.5 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-accentGold" />
                <span>{showHint ? "Hide hint" : "Need a subtle clue hint?"}</span>
              </button>

              {showHint && (
                <div className="mt-2 p-3 bg-paper-200/80 rounded sketch-border-subtle text-xs font-mono text-charcoal-light animate-fade-in">
                  💡 <span className="font-bold">HINT:</span> {currentClue.hint}
                </div>
              )}
            </div>
          )}

          {/* Verification Feedback */}
          {status === 'verified' && (
            <div className="p-4 bg-emerald-100/90 sketch-border-subtle rounded space-y-3 animate-fade-in border-emerald-600">
              <div className="flex items-center gap-2 text-emerald-900 font-mono text-xs sm:text-sm font-bold">
                <Check className="w-5 h-5 text-emerald-700" />
                <span>{currentClue.verifiedMessage || "CLUE VERIFIED ✓"}</span>
              </div>
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleNextClue}
                  className="px-6 py-2.5 bg-emerald-900 text-paper-50 rounded font-mono text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-emerald-950 shadow-sketch cursor-pointer"
                >
                  <span>{currentClueIdx < clues.length - 1 ? "Next Clue →" : "Proceed to Final Chapter →"}</span>
                </button>
              </div>
            </div>
          )}

          {status === 'denied' && (
            <div className="p-3 bg-rose-100/90 sketch-border-subtle rounded flex items-center gap-2 text-rose-900 font-mono text-xs animate-fade-in">
              <AlertCircle className="w-4 h-4 text-rose-700 shrink-0" />
              <span>ACCESS DENIED — Check your coordinates and retry.</span>
            </div>
          )}
        </form>

      </div>

      {/* Back Button */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={onPrev}
          className="px-5 py-2.5 border border-charcoal/30 hover:border-charcoal text-charcoal rounded font-mono text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-paper-200 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Test</span>
        </button>
      </div>

    </section>
  );
}
