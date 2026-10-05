import React, { useState, useEffect } from 'react';
import { friendshipData } from '../data/friendshipData';
import { soundFx } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { Feather, ArrowRight, ArrowLeft, Sparkles, RefreshCw, Eye, CheckCircle, Wand2 } from 'lucide-react';

export default function PortraitReveal({ onNext, onPrev }) {
  const [useSketchMode, setUseSketchMode] = useState(true);
  const portraitPhotoSrc = "/assets/portrait.jpg";
  const pencilSketchSrc = "/assets/pencil-sketch-portrait.jpg";
  const activeSrc = useSketchMode ? pencilSketchSrc : portraitPhotoSrc;

  // 3x3 tiles: initial shuffled state
  const [tiles, setTiles] = useState([4, 0, 7, 1, 8, 3, 6, 2, 5]);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [moves, setMoves] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [showPeek, setShowPeek] = useState(false);

  // Check if puzzle is solved
  const checkSolved = (currentTiles) => {
    return currentTiles.every((val, idx) => val === idx);
  };

  const handleTileClick = (index) => {
    if (isSolved) return;

    if (selectedIdx === null) {
      soundFx.playClick();
      setSelectedIdx(index);
    } else {
      if (selectedIdx === index) {
        setSelectedIdx(null);
        return;
      }

      // Swap tiles
      soundFx.playPencilStroke();
      const newTiles = [...tiles];
      const temp = newTiles[selectedIdx];
      newTiles[selectedIdx] = newTiles[index];
      newTiles[index] = temp;

      setTiles(newTiles);
      setSelectedIdx(null);
      setMoves(prev => prev + 1);

      if (checkSolved(newTiles)) {
        triggerVictory();
      }
    }
  };

  const triggerVictory = () => {
    setIsSolved(true);
    soundFx.playUnlock();
    soundFx.playChime();

    try {
      confetti({
        particleCount: 130,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#D8B878', '#C9828F', '#FFF8ED', '#3A0D1E']
      });
    } catch {
      // safe fallback
    }
  };

  const handleAutoSolve = () => {
    soundFx.playUnlock();
    setTiles([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    triggerVictory();
  };

  const handleResetPuzzle = () => {
    soundFx.playPencilStroke();
    setTiles([4, 0, 7, 1, 8, 3, 6, 2, 5]);
    setSelectedIdx(null);
    setIsSolved(false);
    setMoves(0);
  };

  const handleNext = () => {
    soundFx.playClick();
    onNext();
  };

  return (
    <section className="min-h-[85vh] py-12 px-4 max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
      
      {/* Header */}
      <div className="text-center mb-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-4 py-1 bg-[#3A0D1E]/90 border border-[#D8B878]/40 rounded-full font-mono text-[11px] text-[#D8B878] uppercase tracking-widest shadow-sm">
          <Feather className="w-3.5 h-3.5 text-[#D8B878]" />
          <span>HAND-DRAWN ARTWORK // INTERACTIVE PUZZLE</span>
        </div>

        <h2 className="font-editorial text-3xl sm:text-5xl text-[#2A2421] font-bold uppercase tracking-tight">
          {isSolved ? "THE HAND-DRAWN PORTRAIT" : "PIECE TOGETHER OUR MEMORY"}
        </h2>

        <p className="font-serif text-base sm:text-lg text-[#C47C68] italic max-w-lg mx-auto font-medium">
          {isSolved 
            ? "Every graphite line was etched for you, Lilly." 
            : "Click any two puzzle tiles to swap them and reconstruct the sketch."}
        </p>
      </div>

      {/* Frame of the hand-drawn portrait puzzle */}
      <div className="w-full max-w-md luxury-content-card sketch-border shadow-2xl p-5 sm:p-7 relative mb-8 rounded-2xl">
        <div className="tape-top" />

        {/* Puzzle Controls Toolbar */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E5D5C5] font-mono text-xs">
          <div className="flex items-center gap-2 text-[#2A2421]/80">
            <span className="font-bold text-[#C47C68]">MOVES: {moves}</span>
            {isSolved && (
              <span className="inline-flex items-center gap-1 text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-full text-[10px]">
                <CheckCircle className="w-3 h-3" /> SOLVED
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setUseSketchMode(!useSketchMode)}
              className="px-2 py-1 rounded-full border border-[#E8C5B8] bg-[#FCF9F6] text-[#2A2421]/80 hover:border-[#C47C68] text-[10px] sm:text-[11px] font-mono transition-all cursor-pointer"
              title="Toggle between Pencil Sketch & Photo Mode"
            >
              {useSketchMode ? "✏️ Sketch" : "📷 Photo"}
            </button>

            <button
              onClick={() => setShowPeek(!showPeek)}
              className={`px-2.5 py-1 rounded-full border text-[11px] flex items-center gap-1 transition-all cursor-pointer ${
                showPeek 
                  ? 'bg-[#D8B878] text-[#1D0B16] font-bold border-[#D8B878]' 
                  : 'bg-[#FCF9F6] text-[#2A2421]/70 border-[#E8C5B8] hover:border-[#C47C68]'
              }`}
              title="Preview original portrait"
            >
              <Eye className="w-3 h-3" />
              <span>{showPeek ? "Hide Peek" : "Peek"}</span>
            </button>

            {!isSolved && (
              <>
                <button
                  onClick={handleAutoSolve}
                  className="px-2.5 py-1 rounded-full bg-[#3A0D1E] text-[#D8B878] border border-[#D8B878]/40 hover:bg-[#4E142B] text-[11px] flex items-center gap-1 transition-all cursor-pointer font-semibold shadow-xs"
                  title="Auto-solve puzzle"
                >
                  <Wand2 className="w-3 h-3" />
                  <span>Solve</span>
                </button>

                <button
                  onClick={handleResetPuzzle}
                  className="p-1 rounded-full text-[#2A2421]/50 hover:text-[#2A2421] transition-all cursor-pointer"
                  title="Reset puzzle"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Puzzle Board / Completed Artwork */}
        <div className="relative aspect-[4/3] bg-[#F3EFE6] rounded-xl sketch-border overflow-hidden p-1">
          <div className="absolute inset-0 paper-grain pointer-events-none opacity-60 z-10" />

          {/* Peek Overlay */}
          {showPeek && !isSolved && (
            <div className="absolute inset-0 z-20 bg-black/75 backdrop-blur-xs flex flex-col items-center justify-center p-3">
              <div className="w-full h-full max-h-[85%] rounded-lg overflow-hidden border-2 border-[#D8B878] shadow-2xl relative">
                <img
                  src={portraitPhotoSrc}
                  alt="Original Drawing Reference Photo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-mono text-[10px] text-[#FFF8ED] mt-2 font-bold uppercase tracking-wider">
                [ DRAWING REFERENCE PHOTO ]
              </span>
            </div>
          )}

          {isSolved ? (
            /* Completed Seamless Portrait */
            <div className="w-full h-full relative animate-fade-in">
              <img
                src={activeSrc}
                alt="Hand-drawn portrait of both of us"
                className="w-full h-full object-cover polaroid-develop rounded-lg"
              />
              <div className="absolute inset-0 ring-4 ring-[#D8B878]/50 rounded-lg pointer-events-none" />
            </div>
          ) : (
            /* 3x3 Playable Tile Grid */
            <div className="grid grid-cols-3 grid-rows-3 gap-1 w-full h-full">
              {tiles.map((tileValue, gridIdx) => {
                const row = Math.floor(tileValue / 3);
                const col = tileValue % 3;
                const isSelected = selectedIdx === gridIdx;

                return (
                  <button
                    key={gridIdx}
                    onClick={() => handleTileClick(gridIdx)}
                    className={`relative rounded-md overflow-hidden transition-all duration-200 cursor-pointer ${
                      isSelected 
                        ? 'ring-3 ring-[#D8B878] scale-95 shadow-lg z-20 brightness-110' 
                        : 'hover:opacity-90 hover:scale-[0.98]'
                    }`}
                    style={{
                      backgroundImage: `url("${activeSrc}")`,
                      backgroundSize: '300% 300%',
                      backgroundPosition: `${col * 50}% ${row * 50}%`,
                    }}
                    title={`Click to swap tile`}
                  >
                    {/* Tile number indicator */}
                    <span className="absolute bottom-1 right-1 bg-black/60 text-[#FFF8ED] font-mono text-[9px] px-1 rounded backdrop-blur-xs font-bold">
                      {tileValue + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Dedication Text */}
        {isSolved && (
          <div className="mt-5 pt-4 border-t border-[#E5D5C5] text-center space-y-2 animate-fade-in">
            <p className="font-handwritten text-3xl sm:text-4xl text-[#2A2421] font-bold">
              "{friendshipData.portraitDedication}"
            </p>
          </div>
        )}
      </div>

      {/* Sincere closing text & Next Button */}
      {isSolved && (
        <div className="max-w-md space-y-4 mb-8 animate-fade-in">
          <p className="font-serif text-xl sm:text-2xl text-[#FFF8ED]/95 italic">
            "{friendshipData.finalMessage}"
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onPrev}
              className="px-6 py-3.5 rounded-full border border-[#D8B878]/30 bg-[#3A0D1E]/70 text-[#FFF8ED] font-mono text-xs uppercase tracking-wider hover:bg-[#3A0D1E] transition-all cursor-pointer backdrop-blur-sm shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 inline mr-1" />
              <span>Back to Film</span>
            </button>

            <button
              onClick={handleNext}
              className="px-10 py-4 bg-[#D8B878] text-[#1D0B16] font-bold rounded-full font-mono text-xs sm:text-sm tracking-[0.2em] uppercase flex items-center gap-2 shadow-lg hover:bg-[#EBD096] transition-all cursor-pointer group hover:scale-105"
            >
              <span>DISCOVER FINAL MOMENT</span>
              <ArrowRight className="w-4 h-4 text-[#1D0B16] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
