import React, { useEffect, useRef } from 'react';

/**
 * ============================================================================
 * CINEMATIC ATMOSPHERE — AESTHETIC, LOVABLE & MINIMAL BACKGROUND
 * ============================================================================
 * Clean, smooth, romantic aesthetic:
 * 1. Soft luxury blush & warm ivory organic silk gradient (0 noise, 0 pixelation)
 * 2. Dreamy floating champagne & rose-gold ambient glow orbs
 * 3. Gentle floating golden sparkle stars
 * 4. 100% crystal-clear readability with refined elegance
 */

export default function CinematicAtmosphere({ currentStage = 1 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('resize', handleResize);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Elegant minimal floating sparkles (clean, small, subtle)
    class SparkleStar {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + 10;
        this.size = Math.random() * 2.0 + 1.0;
        this.baseAlpha = Math.random() * 0.45 + 0.15;
        this.speedY = -(Math.random() * 0.25 + 0.1);
        this.speedX = (Math.random() - 0.5) * 0.15;
        this.phase = Math.random() * Math.PI * 2;
        this.phaseSpeed = Math.random() * 0.025 + 0.015;
        this.isGold = Math.random() > 0.4;
      }

      update() {
        if (prefersReducedMotion) return;
        this.y += this.speedY;
        this.x += this.speedX;
        this.phase += this.phaseSpeed;

        if (this.y < -20 || this.x < -20 || this.x > width + 20) {
          this.reset(false);
        }
      }

      draw() {
        const alpha = this.baseAlpha * (0.5 + 0.5 * Math.sin(this.phase));
        if (alpha <= 0.02) return;

        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        if (this.isGold) {
          ctx.fillStyle = `rgba(216, 175, 110, ${alpha})`;
          ctx.shadowColor = 'rgba(216, 184, 120, 0.4)';
          ctx.shadowBlur = 4;
        } else {
          ctx.fillStyle = `rgba(214, 140, 155, ${alpha})`;
          ctx.shadowColor = 'rgba(214, 140, 155, 0.3)';
          ctx.shadowBlur = 3;
        }
        ctx.fill();
        ctx.restore();
      }
    }

    let stars = [];
    const initStars = () => {
      stars = [];
      const count = width < 768 ? 20 : 40;
      for (let i = 0; i < count; i++) {
        stars.push(new SparkleStar());
      }
    };

    initStars();

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      for (let s of stars) {
        s.update();
        s.draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentStage]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      
      {/* 1. Pure Aesthetic Dreamy Soft Blush & Ivory Silk Gradient */}
      <div 
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: 'linear-gradient(135deg, #FBF4EE 0%, #F8E8E8 30%, #F5ECE3 60%, #FBECEE 100%)',
          backgroundSize: '200% 200%',
          animation: 'luxuryGradientShift 24s ease-in-out infinite'
        }}
      />

      {/* 2. Soft Organic Watercolor Glow Blobs (Smooth, Lovable, Minimal) */}
      <div 
        className="absolute w-[650px] h-[650px] rounded-full opacity-60 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(254, 226, 226, 0.8) 0%, rgba(254, 243, 235, 0.3) 50%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'slowOrbFloat1 30s infinite ease-in-out'
        }}
      />
      <div 
        className="absolute w-[550px] h-[550px] rounded-full opacity-50 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(253, 230, 215, 0.75) 0%, rgba(255, 237, 213, 0.25) 50%, transparent 70%)',
          filter: 'blur(70px)',
          animation: 'slowOrbFloat2 35s infinite ease-in-out'
        }}
      />
      <div 
        className="absolute w-[450px] h-[450px] rounded-full opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(245, 208, 215, 0.6) 0%, rgba(255, 245, 245, 0.1) 60%, transparent 75%)',
          filter: 'blur(60px)',
          animation: 'slowOrbFloat1 40s infinite ease-in-out reverse'
        }}
      />

      {/* 3. Soft Champagne Light Sweep */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255, 240, 210, 0.4) 50%, transparent 60%)',
          backgroundSize: '200% 100%',
          animation: 'cinematicLightSweep 14s ease-in-out infinite'
        }}
      />

      {/* 4. Canvas Floating Golden & Rose Sparkles */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

    </div>
  );
}
