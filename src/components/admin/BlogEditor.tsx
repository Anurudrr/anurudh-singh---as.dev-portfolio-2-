import React from "react";
import { motion, AnimatePresence } from "motion/react";

interface BlogEditorProps {
  blog: any[];
  blogForm: any | null;
  setBlogForm: (form: any | null) => void;
  dispatchBlogSave: (e: React.FormEvent) => void;
  dispatchBlogDelete: (id: string) => void;
}

export default function BlogEditor({
  blog,
  blogForm,
  setBlogForm,
  dispatchBlogSave,
  dispatchBlogDelete
}: BlogEditorProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6 border-b border-black/15 pb-4">
        <h3 className="font-bebas text-2xl tracking-wider text-black">
          LOGIC DIARIES ARTICLES ({blog.length})
        </h3>
        <button
          onClick={() =>
            setBlogForm({
              title: "",
              slug: "",
              category: "Engineering Style",
              tags: "Java, Collections, OOP",
              summary: "",
              content: ""
            })
          }
          className="font-mono text-[10.5px] font-extrabold bg-[#FFE03A] border-2 border-black text-black px-4 py-2 hover:bg-black hover:text-[#FFE03A] transition-colors cursor-pointer"
        >
          ➕ CREATE BLOG ARTICLE
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full font-mono text-xs text-left">
          <thead>
            <tr className="border-b-2 border-black bg-stone-50 select-none">
              <th className="py-2.5 px-3">DATE</th>
              <th className="py-2.5 px-3">TITLE</th>
              <th className="py-2.5 px-3">CATEGORY</th>
              <th className="py-2.5 px-3 text-right">SYSTEM ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {blog.map((b) => (
              <tr key={b.id} className="border-b border-black/10 hover:bg-neutral-50">
                <td className="py-4 px-3 text-black/50">{b.date}</td>
                <td className="py-4 px-3 font-extrabold text-black">{b.title}</td>
                <td className="py-4 px-3 text-[#1A5CE8] font-bold uppercase">{b.category}</td>
                <td className="py-4 px-3 text-right space-x-2">
                  <button
                    onClick={() => setBlogForm({ ...b, tags: b.tags?.join(", ") || "" })}
                    className="bg-neutral-100 hover:bg-[#FFE03A] border border-black font-extrabold px-2.5 py-1 text-[10px] cursor-pointer"
                  >
                    ✎ EDIT
                  </button>
                  <button
                    onClick={() => dispatchBlogDelete(b.id)}
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

      {/* 2. BLOG CREATOR OR EDITOR DIALOG */}
      <AnimatePresence>
        {blogForm && (
          <div className="fixed inset-0 z-[10200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setBlogForm(null)} />
            <motion.div
              initial={{ scale: 0.93, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.93, y: 15 }}
              className="bg-white border-[4px] border-black p-6 sm:p-8 max-w-2xl w-full relative max-h-[85vh] overflow-y-auto shadow-[12px_12px_0_#000] z-20"
            >
              <button
                onClick={() => setBlogForm(null)}
                className="absolute top-4 right-4 font-mono font-bold text-red-600 border border-red-300 bg-red-50 text-xs px-2 py-0.5 cursor-pointer"
              >
                [X CLOSE]
              </button>

              <h3 className="font-bangers text-3xl tracking-widest mb-6 text-black">
                BLOG WRITING UTILITY
              </h3>

              <form onSubmit={dispatchBlogSave} className="space-y-4 font-mono text-xs text-black">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-black/50 block mb-1">BLOG TITLE</label>
                    <input
                      type="text"
                      required
                      value={blogForm.title}
                      onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                      className="w-full p-2 border-2 border-black bg-stone-50"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-black/50 block mb-1">URL ROUTE SLUG</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. java-concurrency-locks"
                      value={blogForm.slug}
                      onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                      className="w-full p-2 border-2 border-black bg-stone-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-black/50 block mb-1">CATEGORY</label>
                    <select
                      value={blogForm.category}
                      onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                      className="w-full p-2 border-2 border-black bg-white"
                    >
                      <option value="Engineering Style">Engineering Style</option>
                      <option value="Backend Development">Backend Development</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-black/50 block mb-1">KEYWORDS/TAGS (COMMA SEPARATED)</label>
                    <input
                      type="text"
                      required
                      value={blogForm.tags}
                      onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                      className="w-full p-2 border-2 border-black bg-stone-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-black/50 block mb-1">SUMMARY/PITCH DECK</label>
                  <textarea
                    rows={2}
                    required
                    value={blogForm.summary}
                    onChange={(e) => setBlogForm({ ...blogForm, summary: e.target.value })}
                    className="w-full p-2 border-2 border-black resize-none bg-stone-50"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#E8281A] block mb-1 font-mono">MARKDOWN MARK LEVEL WRITING</label>
                  <textarea
                    rows={10}
                    required
                    placeholder="Use ### for heading labels, ** for highlighted boxes..."
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    className="w-full p-3 border-2 border-black font-mono leading-relaxed bg-stone-50 text-black"
                  />
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    type="submit"
                    className="font-mono text-xs font-bold uppercase tracking-widest bg-black text-[#FFE03A] border-2 border-black px-6 py-3 hover:bg-stone-200 hover:text-black transition-all cursor-pointer shadow-[3px_3px_0_#FFF]"
                  >
                    PUBLISH JOURNAL PIECE &rarr;
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
