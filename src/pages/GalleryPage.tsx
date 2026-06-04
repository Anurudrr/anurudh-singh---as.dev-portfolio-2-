import React, { useState } from "react";
import { useDB } from "../useDB";
import { motion, AnimatePresence } from "motion/react";

export default function GalleryPage() {
  const { gallery } = useDB();
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [zoomedItem, setZoomedItem] = useState<any | null>(null);

  const categories = ["All", "Graphic Design", "Software Engineering", "Photography", "UI/UX Prototype"];

  const filteredGallery = gallery.filter((item) => {
    const matchesCat = filter === "All" || item.tag === filter || (filter === "Software Engineering" && item.tag === "Dev Environment");
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          item.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section className="bg-[#faf6ec] py-16 px-6 sm:px-12 lg:px-16 min-h-screen">
      {/* HEADER BAR */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="font-mono text-xs text-[#E8281A] tracking-[0.3em] uppercase font-bold">
          // graphical footprints
        </div>
        <h2 className="font-bangers text-4xl sm:text-5xl lg:text-6xl text-black tracking-wider leading-none mt-2 mb-4">
          VISUAL LOGS &amp; SHAPES<span className="text-[#FFE03A] drop-shadow-[2px_2px_0_#000]">.</span>
        </h2>
        <p className="font-mono text-xs text-black/60 uppercase tracking-widest max-w-2xl">
          An archival showcase detailing creative layout processes, industrial vector constructs, photography shadows, and interactive layouts designed by Anurudh.
        </p>

        {/* CONTROLS BAR: SEARCH + STICKY FILTERS */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-10 border-t-2 border-dashed border-black/20 pt-8">
          {/* Categories tag triggers */}
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

          {/* Search box container */}
          <div className="relative w-full md:max-w-xs">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm select-none pointer-events-none opacity-50 font-mono">
              🔍
            </span>
            <input
              type="text"
              placeholder="FILTER ART LOGS..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border-2 border-black bg-white text-black font-mono text-[11px] placeholder-black/40 uppercase tracking-widest outline-none shadow-[2px_2px_0_#0d0d0d] focus:shadow-[4px_4px_0_#0d0d0d] transition-all"
            />
          </div>
        </div>
      </div>

      {/* THREE-COLUMN MASONRY GRID */}
      <div className="max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        <AnimatePresence mode="popLayout">
          {filteredGallery.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ y: -4 }}
              onClick={() => setZoomedItem(item)}
              className="break-inside-avoid border-[3px] border-black bg-white shadow-[4px_4px_0_#0d0d0d] overflow-hidden group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative overflow-hidden bg-neutral-100 border-b-2 border-black">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-2 left-2 bg-[#000] text-[#FFE03A] border border-black px-2 py-0.5 font-mono text-[8px] tracking-widest uppercase font-extrabold select-none">
                  {item.tag}
                </div>
              </div>

              <div className="p-5">
                <div className="font-mono text-[9px] text-black/40 tracking-widest uppercase font-bold mb-1">
                  {item.date}
                </div>
                <h4 className="font-bebas text-xl lg:text-2xl text-black tracking-wider leading-none mb-2">
                  {item.title}
                </h4>
                <p className="font-elite text-xs text-black/75 leading-relaxed">
                  {item.description}
                </p>
                
                <span className="font-mono text-[9px] text-[#E8281A] uppercase tracking-wider font-extrabold block text-right mt-4 hover:underline select-none">
                  ZOOM SPEC PANEL &darr;
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredGallery.length === 0 && (
        <div className="max-w-7xl mx-auto text-center py-24 border-[3px] border-dashed border-black/20 font-mono text-xs text-black/40 uppercase tracking-widest select-none">
          ❌ NO GRAPHICAL SAMPLES MATCHED YOUR SELECTOR.
        </div>
      )}

      {/* DETAIL LIGHTBOX COMPONENT - ZOOM OVERLAY */}
      <AnimatePresence>
        {zoomedItem && (
          <div className="fixed inset-0 z-[10100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setZoomedItem(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              className="bg-[#faf6ec] border-[4px] border-black p-6 sm:p-8 max-w-xl w-full relative shadow-[12px_12px_0_#0d0d0d] z-10 overflow-hidden"
            >
              <button
                onClick={() => setZoomedItem(null)}
                className="absolute top-4 right-4 font-mono font-extrabold text-[#E8281A] text-xs hover:scale-110 cursor-pointer"
              >
                [CLOSE X]
              </button>

              <div className="font-mono text-[9px] font-bold text-black/50 uppercase mb-2 select-none">
                AS_ARCHIVE_IMAGE_PORT // SHIFT_LOCK_ONLINE
              </div>

              <div className="w-full max-h-80 border-[3px] border-black shadow-[4px_4px_0_#000] mb-5 overflow-hidden bg-neutral-100">
                <img
                  src={zoomedItem.imageUrl}
                  alt={zoomedItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <h3 className="font-bangers text-3xl text-black tracking-wider leading-none">
                  {zoomedItem.title}
                </h3>
                <span className="bg-[#FFE03A] text-black border-2 border-black font-mono text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 shadow-[2px_2px_0_#000] select-none">
                  {zoomedItem.tag}
                </span>
              </div>

              <div className="font-mono text-xs text-[#E8281A] uppercase tracking-widest font-bold mb-4 select-none">
                EPOCH TIME: {zoomedItem.date}
              </div>

              <p className="font-elite text-sm text-black/85 leading-relaxed bg-[#FFE03A]/10 border-l-4 border-[#FFE03A] px-4 py-3 rounded-r">
                {zoomedItem.description}
              </p>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setZoomedItem(null)}
                  className="font-mono text-xs font-bold px-4 py-2 border-2 border-black bg-black text-[#FFE03A] hover:bg-red-700 hover:text-white transition-all shadow-[3px_3px_0_#0d0d0d] cursor-pointer"
                >
                  Return to Archive
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
