import React from "react";
import { motion } from "motion/react";

export default function Contact() {
  const contactLinks = [
    {
      type: "Email",
      value: "sanurudh938@gmail.com",
      href: "mailto:sanurudh938@gmail.com",
      arrow: "→",
    },
    {
      type: "Phone",
      value: "+91 73893 82433",
      href: "tel:+917389382433",
      arrow: "→",
    },
    {
      type: "GitHub",
      value: "github.com/Anurudrr",
      href: "https://github.com/Anurudrr",
      arrow: "↗",
    },
    {
      type: "LeetCode",
      value: "ANURUDH_SINGH_RAJAWAT",
      href: "https://leetcode.com/u/ANURUDH_SINGH_RAJAWAT/",
      arrow: "↗",
    },
  ];

  return (
    <section id="contact" className="grid grid-cols-1 lg:grid-cols-12 border-b-[3px] border-[#0d0d0d] bg-[#faf6ec]">
      {/* LEFT COLUMN - Reach Out */}
      <div className="col-span-1 lg:col-span-7 p-6 sm:p-12 lg:p-16 border-r-0 lg:border-r-[3px] border-[#0d0d0d]">
        <div className="font-mono text-xs text-[#E8281A] tracking-[0.3em] uppercase mb-4 font-bold">
          // reach out
        </div>
        <h2 className="font-bangers text-4xl sm:text-5xl lg:text-6xl text-black tracking-widest leading-none mb-6">
          LET&apos;S BUILD SOMETHING<span className="text-[#1A5CE8]">.</span>
        </h2>

        {/* Tactical lists */}
        <div className="flex flex-col border-t-2 border-black/10 mt-10">
          {contactLinks.map((link) => (
            <motion.a
              key={link.type}
              href={link.href}
              target={link.arrow === "↗" ? "_blank" : undefined}
              rel={link.arrow === "↗" ? "noreferrer" : undefined}
              whileHover={{ 
                x: 10,
                backgroundColor: "#FFE03A",
              }}
              transition={{ duration: 0.15 }}
              className="group flex items-center py-5 border-b border-black/10 px-4 transition-colors select-none text-black text-decoration-none"
            >
              <span className="font-mono text-xs sm:text-sm font-bold tracking-widest uppercase text-black/40 group-hover:text-black/60 w-24 flex-shrink-0">
                {link.type}
              </span>
              <span className="font-elite text-sm sm:text-base font-semibold text-black hover:underline overflow-hidden text-ellipsis whitespace-nowrap">
                {link.value}
              </span>
              <span className="font-mono text-lg font-bold text-black/30 group-hover:text-black/80 ml-auto select-none transition-colors">
                {link.arrow}
              </span>
            </motion.a>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN - Status Badge */}
      <div className="col-span-1 lg:col-span-5 bg-black p-8 sm:p-12 lg:p-16 flex flex-col justify-center items-center text-center text-white relative">
        {/* Grids background */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="font-bangers text-6xl sm:text-7xl lg:text-8xl text-[#FFE03A] tracking-wider leading-none mb-4 drop-shadow-[5px_5px_0_#E8281A] select-none"
        >
          OPEN TO
          <br />
          WORK
        </motion.div>

        <p className="font-elite text-sm sm:text-base text-white/70 max-w-xs mb-8 leading-relaxed">
          Internships &middot; Developer Freelance &middot; Open Source Engineering. Deployed on secure developer grids.
        </p>

        <motion.a
          href="mailto:sanurudh938@gmail.com"
          whileHover={{ scale: 1.05, translate: "-4px -4px", boxShadow: "6px 6px 0px #0d0d0d" }}
          whileTap={{ scale: 0.95 }}
          className="btn text-white bg-[#E8281A] text-xs font-bold font-mono tracking-widest px-8 py-4 uppercase border-2 border-black inline-flex items-center gap-3 shadow-[4px_4px_0_#FFF] transition-all"
        >
          ✉️ Email Me Direct
        </motion.a>
      </div>
    </section>
  );
}
