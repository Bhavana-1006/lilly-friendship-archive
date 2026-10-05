import React, { useState, useEffect } from 'react';
import { friendshipConfig } from '../config/friendshipConfig';
import { soundFx } from '../utils/soundEffects';
import { 
  Check, 
  Sparkles, 
  MessageCircle, 
  Laugh, 
  Flame, 
  Smile, 
  Shield, 
  Camera, 
  HeartHandshake,
  ArrowRight,
  Cpu
} from 'lucide-react';

const iconMap = {
  'sparkles': Sparkles,
  'message-circle': MessageCircle,
  'laugh': Laugh,
  'flame': Flame,
  'smile': Smile,
  'shield': Shield,
  'camera': Camera,
  'heart-handshake': HeartHandshake,
};

export default function Stage2Installation({ onNext, onPrev }) {
  const items = friendshipConfig?.installationItems || [];
  const [completedCount, setCompletedCount] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // Progressive installation ticker
  useEffect(() => {
    let timer;
    if (completedCount < items.length) {
      timer = setTimeout(() => {
        setCompletedCount(prev => {
          const next = prev + 1;
          soundFx.playPencilStroke();
          if (next >= items.length) {
            setIsDone(true);
            soundFx.playUnlock();
          }
          return next;
        });
      }, 400);
    }
    return () => clearTimeout(timer);
  }, [completedCount, items.length]);

  // Clean countdown and auto-advance
  useEffect(() => {
    if (!isDone) return;

    const interval = setInterval(() => {
      setCountdown(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [isDone]);

  useEffect(() => {
    if (isDone && countdown === 0) {
      onNext();
    }
  }, [isDone, countdown, onNext]);

  const handleSkip = () => {
    setCompletedCount(items.length);
    setIsDone(true);
    soundFx.playUnlock();
  };

  const handleContinue = () => {
    soundFx.playClick();
    onNext();
  };

  const progressPercent = items.length > 0 
    ? Math.min(100, Math.round((completedCount / items.length) * 100)) 
    : 100;

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16 max-w-3xl mx-auto">
      
      {/* Header card */}
      <div className="w-full bg-paper-50 sketch-border shadow-paper-elevated p-6 sm:p-8 relative">
        
        {/* Paper top tape accent */}
        <div className="tape-top" />

        {/* Title & Terminal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-charcoal/15 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <Cpu className="w-5 h-5 text-accentGold" />
            <h2 className="font-mono text-sm sm:text-base tracking-widest text-charcoal font-bold uppercase">
              INSTALLING FRIENDSHIP.EXE
            </h2>
          </div>
          <span className="font-mono text-xs text-charcoal/60 bg-paper-200 px-2 py-0.5 rounded border border-charcoal/10">
            v2023.09.25
          </span>
        </div>

        {/* Installation Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs font-mono text-charcoal/70 mb-2">
            <span>UNPACKING CORE PACKAGES...</span>
            <span className="font-bold text-charcoal">{progressPercent}%</span>
          </div>
          <div className="w-full h-3 bg-paper-200 border border-charcoal/20 rounded-full overflow-hidden p-0.5">
            <div 
              className="h-full bg-charcoal rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Item checklist */}
        <div className="space-y-3 font-mono text-xs sm:text-sm text-charcoal mb-8">
          {items.map((item, index) => {
            const isInstalled = index < completedCount;
            const IconComp = (item?.icon && iconMap[item.icon]) ? iconMap[item.icon] : Sparkles;

            return (
              <div 
                key={index}
                className={`flex items-center justify-between p-2 rounded transition-all duration-300 ${
                  isInstalled ? 'bg-paper-100/90 text-charcoal' : 'text-charcoal/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <IconComp className={`w-4 h-4 ${isInstalled ? 'text-accentGold' : 'text-charcoal/20'}`} />
                  <span className={isInstalled ? 'font-medium' : ''}>{item?.name || 'Package'}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-charcoal/40 hidden sm:inline">................</span>
                  {isInstalled ? (
                    <span className="inline-flex items-center gap-1 text-emerald-800 font-bold bg-emerald-100/60 px-2 py-0.5 rounded border border-emerald-300 text-xs">
                      <Check className="w-3.5 h-3.5" /> INSTALLED
                    </span>
                  ) : (
                    <span className="text-charcoal/40 text-xs">PENDING</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Completed State Callout */}
        {isDone ? (
          <div className="border-t border-charcoal/15 pt-6 text-center space-y-4 animate-fade-in">
            <div className="inline-block classified-stamp text-xs font-mono font-bold">
              ✓ INSTALLATION COMPLETE
            </div>
            
            <p className="font-serif text-xl sm:text-2xl text-charcoal italic">
              "{friendshipConfig?.installationFooterText || 'Somehow, it has been running seamlessly ever since.'}"
            </p>

            <div className="pt-2 flex flex-col items-center justify-center gap-3">
              <button
                onClick={handleContinue}
                className="w-full sm:w-auto px-8 py-3.5 bg-charcoal text-paper-50 rounded font-mono text-xs sm:text-sm tracking-widest uppercase flex items-center justify-center gap-2 shadow-sketch hover:bg-charcoal-deep transition-all cursor-pointer ring-2 ring-accentGold/40 animate-pulse"
              >
                <span>CONTINUE TO COUNTER</span>
                <ArrowRight className="w-4 h-4 text-accentGold" />
              </button>
              
              <span className="text-[11px] font-mono text-charcoal/60">
                Auto-advancing in <span className="font-bold text-accentGold">{countdown}s</span>...
              </span>
            </div>
          </div>
        ) : (
          <div className="flex justify-end border-t border-charcoal/10 pt-4">
            <button
              onClick={handleSkip}
              className="text-xs font-mono text-charcoal/50 hover:text-charcoal underline underline-offset-4 cursor-pointer"
            >
              [ Skip installation animation ]
            </button>
          </div>
        )}
      </div>

    </section>
  );
}
