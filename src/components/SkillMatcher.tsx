import React, { useState, useEffect } from "react";
import { PROJECTS_DATA, ProjectItem } from "../types";
import { motion, AnimatePresence } from "motion/react";

const CALC_KITS = [
  { name: "React.js", weight: 25, tag: "React.js" },
  { name: "Java", weight: 25, tag: "Java" },
  { name: "Spring Boot", weight: 20, tag: "Spring Boot" },
  { name: "Tailwind CSS", weight: 15, tag: "Tailwind CSS" },
  { name: "MySQL", weight: 15, tag: "MySQL" },
  { name: "Figma & Design", weight: 15, tag: "Figma" },
  { name: "DSA Core", weight: 20, tag: "DSA Algorithms" },
];

export default function SkillMatcher() {
  const [selectedTools, setSelectedTools] = useState<string[]>(["React.js", "Java"]);
  const [affinity, setAffinity] = useState(0);
  const [suggestedProjects, setSuggestedProjects] = useState<ProjectItem[]>([]);

  const handleToggleTool = (toolName: string) => {
    if (selectedTools.includes(toolName)) {
      setSelectedTools(selectedTools.filter((t) => t !== toolName));
    } else {
      setSelectedTools([...selectedTools, toolName]);
    }
  };

  useEffect(() => {
    // Math logic: calculate percentage matches
    if (selectedTools.length === 0) {
      setAffinity(0);
      setSuggestedProjects([]);
      return;
    }

    // Weight allocation sum
    const selectedKit = CALC_KITS.filter((k) => selectedTools.includes(k.name));
    
    // Max achievable points based on selected items is the sum, let's represent standard alignment points
    let skillCompetenceSum = 0;
    // Mocking an alignment coefficient
    selectedKit.forEach((k) => {
      skillCompetenceSum += k.weight;
    });

    const activeMaxSum = CALC_KITS.reduce((acc, k) => acc + k.weight, 0);
    // Scale up slightly or allocate affinity
    const baseAffinityPoint = Math.min(Math.floor((skillCompetenceSum / activeMaxSum) * 100) + 30, 100);
    setAffinity(baseAffinityPoint);

    // Map to actual projects containing tags matching selected selection
    const matchingTags = selectedKit.map((k) => k.tag.toLowerCase());
    const matched = PROJECTS_DATA.filter((project) => {
      return project.tags.some((tag) =>
        matchingTags.some((mt) => tag.toLowerCase().includes(mt) || mt.includes(tag.toLowerCase()))
      );
    });
    setSuggestedProjects(matched);
  }, [selectedTools]);

  const getVibeReport = () => {
    if (affinity >= 90) return { title: "ELITE SYSTEM FIT 🚀", col: "text-red-600", desc: "Anurudh holds outstanding command over this stack. He aligns perfectly with your production parameters!" };
    if (affinity >= 70) return { title: "STRONG APPLICANT BLEND 🤝", col: "text-blue-600", desc: "Highly robust compliance metrics. Excellent full-stack development capability assured." };
    if (affinity >= 45) return { title: "VIABLE INTEGRATION PROSPECT 👍", col: "text-green-700", desc: "Steady capability base with fast adaptation on related systems." };
    return { title: "SELECT REQUIREMENT CRITERIA 📋", col: "text-neutral-500", desc: "Toggle custom development elements on the board to compute system affinity coefficients." };
  };

  const report = getVibeReport();

  return (
    <section id="matcher" className="border-b-[3px] border-[#0d0d0d] bg-[#faf6ec] py-12 px-6 sm:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 relative overflow-hidden">
      {/* Decorative grids */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(#0d0d0d_1px,transparent_1px)] bg-[size:16px_16px] opacity-10 pointer-events-none" />

      {/* Intro board (Col 5) */}
      <div className="lg:col-span-5 flex flex-col justify-center">
        <div className="font-mono text-xs text-[#E8281A] tracking-[0.3em] uppercase mb-3 font-semibold">
          // recruiter interactive simulator
        </div>
        <h3 className="font-bangers text-4xl sm:text-5xl text-black tracking-wider leading-none mb-4">
          RECRUITER AFFINITY COUPLING
        </h3>
        <p className="font-elite text-sm text-black/75 leading-relaxed max-w-md">
          Assemble your desired organizational tech requirements below. Our brutalist metrics compiler computes Anurudh's compliance scores and displays his corresponding proof of works.
        </p>

        {/* Display Affinity Gauge */}
        <div className="mt-8 bg-white border-[3px] border-black p-6 relative shadow-[6px_6px_0_#0d0d0d] max-w-[360px]">
          <span className="font-mono text-[9px] text-black/45 block tracking-widest uppercase font-semibold">
            COMPUTED_STACK_AFFINITY
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-bangers text-6xl tracking-wide text-black">{affinity}%</span>
            <span className="font-mono text-xs font-bold text-black/50">COEFFICIENT</span>
          </div>

          <div className="w-full h-3 border-2 border-black bg-neutral-100 mt-4 relative overflow-hidden">
            <motion.div
              className="absolute top-0 bottom-0 left-0 bg-[#E8281A] border-r-2 border-black"
              animate={{ width: `${affinity}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>

          <div className="mt-4">
            <div className={`font-bebas text-lg ${report.col} tracking-wider`}>
              {report.title}
            </div>
            <p className="font-mono text-[11px] text-black/70 leading-relaxed mt-1">
              {report.desc}
            </p>
          </div>
        </div>
      </div>

      {/* Control center & outputs (Col 7) */}
      <div className="lg:col-span-7 flex flex-col gap-6 justify-center">
        {/* Selection panel */}
        <div className="bg-white border-[3px] border-black p-6 shadow-[6px_6px_0_#0d0d0d]">
          <span className="font-mono text-[10px] text-black/40 uppercase font-extrabold block mb-4">
            Toggle Tech Specs Needed:
          </span>
          <div className="flex flex-wrap gap-2.5">
            {CALC_KITS.map((kit) => {
              const isActive = selectedTools.includes(kit.name);
              return (
                <button
                  key={kit.name}
                  onClick={() => handleToggleTool(kit.name)}
                  className={`font-mono text-[10px] sm:text-xs font-bold py-2 px-3 border-2 border-slate-900 shadow-[2px_2px_0_#000000] transition-transform flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? "bg-[#FFE03A] text-black -translate-x-0.5 -translate-y-0.5"
                      : "bg-[#faf6ec] text-black hover:bg-neutral-100"
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-sm border border-black ${isActive ? 'bg-red-600' : 'bg-white'}`} />
                  {kit.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Suggested proof of works */}
        <div className="bg-white border-[3px] border-black p-6 shadow-[6px_6px_0_#0d0d0d] min-h-[140px] flex flex-col">
          <span className="font-mono text-[10px] text-black/40 uppercase font-extrabold block mb-3">
            Proof of Works Aligned ({suggestedProjects.length}):
          </span>

          <AnimatePresence mode="popLayout">
            {suggestedProjects.length > 0 ? (
              <div className="flex flex-col gap-3">
                {suggestedProjects.map((proj) => (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.15 }}
                    key={proj.id}
                    className="border-l-4 border-[#FFE03A] bg-[#faf6ec] p-3 border-2 border-black flex items-center justify-between font-mono hover:bg-[#FFE03A]/10 transition-colors"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-black uppercase tracking-wide block">
                        {proj.title}
                      </span>
                      <span className="text-[9px] text-black/50">Category: {proj.category}</span>
                    </div>
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[9px] font-bold text-red-600 border border-black bg-[#faf6ec] px-1.5 py-0.5 shadow-[1px_1px_0_#0d0d0d]"
                      >
                        Inspect Code &nearr;
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="my-auto text-center font-mono text-xs text-black/40 uppercase tracking-widest py-4">
                No tools enabled. Set requirements to show portfolio proofs.
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
