import React, { useState } from "react";
import { useDB } from "../useDB";
import { motion, AnimatePresence } from "motion/react";

export default function ProjectsPage() {
  const { projects } = useDB();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Web App", "Full Stack", "UI/UX Design"];

  const filteredProjects = projects.filter((proj) => {
    const matchesSearch = proj.title.toLowerCase().includes(search.toLowerCase()) ||
                          proj.description.toLowerCase().includes(search.toLowerCase()) ||
                          proj.tags.some((tg: string) => tg.toLowerCase().includes(search.toLowerCase()));
    
    const matchesCat = filter === "All" || proj.category === filter;

    return matchesSearch && matchesCat;
  });

  return (
    <section className="bg-[#faf6ec] py-16 px-6 sm:px-12 lg:px-16 min-h-screen">
      {/* HEADER SECTION */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="font-mono text-xs text-[#E8281A] tracking-[0.3em] uppercase font-bold">
          // structural catalog
        </div>
        <h2 className="font-bangers text-4xl sm:text-5xl lg:text-6xl text-black tracking-wider leading-none mt-2 mb-4">
          ENGINEERING ARCHIVE<span className="text-[#1A5CE8]">.</span>
        </h2>
        <p className="font-mono text-xs text-black/60 uppercase tracking-widest max-w-2xl">
          A granular database repository listing production-ready applications, Java microservices, and design frameworks built by Anurudh.
        </p>

        {/* INPUT AND SEARCH BAR ROWS */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-10 border-t-2 border-dashed border-black/20 pt-8">
          {/* Categories select row */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`font-mono text-[10px] sm:text-xs font-bold px-3 py-1.5 border-2 border-black hover:bg-[#FFE03A]/20 cursor-pointer shadow-[2px_2px_0_#0d0d0d] transition-all ${
                  filter === cat ? "bg-[#FFE03A] text-black -translate-x-0.5 -translate-y-0.5 shadow-[4px_4px_0_#0d0d0d]" : "bg-white text-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search box frame */}
          <div className="relative w-full md:max-w-md">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-mono select-none pointer-events-none opacity-50">
              🔍
            </span>
            <input
              type="text"
              placeholder="SEARCH PROJECT PROTOCOLS / TECH STACKS..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border-2 border-black bg-white text-black font-mono text-[11px] placeholder-black/40 uppercase tracking-widest outline-none shadow-[2px_2px_0_#0d0d0d] focus:shadow-[4px_4px_0_#0d0d0d] transition-all"
            />
          </div>
        </div>
      </div>

      {/* DETAILED RESULTS GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((proj) => (
            <motion.div
              layout
              key={proj.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ y: -4 }}
              className="border-[3px] border-black bg-white p-6 sm:p-8 flex flex-col justify-between shadow-[6px_6px_0_#0d0d0d] relative overflow-hidden group"
            >
              {/* Cover dynamic screenshot frame */}
              {proj.image && (
                <div className="w-full h-48 border-b-[3px] border-black -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-6 overflow-hidden bg-neutral-100 relative">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <div className="absolute top-2 left-2 bg-black text-[#FFE03A] border border-black font-mono text-[8.5px] tracking-widest uppercase font-extrabold px-2 py-0.5 select-none">
                    {proj.category}
                  </div>
                </div>
              )}

              <div>
                <div className="flex justify-between items-center mb-4">
                  {!proj.image && (
                    <span className="font-mono text-[9px] uppercase bg-[#000] text-[#FFE03A] px-2 py-0.5 tracking-wider font-extrabold select-none">
                      {proj.category}
                    </span>
                  )}
                  <div className="font-mono text-xs font-black text-[#E8281A] ml-auto select-none">
                    PROJ_{proj.pNo || "XX"} &middot; {proj.year}
                  </div>
                </div>

                <h3 className="font-bangers text-3xl text-black tracking-wider leading-none mb-3">
                  {proj.title}
                </h3>

                <p className="font-elite text-xs text-black/80 leading-relaxed mb-6">
                  {proj.description}
                </p>
              </div>

              {/* Base list of tags & route CTA */}
              <div className="border-t border-black/10 pt-4 mt-auto">
                <div className="flex flex-wrap gap-1.5 mb-4 max-w-full">
                  {proj.tags.map((tg: string) => (
                    <span
                      key={tg}
                      className="font-mono text-[9px] bg-neutral-100 border border-black/10 text-black/50 px-2 py-0.5 rounded font-bold"
                    >
                      {tg}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] tracking-widest text-black/40 font-extrabold uppercase">
                    SEEKING INTEL
                  </span>
                  <a
                    href={`/projects/${proj.slug || proj.id}`}
                    className="font-mono text-xs font-bold uppercase tracking-widest text-[#E8281A] bg-[#FFE03A]/30 border-2 border-black px-4 py-2 shadow-[2px_2px_0_#0d0d0d] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#0d0d0d] transition-all text-center inline-block"
                  >
                    Deep Spec &rarr;
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <div className="col-span-1 md:col-span-2 text-center py-20 border-[3px] border-dashed border-black/20 font-mono text-xs text-black/50 uppercase tracking-widest">
            ❌ NO RECORD PROTOCOLS MATCHING CRITERIA.
          </div>
        )}
      </div>
    </section>
  );
}
