import React from 'react';

export default function ChapterHeader({
  chapterNum = "01",
  title = "CHAPTER TITLE",
  metadata = "ARCHIVE ENTRY / 25092023",
  subtitle = ""
}) {
  return (
    <div className="mb-12 border-b border-charcoal/15 pb-6">
      {/* Tiny editorial metadata */}
      <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs text-charcoal/50 tracking-widest uppercase mb-3">
        <span>VOL. 01 // {metadata}</span>
        <span className="text-accentGold font-bold">CHAPTER {chapterNum}</span>
      </div>

      {/* Main Chapter Layout */}
      <div className="flex items-baseline gap-4 sm:gap-6">
        <span className="font-editorial text-5xl sm:text-7xl md:text-8xl text-charcoal/20 font-bold select-none">
          {chapterNum}
        </span>
        <div>
          <h2 className="font-editorial text-2xl sm:text-4xl md:text-5xl text-charcoal font-medium tracking-tight uppercase">
            {title}
          </h2>
          {subtitle && (
            <p className="font-serif text-base sm:text-xl text-charcoal/70 italic mt-1">
              "{subtitle}"
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
