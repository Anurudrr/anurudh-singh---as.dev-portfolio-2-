import React, { useState } from "react";
import { HOBBIES_DATA, HobbyItem } from "../types";
import { motion, AnimatePresence } from "motion/react";

export default function Hobbies() {
  const [activeHobby, setActiveHobby] = useState<string | null>(null);
  const [oscActive, setOscActive] = useState(false);
  const [freq, setFreq] = useState(261.63); // Middle C
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  const notes = [
    { name: "C4 (Do)", f: 261.63, col: "bg-red-500" },
    { name: "D4 (Re)", f: 293.66, col: "bg-orange-500" },
    { name: "E4 (Mi)", f: 329.63, col: "bg-yellow-500" },
    { name: "F4 (Fa)", f: 349.23, col: "bg-emerald-500" },
    { name: "G4 (So)", f: 392.00, col: "bg-blue-500" },
    { name: "A4 (La)", f: 440.00, col: "bg-indigo-500" },
    { name: "B4 (Ti)", f: 493.88, col: "bg-violet-500" },
    { name: "C5 (Do)", f: 523.25, col: "bg-pink-500" },
  ];

  // Micro synth trigger
  const playNote = (frequency: number) => {
    try {
      setFreq(frequency);
      let ctx = audioCtx;
      if (!ctx) {
        ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        setAudioCtx(ctx);
      }
      
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = "sawtooth"; // retro 8-bit chip sound
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      gainNode.gain.setValueAtTime(0.12, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.61);

      // trigger transient animation state
      setOscActive(true);
      setTimeout(() => setOscActive(false), 200);
    } catch (e) {
      console.warn("AudioContext not allowed or not supported in this iframe environment until direct user gesture.", e);
    }
  };

  return (
    <section id="hobbies" className="border-b-[3px] border-[#0d0d0d] bg-[#faf6ec] py-12 px-6 sm:px-12 lg:px-16">
      <div className="mb-10 text-left">
        <div className="font-mono text-xs text-[#1A5CE8] tracking-[0.3em] uppercase font-bold">
          // personal spectrum
        </div>
        <h2 className="font-bangers text-4xl sm:text-5xl lg:text-6xl text-black tracking-wider leading-none mt-2">
          HOBBIES &amp; PASSIONS<span className="text-[#FFE03A] drop-shadow-[2px_2px_0_#000]">.</span>
        </h2>
        <p className="font-mono text-[9px] sm:text-xs text-black/60 uppercase tracking-wider mt-4">
          Click on any interest card below to reveal experimental developer fun facts and launch interactive accessories.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* HOBBY LIST (LEFT COLUMN) */}
        <div className="flex flex-col gap-4">
          {HOBBIES_DATA.map((hobby) => {
            const isSelected = activeHobby === hobby.id;
            return (
              <motion.div
                key={hobby.id}
                onClick={() => setActiveHobby(isSelected ? null : hobby.id)}
                whileHover={{ scale: 1.02, x: 5 }}
                className={`border-[3px] border-black p-5 cursor-pointer select-none transition-all shadow-[4px_4px_0_#0d0d0d] relative overflow-hidden ${
                  isSelected ? "bg-[#FFE03A]/20 shadow-[6px_6px_0_#0d0d0d]" : "bg-white"
                }`}
              >
                {/* Micro accent corner tag */}
                <div className="absolute top-0 right-0 border-l-[3px] border-b-[3px] border-black bg-black text-white px-2 py-1 font-mono text-[8px] tracking-widest uppercase font-bold">
                  {hobby.category}
                </div>

                <div className="flex items-start gap-4 pr-16">
                  <span className="font-bangers text-4xl leading-none select-none my-1">{hobby.icon}</span>
                  <div>
                    <h4 className="font-bebas text-xl tracking-wider text-black">{hobby.title}</h4>
                    <p className="font-elite text-xs text-black/75 mt-2 leading-relaxed">
                      {hobby.description}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end items-center mt-3 border-t border-black/10 pt-2 text-[9px] font-mono text-black/50 tracking-wider uppercase font-bold">
                  {isSelected ? "Click to lock info [↑]" : "Inspect Fun Fact [↓]"}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* INTERACTIVE COMPANION STATION (RIGHT COLUMN) */}
        <div className="flex flex-col gap-6">
          <div className="border-[3px] border-black bg-[#0d0d0d] text-white p-6 shadow-[6px_6px_0_#FFE03A] relative min-h-[340px] flex flex-col justify-between">
            {/* Dot matrices */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/20 mb-4 select-none">
                <span className="font-mono text-[9px] text-[#FFE03A] tracking-widest uppercase font-bold">
                  PASSIONS_ACCESSORY_PORT
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#E8281A] animate-pulse border border-black" />
              </div>

              <AnimatePresence mode="wait">
                {activeHobby ? (
                  <motion.div
                    key={activeHobby}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl select-none">
                        {HOBBIES_DATA.find((h) => h.id === activeHobby)?.icon}
                      </span>
                      <h4 className="font-bebas text-2xl text-[#FFE03A] tracking-wider">
                        {HOBBIES_DATA.find((h) => h.id === activeHobby)?.title} SECRET
                      </h4>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-4 font-mono text-xs text-[#faf6ec]/90 leading-relaxed border-l-4 border-[#FFE03A] border-solid">
                      <span className="text-[10px] text-[#FFE03A] block font-extrabold uppercase mb-2">
                        INTELLIGENCE METRIC SHEET:
                      </span>
                      {HOBBIES_DATA.find((h) => h.id === activeHobby)?.funFact}
                    </div>

                    {/* Synthesizer Interactive Accessory is active only when Hobby h4 is selected */}
                    {activeHobby === "h4" && (
                      <div className="bg-neutral-900 border-2 border-[#FFE03A] p-4 rounded-lg mt-4 shadow-[4px_4px_0_#000]">
                        <span className="font-mono text-[8px] text-[#FFE03A] block tracking-widest uppercase font-bold mb-3 text-center">
                          🎹 RETRO 8-BIT SYNTHESIZER SIMULATOR
                        </span>
                        
                        {/* Audio synthesizer controller buttons */}
                        <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 ">
                          {notes.map((n) => (
                            <button
                              key={n.name}
                              onClick={() => playNote(n.f)}
                              className={`font-mono text-[10px] font-bold py-2 border border-black hover:scale-110 active:scale-95 text-center text-white cursor-pointer select-none ${n.col} shadow-[2px_2px_0_#000]`}
                            >
                              {n.name.split(" ")[0]}
                            </button>
                          ))}
                        </div>

                        {/* Oscillation simulator wave block */}
                        <div className="h-10 border border-white/20 bg-black mt-3 flex items-center justify-center overflow-hidden relative">
                          <AnimatePresence>
                            {oscActive ? (
                              <motion.div
                                animate={{
                                  scaleY: [1, 2.8, 0.4, 2, 1],
                                  opacity: [0.8, 1, 0.8],
                                }}
                                transition={{ repeat: Infinity, duration: 0.15 }}
                                className="w-full h-1 bg-[#FFE03A]"
                              />
                            ) : (
                              <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest">
                                CLICK PIANO KEY TO TRIG SYNTH
                              </span>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    className="text-center py-12 flex flex-col items-center justify-center gap-4"
                  >
                    <span className="text-4xl select-none opacity-40">⚙️</span>
                    <p className="font-mono text-xs text-[#faf6ec]/60 uppercase tracking-wider max-w-xs">
                      Lock on an interest in the list to reveal companion graphics, secret metrics, and digital synthesizers.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Static branding base */}
            <div className="border-t border-white/10 pt-3 mt-6">
              <span className="font-mono text-[8px] text-white/30 tracking-widest uppercase block text-center md:text-left">
                ANURUDH_SINGH_RAJAWAT // COGNITIVE LABS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
