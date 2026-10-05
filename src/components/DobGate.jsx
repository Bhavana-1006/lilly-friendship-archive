import React, { useState, useEffect, useRef } from 'react';
import { friendshipData } from '../data/friendshipData';
import { soundFx } from '../utils/soundEffects';
import { Lock, Unlock, Check, Sparkles, ArrowRight, Shield, AlertCircle } from 'lucide-react';

const MONTHS = [
  { val: "01", name: "JANUARY" },
  { val: "02", name: "FEBRUARY" },
  { val: "03", name: "MARCH" },
  { val: "04", name: "APRIL" },
  { val: "05", name: "MAY" },
  { val: "06", name: "JUNE" },
  { val: "07", name: "JULY" },
  { val: "08", name: "AUGUST" },
  { val: "09", name: "SEPTEMBER" },
  { val: "10", name: "OCTOBER" },
  { val: "11", name: "NOVEMBER" },
  { val: "12", name: "DECEMBER" },
];

export default function DobGate({ onUnlock }) {
  // Opening sequence phase: 0: initial dot, 1: expanding circle, 2: header text, 3: full UI ready
  const [openingPhase, setOpeningPhase] = useState(0);

  // Inputs
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('09');
  const [year, setYear] = useState('');

  // Status: 'idle' | 'verifying' | 'verified' | 'failed'
  const [verifyStatus, setVerifyStatus] = useState('idle');
  const [shake, setShake] = useState(false);
  const [isExpandingBeam, setIsExpandingBeam] = useState(false);

  // Focus refs
  const monthRef = useRef(null);
  const yearRef = useRef(null);

  useEffect(() => {
    const t1 = setTimeout(() => setOpeningPhase(1), 600);
    const t2 = setTimeout(() => {
      setOpeningPhase(2);
      soundFx.playPencilStroke();
    }, 1500);
    const t3 = setTimeout(() => {
      setOpeningPhase(3);
      soundFx.playChime();
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleSkipIntro = () => {
    setOpeningPhase(3);
  };

  const handleDayChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
    setDay(val);
    if (val.length === 2 && monthRef.current) {
      monthRef.current.focus();
    }
  };

  const handleYearChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
    setYear(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (verifyStatus === 'verifying' || verifyStatus === 'verified') return;

    soundFx.playClick();
    setVerifyStatus('verifying');

    setTimeout(() => {
      const sanitizedDay = parseInt(day, 10);
      const sanitizedYear = parseInt(year, 10);

      // Validation: Accepts any reasonable valid birthday date entry (e.g. Day 1-31, Year 1990-2015)
      // or exact target match (e.g. Day 25, Month Sept)
      const isValid = (
        sanitizedDay >= 1 && sanitizedDay <= 31 &&
        month &&
        (!year || (sanitizedYear >= 1990 && sanitizedYear <= 2015))
      );

      if (isValid) {
        soundFx.playUnlock();
        soundFx.playChime();
        setVerifyStatus('verified');

        setTimeout(() => {
          setIsExpandingBeam(true);
          setTimeout(() => {
            onUnlock();
          }, 700);
        }, 800);
      } else {
        soundFx.playClick();
        setVerifyStatus('failed');
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    }, 1000);
  };

  const handleRetry = () => {
    soundFx.playClick();
    setVerifyStatus('idle');
    setDay('');
    setYear('');
  };

  return (
    <section className="min-h-screen dob-gate-bg relative flex flex-col items-center justify-center px-4 py-16 text-center select-none overflow-hidden">
      
      {/* Subtle candlelight ambient glow */}
      <div className="absolute inset-0 candlelight-glow pointer-events-none" />

      {/* Floating subtle film grain & dust specks */}
      <div className="absolute inset-0 pointer-events-none opacity-25 paper-grain" />

      {/* Opening Logo Phase 0 & 1: Golden Dot & Expanding Circle */}
      {openingPhase < 2 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={`w-3 h-3 rounded-full bg-[#D8B878] transition-all duration-1000 ${
            openingPhase === 1 ? 'scale-[18] opacity-0 border border-[#D8B878]' : 'scale-100 opacity-100 shadow-[0_0_15px_#D8B878]'
          }`} />
        </div>
      )}

      {/* Expanding Transition Gold Beam upon unlock */}
      {isExpandingBeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none bg-black/60 transition-opacity duration-700">
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#D8B878] to-transparent gold-expand-beam" />
        </div>
      )}

      {/* Top Seal / Metadata */}
      {openingPhase >= 2 && (
        <div className="animate-fade-in mb-8 flex items-center gap-3">
          <div className="w-6 h-6 rounded-full border border-[#D8B878]/40 flex items-center justify-center slow-spin">
            <span className="text-[8px] font-mono text-[#D8B878]">✦</span>
          </div>
          <span className="font-mono text-[11px] text-[#D8B878]/70 tracking-[0.3em] uppercase">
            PRIVATE ARCHIVE // SPECIAL EDITION // 2026
          </span>
        </div>
      )}

      {/* Main Title & Mysterious Subtitle */}
      {openingPhase >= 2 && (
        <div className="max-w-3xl space-y-3 mb-10 animate-fade-in">
          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl text-[#FFF8ED] font-bold tracking-tight uppercase">
            BEFORE WE BEGIN...
          </h1>

          <p className="font-editorial text-xl sm:text-2xl text-[#D8B878] tracking-[0.2em] uppercase font-medium">
            A DATE IS REQUIRED.
          </p>

          <p className="font-mono text-xs sm:text-sm text-[#E7C8C7]/70 tracking-[0.15em] uppercase pt-1">
            ENTER YOUR DATE OF BIRTH TO CONTINUE
          </p>
        </div>
      )}

      {/* DOB Form Gate Card */}
      {openingPhase >= 3 && (
        <div className="w-full max-w-lg bg-[#260B18]/90 dob-gold-border rounded-2xl p-8 sm:p-10 shadow-2xl relative backdrop-blur-md animate-fade-in">
          
          {/* Circular Luxury Seal Stamp */}
          <div className="absolute -top-6 right-6 bg-[#3A0D1E] border border-[#D8B878]/50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
            <Lock className="w-4 h-4 text-[#D8B878]" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Custom Editorial Date Selector */}
            <div className={`grid grid-cols-3 gap-3 sm:gap-4 ${shake ? 'shake-anim' : ''}`}>
              
              {/* Day Input */}
              <div className="flex flex-col items-center gold-underline">
                <span className="font-mono text-[10px] text-[#D8B878]/80 uppercase tracking-widest mb-2 font-bold">
                  DAY
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="DD"
                  value={day}
                  onChange={handleDayChange}
                  disabled={verifyStatus === 'verifying' || verifyStatus === 'verified'}
                  className="w-full h-14 text-center bg-[#1D0B15]/90 dob-gold-border rounded-lg font-editorial text-2xl sm:text-3xl text-[#FFF8ED] tracking-widest focus:outline-none focus:ring-1 focus:ring-[#D8B878]"
                />
              </div>

              {/* Month Selector */}
              <div className="flex flex-col items-center gold-underline">
                <span className="font-mono text-[10px] text-[#D8B878]/80 uppercase tracking-widest mb-2 font-bold">
                  MONTH
                </span>
                <select
                  ref={monthRef}
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  disabled={verifyStatus === 'verifying' || verifyStatus === 'verified'}
                  className="w-full h-14 text-center bg-[#1D0B15]/90 dob-gold-border rounded-lg font-mono text-xs sm:text-sm text-[#FFF8ED] uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-[#D8B878] cursor-pointer px-1"
                >
                  {MONTHS.map((m) => (
                    <option key={m.val} value={m.val} className="bg-[#1D0B15] text-[#FFF8ED]">
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year Input */}
              <div className="flex flex-col items-center gold-underline">
                <span className="font-mono text-[10px] text-[#D8B878]/80 uppercase tracking-widest mb-2 font-bold">
                  YEAR
                </span>
                <input
                  ref={yearRef}
                  type="text"
                  inputMode="numeric"
                  placeholder="YYYY"
                  value={year}
                  onChange={handleYearChange}
                  disabled={verifyStatus === 'verifying' || verifyStatus === 'verified'}
                  className="w-full h-14 text-center bg-[#1D0B15]/90 dob-gold-border rounded-lg font-editorial text-2xl sm:text-3xl text-[#FFF8ED] tracking-widest focus:outline-none focus:ring-1 focus:ring-[#D8B878]"
                />
              </div>

            </div>

            {/* Subtle Birthday Clue Element */}
            <div className="text-center pt-1 border-t border-[#D8B878]/15">
              <p className="font-serif text-base sm:text-lg text-[#C9828F] italic">
                "Some dates are worth remembering."
              </p>
              <p className="font-mono text-[11px] text-[#D8B878]/60 uppercase tracking-widest mt-0.5">
                ENTER YOURS TO OPEN THE ARCHIVE.
              </p>
            </div>

            {/* Action / Verification Status */}
            <div>
              {verifyStatus === 'idle' && (
                <button
                  type="submit"
                  className="w-full py-4 bg-[#3A0D1E] hover:bg-[#4D1229] dob-gold-border text-[#FFF8ED] rounded-lg font-mono text-xs sm:text-sm tracking-[0.25em] uppercase flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer shadow-lg group"
                >
                  <span>ENTER THE ARCHIVE</span>
                  <ArrowRight className="w-4 h-4 text-[#D8B878] group-hover:translate-x-1 transition-transform" />
                </button>
              )}

              {verifyStatus === 'verifying' && (
                <div className="py-4 bg-[#1D0B15] dob-gold-border rounded-lg font-mono text-xs sm:text-sm tracking-[0.25em] text-[#D8B878] flex items-center justify-center gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#D8B878] border-t-transparent animate-spin" />
                  <span>VERIFYING DATE...</span>
                </div>
              )}

              {verifyStatus === 'verified' && (
                <div className="py-4 bg-[#2D1B28] border border-[#D8B878] rounded-lg font-mono text-xs sm:text-sm tracking-[0.25em] text-[#D8B878] flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(216,184,120,0.4)] animate-fade-in font-bold">
                  <Check className="w-5 h-5 text-[#D8B878]" />
                  <span>DATE VERIFIED ✓</span>
                </div>
              )}

              {verifyStatus === 'failed' && (
                <div className="space-y-3 animate-fade-in">
                  <div className="p-3 bg-[#3A0D1E]/90 border border-[#C9828F]/50 rounded-lg text-center space-y-1">
                    <p className="font-editorial text-base text-[#FFF8ED] font-semibold">Hmm...</p>
                    <p className="font-mono text-xs text-[#E7C8C7]">THAT DATE DOESN'T OPEN THIS ARCHIVE.</p>
                  </div>

                  <button
                    type="button"
                    onClick={handleRetry}
                    className="w-full py-2.5 bg-[#1D0B15] hover:bg-[#260B18] dob-gold-border rounded-lg font-mono text-xs uppercase tracking-wider text-[#D8B878] cursor-pointer transition-all"
                  >
                    TRY AGAIN
                  </button>
                </div>
              )}
            </div>

          </form>

        </div>
      )}

      {/* Skip intro button if user is in early phase */}
      {openingPhase < 3 && (
        <div className="absolute bottom-6">
          <button
            onClick={handleSkipIntro}
            className="font-mono text-xs text-[#D8B878]/40 hover:text-[#D8B878] underline underline-offset-4 cursor-pointer"
          >
            [ Skip intro ]
          </button>
        </div>
      )}

    </section>
  );
}
