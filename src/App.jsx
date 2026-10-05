import React, { useState, useEffect } from 'react';
import DobGate from './components/DobGate';
import EditorialNav from './components/EditorialNav';
import CinematicAtmosphere from './components/CinematicAtmosphere';
import CinematicIntro from './components/CinematicIntro';
import FriendshipCounter from './components/FriendshipCounter';
import Magazine10Pages from './components/Magazine10Pages';
import Birthday21stWish from './components/Birthday21stWish';
import CuriosityTeaser from './components/CuriosityTeaser';
import CinematicFilmRoom from './components/CinematicFilmRoom';
import PortraitReveal from './components/PortraitReveal';
import PhysicalReveal from './components/PhysicalReveal';
import ClosingPromise from './components/ClosingPromise';
import { friendshipData } from './data/friendshipData';
import { soundFx } from './utils/soundEffects';

export default function App() {
  const [isDobUnlocked, setIsDobUnlocked] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);

  // Smooth scroll to top when stage changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStage, isDobUnlocked]);

  // Handlers
  const handleUnlockDob = () => {
    setIsDobUnlocked(true);
    setCurrentStage(1);
  };

  const handleNext = () => {
    setCurrentStage(prev => Math.min(prev + 1, 9));
  };

  const handlePrev = () => {
    setCurrentStage(prev => Math.max(prev - 1, 1));
  };

  const handleSelectStage = (stageNum) => {
    soundFx.playClick();
    setCurrentStage(stageNum);
  };

  const handleRestart = () => {
    soundFx.playClick();
    setIsDobUnlocked(false);
    setCurrentStage(1);
  };

  // If DOB gate is locked, render the luxury burgundy entry gate
  if (!isDobUnlocked) {
    return <DobGate onUnlock={handleUnlockDob} />;
  }

  return (
    <div className="min-h-screen text-[#2A2421] flex flex-col justify-between selection:bg-[#C47C68] selection:text-[#FFF8ED] relative animate-fade-in overflow-x-hidden">
      
      {/* 1. Cinematic Atmosphere Background System (Layered Gradients, Bokeh Orbs, 3-Depth Particles, Light Sweep) */}
      <CinematicAtmosphere currentStage={currentStage} />

      {/* 2. Top Navigation (Always fixed and clear) */}
      <div className="relative z-30">
        <EditorialNav
          currentStage={currentStage}
          totalStages={9}
          onSelectStage={handleSelectStage}
          onRestart={handleRestart}
        />
      </div>

      {/* 3. Main Experience Flow (High-contrast content cards with backdrop blur) */}
      <main className="flex-1 w-full pt-20 pb-16 transition-all duration-500 relative z-10">
        {currentStage === 1 && <CinematicIntro onNext={handleNext} />}
        {currentStage === 2 && <FriendshipCounter onNext={handleNext} onPrev={handlePrev} />}
        {currentStage === 3 && <Magazine10Pages onNext={handleNext} onPrev={handlePrev} />}
        {currentStage === 4 && <Birthday21stWish onNext={handleNext} onPrev={handlePrev} />}
        {currentStage === 5 && <CuriosityTeaser onNext={handleNext} onPrev={handlePrev} />}
        {currentStage === 6 && <CinematicFilmRoom onNext={handleNext} onPrev={handlePrev} />}
        {currentStage === 7 && <PortraitReveal onNext={handleNext} onPrev={handlePrev} />}
        {currentStage === 8 && <PhysicalReveal onNext={handleNext} />}
        {currentStage === 9 && <ClosingPromise onRestart={handleRestart} />}
      </main>

      {/* 4. Luxury Footer */}
      <footer className="py-6 px-4 border-t border-[#D8B878]/20 bg-[#16060F]/60 backdrop-blur-md text-center font-mono text-[11px] text-[#FFF8ED]/70 relative z-20">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>{friendshipData.title} // {friendshipData.edition}</span>
          <span className="text-[#D8B878] font-semibold tracking-wider">CREATED SPECIALLY FOR LILLY'S 21ST BIRTHDAY 🌸</span>
          <span>TO BE CONTINUED...</span>
        </div>
      </footer>

    </div>
  );
}

