import React, { useState } from "react";
import About from "../components/About";
import Timeline from "../components/Timeline";
import Skills from "../components/Skills";
import { ACHIEVEMENTS_DATA } from "../types";
import { motion } from "motion/react";

export default function AboutPage() {
  return (
    <div className="space-y-0">
      {/* SECTION 1: ABOUT STORY COMPONENT */}
      <About />

      {/* CHRONOLOGY TRACK TIMELINE */}
      <div className="bg-[#faf6ec] border-b-[3px] border-black">
        <Timeline />
      </div>

      {/* TECHNICAL SKILLS SECTION */}
      <div className="bg-[#faf6ec] border-b-[3px] border-black">
        <Skills />
      </div>

      {/* ACHIEVEMENTS GRID CARDS */}
      <section className="bg-black text-white py-16 px-6 sm:px-12 lg:px-16 relative">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="font-mono text-xs text-[#FFE03A] tracking-[0.3em] uppercase mb-4 font-bold text-center">
            // certificates & milestones
          </div>
          <h2 className="font-bangers text-4xl sm:text-5xl lg:text-6xl text-center text-white tracking-widest leading-none mb-12">
            ACHIEVEMENT LOGS<span className="text-[#E8281A]">.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ACHIEVEMENTS_DATA.map((ach) => (
              <motion.div
                key={ach.title}
                whileHover={{ scale: 1.02 }}
                className="border-2 border-white p-6 bg-neutral-900 shadow-[4px_4px_0_#FFE03A] flex gap-4"
              >
                <span className="text-4xl select-none flex-shrink-0 self-start mt-1">
                  {ach.icon}
                </span>
                <div>
                  <h4 className="font-bebas text-xl text-[#FFE03A] tracking-wider mb-1">
                    {ach.title}
                  </h4>
                  <p className="font-elite text-xs text-white/70 leading-relaxed">
                    {ach.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
