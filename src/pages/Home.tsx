import React from "react";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import About from "../components/About";
import { useDB } from "../useDB";
import { motion } from "motion/react";

export default function Home() {
  const { projects, gallery } = useDB();

  // Pick first 2 projects as featured
  const featured = projects.slice(0, 2);
  // Pick first 3 gallery items
  const recentArt = gallery.slice(0, 3);

  return (
    <div className="space-y-0">
      {/* Dynamic Hero Station */}
      <Hero />
      <Marquee />

      {/* QUICK INTRO ABOUT */}
      <About />

      {/* FEATURED PROJECTS SUB SECTION */}
      <section className="bg-[#faf6ec] border-b-[3px] border-[#0d0d0d] py-16 px-6 sm:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-12 gap-4">
          <div>
            <div className="font-mono text-xs text-[#E8281A] tracking-[0.3em] uppercase font-bold">
              // flagship products
            </div>
            <h2 className="font-bangers text-4xl sm:text-5xl lg:text-6xl text-black tracking-widest leading-none mt-2">
              FEATURED PROJECTS<span className="text-[#1A5CE8]">.</span>
            </h2>
          </div>
          <a
            href="/projects"
            className="font-mono text-xs font-bold uppercase tracking-widest px-5 py-3 border-2 border-black bg-[#FFE03A] shadow-[3px_3px_0_#000] hover:bg-black hover:text-[#FFE03A] transition-all inline-block text-center text-black"
          >
            All Projects &rarr;
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featured.map((proj: any) => (
            <div
              key={proj.id}
              className="border-[3px] border-black bg-white p-6 shadow-[6px_6px_0_#0d0d0d] hover:shadow-[4px_4px_0_#000] relative group flex flex-col justify-between transition-transform duration-200 ease-linear hover:-translate-y-1"
            >
              <div>
                <div className="flex justify-between items-center mb-4 selection:bg-black">
                  <span className="font-mono text-xs uppercase bg-black text-white px-2 py-0.5 tracking-wider">
                    {proj.category}
                  </span>
                  <span className="font-mono text-xs font-extrabold text-[#E8281A]">
                    PROJ_{proj.pNo || "XX"} &middot; {proj.year}
                  </span>
                </div>

                <h3 className="font-bangers text-2xl sm:text-3xl text-black tracking-wider leading-none mb-3">
                  {proj.title}
                </h3>

                {proj.image && (
                  <div className="w-full h-44 border-2 border-black mb-4 overflow-hidden bg-neutral-100">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <p className="font-elite text-xs text-black/80 leading-relaxed mb-6">
                  {proj.description}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-black/10 pt-4 mt-auto">
                <div className="flex flex-wrap gap-1.5 max-w-[65%]">
                  {proj.tags.slice(0, 3).map((tg: string) => (
                    <span key={tg} className="font-mono text-[9px] bg-neutral-100 border border-black/20 px-1.5 py-0.5 rounded text-black/60">
                      {tg}
                    </span>
                  ))}
                </div>
                <a
                  href={`/projects/${proj.slug || proj.id}`}
                  className="font-mono text-[10px] sm:text-xs font-bold uppercase text-[#E8281A] hover:underline"
                >
                  DEEP REVEAL &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RECENT ARTWORK SHOWCASE */}
      <section className="bg-black text-white border-b-[3px] border-[#0d0d0d] py-16 px-6 sm:px-12 lg:px-16 relative">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-12 gap-4 relative z-10">
          <div>
            <div className="font-mono text-xs text-[#FFE03A] tracking-[0.3em] uppercase font-bold">
              // graphical footprints
            </div>
            <h2 className="font-bangers text-4xl sm:text-5xl lg:text-6xl text-white tracking-widest leading-none mt-2">
              LATEST ARTWORKS<span className="text-[#E8281A]">.</span>
            </h2>
          </div>
          <a
            href="/gallery"
            className="font-mono text-xs font-bold uppercase tracking-widest px-5 py-3 border-2 border-white bg-transparent text-white hover:bg-white hover:text-black transition-all inline-block text-center"
          >
            Visual Gallery &rarr;
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
          {recentArt.map((art: any) => (
            <div
              key={art.id}
              className="border-2 border-white bg-neutral-900 overflow-hidden shadow-[4px_4px_0_#FFE03A] group"
            >
              <div className="h-44 border-b-2 border-white relative overflow-hidden bg-black">
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#FFE03A]">
                  {art.tag}
                </span>
                <h4 className="font-bebas text-lg text-white tracking-wider leading-none mt-1 mb-2">
                  {art.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK SYSTEM DECISION CTA */}
      <section className="bg-[#FFE03A] text-black border-b-[3px] border-[#0d0d0d] py-12 px-6 sm:px-12 lg:px-16 text-center">
        <h2 className="font-bangers text-4xl sm:text-5xl lg:text-6xl text-black tracking-widest leading-none mb-4">
          LOOKING FOR AN INTERN OR PRO ENGINEER?
        </h2>
        <p className="font-elite text-sm max-w-xl mx-auto mb-8 text-black/80">
          I am actively scanning for technical assignments, front-end design system contracts, and full-stack system developer roles in 2026. Let&apos;s build next-gen apps.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/contact"
            className="font-mono text-xs font-bold uppercase tracking-widest px-8 py-4 border-3 border-black bg-black text-white hover:bg-white hover:text-black shadow-[4px_4px_0_#FFF] transition-all"
          >
            Initiate Connection ✉️
          </a>
          <a
            href="/resume"
            className="font-mono text-xs font-bold uppercase tracking-widest px-8 py-4 border-3 border-black bg-transparent text-black hover:bg-black hover:text-[#FFE03A] shadow-[4px_4px_0_#000] transition-all"
          >
            Inspect Resume 📑
          </a>
        </div>
      </section>
    </div>
  );
}
