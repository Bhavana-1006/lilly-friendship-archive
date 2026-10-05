import React, { useState } from 'react';
import { friendshipData } from '../data/friendshipData';
import { soundFx } from '../utils/soundEffects';
import { ArrowRight, ArrowLeft, BookOpen, Sparkles, Heart, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

export default function Magazine10Pages({ onNext, onPrev }) {
  const [currentPage, setCurrentPage] = useState(1);
  const magazine = friendshipData.magazine;
  const pages = magazine.pages;
  const pageData = pages[currentPage - 1] || pages[0];

  const handleNextPage = () => {
    soundFx.playPencilStroke();
    if (currentPage < pages.length) {
      setCurrentPage(prev => prev + 1);
    } else {
      // Reached page 10, proceed to 21st Birthday Page
      soundFx.playUnlock();
      onNext();
    }
  };

  const handlePrevPage = () => {
    soundFx.playPencilStroke();
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    } else {
      onPrev();
    }
  };

  const handleJumpToPage = (pageNum) => {
    soundFx.playPencilStroke();
    setCurrentPage(pageNum);
  };

  return (
    <section className="min-h-[85vh] py-12 px-4 max-w-5xl mx-auto flex flex-col justify-center">
      
      {/* Magazine Masthead */}
      <div className="text-center mb-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-4 py-1 bg-[#3A0D1E]/80 border border-[#D8B878]/40 rounded-full font-mono text-[11px] text-[#D8B878] uppercase tracking-widest shadow-md backdrop-blur-sm">
          <BookOpen className="w-3.5 h-3.5 text-[#D8B878]" />
          <span>EXCLUSIVE MEMORY PUBLICATION</span>
        </div>

        <h2 className="font-editorial text-3xl sm:text-5xl text-[#2A2421] font-bold uppercase tracking-tight">
          {magazine.issueTitle}
        </h2>

        <p className="font-serif text-base sm:text-lg text-[#C47C68] italic font-medium">
          "{magazine.tagline}"
        </p>
      </div>

      {/* 10-Page Interactive Leaf Reader */}
      <div className="luxury-content-card sketch-border shadow-2xl p-6 sm:p-10 mb-8 relative rounded-2xl">
        <div className="tape-top" />

        {/* Top Leaf Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5D5C5] pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="bg-[#FCF9F6] border border-[#E8C5B8] px-3 py-1 rounded-full font-mono text-xs font-bold text-[#C47C68]">
              PAGE {String(currentPage).padStart(2, '0')} / 10
            </span>
            <span className="font-mono text-xs text-[#2A2421]/60 uppercase hidden sm:inline">
              • {pageData.date}
            </span>
          </div>

          {/* Quick Page Picker Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto py-1">
            {pages.map((p) => (
              <button
                key={p.pageNumber}
                onClick={() => handleJumpToPage(p.pageNumber)}
                className={`w-7 h-7 rounded-full font-mono text-xs flex items-center justify-center transition-all cursor-pointer ${
                  p.pageNumber === currentPage
                    ? 'bg-[#C47C68] text-white font-bold ring-2 ring-[#C47C68]/40 scale-110 shadow-sm'
                    : p.pageNumber < currentPage
                    ? 'bg-[#E8C5B8]/80 text-[#2A2421] hover:bg-[#C47C68] hover:text-white'
                    : 'bg-[#FCF9F6] text-[#2A2421]/50 border border-[#E5D5C5] hover:border-[#C47C68]'
                }`}
                title={`Jump to Page ${p.pageNumber}`}
              >
                {p.pageNumber}
              </button>
            ))}
          </div>
        </div>

        {/* Active Page Content (with page turn animation) */}
        <div key={currentPage} className="magazine-page-enter grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-6">
          
          {/* Photograph Slot */}
          <div className="md:col-span-6 bg-[#FCF9F6] p-3.5 sketch-border shadow-md scrapbook-polaroid">
            <div className="aspect-[4/3] sm:aspect-[1/1] overflow-hidden rounded bg-[#FAF0E8] relative photo-shimmer">
              <img
                src={pageData.image}
                alt={pageData.title}
                onError={(e) => {
                  if (pageData.fallbackImage && e.target.src !== pageData.fallbackImage) {
                    e.target.src = pageData.fallbackImage;
                  }
                }}
                className="w-full h-full object-cover polaroid-develop grayscale contrast-105 hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-[#2A2421]/60">
              <span className="font-semibold text-[#C47C68]">{pageData.annotation}</span>
              <span>MAGAZINE MEMORY</span>
            </div>
          </div>

          {/* Story Column */}
          <div className="md:col-span-6 space-y-5">
            <div className="border-l-2 border-[#C47C68] pl-4 space-y-1">
              <span className="font-mono text-[11px] text-[#C5A059] font-bold tracking-widest uppercase">
                ENTRY {String(currentPage).padStart(2, '0')}
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-[#2A2421] font-semibold leading-tight">
                {pageData.title}
              </h3>
            </div>

            {/* Story & Editorial Pull-Quote */}
            <p className="font-sans text-sm sm:text-base text-[#2A2421]/85 leading-relaxed bg-[#FCF9F6]/80 p-4 rounded sketch-border-subtle shadow-sm">
              {pageData.story}
            </p>

            {pageData.quote && (
              <div className="p-3.5 bg-[#FCF9F6] rounded border-l-2 border-[#C5A059] sketch-border-subtle">
                <p className="font-serif text-base sm:text-lg text-[#C47C68] italic font-medium">
                  "{pageData.quote}"
                </p>
              </div>
            )}

            <div className="p-3 bg-[#FAF0E8] rounded sketch-border-subtle font-mono text-xs text-[#2A2421]/70 flex items-center gap-2">
              <Heart className="w-3.5 h-3.5 text-[#C47C68] fill-[#C47C68] shrink-0" />
              <span>{pageData.annotation}</span>
            </div>
          </div>

        </div>

        {/* Page Flip Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-[#E5D5C5]">
          <button
            onClick={handlePrevPage}
            className="px-5 py-2.5 rounded-full border border-[#E8C5B8] bg-[#FCF9F6] text-[#2A2421] font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#FAF0E8] transition-all cursor-pointer shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{currentPage === 1 ? "Back to Counter" : "Previous Page"}</span>
          </button>

          <span className="font-mono text-xs text-[#2A2421]/60 font-medium hidden sm:inline">
            Turn pages to discover all 10 memories
          </span>

          <button
            onClick={handleNextPage}
            className="px-6 py-2.5 rounded-full bg-[#D8B878] text-[#1D0B16] font-bold font-mono text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-[#EBD096] shadow-md hover:scale-105 transition-all cursor-pointer"
          >
            <span>{currentPage === 10 ? "CELEBRATE 21ST BIRTHDAY →" : `Page ${currentPage + 1} →`}</span>
          </button>
        </div>

      </div>

    </section>
  );
}
