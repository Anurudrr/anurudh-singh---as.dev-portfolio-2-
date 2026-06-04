import React, { useEffect, useRef, useState } from "react";
import anurudhRealPhoto from "../assets/images/anurudh_real_photo.jpg";
import { motion, AnimatePresence } from "motion/react";

// Native hook-like count up logic for the counters inside React
function useCountUp(target: number, duration: number = 1500) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [target, duration]);

  return count;
}

export default function Hero() {
  const [localTime, setLocalTime] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [vibeState, setVibeState] = useState<"code" | "design" | "coffee" | "gaming">("code");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [showCartoon, setShowCartoon] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cartoonTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);

  // Core counter values (triggered instantly)
  const yearsVal = useCountUp(3);
  const projectsVal = useCountUp(3);
  const techVal = useCountUp(8);

  // 3D Mouse Reactive Tilting Interaction
  const handleMouseMoveAvatar = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = -(y / (rect.height / 2)) * 14;
    const rotY = (x / (rect.width / 2)) * 14;
    setTilt({ x: rotX, y: rotY });
  };

  const handleMouseLeaveAvatar = () => {
    setTilt({ x: 0, y: 0 });
  };

  // India time clock and dynamic statuses
  useEffect(() => {
    const updateISTTime = () => {
      const u = new Date();
      const utc = u.getTime() + u.getTimezoneOffset() * 60000;
      const istTime = new Date(utc + 3600000 * 5.5);
      const hours = istTime.getHours();
      const minutes = istTime.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const displayHours = hours % 12 || 12;
      const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
      setLocalTime(`${displayHours}:${displayMinutes} ${ampm} IST`);
      if (hours >= 0 && hours < 7) {
        setStatusMessage("💤 Sleeping & Dreaming of Code");
      } else if (hours >= 7 && hours < 9) {
        setStatusMessage("☕ Sipping Coffee & Reviewing LeetCode");
      } else if (hours >= 9 && hours < 17) {
        setStatusMessage("🎓 In B.Tech CS Lecture at Parul University");
      } else if (hours >= 17 && hours < 23) {
        setStatusMessage("⚡ Building Full-Stack Apps & Designing UI");
      } else {
        setStatusMessage("🦉 Late Night Algo Grind & System Debugging");
      }
    };
    updateISTTime();
    const interval = setInterval(updateISTTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // (Removed old generic eye tracker) — new refined pupil tracking implemented below using refs
  
  useEffect(() => {
    const MAX_DIST = 5; // Dave-like very subtle travel
    const lastMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let rafId: number | null = null;

    const movePupil = (eyeEl: HTMLDivElement, mouseX: number, mouseY: number, idleOffsetX = 0, idleOffsetY = 0) => {
      const rect = eyeEl.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const angle = Math.atan2(mouseY - cy, mouseX - cx);
      const dist = Math.min(
        MAX_DIST,
        Math.hypot(mouseX - cx, mouseY - cy) * 0.15
      );
      const pupil = eyeEl.querySelector('.pupil') as HTMLElement | null;
      if (pupil) {
        const offsetX = Math.cos(angle) * dist + idleOffsetX;
        const offsetY = Math.sin(angle) * dist + idleOffsetY;
        pupil.style.transform =
          `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastMouse.x = e.clientX;
      lastMouse.y = e.clientY;
      if (leftEyeRef.current) movePupil(leftEyeRef.current, e.clientX, e.clientY);
      if (rightEyeRef.current) movePupil(rightEyeRef.current, e.clientX, e.clientY);
    };

    const loop = (t: number) => {
      // idle subtle organic motion using sine waves
      const idleAmp = 1.5; // very small
      const lx = Math.sin(t * 0.0012) * idleAmp; // slow phase
      const ly = Math.cos(t * 0.0017) * idleAmp;
      const rx = Math.sin(t * 0.0015 + 1.3) * idleAmp;
      const ry = Math.cos(t * 0.0011 + 2.1) * idleAmp;

      if (leftEyeRef.current) movePupil(leftEyeRef.current, lastMouse.x, lastMouse.y, lx, ly);
      if (rightEyeRef.current) movePupil(rightEyeRef.current, lastMouse.x, lastMouse.y, rx, ry);

      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const cycleVibe = () => {
    const vibes: ("code" | "design" | "coffee" | "gaming")[] = ["code", "design", "coffee", "gaming"];
    const nextIdx = (vibes.indexOf(vibeState) + 1) % vibes.length;
    setVibeState(vibes[nextIdx]);
  };

  const getVibeConfig = () => {
    switch (vibeState) {
      case "code":
        return { text: "AS", bg: "bg-[#FFE03A]", textCol: "text-black", label: "CODE_ACTIVE" };
      case "design":
        return { text: "UI", bg: "bg-[#E8281A]", textCol: "text-white", label: "PIXEL_CRAFT" };
      case "coffee":
        return { text: "☕", bg: "bg-[#1A5CE8]", textCol: "text-white", label: "CAFFEINE_LOOP" };
      case "gaming":
        return { text: "🎮", bg: "bg-[#0d0d0d]", textCol: "text-[#FFE03A]", label: "RETRO_ARCADE" };
    }
  };

  const currentVibe = getVibeConfig();
  const bioText = "I bridge the divide between creative design and robust systems engineering—building production-ready products that lock tight and render flawlessly. Evolved from graphic design into full-stack Java and Web development.";

  return (
    <>

      <section id="hero" className="min-h-[500px] grid grid-cols-1 lg:grid-cols-2 border-b-[3px] border-[#0d0d0d] relative overflow-hidden bg-[#faf6ec]">
        {/* Decorative vertical CRT line effects */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_28px,rgba(13,13,13,0.03)_28px,rgba(13,13,13,0.03)_29px)] pointer-events-none" />

        {/* LEFT PANEL */}
        <div className="p-6 sm:p-12 lg:p-16 border-r-0 lg:border-r-[3px] lg:border-[#0d0d0d] flex flex-col justify-center relative">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Chapter Metadata */}
            <div className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase opacity-50 mb-4 flex items-center gap-3 select-none">
              <span className="inline-block w-[30px] h-[2px] bg-[#0d0d0d]" />
              CRITICAL_ORIGINS &middot; B.Tech CSE
            </div>

            {/* Heading */}
            <h1 className="font-bangers text-6xl sm:text-7xl lg:text-8xl tracking-wider leading-[0.85] text-[#0d0d0d] mb-4">
              <motion.span
                whileHover={{ rotate: [0, -3, 3, -3, 3, 0] }}
                transition={{ duration: 0.4 }}
                className="text-[#FFE03A] drop-shadow-[5px_5px_0px_#0d0d0d] inline-block cursor-pointer select-none"
                onMouseEnter={(e) => {
                  if (cartoonTimeout.current) clearTimeout(cartoonTimeout.current);
                  setMousePos({ x: e.clientX, y: e.clientY });
                  setShowCartoon(true);
                }}
                onMouseMove={(e) => {
                  setMousePos({ x: e.clientX, y: e.clientY });
                }}
                onMouseLeave={() => {
                  cartoonTimeout.current = setTimeout(() => setShowCartoon(false), 150);
                }}
              >
                ANURUDH
              </motion.span>
              <br />
              SINGH
            </h1>

            {/* Title bar */}
            <div className="font-mono text-xs sm:text-sm tracking-widest text-[#0d0d0d] font-bold uppercase border-l-4 border-[#E8281A] pl-3 mb-6">
              Full Stack Developer &middot; UI/UX Designer
            </div>

            {/* Bio */}
            <p className="font-elite text-sm sm:text-base leading-relaxed text-[#0d0d0d]/80 max-w-lg mb-8 min-h-[90px]">
              {bioText.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.015 + 0.3 }}
                  className="inline-block mr-1"
                >
                  {word}
                </motion.span>
              ))}
            </p>

            {/* IST Status Board */}
            <div className="bg-[#FFE03A]/20 border-[3px] border-black p-4 mb-8 relative max-w-[460px] shadow-[4px_4px_0_#0d0d0d]">
              <div className="absolute top-[-10px] left-4 bg-[#0d0d0d] text-[#FFE03A] border border-black font-mono text-[8px] tracking-widest uppercase px-2 py-0.5">
                IST_LIVE_METRICS
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono">
                <div>
                  <span className="text-[10px] text-[#0d0d0d]/50 block uppercase tracking-wider">LOCAL_TIME</span>
                  <span className="text-sm font-bold text-black">{localTime || "12:00 PM IST"}</span>
                </div>
                <div className="border-t sm:border-t-0 sm:border-l-[2px] border-[#0d0d0d]/30 pt-2 sm:pt-0 sm:pl-4 flex-1">
                  <span className="text-[10px] text-[#0d0d0d]/50 block uppercase tracking-wider">CURRENT_STATUS</span>
                  <span className="text-xs font-bold text-[#E8281A] block">{statusMessage || "Active & Designing"}</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="/projects"
                whileHover={{ scale: 1.05, translateY: "-4px", translateX: "-4px", boxShadow: "7px 7px 0px #0d0d0d" }}
                whileTap={{ scale: 0.95 }}
                className="font-mono text-[10px] sm:text-xs tracking-widest uppercase font-bold px-6 py-3.5 border-3 border-black bg-black text-[#FFE03A] cursor-pointer shadow-[4px_4px_0_#0d0d0d] transition-all inline-block"
              >
                View Work &darr;
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05, translateY: "-4px", translateX: "-4px", boxShadow: "7px 7px 0px #0d0d0d" }}
                whileTap={{ scale: 0.95 }}
                className="font-mono text-[10px] sm:text-xs tracking-widest uppercase font-bold px-6 py-3.5 border-3 border-black bg-transparent text-[#0d0d0d] cursor-pointer shadow-[4px_4px_0_#0d0d0d] transition-all inline-block"
              >
                Get In Touch &rarr;
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex flex-col border-t-[3px] border-[#0d0d0d] lg:border-t-0 min-h-[400px] lg:min-h-0">
          <div className="flex-1 bg-[#FFE03A] border-b-[3px] border-[#0d0d0d] flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#0d0d0d] pointer-events-none opacity-[0.08] [background-image:radial-gradient(#0d0d0d_1.5px,transparent_1.5px)] [background-size:20px_20px]" />
            <div className="absolute top-3 left-3 bg-[#0d0d0d] text-white border border-[#0d0d0d] text-[8px] font-mono uppercase px-2 py-0.5 tracking-wider font-bold">
              VIBE_CONTROLLER: {currentVibe.label} / 2026
            </div>
            <div className="absolute bottom-3 right-3 bg-[#E8281A] text-white font-mono text-[8.5px] uppercase font-extrabold px-2 py-1 select-none animate-pulse border border-black shadow-[2px_2px_0_#000]">
              TAP KEYPAD TO ROTATE VIBE
            </div>
            <motion.div
              onClick={cycleVibe}
              onMouseMove={handleMouseMoveAvatar}
              onMouseLeave={handleMouseLeaveAvatar}
              animate={{ y: [0, -6, 0] }}
              transition={{ y: { repeat: Infinity, duration: 4, ease: "easeInOut" } }}
              className={`relative z-10`}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: "preserve-3d"
              }}
            >
              <div style={{ display: 'inline-block', border: '10px solid #111', padding: 24, boxShadow: '12px 12px 0px #111', background: 'transparent', borderRadius: 0 }}>
                <div style={{
                  width: 640,
                  aspectRatio: "3 / 4",
                  background: "#F5C800",
                  border: "3px solid #111",
                  borderRadius: 0,
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "6px 6px 0px #111",
                  animation: "cardReveal 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s both, floatCard 4s ease-in-out 1s infinite",
                }}>
                  <style>{`@keyframes cardReveal { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }`}</style>
                  <style>{`@keyframes floatCard { 0% { transform: translateY(0px); } 50% { transform: translateY(-6px); } 100% { transform: translateY(0px); } }`}</style>

                  <img
                    src={anurudhRealPhoto}
                    alt="Anurudh Singh"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center top",
                      display: "block",
                    }}
                  />

                  {/* LEFT EYE */}
                  <div
                    ref={leftEyeRef}
                    style={{
                      position: 'absolute',
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: 'white',
                      border: '1.5px solid rgba(0,0,0,0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      top: '36.5%',
                      left: '39%',
                      zIndex: 20,
                      pointerEvents: 'none',
                    }}
                  >
                    <div
                      className="pupil"
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        background: '#1a1a1a',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        transition: 'transform 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        pointerEvents: 'none',
                      }}
                    />
                  </div>

                  {/* RIGHT EYE */}
                  <div
                    ref={rightEyeRef}
                    style={{
                      position: 'absolute',
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: 'white',
                      border: '1.5px solid rgba(0,0,0,0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      top: '36.5%',
                      left: '52%',
                      zIndex: 20,
                      pointerEvents: 'none',
                    }}
                  >
                    <div
                      className="pupil"
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        background: '#1a1a1a',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        transition: 'transform 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        pointerEvents: 'none',
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Metrics */}
          <div className="grid grid-cols-2">
            <div className="p-6 border-r-[3px] border-b-[3px] sm:border-b-0 border-[#0d0d0d] text-center bg-[#faf6ec] hover:bg-[#FFE03A]/25 transition-all duration-200 cursor-pointer">
              <span className="font-bangers text-4xl sm:text-5xl text-[#0d0d0d] block tracking-wide">{yearsVal}rd</span>
              <span className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase font-bold text-[#0d0d0d]/60 block mt-1">Year of Study</span>
            </div>
            <div className="p-6 border-b-[3px] sm:border-b-0 border-[#0d0d0d] text-center bg-[#faf6ec] hover:bg-[#1A5CE8]/10 transition-all duration-200 cursor-pointer">
              <span className="font-bangers text-4xl sm:text-5xl text-[#0d0d0d] block tracking-wide">{projectsVal}</span>
              <span className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase font-bold text-[#0d0d0d]/60 block mt-1">Live Projects</span>
            </div>
            <div className="p-6 border-r-[3px] border-[#0d0d0d] text-center bg-[#faf6ec] hover:bg-[#E8281A]/10 transition-all duration-200 cursor-pointer">
              <span className="font-bangers text-4xl sm:text-5xl text-[#0d0d0d] block tracking-wide">{techVal}+</span>
              <span className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase font-bold text-[#0d0d0d]/60 block mt-1">Languages & Tools</span>
            </div>
            <div className="p-6 text-center bg-[#faf6ec] hover:bg-neutral-300 transition-all duration-200 cursor-pointer">
              <span className="font-bangers text-4xl sm:text-5xl text-[#0d0d0d] block tracking-wide">&infin;</span>
              <span className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase font-bold text-[#0d0d0d]/60 block mt-1">Cups of Coffee</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
