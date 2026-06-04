import React, { useState } from "react";
import { GALLERY_DATA, GalleryItem } from "../types";
import { motion, AnimatePresence } from "motion/react";

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [zoomedItem, setZoomedItem] = useState<GalleryItem | null>(null);

  const tags = ["All", "Graphic Design", "Software Engineering", "Photography", "UI/UX Prototype"];

  const filteredGallery = GALLERY_DATA.filter((item) => {
    if (filter === "All") return true;
    return item.tag === filter || (filter === "Software Engineering" && item.tag === "Dev Environment");
  });

  return (
    <section id="gallery" className="border-b-[3px] border-[#0d0d0d] bg-[#faf6ec] py-12 px-6 sm:px-12 lg:px-16">
      {/* HEADER ROW */}
      <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-10 gap-6">
        <div>
          <div className="font-mono text-xs text-[#E8281A] tracking-[0.3em] uppercase font-bold">
            // visual chronicle
          </div>
          <h2 className="font-bangers text-4xl sm:text-5xl lg:text-6xl text-black tracking-wider leading-none mt-2">
            DESIGNER GALLERY<span className="text-[#1A5CE8]">.</span>
          </h2>
          <p className="font-mono text-[9px] sm:text-xs text-black/60 uppercase tracking-wider mt-4">
            Curated snapshots capturing Anurudh&apos;s journey from graphical pixel grids to production code stacks.
          </p>
        </div>

        {/* Filters and Tags indicators */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tg) => (
            <button
              key={tg}
              onClick={() => setFilter(tg)}
              className={`font-mono text-[10px] sm:text-xs font-bold px-3 py-1.5 border-2 border-black hover:bg-[#FFE03A]/20 cursor-pointer shadow-[2px_2px_0_#0d0d0d] transition-all ${
                filter === tg ? "bg-[#FFE03A] text-black -translate-x-0.5 -translate-y-0.5 shadow-[4px_4px_0_#0d0d0d]" : "bg-white text-black"
              }`}
            >
              {tg}
            </button>
          ))}
        </div>
      </div>

      {/* GALLERY GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredGallery.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setZoomedItem(item)}
              className="border-[3px] border-black bg-white shadow-[4px_4px_0_#0d0d0d] group cursor-pointer overflow-hidden flex flex-col justify-between"
            >
              {/* Image box frame */}
              <div className="h-48 border-b-2 border-black relative overflow-hidden bg-neutral-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Visual Label indicators */}
                <div className="absolute bottom-2 left-2 bg-[#0d0d0d] text-[#FFE03A] border border-black px-2 py-0.5 font-mono text-[8px] tracking-widest uppercase font-extrabold select-none">
                  {item.tag}
                </div>
              </div>

              {/* Text bottom bar */}
              <div className="p-4 bg-white flex-1 flex flex-col justify-between">
                <div>
                  <div className="font-mono text-[9px] text-black/45 tracking-widest uppercase font-bold mb-1">
                    {item.date}
                  </div>
                  <h4 className="font-bebas text-lg lg:text-xl tracking-wider text-black mb-1 leading-none">
                    {item.title}
                  </h4>
                  <p className="font-elite text-xs text-black/75 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                
                <span className="font-mono text-[9px] text-[#E8281A] hover:underline uppercase tracking-wider font-extrabold block text-right mt-3">
                  Zoom Panel &rarr;
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* DETAIL LIGHTBOX ZOOM OVERLAY */}
      <AnimatePresence>
        {zoomedItem && (
          <div className="fixed inset-0 z-[10100] flex items-center justify-center p-4">
            {/* Dark blur static backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setZoomedItem(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Content modal */}
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="bg-[#faf6ec] border-[4px] border-black p-6 sm:p-8 max-w-xl w-full relative shadow-[12px_12px_0_#0d0d0d] z-10 overflow-hidden"
            >
              {/* Close Button tag */}
              <button
                onClick={() => setZoomedItem(null)}
                className="absolute top-4 right-4 font-mono font-extrabold text-[#E8281A] text-xs hover:scale-110 cursor-pointer"
              >
                [CLOSE X]
              </button>

              <div className="font-mono text-[9px] font-bold text-black/50 uppercase mb-2">
                AS_PORTFOLIO_IMAGE // HISTORIC_LOG
              </div>

              {/* Big showcase Image frame */}
              <div className="w-full h-64 border-[3px] border-black shadow-[4px_4px_0_#0d0d0d] mb-4 bg-neutral-100 overflow-hidden">
                <img
                  src={zoomedItem.imageUrl}
                  alt={zoomedItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h3 className="font-bangers text-2xl text-black tracking-wider leading-none">
                  {zoomedItem.title}
                </h3>
                <span className="bg-[#FFE03A] text-black border-2 border-black font-mono text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 shadow-[2px_2px_0_#000]">
                  {zoomedItem.tag}
                </span>
              </div>

              <div className="font-mono text-xs text-[#E8281A] uppercase tracking-widest font-bold mb-4">
                Creation Epoch: {zoomedItem.date}
              </div>

              <p className="font-elite text-sm text-black/85 leading-relaxed bg-[#FFE03A]/10 border-l-4 border-[#FFE03A] px-4 py-3 rounded-r">
                {zoomedItem.description}
              </p>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setZoomedItem(null)}
                  className="font-mono text-xs font-bold px-4 py-2 border-2 border-black bg-black text-[#FFE03A] hover:bg-red-700 hover:text-white transition-all shadow-[3px_3px_0_#0d0d0d] cursor-pointer"
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
