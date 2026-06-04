import React, { useState } from "react";
import { PROJECTS_DATA, ProjectItem } from "../types";
import { motion, AnimatePresence } from "motion/react";

export default function Projects() {
  const [filter, setFilter] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = ["All", "Web App", "Full Stack", "UI/UX Design"];

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    if (filter === "All") return true;
    return project.category === filter;
  });

  return (
    <section id="projects" className="border-b-[3px] border-[#0d0d0d]">
      {/* Header Panel */}
      <div className="p-6 sm:p-8 lg:p-12 border-b-[3px] border-[#0d0d0d] bg-[#faf6ec] flex flex-col md:flex-row md:items-baseline justify-between gap-6">
        <div>
          <div className="font-mono text-xs text-[#0d0d0d]/50 uppercase tracking-[0.3em] font-bold">
            // recent work
          </div>
          <h2 className="font-bangers text-4xl sm:text-5xl lg:text-6xl text-[#0d0d0d] tracking-wider leading-none mt-2">
            PROJECTS<span className="text-[#E8281A]">.</span>
          </h2>
        </div>

        {/* Dynamic Category Selector Filters */}
        <div className="flex flex-wrap gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`font-mono text-[10px] sm:text-xs tracking-wider uppercase font-bold py-2 px-4 border-2 border-black shadow-[3px_3px_0_#0d0d0d] transition-all cursor-pointer ${
                filter === cat
                  ? "bg-[#0d0d0d] text-[#FFE03A] -translate-x-0.5 -translate-y-0.5"
                  : "bg-white text-black hover:bg-[#FFE03A]/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid with AnimatePresence */}
      <div className="grid grid-cols-1 md:grid-cols-2 bg-[#faf6ec]">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              key={project.id}
              className="p-6 sm:p-10 border-b-[2px] border-r-0 md:border-r-[2px] border-[#0d0d0d] relative overflow-hidden group hover:bg-black transition-colors duration-200"
            >
              {/* Big Comic Number background */}
              <div className="font-bangers text-7xl md:text-8xl text-black/5 absolute top-4 right-6 leading-none select-none transition-all group-hover:text-white/10 pointer-events-none">
                {project.pNo}
              </div>

              {/* Year Metadata */}
              <div className="font-mono text-[10px] font-bold tracking-widest text-black/55 group-hover:text-white/50 mb-3 uppercase">
                {project.year} &middot; {project.category}
              </div>

              {/* Project Title */}
              <h3 className="font-bangers text-2xl sm:text-3xl text-black tracking-wide group-hover:text-[#FFE03A] mb-4 transition-colors duration-150">
                {project.title}
              </h3>

              {/* Description */}
              <p className="font-elite text-xs sm:text-sm leading-relaxed text-[#0d0d0d]/75 group-hover:text-white/80 mb-6 transition-colors duration-200">
                {project.description.slice(0, 160)}...
              </p>

              {/* Tags panel */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[9px] font-semibold tracking-wider uppercase border border-black/25 px-2 py-0.5 text-black/60 group-hover:border-white/30 group-hover:text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer Interactive Actions */}
              <div className="flex gap-4 items-center">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="font-mono text-[9px] sm:text-[10px] font-bold tracking-widest uppercase bg-[#FFE03A] text-black border-2 border-black py-1.5 px-3 shadow-[2px_2px_0_#0d0d0d] cursor-pointer group-hover:shadow-[2px_2px_0_#FFE03A] hover:-translate-y-0.5 transition-all"
                >
                  Inspect details
                </button>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-black group-hover:text-[#FFE03A] border-b-2 border-transparent hover:border-black group-hover:hover:border-[#FFE03A] py-1 transition-all"
                  >
                    GitHub Module &nearr;
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* DETAIL OVERLAY POPUP MODAL (Highly Interactive & Professional Upgrade!) */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="bg-[#faf6ec] border-[4px] border-black p-6 sm:p-8 max-w-lg w-full relative shadow-[12px_12px_0_#0d0d0d] z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 font-mono font-extrabold text-[#E8281A] text-sm hover:scale-110 cursor-pointer"
              >
                [CLOSE X]
              </button>

              <div className="font-mono text-[10px] font-bold text-black/50 uppercase mb-2">
                PROJECT METRIC SHEET // {selectedProject.year}
              </div>

              <h4 className="font-bangers text-3xl text-black tracking-wide mb-3">
                {selectedProject.title}
              </h4>

              <div className="font-bebas text-sm text-[#E8281A] uppercase tracking-widest mb-4">
                Category: {selectedProject.category}
              </div>

              {/* Long Description */}
              <p className="font-elite text-sm leading-relaxed text-black/85 mb-6 bg-yellow-100/40 p-4 border-l-4 border-[#FFAE00] border-solid rounded-r">
                {selectedProject.description}
              </p>

              {/* Technologies list */}
              <div className="mb-6">
                <span className="font-mono text-[10px] sm:text-xs text-black/40 uppercase font-bold block mb-2">
                  COMPILED TECHNOLOGIES
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] font-bold bg-[#faf6ec] border-[2px] border-black px-2 py-1 text-black shadow-[2px_2px_0_#0d0d0d]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions inside modal */}
              <div className="flex gap-4">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs font-bold leading-none tracking-wider text-black bg-[#FFE03A] border-2 border-black px-4 py-3 shadow-[4px_4px_0_#0d0d0d] text-center flex-1 uppercase transition-transform hover:-translate-y-0.5"
                  >
                    Clone Source Repo &nearr;
                  </a>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="font-mono text-xs font-bold leading-none tracking-wider text-[#0d0d0d] bg-transparent border-2 border-black px-4 py-3 shadow-[4px_4px_0_#0d0d0d] text-center hover:bg-neutral-200 transition-all flex-1 uppercase cursor-pointer"
                >
                  Return to Port
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
