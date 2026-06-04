import React, { useState } from "react";
import { SKILL_CATEGORIES } from "../types";
import { motion } from "motion/react";

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Filter skills based on search state (if any)
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = SKILL_CATEGORIES.map((cat) => {
    const matchedSkills = cat.skills.filter((skill) =>
      skill.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return {
      ...cat,
      skills: matchedSkills,
    };
  }).filter((cat) => cat.skills.length > 0);

  return (
    <section id="skills" className="border-b-[3px] border-[#0d0d0d] bg-[#faf6ec]">
      {/* Header bar */}
      <div className="p-6 sm:p-8 lg:p-12 border-b-[3px] border-[#0d0d0d] bg-[#E8281A] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="font-mono text-xs text-[#faf6ec]/75 uppercase tracking-[0.3em] font-bold">
            // capability matrix
          </div>
          <h2 className="font-bangers text-4xl sm:text-5xl lg:text-6xl text-white tracking-widest leading-none mt-2">
            DEV ARSENAL SYSTEM
          </h2>
        </div>

        {/* Dynamic Interactive Filter Row */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <span className="font-mono text-[10px] sm:text-xs text-white uppercase tracking-widest font-bold">Search Stack:</span>
          <div className="relative w-full sm:w-[240px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. React, Java, Figma"
              className="w-full px-4 py-2 bg-white text-black font-mono text-xs border-[3px] border-black outline-none shadow-[3px_3px_0_#0d0d0d] focus:shadow-[1px_1px_0_#0d0d0d] focus:translate-x-[2px] focus:translate-y-[2px] transition-all placeholder:text-black/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-red-600 font-extrabold cursor-pointer"
              >
                [X]
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredCategories.map((category, catIdx) => (
          <motion.div
            key={category.title}
            className={`p-6 sm:p-8 border-b-[3px] md:border-b-0 border-[#0d0d0d] border-r-0 md:border-r-[3px] last:border-b-0 group transition-colors duration-200 ${
              (catIdx + 1) % 3 === 0 ? "lg:border-r-0" : ""
            } ${
              selectedCategory === category.title ? "bg-[#FFE03A]/25" : "bg-[#faf6ec]"
            }`}
          >
            {/* Header label */}
            <h3 className="font-bebas text-2xl lg:text-3xl tracking-wider text-black flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-full border-2 border-black bg-[#FFE03A] flex items-center justify-center shadow-[2px_2px_0_#0d0d0d]">
                {category.icon}
              </span>
              {category.title}
            </h3>

            {/* List items */}
            <div className="flex flex-col gap-4">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="group/skill relative"
                >
                  <div className="flex justify-between items-center mb-1 font-mono text-xs font-bold text-black font-semibold">
                    <span>{skill.name}</span>
                    <span className="text-[10px] text-[#0d0d0d]/50 bg-white border border-black px-1">
                      {skill.rating}%
                    </span>
                  </div>

                  {/* Tactile Progress Bar */}
                  <div className="w-full h-4 border-[2px] border-black bg-white shadow-[2px_2px_0_#0d0d0d] relative overflow-hidden">
                    <motion.div
                      className="absolute top-0 bottom-0 left-0 bg-[#0d0d0d] origin-left"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.rating}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>

                  {/* Micro descriptions shown on hover */}
                  {hoveredSkill === skill.name && (
                    <div className="absolute top-[100%] right-0 z-25 bg-[#0d0d0d] text-white border-2 border-black font-mono text-[9px] px-2 py-1 shadow-[2px_2px_0_#FFE03A]">
                      Anurudh Rating: {skill.rating}% Proficiency
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="p-16 text-center font-mono text-sm max-w-md mx-auto">
          🔒 No matching skills for <span className="text-[#E8281A] text-bold">&ldquo;{searchQuery}&rdquo;</span> found. Try looking for <span className="underline cursor-pointer" onClick={() => setSearchQuery("React")}>React</span> or <span className="underline cursor-pointer" onClick={() => setSearchQuery("Java")}>Java</span>!
        </div>
      )}
    </section>
  );
}
