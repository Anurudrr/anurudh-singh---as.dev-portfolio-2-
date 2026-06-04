import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { navigateTo } from "../router";

interface NavProps {
  activeSection: string;
}

const SECTION_LABELS: Record<string, string> = {
  "/": "HOME.PORT",
  "/about": "ORIGIN.STORY",
  "/projects": "SYSTEMS.CATALOG",
  "/gallery": "VISUAL.GALLERY",
  "/hobbies": "COGNITIVE.PASSIONS",
  "/blog": "LOGIC.DIARIES",
  "/experience": "JOURNEY.LOG",
  "/resume": "CURRICULUM.VITAE",
  "/contact": "CONNECT.STATION",
  "/admin": "BACKOFFICE.MAIN"
};

export default function Nav({ activeSection }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const currentPath = window.location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        navigateTo("/admin");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNavigate = (path: string) => {
    navigateTo(path);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 h-[64px] border-b-[3px] border-[#FFE03A] bg-[#0d0d0d] flex items-center justify-between px-4 sm:px-8 z-[1000] transition-shadow duration-300 ${
        scrolled ? "shadow-[0_4px_20px_rgba(0,0,0,0.5)]" : ""
      }`}
      id="nav"
    >
      {/* Current Section Locator indicator */}
      <div className="flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-[#E8281A] animate-ping" />
        <span className="font-mono text-[9px] sm:text-xs text-[#faf6ec]/50 tracking-[0.2em] uppercase font-bold">
          {SECTION_LABELS[currentPath] || "SYSTEMS.ONLINE"}
        </span>
      </div>

      {/* Main Brand Logo */}
      <button
        onClick={() => handleNavigate("/")}
        className="font-bangers text-xl sm:text-2xl text-[#FFE03A] tracking-[0.1em] hover:text-[#faf6ec] transition-colors cursor-pointer bg-transparent border-0 outline-none"
      >
        AS.DEV
      </button>

      {/* Navigation Links */}
      <ul className="flex items-center gap-3 sm:gap-5 md:gap-7">
        <li>
          <button
            onClick={() => handleNavigate("/about")}
            className={`group relative py-1 font-mono text-[9px] sm:text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer bg-transparent border-none ${
              currentPath === "/about" ? "text-[#FFE03A]" : "text-[#faf6ec] hover:text-[#FFE03A]"
            }`}
          >
            About
            <span className={`absolute bottom-0 left-0 h-[2px] bg-[#FFE03A] transition-all duration-300 ${
              currentPath === "/about" ? "w-full" : "w-0 group-hover:w-full"
            }`} />
          </button>
        </li>
        <li>
          <button
            onClick={() => handleNavigate("/projects")}
            className={`group relative py-1 font-mono text-[9px] sm:text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer bg-transparent border-none ${
              currentPath.startsWith("/projects") ? "text-[#FFE03A]" : "text-[#faf6ec] hover:text-[#FFE03A]"
            }`}
          >
            Work
            <span className={`absolute bottom-0 left-0 h-[2px] bg-[#FFE03A] transition-all duration-300 ${
              currentPath.startsWith("/projects") ? "w-full" : "w-0 group-hover:w-full"
            }`} />
          </button>
        </li>
        <li>
          <button
            onClick={() => handleNavigate("/gallery")}
            className={`group relative py-1 font-mono text-[9px] sm:text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer bg-transparent border-none ${
              currentPath === "/gallery" ? "text-[#FFE03A]" : "text-[#faf6ec] hover:text-[#FFE03A]"
            }`}
          >
            Gallery
            <span className={`absolute bottom-0 left-0 h-[2px] bg-[#FFE03A] transition-all duration-300 ${
              currentPath === "/gallery" ? "w-full" : "w-0 group-hover:w-full"
            }`} />
          </button>
        </li>
        <li>
          <button
            onClick={() => handleNavigate("/blog")}
            className={`group relative py-1 font-mono text-[9px] sm:text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer bg-transparent border-none ${
              currentPath.startsWith("/blog") ? "text-[#FFE03A]" : "text-[#faf6ec] hover:text-[#FFE03A]"
            }`}
          >
            Blog
            <span className={`absolute bottom-0 left-0 h-[2px] bg-[#FFE03A] transition-all duration-300 ${
              currentPath.startsWith("/blog") ? "w-full" : "w-0 group-hover:w-full"
            }`} />
          </button>
        </li>
        <li>
          <button
            onClick={() => handleNavigate("/contact")}
            className="font-mono text-[9px] sm:text-[10.5px] font-extrabold text-[#faf6ec] bg-[#E8281A] px-2.5 py-1.5 border-2 border-black hover:bg-white hover:text-black shadow-[2px_2px_0_#FFE03A] hover:shadow-[3px_3px_0_#000] rotate-0 hover:-rotate-1 transition-all cursor-pointer inline-block"
            whiletap={{ scale: 0.96 }}
          >
            CONNECT
          </button>
        </li>
      </ul>
    </motion.nav>
  );
}
