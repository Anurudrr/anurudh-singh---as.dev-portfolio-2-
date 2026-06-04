import React, { useState } from "react";
import { useDB } from "../useDB";
import { motion, AnimatePresence } from "motion/react";

export default function BlogPage() {
  const { blog } = useDB();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Engineering Style", "Backend Development"];

  const filteredBlog = blog.filter((post) => {
    const matchesCat = filter === "All" || post.category === filter;
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) || 
                          post.summary.toLowerCase().includes(search.toLowerCase()) ||
                          post.tags.some((t: string) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <section className="bg-[#faf6ec] py-16 px-6 sm:px-12 lg:px-16 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="mb-12">
          <div className="font-mono text-xs text-[#E8281A] tracking-[0.3em] uppercase font-bold">
            // developers notebook
          </div>
          <h2 className="font-bangers text-4xl sm:text-5xl lg:text-6xl text-black tracking-wider leading-none mt-2 mb-4">
            THE LOGIC DIARIES<span className="text-[#1A5CE8]">.</span>
          </h2>
          <p className="font-mono text-xs text-black/60 uppercase tracking-widest max-w-xl">
            A tech-focused ledger containing articles, step-by-step logic audits, and micro-studies written by Anurudh Singh.
          </p>

          {/* CHIEF CONTROLS */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-10 border-t-2 border-dashed border-black/20 pt-8">
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

            <div className="relative w-full md:max-w-xs">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm select-none pointer-events-none opacity-50 font-mono">
                🔍
              </span>
              <input
                type="text"
                placeholder="SEARCH TECH STUDIES..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border-2 border-black bg-white text-black font-mono text-[11px] placeholder-black/40 uppercase tracking-widest outline-none shadow-[2px_2px_0_#0d0d0d] focus:shadow-[4px_4px_0_#0d0d0d] transition-all"
              />
            </div>
          </div>
        </div>

        {/* ARTICLES FEED */}
        <div className="space-y-8">
          <AnimatePresence mode="popLayout">
            {filteredBlog.map((post) => (
              <motion.article
                layout
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                whileHover={{ scale: 1.01, x: 5 }}
                className="border-[3px] border-black bg-white p-6 sm:p-8 shadow-[6px_6px_0_#0d0d0d] transition-all relative overflow-hidden group"
              >
                {/* Visual side highlights */}
                <div className="absolute top-0 bottom-0 left-0 w-2.5 bg-[#E8281A]" />

                <div className="pl-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-2 select-none">
                    <span className="font-mono text-[9px] font-bold bg-[#FFE03A] text-black border border-black px-2 py-0.5 uppercase shadow-[1px_1px_0_#000]">
                      {post.category}
                    </span>
                    <span className="font-mono text-xs text-black/50 font-semibold uppercase">
                      ✍️ {post.readingTime} &middot; {post.date}
                    </span>
                  </div>

                  <h3 className="font-bangers text-2xl sm:text-3xl lg:text-4xl text-black hover:text-[#E8281A] transition-colors leading-tight mb-3">
                    <a href={`/blog/${post.slug || post.id}`}>{post.title}</a>
                  </h3>

                  <p className="font-elite text-sm text-black/85 leading-relaxed mb-6">
                    {post.summary}
                  </p>

                  <div className="flex flex-wrap items-center justify-between border-t border-black/10 pt-4 gap-4">
                    <div className="flex flex-wrap gap-1.5 select-none">
                      {post.tags.map((tg: string) => (
                        <span
                          key={tg}
                          className="font-mono text-[9px] bg-neutral-100 text-black/60 border border-black/15 px-2 py-0.5 rounded font-bold"
                        >
                          #{tg}
                        </span>
                      ))}
                    </div>

                    <a
                      href={`/blog/${post.slug || post.id}`}
                      className="font-mono text-xs font-bold uppercase tracking-widest text-[#E8281A] hover:underline whitespace-nowrap"
                    >
                      READ PROTOCOLS &rarr;
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>

          {filteredBlog.length === 0 && (
            <div className="text-center py-20 border-[3px] border-dashed border-black/20 font-mono text-xs text-black/40 uppercase tracking-widest select-none">
              ❌ NO RECORDED ARTICLES FIT THOSE SPECIFICATIONS.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
