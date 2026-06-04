import React, { useState } from "react";
import { motion } from "motion/react";

interface BlockDetail {
  id: string;
  label: string;
  summary: string;
  details: string;
  accent: string;
}

const ABOUT_BLOCKS: BlockDetail[] = [
  {
    id: "origin",
    label: "origin",
    summary: "B.Tech Computer Science student at Parul Institute of Technology, Vadodara (2023–2027).",
    details: "Born and educated in India, Anurudh started in the design world, developing a keen mastery over grid layouts, color metrics, and typography curves. Pivoted to CS and discovered the thrill of compiling those visual grids into bulletproof software.",
    accent: "bg-[#FFE03A]",
  },
  {
    id: "evolution",
    label: "evolution",
    summary: "Started as a Graphic Designer, fell in love with code, and never looked back.",
    details: "Now crafts full-stack responsive web engines, Java core algorithms, SQL database setups, and custom REST routes. Operates with a creative design-first pipeline that generic computer programs frequently fail to support.",
    accent: "bg-[#E8281A] text-white",
  },
  {
    id: "philosophy",
    label: "philosophy",
    summary: "Engineering with absolute architectural layout honesty.",
    details: "I operate under the premise that software should be functional and gorgeous. Low-quality placeholder code or text is unacceptable. Every line is formatted, every parameter is typed, and every hover response is snappy.",
    accent: "bg-[#1A5CE8] text-white",
  },
];

export default function About() {
  const [expandedBlock, setExpandedBlock] = useState<string | null>(null);

  const toggleBlock = (id: string) => {
    setExpandedBlock(expandedBlock === id ? null : id);
  };

  return (
    <section id="about" className="grid grid-cols-1 lg:grid-cols-12 border-b-[3px] border-[#0d0d0d] bg-[#faf6ec] min-h-[70vh]">
      {/* LEFT SECTION */}
      <div className="col-span-1 lg:col-span-5 bg-[#0d0d0d] p-8 sm:p-12 lg:p-16 flex flex-col justify-center border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-[#0d0d0d] text-left relative">
        <div className="absolute top-4 left-4 font-mono text-[9px] text-[#FFE03A] tracking-[0.3em] uppercase opacity-40 select-none">
          SYSTEM_PROFILES
        </div>
        <div className="font-mono text-xs text-[#FFE03A] tracking-[0.3em] uppercase mb-4 font-bold">
          // origin story
        </div>
        <h2 className="font-bangers text-5xl sm:text-6xl lg:text-7xl text-white tracking-wider leading-[0.9]">
          WHO IS <br />
          <span className="text-[#FFE03A] drop-shadow-[4px_4px_0_#E8281A] inline-block hover:scale-[1.02] transition-transform">
            ANURUDH
          </span>{" "}
          <br />
          ANYWAY?
        </h2>
        <div className="mt-8 border-t border-white/20 pt-6">
          <p className="font-mono text-[9px] sm:text-xs text-[#faf6ec]/50 leading-relaxed uppercase tracking-widest">
            Click on any profile card to toggle expanded developer insights &amp; methodology.
          </p>
        </div>
      </div>

      {/* RIGHT SECTION WITH ACCORDION BLOCKS */}
      <div className="col-span-1 lg:col-span-7 p-6 sm:p-12 lg:p-16 flex flex-col gap-8 justify-center">
        {ABOUT_BLOCKS.map((block) => {
          const isExpanded = expandedBlock === block.id;
          return (
            <motion.div
              key={block.id}
              onClick={() => toggleBlock(block.id)}
              whileHover={{ 
                scale: 1.02, 
                translateY: "-2px",
                boxShadow: "10px 10px 0px #0d0d0d" 
              }}
              animate={{
                boxShadow: isExpanded ? "12px 12px 0px #0d0d0d" : "6px 6px 0px #0d0d0d",
              }}
              transition={{ duration: 0.15 }}
              className="border-[3px] border-black p-6 bg-[#faf6ec] relative shadow-[6px_6px_0_#0d0d0d] cursor-pointer select-none transition-all group overflow-hidden"
            >
              {/* Header Label Pill */}
              <div className={`absolute top-0 right-6 translate-y-[-50%] border-2 border-black ${block.accent} font-mono text-[9px] sm:text-[10px] font-bold tracking-widest px-3 py-0.5 uppercase shadow-[2px_2px_0_#0d0d0d]`}>
                {block.label}
              </div>

              {/* Main Content */}
              <div className="mt-2">
                <p className="font-elite text-sm sm:text-base font-bold text-black leading-relaxed">
                  {block.summary}
                </p>

                {/* Animated expand block */}
                <motion.div
                  initial={false}
                  animate={{ 
                    height: isExpanded ? "auto" : 0, 
                    opacity: isExpanded ? 1 : 0,
                    marginTop: isExpanded ? 16 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="font-mono text-xs sm:text-sm text-black/75 leading-relaxed bg-black/5 p-4 border-l-4 border-black border-dashed">
                    {block.details}
                  </p>
                </motion.div>

                {/* Micro Expand Arrow */}
                <div className="flex justify-end mt-4">
                  <span className="font-mono text-[9px] tracking-widest text-[#0d0d0d]/40 font-bold uppercase transition-transform select-none group-hover:text-black">
                    {isExpanded ? "Close Info [↑]" : "Expand Log [↓]"}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
