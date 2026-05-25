"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface HorseIntroProps {
  lang: "bg" | "en" | "ru";
  onFinished: () => void;
}

export default function HorseIntro({ lang, onFinished }: HorseIntroProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const horseWrapRef = useRef<HTMLDivElement>(null);
  const headGroupRef = useRef<SVGGElement>(null);
  const leftEarRef = useRef<SVGPathElement>(null);
  const rightEarRef = useRef<SVGPathElement>(null);
  const leftEyeRef = useRef<SVGCircleElement>(null);
  const rightEyeRef = useRef<SVGCircleElement>(null);
  const nostrilsRef = useRef<SVGGElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const canvas = canvasRef.current;
    const horseWrap = horseWrapRef.current;
    const headGroup = headGroupRef.current;
    const leftEar = leftEarRef.current;
    const rightEar = rightEarRef.current;
    const leftEye = leftEyeRef.current;
    const rightEye = rightEyeRef.current;
    const nostrils = nostrilsRef.current;
    const logo = logoRef.current;

    if (!overlay || !horseWrap || !headGroup || !logo) return;

    // --- CANVAS PARTICLE SYSTEM ---
    let animationFrameId: number;
    const ctx = canvas?.getContext("2d");
    const particles: any[] = [];
    const burstParticles: any[] = [];
    let isExploded = false;
    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;

    if (canvas && ctx) {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      // Initialize background floating particles
      for (let i = 0; i < 70; i++) {
        particles.push({
          x: Math.random() * canvasWidth,
          y: Math.random() * canvasHeight,
          radius: Math.random() * 2.2 + 0.6,
          color: `rgba(212, 175, 55, ${Math.random() * 0.4 + 0.15})`,
          speedX: Math.random() * 0.4 - 0.2,
          speedY: Math.random() * -0.5 - 0.1,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinkleVal: Math.random(),
        });
      }

      const drawParticles = () => {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Render ambient particles
        particles.forEach((p) => {
          p.y += p.speedY;
          p.x += p.speedX;
          if (p.y < -10) p.y = canvasHeight + 10;
          if (p.x < -10 || p.x > canvasWidth + 10) p.x = Math.random() * canvasWidth;

          p.twinkleVal += p.twinkleSpeed;
          const alpha = Math.sin(p.twinkleVal) * 0.25 + 0.35;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 175, 55, ${alpha})`;
          ctx.shadowBlur = 12;
          ctx.shadowColor = "#D4AF37";
          ctx.fill();
        });

        // Render burst particles if exploded
        if (isExploded) {
          burstParticles.forEach((bp, index) => {
            bp.x += bp.vx;
            bp.y += bp.vy;
            bp.vy += 0.02; // slight gravity
            bp.alpha -= bp.decay;
            bp.radius *= 0.98; // shrink

            if (bp.alpha <= 0 || bp.radius <= 0.2) {
              burstParticles.splice(index, 1);
            } else {
              ctx.beginPath();
              ctx.arc(bp.x, bp.y, bp.radius, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(255, 235, 170, ${bp.alpha})`;
              ctx.shadowBlur = 18;
              ctx.shadowColor = "#D4AF37";
              ctx.fill();
            }
          });
        }

        animationFrameId = requestAnimationFrame(drawParticles);
      };

      drawParticles();
    }

    // Trigger particle explosion from center
    const triggerExplosion = () => {
      isExploded = true;
      const originX = canvasWidth / 2;
      const originY = canvasHeight / 2 - 20;

      // Spawn 150 particles
      for (let i = 0; i < 160; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2.5;
        burstParticles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 4 + 1.5,
          alpha: 1.0,
          decay: Math.random() * 0.015 + 0.008,
        });
      }
    };

    // Handle resize
    const handleResize = () => {
      if (!canvas) return;
      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    };
    window.addEventListener("resize", handleResize);

    // --- GSAP TIMELINE FOR INTRO ---
    const mainTimeline = gsap.timeline();

    // Reset initial states
    gsap.set(horseWrap, { scale: 0.82, opacity: 0, y: 30 });
    gsap.set(logo, { opacity: 0, scale: 0.9, filter: "blur(20px)" });
    gsap.set(headGroup, { rotation: 0, x: 0, y: 0 });

    // 1. Initial fade-in of the horse
    mainTimeline.to(horseWrap, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.5,
      ease: "power3.out",
    });

    // Sub-animation: Breathing (continuous loop)
    const breathTween = gsap.to(horseWrap, {
      y: -6,
      scaleX: 1.01,
      duration: 2.2,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
    });

    // Sub-animation: Eyeblinks (random triggers)
    const blinkInterval = setInterval(() => {
      if (leftEye && rightEye) {
        gsap.timeline()
          .to([leftEye, rightEye], { scaleY: 0.1, duration: 0.12, transformOrigin: "center center" })
          .to([leftEye, rightEye], { scaleY: 1, duration: 0.12, transformOrigin: "center center" });
      }
    }, 4000);

    // Sub-animation: Nostril dilation (breathing sync)
    gsap.to(nostrils, {
      scale: 1.15,
      duration: 2.2,
      yoyo: true,
      repeat: -1,
      transformOrigin: "center center",
      ease: "power1.inOut",
    });

    // 2. Look Left
    mainTimeline.to(headGroup, {
      rotation: -14,
      x: -12,
      duration: 1.6,
      ease: "power2.inOut",
      delay: 0.4,
      onStart: () => {
        // Move ears slightly when turning
        if (leftEar && rightEar) {
          gsap.to(leftEar, { rotation: -10, transformOrigin: "bottom center", duration: 0.8 });
          gsap.to(rightEar, { rotation: -4, transformOrigin: "bottom center", duration: 0.8 });
        }
      }
    });

    // Hold left look
    mainTimeline.to({}, { duration: 0.8 });

    // 3. Look Right
    mainTimeline.to(headGroup, {
      rotation: 14,
      x: 12,
      duration: 1.8,
      ease: "power2.inOut",
      onStart: () => {
        if (leftEar && rightEar) {
          gsap.to(leftEar, { rotation: 5, transformOrigin: "bottom center", duration: 0.8 });
          gsap.to(rightEar, { rotation: 12, transformOrigin: "bottom center", duration: 0.8 });
        }
      }
    });

    // Hold right look
    mainTimeline.to({}, { duration: 0.8 });

    // 4. Return to Center (Looks straight at viewer)
    mainTimeline.to(headGroup, {
      rotation: 0,
      x: 0,
      duration: 1.5,
      ease: "back.out(1.1)",
      onStart: () => {
        if (leftEar && rightEar) {
          gsap.to([leftEar, rightEar], { rotation: 0, transformOrigin: "bottom center", duration: 1.0 });
        }
      }
    });

    // 5. Final Intro: Explode and Reveal Logo
    mainTimeline.to({}, {
      duration: 0.2,
      onComplete: () => {
        // Trigger particle burst
        triggerExplosion();

        // Animate logo appearance
        gsap.to(logo, {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.6,
          ease: "power4.out",
        });

        // Add extra glow to horse when matching center
        gsap.to(horseWrap, {
          scale: 1.05,
          filter: "drop-shadow(0 0 40px rgba(212,175,55,0.7))",
          duration: 1.2,
          ease: "power2.out",
        });
      }
    });

    // Hold final majestic view
    mainTimeline.to({}, { duration: 2.6 });

    // 6. Smooth fade out of everything and slide up overlay
    mainTimeline.to([horseWrap, logo, canvas], {
      opacity: 0,
      y: -30,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.in",
      onComplete: () => {
        gsap.to(overlay, {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
          onComplete: () => {
            clearInterval(blinkInterval);
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", handleResize);
            onFinished();
          }
        });
      }
    });

    return () => {
      clearInterval(blinkInterval);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      mainTimeline.kill();
      breathTween.kill();
    };
  }, [onFinished]);

  const handleSkip = () => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: onFinished,
    });
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] overflow-hidden flex flex-col items-center justify-center bg-[#090807]"
      style={{
        background: "radial-gradient(circle at center, #1b140d 0%, #070605 100%)",
      }}
    >
      {/* Canvas for magic dust and explosion particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Central glow backdrop */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          top: "40%",
          left: "50%",
          filter: "blur(40px)",
        }}
      />

      {/* Living Horse SVG Wrapper */}
      <div
        ref={horseWrapRef}
        className="relative z-10 w-[300px] h-[300px] md:w-[380px] md:h-[380px] flex items-center justify-center pointer-events-none"
        style={{
          filter: "drop-shadow(0 0 25px rgba(212,175,55,0.25))",
        }}
      >
        <svg
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Base Stable Chest / Neck Bottom */}
          <path
            d="M140 330 C150 280, 160 250, 180 230 C200 250, 210 280, 220 330 C230 380, 250 400, 270 410 L110 410 C120 400, 130 380, 140 330 Z"
            fill="url(#goldGrad)"
            opacity="0.85"
          />

          {/* Living/Movable Head Group */}
          <g ref={headGroupRef} id="horse-head">
            {/* Ears */}
            <g id="ears">
              {/* Left Ear */}
              <path
                ref={leftEarRef}
                d="M172 120 C165 95, 160 70, 172 45 C180 70, 182 90, 180 120 Z"
                fill="url(#goldGrad)"
              />
              {/* Right Ear */}
              <path
                ref={rightEarRef}
                d="M228 120 C235 95, 240 70, 228 45 C220 70, 218 90, 220 120 Z"
                fill="url(#goldGrad)"
              />
            </g>

            {/* Mane standing up */}
            <path
              d="M185 130 Q192 105, 200 90 Q208 105, 215 130 Z"
              fill="#523d18"
              opacity="0.6"
            />
            <path
              d="M190 125 C195 108, 198 98, 202 92 C204 98, 207 108, 210 125 Z"
              fill="#D4AF37"
              opacity="0.9"
            />

            {/* Main Head Structure */}
            {/* Forehead & Muzzle */}
            <path
              d="M176 120 C176 120, 200 110, 224 120 C230 135, 235 160, 230 195 C226 220, 224 250, 218 275 C215 290, 185 290, 182 275 C176 250, 174 220, 170 195 C165 160, 170 135, 176 120 Z"
              fill="url(#goldGrad)"
            />
            
            {/* Elegant nose bridge center highlight */}
            <path
              d="M194 120 L206 120 L212 250 C212 250, 200 262, 188 250 Z"
              fill="url(#goldLightGrad)"
              opacity="0.35"
            />

            {/* Nostrils */}
            <g ref={nostrilsRef} id="nostrils">
              <ellipse cx="188" cy="272" rx="4" ry="2.5" fill="#442a08" />
              <ellipse cx="212" cy="272" rx="4" ry="2.5" fill="#442a08" />
            </g>

            {/* Muzzle bottom lip */}
            <path
              d="M190 282 C194 285, 206 285, 210 282 C206 287, 194 287, 190 282 Z"
              fill="#8d651e"
            />

            {/* Eyes */}
            <g id="eyes">
              {/* Left Eye socket & pupil */}
              <ellipse cx="180" cy="162" rx="6.5" ry="4" fill="#3a250b" />
              <circle ref={leftEyeRef} cx="180" cy="162" r="3" fill="#ffffff" />
              <circle cx="181.2" cy="160.8" r="1" fill="#000000" />
              
              {/* Right Eye socket & pupil */}
              <ellipse cx="220" cy="162" rx="6.5" ry="4" fill="#3a250b" />
              <circle ref={rightEyeRef} cx="220" cy="162" r="3" fill="#ffffff" />
              <circle cx="218.8" cy="160.8" r="1" fill="#000000" />
            </g>

            {/* Luxury Star on Forehead (Blaze) */}
            <path
              d="M200 132 L204 142 L214 144 L206 150 L208 160 L200 152 L192 160 L194 150 L186 144 L196 142 Z"
              fill="#FCFBF9"
              opacity="0.95"
              style={{ filter: "drop-shadow(0 0 4px #fff)" }}
            />
          </g>

          {/* Golden gradients definitions */}
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#AA820A" />
              <stop offset="30%" stopColor="#D4AF37" />
              <stop offset="70%" stopColor="#F3E5AB" />
              <stop offset="100%" stopColor="#AA820A" />
            </linearGradient>
            <linearGradient id="goldLightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF2CC" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* RoyalHorse Logo (fades in behind or over the horse in center) */}
      <div
        ref={logoRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        style={{ zIndex: 20 }}
      >
        <div className="text-center px-6">
          {/* Luxury Crown SVG */}
          <div className="flex justify-center mb-6">
            <svg width="60" height="34" viewBox="0 0 60 34" fill="none" className="drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]">
              <path d="M4 30 L12 10 L22 20 L30 4 L38 20 L48 10 L56 30 Z" fill="url(#goldGrad)" />
              <circle cx="30" cy="4" r="2.5" fill="#FCFBF9" />
              <circle cx="12" cy="10" r="2" fill="#FCFBF9" />
              <circle cx="48" cy="10" r="2" fill="#FCFBF9" />
              <line x1="4" y1="30" x2="56" y2="30" stroke="#D4AF37" strokeWidth="2.5" />
            </svg>
          </div>
          <h1
            className="font-serif font-bold tracking-[0.24em] text-white"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 6rem)",
              textShadow: "0 0 40px rgba(212,175,55,0.45), 0 2px 14px rgba(0,0,0,0.9)",
            }}
          >
            ROYAL<span className="text-[#D4AF37]">HORSE</span>
          </h1>
          <div className="mt-2 flex items-center justify-center gap-4">
            <div style={{ width: 50, height: 1.5, background: "linear-gradient(90deg, transparent, #D4AF37)" }} />
            <p
              className="text-xs uppercase tracking-[0.38em] font-light"
              style={{ color: "#F3E5AB", letterSpacing: "0.38em" }}
            >
              {lang === "bg" ? "Е Л И Т Е Н  К О Н Е Н  К Л У Б" : lang === "ru" ? "Э Л И Т Н Ы Й  К О Н Н Ы Й  К Л У Б" : "E L I T E  E Q U E S T R I A N  C L U B"}
            </p>
            <div style={{ width: 50, height: 1.5, background: "linear-gradient(90deg, #D4AF37, transparent)" }} />
          </div>
        </div>
      </div>

      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="absolute bottom-8 right-8 z-30 text-xs font-semibold uppercase tracking-widest transition-all"
        style={{
          color: "rgba(255, 235, 170, 0.6)",
          border: "1px solid rgba(212,175,55,0.25)",
          padding: "11px 22px",
          borderRadius: 999,
          background: "rgba(9,8,7,0.5)",
          backdropFilter: "blur(12px)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#D4AF37";
          e.currentTarget.style.borderColor = "rgba(212,175,55,0.7)";
          e.currentTarget.style.boxShadow = "0 0 15px rgba(212,175,55,0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "rgba(255, 235, 170, 0.6)";
          e.currentTarget.style.borderColor = "rgba(212,175,55,0.25)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {lang === "bg" ? "Пропусни" : lang === "ru" ? "Пропустить" : "Skip"}
      </button>
    </div>
  );
}
