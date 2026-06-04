import React from "react";
import Timeline from "../components/Timeline";
import { TIMELINE_DATA } from "../types";
import { motion } from "motion/react";

export default function ExperiencePage() {
  return (
    <div className="space-y-0">
      {/* PROFESSIONAL HISTORY TIMELINE */}
      <Timeline />

      {/* ADDITIONAL SEGMENTS: CAPSTONE LABS & CERTS */}
      <section className="bg-black text-white py-16 px-6 sm:px-12 lg:px-16 min-h-[50vh] relative">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="font-mono text-xs text-[#FFE03A] tracking-[0.3em] uppercase mb-4 font-bold text-center">
            // academic labs and credentials
          </div>
          <h2 className="font-bangers text-4xl sm:text-5xl lg:text-6xl text-center text-white tracking-widest leading-none mb-12">
            RESEARCH &amp; OPEN SOURCE<span className="text-[#E8281A]">.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* CAPSTONE PROTOTYPES */}
            <div className="border-[3px] border-white bg-neutral-900 duration-200 p-6 shadow-[5px_5px_0_#FFE03A] hover:scale-[1.01] select-none">
              <span className="font-mono text-[9px] text-[#FFE03A] tracking-wider uppercase bg-black px-2 py-0.5 border border-white/20 select-none">
                01 // LAB ARCHITECTURES
              </span>
              <h4 className="font-bebas text-2xl text-white tracking-wider mt-3 mb-2">
                JAVA/SPRING REST STATIONS
              </h4>
              <p className="font-elite text-xs text-white/70 leading-relaxed mb-4">
                Designed local sandboxes exploring JWT stateless handlers, database index mappings in Spring, and query performance optimizations over relational MySQL pools.
              </p>
              <div className="border-t border-white/10 pt-3 flex flex-wrap gap-1.5">
                <span className="font-mono text-[8px] bg-white/5 text-white/50 px-1.5 py-0.5 rounded">Spring Boot</span>
                <span className="font-mono text-[8px] bg-white/5 text-white/50 px-1.5 py-0.5 rounded">MySQL</span>
                <span className="font-mono text-[8px] bg-white/5 text-white/50 px-1.5 py-0.5 rounded">Docker</span>
              </div>
            </div>

            {/* OPEN SOURCE LOGS */}
            <div className="border-[3px] border-white bg-neutral-900 duration-200 p-6 shadow-[5px_5px_0_#FFE03A] hover:scale-[1.01] select-none">
              <span className="font-mono text-[9px] text-[#FFE03A] tracking-wider uppercase bg-black px-2 py-0.5 border border-white/20 select-none">
                02 // REPOSITORY FORGES
              </span>
              <h4 className="font-bebas text-2xl text-white tracking-wider mt-3 mb-2">
                COMIC BRUTALIST OPEN ASSETS
              </h4>
              <p className="font-elite text-xs text-white/70 leading-relaxed mb-4">
                Contributing layout configurations, custom mouse cursor listeners, and lightweight routing utilities to developer portfolios and open frontend templates.
              </p>
              <div className="border-t border-white/10 pt-3 flex flex-wrap gap-1.5">
                <span className="font-mono text-[8px] bg-white/5 text-white/50 px-1.5 py-0.5 rounded">Tailwind CSS</span>
                <span className="font-mono text-[8px] bg-white/5 text-white/50 px-1.5 py-0.5 rounded">Framer Motion</span>
                <span className="font-mono text-[8px] bg-white/5 text-white/50 px-1.5 py-0.5 rounded">Vite JS</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
