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
      {/* ── CARTOON HOVER POPUP (outside section so overflow-hidden can't clip it) ── */}
      <AnimatePresence>
        {showCartoon && (
          <motion.div
            key="cartoon-popup"
            initial={{ opacity: 0, scale: 0.82, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: 3 }}
            exit={{ opacity: 0, scale: 0.82, rotate: -6 }}
            transition={{ type: "spring", stiffness: 420, damping: 24 }}
            style={{
              position: "fixed",
              top: mousePos.y - 20,
              left: mousePos.x + 28,
              zIndex: 99999,
              pointerEvents: "none",
              width: 200,
              filter: "drop-shadow(8px 8px 0px #0d0d0d)",
            }}
          >
            {/* Speech bubble tail pointing left */}
            <div style={{
              position: "absolute",
              top: 44,
              left: -16,
              width: 0,
              height: 0,
              borderTop: "10px solid transparent",
              borderBottom: "10px solid transparent",
              borderRight: "16px solid #0d0d0d",
              zIndex: 10,
            }} />
            <div style={{
              position: "absolute",
              top: 46,
              left: -11,
              width: 0,
              height: 0,
              borderTop: "8px solid transparent",
              borderBottom: "8px solid transparent",
              borderRight: "13px solid #FFE03A",
              zIndex: 11,
            }} />

            {/* Main card */}
            <div style={{
              border: "4px solid #0d0d0d",
              background: "#FFE03A",
              boxShadow: "6px 6px 0 #0d0d0d",
              overflow: "hidden",
              position: "relative",
            }}>
              {/* Top header */}
              <div style={{
                background: "#0d0d0d",
                color: "#FFE03A",
                fontFamily: "monospace",
                fontSize: 9,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                padding: "5px 10px",
                fontWeight: 900,
                borderBottom: "3px solid #E8281A",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}>
                <span style={{ color: "#E8281A", fontSize: 11 }}>◆</span>
                ANURUDH · IRL
              </div>

              {/* Photo with comic overlays */}
              <div style={{ position: "relative", overflow: "hidden", background: "#111" }}>
                {/* Halftone dots */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: "radial-gradient(#FFE03A 1px, transparent 1px)",
                  backgroundSize: "6px 6px",
                  opacity: 0.10,
                  zIndex: 2,
                  pointerEvents: "none",
                }} />
                {/* Vignette */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(ellipse at center, transparent 50%, rgba(232,40,26,0.15) 100%)",
                  zIndex: 3,
                  pointerEvents: "none",
                }} />
                <img
                  src={anurudhRealPhoto}
                  alt="Anurudh Singh"
                  style={{
                    width: "100%",
                    display: "block",
                    aspectRatio: "1 / 1",
                    objectFit: "cover",
                    objectPosition: "center top",
                    position: "relative",
                    zIndex: 1,
                  }}
                />
              </div>

              {/* Bottom bar */}
              <div style={{
                background: "#E8281A",
                color: "#fff",
                fontFamily: "monospace",
                fontSize: 8,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                padding: "5px 10px",
                fontWeight: 900,
                borderTop: "3px solid #0d0d0d",
                display: "flex",
                justifyContent: "space-between",
              }}>
                <span>FULL STACK</span>
                <span style={{ color: "#FFE03A" }}>✦</span>
                <span>UI / UX</span>
              </div>
            </div>

            {/* AS·DEV badge */}
            <div style={{
              position: "absolute",
              bottom: -14,
              right: -14,
              width: 44,
              height: 44,
              background: "#E8281A",
              border: "3px solid #0d0d0d",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "monospace",
              fontSize: 7,
              fontWeight: 900,
              color: "#fff",
              textTransform: "uppercase",
              lineHeight: 1.1,
              textAlign: "center",
              zIndex: 20,
            }}>
              AS<br />DEV
            </div>

            {/* Corner rivets */}
            <div style={{ position: "absolute", top: -5, left: -5, width: 10, height: 10, background: "#FFE03A", border: "3px solid #0d0d0d", borderRadius: "50%", zIndex: 15 }} />
            <div style={{ position: "absolute", top: -5, right: -5, width: 10, height: 10, background: "#FFE03A", border: "3px solid #0d0d0d", borderRadius: "50%", zIndex: 15 }} />
          </motion.div>
        )}
      </AnimatePresence>

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
              className={`w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] border-[4px] border-black ${currentVibe.bg} shadow-[10px_10px_0_#0d0d0d] flex flex-col items-center justify-center font-bangers text-7xl sm:text-8xl select-none cursor-pointer transition-colors duration-300 relative z-10`}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: "preserve-3d"
              }}
            >
              <span className={`${currentVibe.textCol} tracking-widest flex items-center justify-center pointer-events-none`} style={{ transform: "translateZ(30px)" }}>
                {currentVibe.text}
              </span>
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
