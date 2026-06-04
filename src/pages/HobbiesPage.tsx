import React from "react";
import Hobbies from "../components/Hobbies";
import { motion } from "motion/react";

export default function HobbiesPage() {
  return (
    <div className="space-y-0">
      {/* INTEGRAGE THE FULL GRAPHICAL HOBBIES WITH SOUND ACCESSORY */}
      <Hobbies />

      {/* ADDITIONAL CONTENT: LEARNING & DEVELOPMENT ACTIVITIES */}
      <section className="bg-black text-white py-16 px-6 sm:px-12 lg:px-16 border-t-[3px] border-[#FFE03A] relative">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="font-mono text-xs text-[#FFE03A] tracking-[0.3em] uppercase mb-4 font-bold text-center">
            // continuous growth metrics
          </div>
          <h2 className="font-bangers text-4xl sm:text-5xl lg:text-6xl text-center text-white tracking-widest leading-none mb-12">
            LEARNING ACTIVITIES &amp; FOCUS<span className="text-[#E8281A]">.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-white/20 p-6 bg-neutral-900 rounded shadow-[4px_4px_0_#FFE03A] select-none">
              <div className="font-mono text-xs text-[#FFE03A] font-extrabold uppercase mb-2">
                01 // ALGORITHMS (DSA)
              </div>
              <h4 className="font-bebas text-xl text-white tracking-wider mb-2">
                DAILY LEETCODE STREAK
              </h4>
              <p className="font-elite text-xs text-white/70 leading-relaxed">
                Re-solving arrays, linked-lists, and depth-first search (DFS) optimization models to secure cognitive readiness for technical interview grids.
              </p>
            </div>

            <div className="border border-white/20 p-6 bg-neutral-900 rounded shadow-[4px_4px_0_#FFE03A] select-none">
              <div className="font-mono text-xs text-[#FFE03A] font-extrabold uppercase mb-2">
                02 // REWIRING FRONT-END
              </div>
              <h4 className="font-bebas text-xl text-white tracking-wider mb-2">
                ADVANCED RENDERS
              </h4>
              <p className="font-elite text-xs text-white/70 leading-relaxed">
                Exploring frame layouts, hardware-accelerated canvas animations, and low-latency State contexts in modern React frameworks.
              </p>
            </div>

            <div className="border border-white/20 p-6 bg-neutral-900 rounded shadow-[4px_4px_0_#FFE03A] select-none">
              <div className="font-mono text-xs text-[#FFE03A] font-extrabold uppercase mb-2">
                03 // CORE CONCEPTS
              </div>
              <h4 className="font-bebas text-xl text-white tracking-wider mb-2">
                SYSTEMS SECURITY
              </h4>
              <p className="font-elite text-xs text-white/70 leading-relaxed">
                Reading up on thread concurrency, SQL normalization, REST protocols, and secure credential handling in Spring filters.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
