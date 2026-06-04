import React from "react";
import { useDB } from "../useDB";
import { motion } from "motion/react";

interface ProjectDetailProps {
  slug: string;
}

export default function ProjectDetailPage({ slug }: ProjectDetailProps) {
  const { projects } = useDB();

  // Find project by slug or ID
  const proj = projects.find((p) => p.slug === slug || p.id === slug);

  if (!proj) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#faf6ec] text-center select-none">
        <span className="font-bangers text-8xl text-[#E8281A] drop-shadow-[4px_4px_0_#000] mb-4">
          404_PORT
        </span>
        <h2 className="font-bebas text-3xl tracking-widest uppercase text-black mb-2">
          Project Specification Not Found
        </h2>
        <p className="font-mono text-xs text-black/60 max-w-sm mb-8 uppercase tracking-widest">
          The requested system architecture does not exist or has been archived under security protocols.
        </p>
        <a
          href="/projects"
          className="font-mono text-xs font-bold uppercase tracking-widest px-6 py-3 border-3 border-black bg-black text-[#FFE03A] hover:bg-white hover:text-black shadow-[4px_4px_0_#0d0d0d] transition-all"
        >
          &larr; Return to Portfolios
        </a>
      </div>
    );
  }

  return (
    <article className="bg-[#faf6ec] py-16 px-6 sm:px-12 lg:px-16 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* TOP PATH HEADER */}
        <div className="flex items-center justify-between pb-6 border-b-2 border-dashed border-black/20 mb-8 select-none">
          <a
            href="/projects"
            className="font-mono text-xs font-bold uppercase tracking-widest text-[#E8281A] hover:underline"
          >
            &larr; BACK TO SYSTEMS INDEX
          </a>
          <span className="font-mono text-[9px] bg-[#000] text-[#FFE03A] px-2 py-0.5 uppercase font-bold">
            ARCHIVE // SPEC_FILE_AS
          </span>
        </div>

        {/* HERO SPEC METADATA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          <div className="lg:col-span-12">
            <span className="font-mono text-xs uppercase text-[#E8281A] font-extrabold tracking-widest block mb-2">
              [{proj.category} MODULE]
            </span>
            <h1 className="font-bangers text-5xl sm:text-6xl lg:text-7xl text-black tracking-widest leading-none mb-4">
              {proj.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-black/50 font-bold">
              <span>DEPLOYMENT INDEX: PROJ_{proj.pNo || "XX"}</span>
              <span>&middot;</span>
              <span>EPOCH YEAR: {proj.year}</span>
            </div>
          </div>
        </div>

        {/* RECENT PREVIEW SCREENSHOT */}
        {proj.image && (
          <div className="border-[4px] border-black max-h-[500px] w-full overflow-hidden mb-12 shadow-[10px_10px_0_#000] bg-neutral-100">
            <img
              src={proj.image}
              alt={proj.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* MAIN STRUCTURAL CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT CONTENT COLUMNS (8) */}
          <div className="lg:col-span-8 space-y-8">
            {/* PROBLEM BLOCK */}
            <div className="border-3 border-black p-6 bg-white shadow-[6px_6px_0_#000]">
              <div className="font-mono text-[9px] text-[#E8281A] uppercase tracking-widest font-extrabold mb-2 select-none">
                ⚙️ [THE CORE PROBLEM STATEMENT]
              </div>
              <p className="font-elite text-sm text-black/85 leading-relaxed">
                {proj.problem || "No specified parameters. The target context focused on streamlining front-end workflows or addressing specific endpoint concurrency limits."}
              </p>
            </div>

            {/* SOLUTION BLOCK */}
            <div className="border-3 border-black p-6 bg-[#FFE03A]/10 shadow-[6px_6px_0_#FFE03A] border-l-[8px] border-l-[#FFE03A] border-solid">
              <div className="font-mono text-[9px] text-black/50 uppercase tracking-widest font-extrabold mb-2 select-none">
                🧠 [THE ARCHITECTURAL SOLUTION DESIGN]
              </div>
              <p className="font-elite text-sm text-black/85 leading-relaxed">
                {proj.solution || "Formulated exact responsive elements layered over robust backend context, enforcing strict layout bounds and database query normalizations."}
              </p>
            </div>

            {/* CHALLENGES & PROCESS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 select-none">
              <div className="border-[3px] border-black p-5 bg-[#faf6ec] shadow-[4px_4px_0_#0d0d0d]">
                <h4 className="font-mono text-xs font-bold text-[#E8281A] uppercase mb-2">
                  🛡️ STACK CHALLENGES
                </h4>
                <p className="font-mono text-[11px] text-black/70 leading-relaxed">
                  {proj.challenges || "Resolving CORS authentication filter triggers and managing responsive window layouts securely during viewport shifts."}
                </p>
              </div>

              <div className="border-[3px] border-black p-5 bg-[#faf6ec] shadow-[4px_4px_0_#0d0d0d]">
                <h4 className="font-mono text-xs font-bold text-[#1A5CE8] uppercase mb-2">
                  🏆 CORE LEARNINGS
                </h4>
                <p className="font-mono text-[11px] text-black/70 leading-relaxed">
                  {proj.learnings || "Developed absolute proficiency in modular state handoffs, SVG structural design curves, and JWT micro-authorizations."}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR STATS COLUMNS (4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="border-3 border-black bg-black text-white p-6 shadow-[6px_6px_0_#FFE03A] relative">
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none" />

              <h4 className="font-bebas text-xl text-[#FFE03A] tracking-wider mb-4 border-b border-white/20 pb-2">
                MODULE SPECS
              </h4>

              <div className="space-y-4 font-mono text-[10px] uppercase block tracking-widest mb-6 select-none">
                <div>
                  <span className="text-white/40 block">System Type</span>
                  <span className="text-white font-bold text-xs">{proj.category}</span>
                </div>
                <div>
                  <span className="text-white/40 block">Release Epoch</span>
                  <span className="text-white font-bold text-xs">{proj.year}</span>
                </div>
                <div>
                  <span className="text-white/40 block">Production State</span>
                  <span className="text-[#FFE03A] font-bold text-xs">V2.0 Fully Deployed</span>
                </div>
              </div>

              <h4 className="font-bebas text-lg text-[#FFE03A] tracking-wider mb-3 select-none">
                USED TECHNOLOGIES
              </h4>
              <div className="flex flex-wrap gap-1.5 mb-8">
                {proj.tags.map((tg: string) => (
                  <span
                    key={tg}
                    className="font-mono text-[9px] font-bold bg-white/10 text-white/80 border border-white/20 px-2 py-0.5 rounded"
                  >
                    {tg}
                  </span>
                ))}
              </div>

              {/* DYNAMIC PIPELINE DIRECT SOURCE BUTTONS */}
              <div className="space-y-3">
                {proj.githubUrl && (
                  <motion.a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 font-mono text-xs text-black bg-[#FFE03A] font-bold py-3.5 px-4 text-center border-2 border-black uppercase tracking-wider shadow-[3px_3px_0_#FFE03A] cursor-pointer"
                  >
                    📂 Code Repository &rarr;
                  </motion.a>
                )}
                {proj.demoUrl && (
                  <motion.a
                    href={proj.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 font-mono text-xs text-white bg-[#E8281A] font-bold py-3.5 px-4 text-center border-2 border-black uppercase tracking-wider shadow-[3px_3px_0_#FFF] cursor-pointer"
                  >
                    ⚡ Live Deploy Room &rarr;
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
