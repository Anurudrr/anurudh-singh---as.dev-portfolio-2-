import React from "react";
import { motion, AnimatePresence } from "motion/react";

interface ProjectEditorProps {
  projects: any[];
  projectForm: any | null;
  setProjectForm: (form: any | null) => void;
  dispatchProjectSave: (e: React.FormEvent) => void;
  dispatchProjectDelete: (id: string) => void;
}

export default function ProjectEditor({
  projects,
  projectForm,
  setProjectForm,
  dispatchProjectSave,
  dispatchProjectDelete
}: ProjectEditorProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6 border-b border-black/15 pb-4">
        <h3 className="font-bebas text-2xl tracking-wider text-black">
          PROJECT DATA NODE REGISTER ({projects.length})
        </h3>
        <button
          onClick={() =>
            setProjectForm({
              title: "",
              slug: "",
              year: "2026",
              category: "Web App",
              image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800",
              description: "",
              tags: "React, Tailwind, Express",
              problem: "",
              solution: "",
              challenges: "Formulating queries under concurrency constraints",
              learnings: "Optimized REST serializers and hook patterns",
              githubUrl: "",
              demoUrl: ""
            })
          }
          className="font-mono text-[10.5px] font-extrabold bg-[#FFE03A] border-2 border-black text-black px-4 py-2 hover:bg-black hover:text-[#FFE03A] transition-colors cursor-pointer"
        >
          ➕ CREATE PROJECT MODULE
        </button>
      </div>

      {/* PROJECT NODE TABLE LIST */}
      <div className="overflow-x-auto">
        <table className="w-full font-mono text-xs text-left">
          <thead>
            <tr className="border-b-2 border-black bg-stone-50 select-none">
              <th className="py-2.5 px-3">CODE_ID</th>
              <th className="py-2.5 px-3">TITLE</th>
              <th className="py-2.5 px-3">CATEGORY</th>
              <th className="py-2.5 px-1 font-bold">RELEASE</th>
              <th className="py-2.5 px-3 text-right">SYSTEM ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-b border-black/10 hover:bg-neutral-50">
                <td className="py-4 px-3 font-semibold text-[#E8281A]">{p.pNo || "XX"}</td>
                <td className="py-4 px-3 font-extrabold text-black">{p.title}</td>
                <td className="py-4 px-3 uppercase text-black/60">{p.category}</td>
                <td className="py-4 px-1">{p.year}</td>
                <td className="py-4 px-3 text-right space-x-2">
                  <button
                    onClick={() => setProjectForm({ ...p, tags: p.tags?.join(", ") || "" })}
                    className="bg-neutral-100 hover:bg-[#FFE03A] border border-black font-extrabold px-2.5 py-1 text-[10px] cursor-pointer"
                  >
                    ✎ EDIT
                  </button>
                  <button
                    onClick={() => dispatchProjectDelete(p.id)}
                    className="bg-neutral-100 hover:bg-[#E8281A] hover:text-white border border-black font-extrabold px-2.5 py-1 text-[10px] cursor-pointer"
                  >
                    🗑 DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 1. PROJECT CREATOR OR EDITOR DIALOG */}
      <AnimatePresence>
        {projectForm && (
          <div className="fixed inset-0 z-[10200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setProjectForm(null)} />
            <motion.div
              initial={{ scale: 0.93, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.93, y: 15 }}
              className="bg-white border-[4px] border-black p-6 sm:p-8 max-w-2xl w-full relative max-h-[85vh] overflow-y-auto shadow-[12px_12px_0_#000] z-20"
            >
              <button
                onClick={() => setProjectForm(null)}
                className="absolute top-4 right-4 font-mono font-bold text-red-600 border border-red-300 bg-red-50 text-xs px-2 py-0.5 cursor-pointer"
              >
                [X CLOSE]
              </button>

              <h3 className="font-bangers text-3xl tracking-widest mb-6 text-black">
                PROJECT CONFIG MODULE DIALOGUE
              </h3>

              <form onSubmit={dispatchProjectSave} className="space-y-4 font-mono text-xs text-black">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-black/50 block mb-1">PROJECT TITLE</label>
                    <input
                      type="text"
                      required
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      className="w-full p-2 border-2 border-black bg-stone-50"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-black/50 block mb-1">ROUTE SLUG</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. dynamic-leetcode-revision"
                      value={projectForm.slug}
                      onChange={(e) => setProjectForm({ ...projectForm, slug: e.target.value })}
                      className="w-full p-2 border-2 border-black bg-stone-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="font-bold text-black/50 block mb-1">YEAR</label>
                    <input
                      type="text"
                      required
                      value={projectForm.year}
                      onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                      className="w-full p-2 border-2 border-black bg-stone-50"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-black/50 block mb-1">CATEGORY</label>
                    <select
                      value={projectForm.category}
                      onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                      className="w-full p-2 border-2 border-black bg-white"
                    >
                      <option value="Web App">Web App</option>
                      <option value="Full Stack">Full Stack</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-black/50 block mb-1">IMAGE URL</label>
                    <input
                      type="text"
                      value={projectForm.image}
                      onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                      className="w-full p-2 border-2 border-black bg-stone-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-black/50 block mb-1">BRIEF SPEC DESCRIPTION</label>
                  <textarea
                    rows={2}
                    required
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    className="w-full p-2 border-2 border-black resize-none bg-stone-50"
                  />
                </div>

                <div>
                  <label className="font-bold text-black/50 block mb-1">TECH STACK TAGS (COMMA SEPARATED)</label>
                  <input
                    type="text"
                    required
                    value={projectForm.tags}
                    onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                    className="w-full p-2 border-2 border-black bg-stone-50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-black/50 block mb-1">THE CORE PROBLEM</label>
                    <textarea
                      rows={2}
                      value={projectForm.problem || ""}
                      onChange={(e) => setProjectForm({ ...projectForm, problem: e.target.value })}
                      className="w-full p-2 border-2 border-black resize-none bg-stone-50"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-black/50 block mb-1">THE SCHEMATIC SOLUTION</label>
                    <textarea
                      rows={2}
                      value={projectForm.solution || ""}
                      onChange={(e) => setProjectForm({ ...projectForm, solution: e.target.value })}
                      className="w-full p-2 border-2 border-black resize-none bg-stone-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-black/50 block mb-1">REPO PORT GITHUB LINK</label>
                    <input
                      type="text"
                      placeholder="https://github.com/..."
                      value={projectForm.githubUrl || ""}
                      onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                      className="w-full p-2 border-2 border-black bg-stone-50"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-black/50 block mb-1">LIVE URL DEPLOYMENT LINK</label>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={projectForm.demoUrl || ""}
                      onChange={(e) => setProjectForm({ ...projectForm, demoUrl: e.target.value })}
                      className="w-full p-2 border-2 border-black bg-stone-50"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    type="submit"
                    className="font-mono text-xs font-bold uppercase tracking-widest bg-black text-[#FFE03A] border-2 border-black px-6 py-3 hover:bg-stone-200 hover:text-black transition-all cursor-pointer shadow-[3px_3px_0_#E8281A]"
                  >
                    COMMIT DATA PACKET &rarr;
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
