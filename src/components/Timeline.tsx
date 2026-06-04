import React, { useState, useEffect, useRef } from "react";
import { TIMELINE_DATA } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Sparkles, Trophy, Calendar, Compass, ArrowRight, Zap, Target } from "lucide-react";

export default function Timeline() {
  const [activeChapter, setActiveChapter] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  // Gentle parallax coordinate tracking
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / 30;
      const y = (e.clientY - innerHeight / 2) / 30;
      setMouseX(x);
      setMouseY(y);
    };
    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, []);

  // Chapter specific icons
  const CHAPTER_ICONS = [
    <Compass className="w-6 h-6 text-black" />,
    <Sparkles className="w-6 h-6 text-black" />,
    <Zap className="w-6 h-6 text-black" />,
    <Target className="w-6 h-6 text-black" />,
    <Trophy className="w-6 h-6 text-black" />
  ];

  const CHAPTER_HIGHLIGHTS = [
    {
      metric: "ACADEMIC COMMENCEMENT",
      value: "Parul University B.Tech",
      location: "Vadodara, India",
      bullets: ["Rigorous curriculum alignment", "Started web engineering base", "Explored computer design models"]
    },
    {
      metric: "VISUAL MATURATION",
      value: "Creative Prototyping",
      location: "Canva, Adobe & Figma",
      bullets: ["Symmetry & grid mastery", "Bespoke typographic layouts", "3+ vector portfolios shipped"]
    },
    {
      metric: "THE COGNITIVE PIVOT",
      value: "Designer & Engineer",
      location: "Figma-to-React Pipelines",
      bullets: ["Unified layout precision", "Full state integration loops", "Refined technical communication"]
    },
    {
      metric: "PRODUCT ARCHITECTURES",
      value: "Shipping Scalable Softwares",
      location: "Double Product Launch",
      bullets: ["Evento Fullstack Framework", "Hopin Java trip architecture", "Advanced complex algorithm practice"]
    },
    {
      metric: "THE HORIZON",
      value: "Bespoke System Building",
      location: "Global Engineering Space",
      bullets: ["Seeking premier assignments", "Deploying custom system solutions", "Mastering performance speeds"]
    }
  ];

  return (
    <section id="timeline" className="border-b-[3px] border-[#0d0d0d] bg-[#faf6ec] relative overflow-hidden">
      {/* Brutalist Grid Overlay */}
      <div className="absolute inset-0 bg-[#0d0d0d] pointer-events-none opacity-[0.03] [background-image:radial-gradient(#0d0d0d_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[85vh]">
        {/* LEFT COLUMN: CHAPTERS LIST & CONTROLLER (5 Col) */}
        <div className="lg:col-span-5 p-6 sm:p-12 lg:p-16 border-r-0 lg:border-r-[3px] border-[#0d0d0d] flex flex-col justify-between bg-white relative">
          
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2 select-none">
              <BookOpen className="w-4 h-4 text-[#E8281A]" />
              <span className="font-mono text-[9px] sm:text-xs text-black/50 tracking-[0.3em] uppercase font-extrabold">
                Interactive Chronicles
              </span>
            </div>
            
            <h2 className="font-bangers text-4xl sm:text-5xl lg:text-6xl text-black tracking-widest leading-none">
              PORTFOLIO STORIES
            </h2>
            <p className="font-mono text-[10px] text-black/60 uppercase tracking-widest mt-2">
              Select any life chapter below to unravel Anurudh's strategic evolution.
            </p>
          </div>

          {/* Interactive Chapter Node List */}
          <div className="space-y-4 my-6">
            {TIMELINE_DATA.map((item, idx) => {
              const isActive = activeChapter === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveChapter(idx)}
                  className={`border-2 border-black p-4 shadow-[3px_3px_0_#0d0d0d] cursor-pointer relative transition-all duration-300 overflow-hidden flex items-center justify-between group ${
                    isActive ? "bg-[#FFE03A] translate-x-1" : "bg-[#faf6ec] hover:translate-x-1 hover:bg-[#FFE03A]/20"
                  }`}
                >
                  {/* Staggered progress indicator inside the card */}
                  {isActive && (
                    <motion.div
                      layoutId="timeline-active-bar"
                      className="absolute left-0 top-0 bottom-0 w-2.5 bg-[#E8281A]"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}

                  <div className={`pl-4 flex-1`}>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[9px] font-bold bg-black text-[#FFE03A] px-2 py-0.5 tracking-widest uppercase">
                        {item.month}
                      </span>
                      <span className="font-mono text-[10px] font-extrabold text-[#E8281A] tracking-widest">
                        {item.year}
                      </span>
                    </div>

                    <h4 className="font-bangers text-xl sm:text-2xl tracking-wider text-black mt-1 group-hover:text-[#E8281A] transition-colors">
                      {item.title}
                    </h4>
                  </div>

                  <div className={`w-8 h-8 rounded-full border-2 border-black flex items-center justify-center transition-transform ${
                    isActive ? "bg-white rotate-45" : "bg-neutral-100 group-hover:rotate-12"
                  }`}>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t-[2px] border-black border-dashed pt-4 font-mono text-[10px] text-black/45 select-none tracking-widest">
            LOG_NODE_CURRENT // OK_COMPILE
          </div>
        </div>

        {/* RIGHT COLUMN: REVEAL CHRONOLOGY VISUAL PANEL (7 Col) */}
        <div className="lg:col-span-7 bg-[#FFE03A] p-6 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden min-h-[500px] lg:min-h-0">
          
          {/* Drifting decorative background patterns reacts to mouse cursor movement */}
          <div
            className="absolute -top-12 -right-12 w-48 h-48 rounded-full border-[8px] border-dashed border-black/5 pointer-events-none transition-transform duration-200"
            style={{ transform: `translate(${mouseX}px, ${mouseY}px) rotate(${mouseX * 2}deg)` }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeChapter}
              initial={{ opacity: 0, scale: 0.98, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.98, x: -20 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="flex-1 flex flex-col justify-between relative z-10"
            >
              {/* Heading Details */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 bg-black text-white px-4 py-2 border-2 border-black inline-block shadow-[4px_4px_0_#FFF]">
                  {CHAPTER_ICONS[activeChapter] || <Compass className="w-5 h-5 text-white" />}
                  <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase">
                    CHAPTER_{activeChapter + 1} // ACTIVE
                  </span>
                </div>
                <div className="font-mono text-xs font-extrabold text-black uppercase bg-white border-2 border-black px-3 py-1.5 shadow-[2px_2px_0_#E8281A]">
                  YEAR: {TIMELINE_DATA[activeChapter].year}
                </div>
              </div>

              {/* Central Large Narrative Card */}
              <div className="my-8 md:my-10">
                <div className="font-mono text-xs font-bold text-[#E8281A] tracking-widest uppercase mb-1 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#E8281A] rounded-full inline-block animate-ping" />
                  {CHAPTER_HIGHLIGHTS[activeChapter].metric}
                </div>
                
                <h3 className="font-bangers text-4xl sm:text-5xl lg:text-6xl text-[#0d0d0d] tracking-widest leading-none drop-shadow-[4px_4px_0px_#FFF]">
                  {TIMELINE_DATA[activeChapter].title}
                </h3>

                <p className="font-elite text-base sm:text-lg text-black/85 leading-relaxed mt-6 max-w-2xl bg-white border-[3px] border-black p-5 sm:p-6 shadow-[5px_5px_0_#E8281A]">
                  {TIMELINE_DATA[activeChapter].detail}
                </p>
              </div>

              {/* Lower Section Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t-[2px] border-black/20">
                <div>
                  <span className="font-mono text-[9px] text-black/50 block font-bold uppercase tracking-widest">
                    ORGANISATIONAL FOCUS:
                  </span>
                  <span className="font-bangers text-xl sm:text-2xl text-black block mt-1 tracking-wider">
                    {CHAPTER_HIGHLIGHTS[activeChapter].value}
                  </span>
                  <span className="font-mono text-xs text-black/70 italic mt-0.5 block font-medium">
                    📍 {CHAPTER_HIGHLIGHTS[activeChapter].location}
                  </span>
                </div>

                <div>
                  <span className="font-mono text-[9px] text-black/50 block font-bold uppercase tracking-widest">
                    ACCOMPLISHED MILESTONES:
                  </span>
                  <ul className="mt-1.5 space-y-1 font-mono text-[10px] sm:text-xs text-black font-bold">
                    {CHAPTER_HIGHLIGHTS[activeChapter].bullets.map((bullet, k) => (
                      <li key={k} className="flex items-center gap-2">
                        <span className="inline-block w-1.5 h-1.5 bg-black rounded-full" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Quick interactive pagination hints */}
          <div className="flex justify-end pt-8 gap-2 relative z-10 selection:bg-black select-none">
            {TIMELINE_DATA.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveChapter(idx)}
                className={`w-3.5 h-3.5 border-2 border-black rounded-full cursor-pointer transition-all duration-150 ${
                  activeChapter === idx ? "bg-black scale-125" : "bg-white hover:bg-neutral-200"
                }`}
                title={`Chapter ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
