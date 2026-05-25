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
  const horseContainerRef = useRef<HTMLDivElement>(null);
  const horseSvgRef = useRef<SVGSVGElement>(null);
  const sunGlowRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const canvas = canvasRef.current;
    const horseContainer = horseContainerRef.current;
    const horseSvg = horseSvgRef.current;
    const sunGlow = sunGlowRef.current;
    const logo = logoRef.current;

    if (!overlay || !horseContainer || !horseSvg || !sunGlow || !logo || !canvas) return;

    // --- CANVAS STARFIELD & BURST SYSTEM ---
    let animationFrameId: number;
    const ctx = canvas.getContext("2d");
    const particles: any[] = [];
    const burstParticles: any[] = [];
    let isExploded = false;
    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;

    if (ctx) {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      // Twinkling background stars
      for (let i = 0; i < 90; i++) {
        particles.push({
          x: Math.random() * canvasWidth,
          y: Math.random() * canvasHeight * 0.7, // Keep stars in top 70% of sky
          radius: Math.random() * 2.0 + 0.5,
          color: `rgba(212, 175, 55, ${Math.random() * 0.5 + 0.15})`,
          speedX: Math.random() * 0.2 - 0.1,
          speedY: Math.random() * -0.3 - 0.05,
          twinkleSpeed: Math.random() * 0.03 + 0.005,
          twinkleVal: Math.random(),
        });
      }

      const drawParticles = () => {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Render ambient stars
        particles.forEach((p) => {
          p.y += p.speedY;
          p.x += p.speedX;
          if (p.y < -10) p.y = canvasHeight * 0.7 + 10;
          if (p.x < -10 || p.x > canvasWidth + 10) p.x = Math.random() * canvasWidth;

          p.twinkleVal += p.twinkleSpeed;
          const alpha = Math.sin(p.twinkleVal) * 0.3 + 0.4;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 175, 55, ${alpha})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#D4AF37";
          ctx.fill();
        });

        // Render solar flare burst particles
        if (isExploded) {
          burstParticles.forEach((bp, index) => {
            bp.x += bp.vx;
            bp.y += bp.vy;
            bp.vy += 0.025; // slight gravity
            bp.alpha -= bp.decay;
            bp.radius *= 0.975; // slowly shrink

            if (bp.alpha <= 0 || bp.radius <= 0.2) {
              burstParticles.splice(index, 1);
            } else {
              ctx.beginPath();
              ctx.arc(bp.x, bp.y, bp.radius, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(255, 225, 150, ${bp.alpha})`;
              ctx.shadowBlur = 15;
              ctx.shadowColor = "#D4AF37";
              ctx.fill();
            }
          });
        }

        animationFrameId = requestAnimationFrame(drawParticles);
      };

      drawParticles();
    }

    // Trigger sunburst explosion at peak location (Center, ~71% height)
    const triggerExplosion = () => {
      isExploded = true;
      const originX = canvasWidth / 2;
      const originY = canvasHeight * 0.71;

      for (let i = 0; i < 180; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 3.0;
        burstParticles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.5, // bias upwards
          radius: Math.random() * 4.5 + 1.5,
          alpha: 1.0,
          decay: Math.random() * 0.012 + 0.006,
        });
      }
    };

    // Handle viewport resize
    const handleResize = () => {
      if (!canvas) return;
      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    };
    window.addEventListener("resize", handleResize);

    // --- HORSE SKELETAL WALK CYCLE TIMELINE ---
    const walkCycle = gsap.timeline({ repeat: -1 });

    // Front Leg 1 swings: forward then backward
    walkCycle.fromTo("#front-leg-1",
      { rotation: -20, transformOrigin: "59px 52px" },
      { rotation: 20, duration: 0.6, ease: "power1.inOut", yoyo: true, repeat: -1 },
      0
    );
    // Front Leg 2 swings in opposite direction
    walkCycle.fromTo("#front-leg-2",
      { rotation: 20, transformOrigin: "63px 52px" },
      { rotation: -20, duration: 0.6, ease: "power1.inOut", yoyo: true, repeat: -1 },
      0
    );
    // Back Leg 1 swings: backward then forward
    walkCycle.fromTo("#back-leg-1",
      { rotation: 16, transformOrigin: "34px 50px" },
      { rotation: -16, duration: 0.6, ease: "power1.inOut", yoyo: true, repeat: -1 },
      0
    );
    // Back Leg 2 swings in opposite direction
    walkCycle.fromTo("#back-leg-2",
      { rotation: -16, transformOrigin: "38px 50px" },
      { rotation: 16, duration: 0.6, ease: "power1.inOut", yoyo: true, repeat: -1 },
      0
    );
    // Body bobs up and down slightly (at twice the walk frequency to match steps)
    walkCycle.fromTo("#horse-body-group",
      { y: 0 },
      { y: -3.5, duration: 0.3, ease: "power1.inOut", yoyo: true, repeat: -1 },
      0
    );
    // Tail swings gently
    walkCycle.fromTo("#horse-tail",
      { rotation: -6, transformOrigin: "30px 47px" },
      { rotation: 6, duration: 0.9, ease: "power1.inOut", yoyo: true, repeat: -1 },
      0
    );

    // --- MAIN TIMELINE ---
    const mainTimeline = gsap.timeline();

    // Initial state configurations
    gsap.set(horseContainer, {
      left: "0vw",
      top: "84svh",
      scale: 0.85,
      rotation: -12,
      opacity: 0,
    });
    gsap.set(sunGlow, { scale: 0.1, opacity: 0 });
    gsap.set(logo, { opacity: 0, y: 50, scale: 0.92 });

    // 1. Initial fade-in of the walking horse
    mainTimeline.to(horseContainer, {
      opacity: 1,
      duration: 1.0,
      ease: "power2.out",
    });

    // 2. Horse walks/climbs up the mountain slope
    mainTimeline.to(horseContainer, {
      left: "48vw",
      top: "71.2svh",
      scale: 0.85,
      rotation: -10,
      duration: 5.2,
      ease: "power1.inOut",
    });

    // 3. Reach the peak: Pause walk cycle and stand still
    mainTimeline.to({}, {
      duration: 0.1,
      onStart: () => {
        // Pause walk animations
        walkCycle.pause();

        // Smoothly return leg/body rotations to standing/neutral pose
        gsap.to(["#front-leg-1", "#front-leg-2", "#back-leg-1", "#back-leg-2", "#horse-body-group", "#horse-tail"], {
          rotation: 0,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        });

        // Set container angle flatter on peak
        gsap.to(horseContainer, {
          rotation: -4,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    });

    // Brief pause standing at the peak
    mainTimeline.to({}, { duration: 0.4 });

    // 4. Rears Up Majestically at the peak (Rearing skeletal pose)
    mainTimeline.to({}, {
      duration: 1.4,
      onStart: () => {
        // Rotate body backwards around hip area (35px 52px)
        gsap.to("#horse-body-group", {
          rotation: -42,
          transformOrigin: "35px 52px",
          duration: 1.2,
          ease: "back.out(1.2)",
        });

        // Lift and bend front legs
        gsap.to("#front-leg-1", {
          rotation: -55,
          transformOrigin: "59px 52px",
          duration: 1.2,
          ease: "back.out(1.2)",
        });
        gsap.to("#front-leg-2", {
          rotation: -45,
          transformOrigin: "63px 52px",
          duration: 1.2,
          ease: "back.out(1.2)",
        });

        // Bend back legs to support rearing weight
        gsap.to("#back-leg-1", {
          rotation: 12,
          transformOrigin: "34px 50px",
          duration: 1.2,
          ease: "power2.out",
        });
        gsap.to("#back-leg-2", {
          rotation: 8,
          transformOrigin: "38px 50px",
          duration: 1.2,
          ease: "power2.out",
        });

        // Tail sweeps down
        gsap.to("#horse-tail", {
          rotation: -25,
          transformOrigin: "30px 47px",
          duration: 1.2,
          ease: "power2.out",
        });

        // Scale container slightly
        gsap.to(horseContainer, {
          scale: 0.95,
          y: -10,
          duration: 1.2,
          ease: "back.out(1.2)",
        });

        // Trigger sunburst glow expansion
        gsap.to(sunGlow, {
          scale: 4.5,
          opacity: 1,
          duration: 1.8,
          ease: "power2.out",
        });

        // Trigger particle blast
        setTimeout(triggerExplosion, 350);

        // Fade in logo behind the peak
        gsap.to(logo, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.8,
          ease: "power3.out",
          delay: 0.3,
        });
      }
    });

    // Hold the majestic view
    mainTimeline.to({}, { duration: 3.4 });

    // 5. Fade out everything and lift intro overlay
    mainTimeline.to([horseContainer, logo, sunGlow, canvas, ".mountain-layer"], {
      opacity: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: "power3.in",
      onComplete: () => {
        gsap.to(overlay, {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
          onComplete: () => {
            walkCycle.kill();
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", handleResize);
            onFinished();
          },
        });
      },
    });

    return () => {
      walkCycle.kill();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      mainTimeline.kill();
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
      className="fixed inset-0 z-[100] overflow-hidden bg-[#030206] flex flex-col justify-between"
      style={{
        background: "linear-gradient(to bottom, #030206 0%, #0c0816 40%, #1a0f24 70%, #30172e 100%)",
      }}
    >
      {/* Twilight Starfield */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Dynamic Sun Flare Behind Peak */}
      <div
        ref={sunGlowRef}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "250px",
          height: "250px",
          background: "radial-gradient(circle, rgba(255,223,120,0.45) 0%, rgba(212,175,55,0.2) 40%, rgba(255,110,30,0.08) 70%, transparent 100%)",
          transform: "translate(-50%, -50%)",
          top: "71.2svh",
          left: "50vw",
          filter: "blur(20px)",
          zIndex: 5,
        }}
      />

      {/* Cinematic Mountain Range Back layer */}
      <svg
        className="mountain-layer absolute bottom-0 left-0 w-full h-[55svh] z-2 opacity-30 pointer-events-none"
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
      >
        <path d="M0,600 L0,480 L180,380 L400,490 L680,290 L950,420 L1200,310 L1440,430 L1440,600 Z" fill="#180e22" />
      </svg>

      {/* Cinematic Mountain Range Front layer (Main Walking Slope) */}
      <svg
        className="mountain-layer absolute bottom-0 left-0 w-full h-[45svh] z-10 pointer-events-none"
        viewBox="0 0 1440 500"
        preserveAspectRatio="none"
      >
        <path d="M0,500 L0,380 C180,320 320,440 550,290 C720,180 850,280 1100,210 C1280,160 1380,240 1440,210 L1440,500 Z" fill="#08070c" />
        <path d="M0,380 C180,320 320,440 550,290 C720,180 850,280 1100,210 C1280,160 1380,240 1440,210" stroke="#D4AF37" strokeWidth="1.2" strokeOpacity="0.2" fill="none" />
      </svg>

      {/* Climbing & Rearing Majestic Horse Silhouette with joints */}
      <div
        ref={horseContainerRef}
        className="absolute pointer-events-none select-none"
        style={{
          width: "145px",
          height: "145px",
          zIndex: 15,
          transform: "translate(-50%, -100%)", // anchors horse's feet
        }}
      >
        <svg
          ref={horseSvgRef}
          viewBox="0 0 100 100"
          className="w-full h-full text-[#08070c] fill-current drop-shadow-[0_0_15px_rgba(212,175,55,0.55)]"
        >
          {/* Far legs (drawn behind body) */}
          <path
            id="back-leg-2"
            d="M36,50 Q31,58 33,68 L29,82 L32,82 L35,72 Q36,62 39,50 Z"
            fill="#040306"
          />
          <path
            id="front-leg-2"
            d="M62,52 L64,66 L62,76 L64,82 L66,82 L65,76 L66,66 L64,52 Z"
            fill="#040306"
          />

          {/* Body group (contains body, head, neck, tail) */}
          <g id="horse-body-group">
            <path
              id="horse-tail"
              d="M30,47 C25,50 19,55 15,65 C13,70 11,78 11,83 C13,83 16,78 19,72 C22,66 25,58 29,52 Z"
              fill="#040306"
            />
            {/* Main Torso, Neck & Head silhouette */}
            <path
              d="M32,45 C38,44 48,44 54,46 C58,42 62,32 66,22 C67,18 70,16 73,15 C76,14 78,16 79,18 C80,20 78,22 76,23 C74,24 72,26 73,28 C74,30 77,29 79,28 C81,27 83,28 84,30 C85,32 84,34 81,36 C78,38 75,41 73,45 C71,48 70,52 68,55 C64,57 58,57 52,56 C44,55 38,55 32,53 C29,51 28,48 32,45 Z"
              fill="#08070c"
            />
          </g>

          {/* Near legs (drawn in front of body) */}
          <path
            id="back-leg-1"
            d="M33,50 Q29,60 31,70 L27,82 L30,82 L33,72 Q34,62 37,50 Z"
            fill="#08070c"
          />
          <path
            id="front-leg-1"
            d="M58,52 L60,66 L58,76 L60,82 L62,82 L61,76 L62,66 L60,52 Z"
            fill="#08070c"
          />
        </svg>
      </div>

      {/* RoyalHorse Logo (fades in behind the peak in sky) */}
      <div
        ref={logoRef}
        className="absolute inset-x-0 flex flex-col items-center justify-center pointer-events-none"
        style={{
          top: "18svh",
          zIndex: 8,
        }}
      >
        <div className="text-center px-6">
          {/* Luxury Crown SVG */}
          <div className="flex justify-center mb-6">
            <svg width="60" height="34" viewBox="0 0 60 34" fill="none" className="drop-shadow-[0_0_12px_rgba(212,175,55,0.7)]">
              <defs>
                <linearGradient id="goldIntroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#AA820A" />
                  <stop offset="30%" stopColor="#D4AF37" />
                  <stop offset="70%" stopColor="#F3E5AB" />
                  <stop offset="100%" stopColor="#AA820A" />
                </linearGradient>
              </defs>
              <path d="M4 30 L12 10 L22 20 L30 4 L38 20 L48 10 L56 30 Z" fill="url(#goldIntroGrad)" />
              <circle cx="30" cy="4" r="2.5" fill="#FCFBF9" />
              <circle cx="12" cy="10" r="2" fill="#FCFBF9" />
              <circle cx="48" cy="10" r="2" fill="#FCFBF9" />
              <line x1="4" y1="30" x2="56" y2="30" stroke="#D4AF37" strokeWidth="2.5" />
            </svg>
          </div>
          <h1
            className="font-serif font-bold tracking-[0.24em] text-white"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 5.5rem)",
              textShadow: "0 0 40px rgba(212,175,55,0.45), 0 2px 14px rgba(0,0,0,0.9)",
            }}
          >
            ROYAL<span className="text-[#D4AF37]">HORSE</span>
          </h1>
          <div className="mt-4 flex items-center justify-center gap-4">
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
      <div className="w-full p-8 flex justify-end items-end z-20">
        <button
          onClick={handleSkip}
          className="text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer"
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
    </div>
  );
}
