import React, { useState, useEffect, useRef } from 'react';
import { friendshipData } from '../data/friendshipData';
import { filmReelScenes } from '../data/filmReelData';
import { soundFx } from '../utils/soundEffects';
import { 
  Play, Pause, Film, Volume2, VolumeX, Maximize2, 
  ArrowRight, ArrowLeft, Sparkles, Clapperboard, 
  SkipForward, SkipBack, Music 
} from 'lucide-react';

export default function CinematicFilmRoom({ onNext, onPrev }) {
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cinemaLightsOff, setCinemaLightsOff] = useState(false);
  const [isSoundtrackOn, setIsSoundtrackOn] = useState(false);
  const [progress, setProgress] = useState(0);

  const videoRef = useRef(null);
  const photoTimerRef = useRef(null);
  const audioRef = useRef(null);
  const containerRef = useRef(null);

  const scenes = filmReelScenes;
  const currentScene = scenes[currentSceneIdx] || scenes[0];
  const isVideo = currentScene.type === 'video';

  // Play / Pause toggle
  const togglePlay = () => {
    soundFx.playClick();
    if (!isPlaying) {
      setIsPlaying(true);
      if (isVideo && videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
      if (!isSoundtrackOn) {
        setIsSoundtrackOn(true);
        soundFx.toggleSound();
      }
    } else {
      setIsPlaying(false);
      if (isVideo && videoRef.current) {
        videoRef.current.pause();
      }
      if (photoTimerRef.current) {
        clearInterval(photoTimerRef.current);
      }
    }
  };

  // Next Scene
  const handleNextScene = () => {
    soundFx.playPencilStroke();
    setProgress(0);
    if (currentSceneIdx < scenes.length - 1) {
      setCurrentSceneIdx(prev => prev + 1);
    } else {
      // Loop or finish
      setCurrentSceneIdx(0);
    }
  };

  // Prev Scene
  const handlePrevScene = () => {
    soundFx.playPencilStroke();
    setProgress(0);
    if (currentSceneIdx > 0) {
      setCurrentSceneIdx(prev => prev - 1);
    } else {
      setCurrentSceneIdx(scenes.length - 1);
    }
  };

  // Handle Video Time Update
  const handleVideoTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(p);
    }
  };

  // Handle Video Ended -> advance to next scene smoothly
  const handleVideoEnded = () => {
    handleNextScene();
  };

  // Photo duration timer
  useEffect(() => {
    if (!isVideo && isPlaying) {
      const durationMs = (currentScene.duration || 4.5) * 1000;
      const intervalMs = 50;
      let elapsed = 0;

      photoTimerRef.current = setInterval(() => {
        elapsed += intervalMs;
        const p = Math.min(100, (elapsed / durationMs) * 100);
        setProgress(p);

        if (elapsed >= durationMs) {
          clearInterval(photoTimerRef.current);
          handleNextScene();
        }
      }, intervalMs);

      return () => {
        if (photoTimerRef.current) clearInterval(photoTimerRef.current);
      };
    }
  }, [currentSceneIdx, isPlaying, isVideo]);

  // When scene changes, if playing, auto-play video
  useEffect(() => {
    setProgress(0);
    if (isVideo && videoRef.current) {
      videoRef.current.currentTime = 0;
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [currentSceneIdx, isVideo]);

  // Fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Sound toggle
  const toggleSoundtrack = () => {
    const nextState = !isSoundtrackOn;
    setIsSoundtrackOn(nextState);
    soundFx.toggleSound();
  };

  return (
    <section className={`min-h-[85vh] py-12 px-4 max-w-5xl mx-auto flex flex-col justify-center transition-all duration-700 ${
      cinemaLightsOff ? 'bg-[#0E0308] text-white' : ''
    }`}>
      
      {/* Film Header */}
      <div className="text-center mb-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-4 py-1 bg-[#3A0D1E]/90 border border-[#D8B878]/40 rounded-full font-mono text-[11px] text-[#D8B878] uppercase tracking-widest shadow-sm">
          <Clapperboard className="w-3.5 h-3.5 text-[#D8B878]" />
          <span>CONTINUOUS FILM STREAM // LILLY'S CINEMATIC MEMOIR</span>
        </div>

        <h2 className={`font-editorial text-3xl sm:text-5xl font-bold uppercase tracking-tight ${
          cinemaLightsOff ? 'text-white' : 'text-[#2A2421]'
        }`}>
          THE FILM OF US
        </h2>

        <p className="font-serif text-lg sm:text-xl text-[#C47C68] italic font-medium">
          "A continuous seamless movie of all our laughter, adventures, and memories."
        </p>
      </div>

      {/* Cinematic Montage Player Frame */}
      <div 
        ref={containerRef}
        className="bg-[#180B14] rounded-2xl p-3 sm:p-5 shadow-2xl border border-[#D8B878]/30 cinema-glow mb-8 relative overflow-hidden"
      >
        {/* Aspect Container */}
        <div className="aspect-video bg-black rounded-xl overflow-hidden relative group flex items-center justify-center">
          
          {/* 1. Ambient Blurred Backdrop for Portrait media */}
          <div 
            className="absolute inset-0 bg-cover bg-center blur-2xl opacity-40 scale-110 pointer-events-none transition-all duration-700"
            style={{ backgroundImage: `url("${currentScene.src}")` }}
          />

          {/* 2. Media Player with Multi-Directional Cinematic Transitions */}
          <div 
            key={`${currentScene.id}-${currentSceneIdx}`}
            className={`w-full h-full relative z-10 flex items-center justify-center overflow-hidden ${
              currentScene.transition || 'anim-bloom-center'
            }`}
          >
            {isVideo ? (
              <video
                ref={videoRef}
                src={currentScene.src}
                muted={true} // Strict removal of raw background noise
                playsInline
                autoPlay={isPlaying}
                onTimeUpdate={handleVideoTimeUpdate}
                onEnded={handleVideoEnded}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={currentScene.src}
                alt={currentScene.title}
                className={`w-full h-full object-contain transition-all duration-1000 ${
                  currentScene.panDirection === 'zoom-in'
                    ? 'scale-105 animate-pulse'
                    : currentScene.panDirection === 'zoom-out'
                    ? 'scale-100'
                    : currentScene.panDirection === 'pan-right'
                    ? 'translate-x-1 scale-105'
                    : 'scale-105'
                }`}
              />
            )}
          </div>

          {/* 3. Editorial Overlay (Clean Memory Title & Subtitle in negative space without scene stamps) */}
          <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/15 text-left pointer-events-none max-w-[70%]">
            <span className="font-mono text-[11px] text-[#D8B878] font-bold block uppercase tracking-wider">
              {currentScene.title}
            </span>
            <span className="font-serif text-xs text-white/90 italic block">
              {currentScene.subtitle}
            </span>
          </div>

          {/* 4. Film Mode Indicator */}
          <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 font-mono text-[11px] text-[#FFF8ED]/80 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#D8B878] animate-spin" />
            <span>CONTINUOUS CUT</span>
          </div>

          {/* 5. Big Play Overlay if paused */}
          {!isPlaying && (
            <div 
              onClick={togglePlay}
              className="absolute inset-0 z-30 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-black/30"
            >
              <div className="w-20 h-20 rounded-full bg-[#D8B878] text-[#1D0B16] flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110">
                <Play className="w-8 h-8 ml-1 fill-[#1D0B16]" />
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#FFF8ED] mt-4 font-bold">
                PLAY CONTINUOUS MOVIE
              </span>
            </div>
          )}
        </div>

        {/* Player Controls Bar */}
        <div className="pt-4 space-y-3 relative z-20">
          
          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer">
            <div 
              className="h-full bg-gradient-to-r from-[#D8B878] to-[#EBD096] rounded-full transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Controls Buttons Row */}
          <div className="flex items-center justify-between text-[#FFF8ED]">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={handlePrevScene}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
                title="Previous scene"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-[#D8B878] text-[#1D0B16] flex items-center justify-center hover:bg-[#EBD096] transition-all cursor-pointer font-bold shadow-md"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>

              <button
                onClick={handleNextScene}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
                title="Next scene"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              <button
                onClick={toggleSoundtrack}
                className={`px-3 py-1.5 rounded-full font-mono text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSoundtrackOn ? 'bg-[#D8B878] text-[#1D0B16] font-bold' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                title="Toggle soundtrack"
              >
                <Music className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isSoundtrackOn ? "SOUNDTRACK ON" : "MUTED RAW AUDIO"}</span>
              </button>

              <button
                onClick={() => setCinemaLightsOff(!cinemaLightsOff)}
                className={`px-3 py-1.5 rounded-full font-mono text-xs transition-all cursor-pointer ${
                  cinemaLightsOff ? 'bg-[#D8B878] text-[#1D0B16] font-bold' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {cinemaLightsOff ? "💡 LIGHTS ON" : "🎬 CINEMA MODE"}
              </button>
            </div>

            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
              title="Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* Navigation to Artwork */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={onPrev}
          className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-[#D8B878]/30 bg-[#3A0D1E]/70 text-[#FFF8ED] font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#3A0D1E] transition-all cursor-pointer backdrop-blur-sm shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Suspense</span>
        </button>

        <button
          onClick={onNext}
          className="w-full sm:w-auto px-10 py-4 bg-[#D8B878] text-[#1D0B16] font-bold rounded-full font-mono text-xs sm:text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-lg hover:bg-[#EBD096] transition-all cursor-pointer group hover:scale-105"
        >
          <span>PROCEED TO THE ARTWORK</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#1D0B16]" />
        </button>
      </div>

    </section>
  );
}
