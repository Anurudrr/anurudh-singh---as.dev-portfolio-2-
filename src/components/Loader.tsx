import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [percent, setPercent] = useState(0);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const intervalTime = 30; // ms
    const increments = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const currentPercent = Math.min(Math.floor((currentStep / increments) * 100), 100);
      setPercent(currentPercent);

      if (currentPercent >= 100) {
        clearInterval(interval);
        setCanSkip(true);
        // Automatically complete slightly after reaching 100% if not manual
        const autoTimeout = setTimeout(() => {
          onComplete();
        }, 600);
        return () => clearTimeout(autoTimeout);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, y: -20, transition: { duration: 0.5, ease: "easeInOut" } }}
      onClick={onComplete}
      className="fixed inset-0 bg-[#0d0d0d] flex flex-col items-center justify-center z-[10000] gap-6 cursor-pointer overflow-hidden selector-loader"
      id="loader"
    >
      {/* Brutalist diagonal background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Decorative lines */}
      <div className="absolute top-6 left-6 text-yellow-300 font-mono text-[10px] tracking-widest opacity-40 select-none">
        BOOTING_AS_KERNEL_SYSTEM_V1.0.8 // VADODARA
      </div>
      <div className="absolute bottom-6 right-6 text-white font-mono text-[10px] tracking-widest opacity-40 select-none">
        ENGINE: REACT + SPRING + GEMINI // 2026
      </div>

      <div className="flex flex-col items-center max-w-[90%] text-center relative">
        {/* Main Logo Text with staggered characters */}
        <motion.h1 
          className="font-bangers text-[7rem] md:text-[10rem] text-[#FFE03A] tracking-wider leading-none select-none drop-shadow-[6px_6px_0px_#E8281A]"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          AS<span className="text-[#faf6ec] drop-shadow-[6px_6px_0px_#1A5CE8]">.</span>DEV
        </motion.h1>

        {/* Counter Percent in retro brutalist pill */}
        <motion.div 
          className="mt-4 bg-[#FFE03A] text-[#0d0d0d] px-4 py-1 border-[3px] border-[#0d0d0d] font-mono font-bold text-sm tracking-widest uppercase inline-block shadow-[4px_4px_0_#0d0d0d]"
          animate={percent >= 100 ? { scale: [1, 1.05, 1] } : undefined}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          {percent}% LOADED
        </motion.div>

        {/* Progress Bar Container */}
        <div className="w-[80vw] max-w-[400px] h-[3px] bg-neutral-800 overflow-visible mt-6 relative shadow-[0_1px_2px_rgba(255,255,255,0.05)]">
          <motion.div
            className="h-full bg-[#FFE03A] relative animate-pulse"
            style={{ width: `${percent}%` }}
            transition={{ ease: "easeOut" }}
          >
            {percent > 0 && (
              <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-yellow-300 shadow-[0_0_8px_#FFE03A,0_0_15px_#FFE03A]" />
            )}
          </motion.div>
        </div>

        {/* Core Description Text */}
        <motion.p
          className="font-mono text-[10px] font-medium md:text-xs tracking-[0.25em] text-[#faf6ec] opacity-60 uppercase mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.3 }}
        >
          Portfolio &middot; CS Engineer &amp; Designer
        </motion.p>

        {/* Dynamic skip advice */}
        <AnimatePresence mode="wait">
          {canSkip ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-elite text-sm md:text-base text-[#FFE03A] mt-8 tracking-wider bg-[#E8281A] text-white px-4 py-2 border-2 border-black inline-block shadow-[3px_3px_0_#0d0d0d] hover:bg-[#FFE03A] hover:text-[#0d0d0d] transition-colors"
            >
              &mdash; CLICK ANYWHERE TO ENTER &mdash;
            </motion.div>
          ) : (
            <motion.div
              key={Math.min(Math.floor(percent / 20), 4)}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 0.8, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="font-mono text-[9px] text-[#faf6ec] mt-8 uppercase tracking-widest antialiased min-h-[16px] font-bold"
            >
              {
                [
                  "↳ loading design system",
                  "↳ injecting typography",
                  "↳ mounting components",
                  "↳ calibrating animations",
                  "↳ SYSTEM READY"
                ][Math.min(Math.floor(percent / 20), 4)]
              }
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Laser scanline sweep overlay */}
      <div className="scanline-sweep" />
    </motion.div>
  );
}
