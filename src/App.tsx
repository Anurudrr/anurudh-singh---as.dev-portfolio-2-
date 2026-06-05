import React, { useState, useEffect, useRef } from "react";
import anurudhRealPhoto from "./assets/images/anurudh_real_photo.jpg";
import anurudhAnimatedAvatar from "./assets/images/anurudh_animated_avatar.png";
import { motion, AnimatePresence } from "motion/react";
import { LeetCodeHeatmap } from "./components/LeetCodeHeatmap";
import { MetroActivityList } from "./components/MetroActivityList";
import { 
  ArrowDown, 
  ArrowRight, 
  Award, 
  BookOpen, 
  Palette, 
  Code as CodeIcon
} from "lucide-react";

// --- Types ---
interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
}

// --- Animation Variants ---
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const popIn = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 200, damping: 20 } }
};

const slideUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { ease: "backOut", duration: 0.6 } }
};

// --- Projects Record Database ---
const PROJECTS_LIST = [
  {
    id: "evento",
    index: "01",
    genre: "web",
    title: "Evento",
    years: "2025–2026",
    type: "Full Stack",
    tags: ["React.js", "JavaScript", "HTML", "CSS", "API Integration"],
    desc: "A high-end responsive event management ecosystem designed to simplify bookings, organization tools, event listings, and interactive planners. Built the architecture, designed wireframes, and optimized API pathways.",
    github: "https://github.com/Anurudrr",
    renderSVG: () => (
      <svg width="240" height="110" viewBox="0 0 300 130" className="opacity-95">
        <rect x="70" y="20" width="80" height="85" rx="4" fill="white" stroke="#0d0d0d" strokeWidth="2.5" />
        <rect x="70" y="20" width="80" height="22" rx="4" fill="#0d0d0d" />
        <rect x="90" y="14" width="6" height="12" rx="3" fill="#FFE03A" />
        <rect x="124" y="14" width="6" height="12" rx="3" fill="#FFE03A" />
        <text x="110" y="34" fontFamily="Bangers,cursive" fontSize="10" fill="#FFE03A" textAnchor="middle" letterSpacing="1">EVENTO</text>
        <rect x="78" y="48" width="12" height="10" rx="1" fill="#FFE03A" />
        <rect x="94" y="48" width="12" height="10" rx="1" fill="rgba(13,13,13,0.08)" />
        <rect x="110" y="48" width="12" height="10" rx="1" fill="rgba(13,13,13,0.08)" />
        <rect x="126" y="48" width="12" height="10" rx="1" fill="#E8281A" />
        <rect x="78" y="62" width="12" height="10" rx="1" fill="rgba(13,13,13,0.08)" />
        <rect x="94" y="62" width="12" height="10" rx="1" fill="#FFE03A" />
        <rect x="110" y="62" width="28" height="10" rx="1" fill="#1A5CE8" />
        <rect x="78" y="76" width="44" height="10" rx="1" fill="rgba(13,13,13,0.1)" />
        <rect x="78" y="90" width="28" height="10" rx="1" fill="rgba(13,13,13,0.07)" />
        <g className="avatar-ring-spin">
          <circle cx="210" cy="55" r="22" fill="none" stroke="#FFE03A" strokeWidth="3" />
          <circle cx="210" cy="55" r="8" fill="white" stroke="#0d0d0d" strokeWidth="2" />
          <rect x="207" y="30" width="6" height="8" rx="1" fill="#0d0d0d" />
          <rect x="207" y="72" width="6" height="8" rx="1" fill="#0d0d0d" />
        </g>
        <g className="avatar-ring-spin" style={{ animationDuration: "10s" }}>
          <circle cx="230" cy="85" r="14" fill="none" stroke="#E8281A" strokeWidth="2.5" />
        </g>
      </svg>
    )
  },
  {
    id: "hopin",
    index: "02",
    genre: "java",
    title: "Hopin",
    years: "2025",
    type: "Java Application",
    tags: ["Java", "OOP", "Systems Thinking"],
    desc: "A software utility programmed to organize trip budgets, paths, destinations, and bookings. Developed thoroughly to showcase standard Object-Oriented principles, entity mappings, and clean data routing.",
    github: "https://github.com/Anurudrr",
    renderSVG: () => (
      <svg width="240" height="110" viewBox="0 0 300 130" className="opacity-95">
        <circle cx="250" cy="30" r="18" fill="#FFE03A" opacity="0.8" />
        <ellipse cx="60" cy="30" rx="18" ry="8" fill="white" opacity="0.8" />
        <ellipse cx="180" cy="38" rx="14" ry="7" fill="white" opacity="0.6" />
        <path d="M 40 100 Q 100 60 160 75 Q 220 90 260 55" stroke="#1A5CE8" strokeWidth="2.5" strokeDasharray="6 4" fill="none">
          <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1s" repeatCount="indefinite" />
        </path>
        <circle cx="40" cy="100" r="6" fill="#E8281A" stroke="white" strokeWidth="2" />
        <circle cx="260" cy="55" r="6" fill="#2ECC71" stroke="white" strokeWidth="2" />
        <rect x="25" y="70" width="30" height="14" rx="2" fill="#E8281A" />
        <text x="40" y="79" fontFamily="Space Mono,monospace" fontSize="6.5" fill="white" textAnchor="middle" fontWeight="bold">VDR</text>
        <rect x="245" y="18" width="30" height="14" rx="2" fill="#2ECC71" />
        <text x="260" y="27" fontFamily="Space Mono,monospace" fontSize="6.5" fill="white" textAnchor="middle" fontWeight="bold">DEST</text>
      </svg>
    )
  }
];

// --- Shared Audio Context (Prevents Memory Leak) ---
let sharedAudioCtx: AudioContext | null = null;
const getAudioContext = () => {
  if (!sharedAudioCtx) {
    sharedAudioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return sharedAudioCtx;
};

export default function App() {
  // State variables
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("HERO");
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [projectFilter, setProjectFilter] = useState<"all" | "web" | "java">("all");
  
  // Retro Audio Synth Feedback
  const playClickOscillator = (freq = 440, type: OscillatorType = "sine", duration = 0.08) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = getAudioContext();
      if (audioCtx.state === "suspended") audioCtx.resume();
      
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      
      gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // browser blocked or not supported
    }
  };

  const toggleSounds = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    
    // Play a delightful double bleep to confirm sound activation
    if (!soundEnabled) {
      try {
        const audioCtx = getAudioContext();
        if (audioCtx.state === "suspended") audioCtx.resume();
        
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.12);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.12);
        
        setTimeout(() => {
          const osc2 = audioCtx.createOscillator();
          const gainNode2 = audioCtx.createGain();
          osc2.connect(gainNode2);
          gainNode2.connect(audioCtx.destination);
          osc2.frequency.setValueAtTime(600, audioCtx.currentTime);
          gainNode2.gain.setValueAtTime(0.04, audioCtx.currentTime);
          gainNode2.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.12);
          osc2.start();
          osc2.stop(audioCtx.currentTime + 0.12);
        }, 80);
      } catch (err) {}
    }
  };
  
  // Custom Cursor state
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const trailDotsRefs = useRef<(HTMLDivElement | null)[]>([]);

  const pointerPos = useRef({ x: -100, y: -100 });
  const trailTargetPos = useRef({ x: -100, y: -100 });
  const dotPositions = useRef(new Array(3).fill({ x: -100, y: -100 }));
  const hoverState = useRef(false);

  // Scramble text state for ANURUDH and SINGH
  const [scrambleAnurudh, setScrambleAnurudh] = useState("ANURUDH");
  const [scrambleSingh, setScrambleSingh] = useState("SINGH");

  // Photo hover popup state
  const [showPhoto, setShowPhoto] = useState(false);
  const photoPopupRef = useRef<HTMLDivElement>(null);
  const photoTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Avatar Eye Tracker Refs
  const avatarCardRef = useRef<HTMLDivElement>(null);
  const leftPupilRef = useRef<HTMLSpanElement>(null);
  const rightPupilRef = useRef<HTMLSpanElement>(null);

  // Avatar status badge
  const [statusMessage, setStatusMessage] = useState("Active & Building");

  // Ref trackers
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Stats Counters state
  const [stats, setStats] = useState({ year: 0, projects: 0, tech: 0 });

  // AI Chat state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Hey! I'm Anurudh's AI assistant. Ask me anything about his skills, projects, college, or how to hire him! 👋",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Standard observer to trigger viewport entries
  useEffect(() => {
    if (loaderVisible) return;

    // Track active sections in Navbar
    const sections = ["hero", "about", "skills", "projects", "timeline", "chat-section", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -25% 0px",
      threshold: 0.1,
    };

    const sectionLabels: Record<string, string> = {
      hero: "HERO",
      about: "ABOUT",
      skills: "SKILLS",
      projects: "WORK",
      timeline: "JOURNEY",
      "chat-section": "ASK AI",
      contact: "CONTACT",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(sectionLabels[entry.target.id] || "HERO");
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Animate skill bars on entry
    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            const fills = entry.target.querySelectorAll(".skill-progress-fill") as NodeListOf<HTMLElement>;
            fills.forEach((fill) => {
              const targetWidth = fill.getAttribute("data-width");
              if (targetWidth) {
                fill.style.width = `${targetWidth}%`;
              }
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".skill-category-box").forEach((el) => {
      skillObserver.observe(el);
    });

    return () => {
      observer.disconnect();
      skillObserver.disconnect();
    };
  }, [loaderVisible]);

  // Low mechanical thump/sound on active section switch
  useEffect(() => {
    if (activeSection && !loaderVisible) {
      playClickOscillator(160, "sine", 0.04);
    }
  }, [activeSection, loaderVisible]);

  // Smooth custom cursor follower and trail dots
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      pointerPos.current = { x: e.clientX, y: e.clientY };
      // Update photo popup position directly via DOM (no re-render)
      if (photoPopupRef.current) {
        photoPopupRef.current.style.top = `${e.clientY - 20}px`;
        photoPopupRef.current.style.left = `${e.clientX + 24}px`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Update cursor ring trail with interpolation
  useEffect(() => {
    let animFrameId: number;

    const tick = () => {
      const mouseX = pointerPos.current.x;
      const mouseY = pointerPos.current.y;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%), 0)`;
        cursorDotRef.current.style.willChange = "transform";
        cursorDotRef.current.style.width = hoverState.current ? "14px" : "10px";
        cursorDotRef.current.style.height = hoverState.current ? "14px" : "10px";
        cursorDotRef.current.style.backgroundColor = hoverState.current ? "#0d0d0d" : "#FFE03A";
      }

      const prevTrail = trailTargetPos.current;
      const tx = prevTrail.x + (mouseX - prevTrail.x) * 0.35;
      const ty = prevTrail.y + (mouseY - prevTrail.y) * 0.35;
      trailTargetPos.current = { x: tx, y: ty };

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(calc(${tx}px - 50%), calc(${ty}px - 50%), 0)`;
        cursorRingRef.current.style.willChange = "transform";
        cursorRingRef.current.style.width = hoverState.current ? "52px" : "34px";
        cursorRingRef.current.style.height = hoverState.current ? "52px" : "34px";
        cursorRingRef.current.style.backgroundColor = hoverState.current ? "rgba(255,224,58,0.15)" : "transparent";
      }

      const nextDots = [...dotPositions.current];
      nextDots.unshift({ x: mouseX, y: mouseY });
      nextDots.pop();
      dotPositions.current = nextDots.map((dot, index) => {
        const target = index === 0 ? pointerPos.current : nextDots[index - 1];
        return {
          x: dot.x + (target.x - dot.x) * 0.35,
          y: dot.y + (target.y - dot.y) * 0.35,
        };
      });

      dotPositions.current.forEach((pos, i) => {
        const el = trailDotsRefs.current[i];
        if (el) {
          el.style.transform = `translate3d(calc(${pos.x}px - 50%), calc(${pos.y}px - 50%), 0)`;
        }
      });

      // Skip eye update every 2 frames to reduce layout thrashing
      if (Math.random() > 0.5) {
        [leftPupilRef, rightPupilRef].forEach((ref) => {
          if (ref.current) {
            const eyeEl = ref.current.parentElement || ref.current;
            const rect = eyeEl.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = mouseX - cx;
            const dy = mouseY - cy;
            const angle = Math.atan2(dy, dx);
            const dist = Math.min(1, Math.sqrt(dx * dx + dy * dy) / 300); 
            const maxDist = 2.4;
            
            const px = Math.cos(angle) * maxDist * dist;
            const py = Math.sin(angle) * maxDist * dist;
            ref.current.style.transform = `translate3d(${px}px, ${py}px, 0)`;
          }
        });
      }

      animFrameId = requestAnimationFrame(tick);
    };

    tick();
    return () => cancelAnimationFrame(animFrameId);
  }, []);

  // Bind mouse hovering to custom trigger
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.closest("a") || 
        target.closest("button") || 
        target.closest(".interactive-hover");
      hoverState.current = !!isInteractive;
    };

    window.addEventListener("mouseover", handleMouseOver);
    return () => window.removeEventListener("mouseover", handleMouseOver);
  }, []);

  // Dismiss loader automatically or on click
  useEffect(() => {
    const timer = setTimeout(() => {
      handleDismissLoader();
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  const handleDismissLoader = () => {
    setLoaderVisible(false);
    setIsNavVisible(true);
    // Start Counters animation
    animateCounter("year", 3);
    animateCounter("projects", 2);
    animateCounter("tech", 10);
    // Start text scramble trigger
    triggerScramble();
  };

  const animateCounter = (key: "year" | "projects" | "tech", endVal: number) => {
    let current = 0;
    const step = 1;
    const duration = 1200; // ms
    const delay = duration / endVal;

    const counterInterval = setInterval(() => {
      current += step;
      if (current >= endVal) {
        current = endVal;
        clearInterval(counterInterval);
      }
      setStats((prev) => ({ ...prev, [key]: current }));
    }, delay);
  };

  useEffect(() => {
    const updateISTStatus = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const istTime = new Date(utc + 3600000 * 5.5);
      const hours = istTime.getHours();

      if (hours >= 0 && hours < 7) {
        setStatusMessage("Sleeping & Dreaming of Code");
      } else if (hours >= 7 && hours < 9) {
        setStatusMessage("Coffee + LeetCode Review");
      } else if (hours >= 9 && hours < 17) {
        setStatusMessage("B.Tech CSE Mode");
      } else if (hours >= 17 && hours < 23) {
        setStatusMessage("Building Full-Stack Apps");
      } else {
        setStatusMessage("Late Night Debugging");
      }
    };

    updateISTStatus();
    const interval = setInterval(updateISTStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMoveAvatar = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = -(y / (rect.height / 2)) * 10;
    const rotY = (x / (rect.width / 2)) * 10;
    el.style.transition = "none";
    el.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.75)`;
  };

  const handleMouseLeaveAvatar = () => {
    if (!avatarCardRef.current) return;
    avatarCardRef.current.style.transition = "transform 180ms ease-out";
    avatarCardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1.75)";
  };

  // Text scramble implementation
  const triggerScramble = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%@$!";
    let tickCount = 0;
    const scrambleInterval = setInterval(() => {
      tickCount++;
      
      // Retro pitch-randomized sci-fi decryption sound bleep
      if (soundEnabled && Math.random() < 0.45) {
        playClickOscillator(Math.random() * 900 + 350, "sine", 0.015);
      }

      setScrambleAnurudh(() => {
        let text = "";
        for (let i = 0; i < "ANURUDH".length; i++) {
          if (tickCount / 12 > i / "ANURUDH".length) {
            text += "ANURUDH"[i];
          } else {
            text += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        return text;
      });

      setScrambleSingh(() => {
        let text = "";
        for (let i = 0; i < "SINGH".length; i++) {
          if (tickCount / 12 > i / "SINGH".length) {
            text += "SINGH"[i];
          } else {
            text += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        return text;
      });

      if (tickCount >= 24) {
        clearInterval(scrambleInterval);
        setScrambleAnurudh("ANURUDH");
        setScrambleSingh("SINGH");
      }
    }, 30);
  };

  // Card Tilt interactive 3D effect
  const handleCardTilt = (e: React.MouseEvent<HTMLDivElement>, _cardId: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / (rect.height / 2)) * 7;
    const rotateY = (x / (rect.width / 2)) * 7;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    card.style.transition = "transform 0.1s ease";
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
    card.style.transition = "transform 0.4s ease";
  };

  // Chat message submission
  const sendChat = async (textOverride?: string) => {
    const messageToUse = textOverride || chatInput;
    if (!messageToUse.trim() || isTyping) return;

    const userMessage = messageToUse.trim();
    if (!textOverride) {
      setChatInput("");
    }
    
    setMessages((prev) => [...prev, { id: Date.now().toString(), sender: "user", text: userMessage }]);
    setIsTyping(true);

    // Retro upward chirp audio feedback on transmission
    if (soundEnabled) {
      playClickOscillator(450, "triangle", 0.08);
      setTimeout(() => playClickOscillator(600, "triangle", 0.08), 45);
    }

    // Scroll to new chat message immediately
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);

    try {
      // Package conversation history for Gemini's context
      const historyPayload = messages.map((m) => ({
        role: m.sender === "user" ? "user" : "model",
        text: m.text,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history: historyPayload }),
      });

      if (!res.ok) throw new Error("Chat dispatch rejected.");
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: "bot", text: data.text },
      ]);

      // Retro double bleep chime on response received
      if (soundEnabled) {
        playClickOscillator(520, "sine", 0.06);
        setTimeout(() => playClickOscillator(680, "sine", 0.08), 50);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "My apologies! A momentary system static interrupted our channel. Feel free to re-submit your transmission! ⚡",
        },
      ]);
      
      // Error descending buzz SFX
      if (soundEnabled) {
        playClickOscillator(180, "sawtooth", 0.22);
      }
    } finally {
      setIsTyping(false);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    }
  };

  return (
    <>
      {/* ── ANURUDH PHOTO HOVER POPUP ── */}
      <AnimatePresence>
        {showPhoto && (
          <motion.div
            ref={photoPopupRef}
            key="photo-popup"
            initial={{ opacity: 0, scale: 0.80, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 2.5 }}
            exit={{ opacity: 0, scale: 0.80, rotate: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            style={{
              position: "fixed",
              top: -999,
              left: -999,
              zIndex: 99999,
              pointerEvents: "none",
              width: 210,
              filter: "drop-shadow(8px 8px 0px #0d0d0d)",
            }}
          >
            {/* Speech bubble tail */}
            <div style={{ position: "absolute", top: 44, left: -16, width: 0, height: 0, borderTop: "10px solid transparent", borderBottom: "10px solid transparent", borderRight: "16px solid #0d0d0d", zIndex: 10 }} />
            <div style={{ position: "absolute", top: 46, left: -11, width: 0, height: 0, borderTop: "8px solid transparent", borderBottom: "8px solid transparent", borderRight: "13px solid #FFE03A", zIndex: 11 }} />

            {/* Card */}
            <div style={{ border: "4px solid #0d0d0d", background: "#FFE03A", overflow: "hidden", position: "relative" }}>
              {/* Header */}
              <div style={{ background: "#0d0d0d", color: "#FFE03A", fontFamily: "monospace", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", padding: "5px 10px", fontWeight: 900, borderBottom: "3px solid #E8281A", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: "#E8281A", fontSize: 11 }}>◆</span>
                ANURUDH · IRL
              </div>

              {/* Photo */}
              <div style={{ position: "relative", overflow: "hidden", background: "#111" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(#FFE03A 1px, transparent 1px)", backgroundSize: "6px 6px", opacity: 0.10, zIndex: 2, pointerEvents: "none" }} />
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 50%, rgba(232,40,26,0.15) 100%)", zIndex: 3, pointerEvents: "none" }} />
                <img
                  src={anurudhRealPhoto}
                  alt="Anurudh Singh"
                  style={{ width: "100%", display: "block", aspectRatio: "1 / 1", objectFit: "cover", objectPosition: "center top", position: "relative", zIndex: 1 }}
                />
              </div>

              {/* Footer */}
              <div style={{ background: "#E8281A", color: "#fff", fontFamily: "monospace", fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", padding: "5px 10px", fontWeight: 900, borderTop: "3px solid #0d0d0d", display: "flex", justifyContent: "space-between" }}>
                <span>FULL STACK</span>
                <span style={{ color: "#FFE03A" }}>✦</span>
                <span>UI / UX</span>
              </div>
            </div>

            {/* Badge */}
            <div style={{ position: "absolute", bottom: -14, right: -14, width: 44, height: 44, background: "#E8281A", border: "3px solid #0d0d0d", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace", fontSize: 7, fontWeight: 900, color: "#fff", textTransform: "uppercase", lineHeight: 1.1, textAlign: "center", zIndex: 20 }}>
              AS<br />DEV
            </div>

            {/* Rivets */}
            <div style={{ position: "absolute", top: -5, left: -5, width: 10, height: 10, background: "#FFE03A", border: "3px solid #0d0d0d", borderRadius: "50%", zIndex: 15 }} />
            <div style={{ position: "absolute", top: -5, right: -5, width: 10, height: 10, background: "#FFE03A", border: "3px solid #0d0d0d", borderRadius: "50%", zIndex: 15 }} />
          </motion.div>
        )}
      </AnimatePresence>
      {/* 1. CUSTOM CURSOR & RINGS */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full border-2 border-[#0d0d0d] hidden md:block"
        style={{ transform: "translate3d(-100px, -100px, 0)", width: "10px", height: "10px", backgroundColor: "#FFE03A", transition: "width 0.15s ease-out, height 0.15s ease-out, background-color 0.15s ease-out", willChange: "transform, width, height" }}
      />
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border-2 border-[#0d0d0d] hidden md:block"
        style={{ transform: "translate3d(-100px, -100px, 0)", width: "34px", height: "34px", backgroundColor: "transparent", transition: "width 0.2s ease-out, height 0.2s ease-out, background-color 0.2s ease-out", willChange: "transform, width, height" }}
      />

      {/* Floating trail dots */}
      {dotPositions.current.map((_, i) => (
        <div
          key={i}
          ref={(el) => (trailDotsRefs.current[i] = el)}
          className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full bg-[#FFE03A] border border-[#0d0d0d]/30 hidden md:block"
          style={{
            transform: "translate3d(-100px, -100px, 0)",
            width: `${Math.max(6 - i * 0.8, 2)}px`,
            height: `${Math.max(6 - i * 0.8, 2)}px`,
            opacity: (1 - i / 6) * 0.5,
            willChange: "transform"
          }}
        />
      ))}

      {/* 2. NEO-BRUTALIST LOADER SCREEN */}
      {loaderVisible && (
        <div
          onClick={handleDismissLoader}
          className="fixed inset-0 bg-[#0d0d0d] flex flex-col items-center justify-center z-[20000] gap-6 p-6 cursor-pointer select-none"
        >
          <div className="font-bangers text-[clamp(4.5rem,14vw,9.5rem)] text-[#FFE03A] tracking-[0.05em] leading-none text-center">
            AS<span className="text-[#faf6ec]">.</span>DEV
          </div>
          <div className="w-[min(380px,80vw)] h-[6px] border-2 border-white/20 overflow-hidden bg-neutral-900">
            <div className="h-full bg-[#FFE03A] animate-[loadbar_2.2s_cubic-bezier(0.4,0,0.2,1)_forwards]" style={{ width: "0%" }} />
          </div>
          <div className="font-mono text-[10px] tracking-[0.35em] text-[#faf6ec]/40 uppercase">
            Anurudh Singh &middot; Full-Stack Developer
          </div>
          <div className="font-elite text-sm text-[#FFE03A] opacity-0 animate-[blink_0.4s_1.5s_forwards] select-none mt-2">
            — Click anywhere to instantly launch gateway —
          </div>
          <style>{`
            @keyframes loadbar { to { width: 100%; } }
            @keyframes blink { to { opacity: 0.85; } }
          `}</style>
        </div>
      )}

      {/* 3. HERO STICKY NAVIGATION RAIL */}
      <nav
        className={`fixed top-0 left-0 right-0 h-[58px] bg-[#0d0d0d] border-b-[3px] border-[#FFE03A] flex items-center justify-between px-6 sm:px-12 z-[1000] -translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] select-none ${
          isNavVisible ? "translate-y-0" : ""
        }`}
      >
        <a href="#hero" className="font-bangers text-2xl text-[#FFE03A] tracking-[0.1em] interactive-hover">
          AS.DEV
        </a>
        <ul className="hidden lg:flex gap-8 list-none">
          {["about", "skills", "projects", "timeline", "chat-section", "contact"].map((sec) => (
            <li key={sec}>
              <a
                href={`#${sec}`}
                className="font-mono text-[11px] font-bold text-[#faf6ec]/60 hover:text-[#FFE03A] tracking-[0.2em] uppercase transition-colors interactive-hover"
              >
                {sec === "chat-section" ? "Ask AI" : sec === "projects" ? "Work" : sec}
              </a>
            </li>
          ))}
        </ul>

        {/* Control and Indicator block */}
        <div className="flex items-center gap-3">
          {/* Sounds Toggle */}
          <button
            onClick={toggleSounds}
            className={`border-2 px-3 py-1 font-mono text-[10px] font-extrabold tracking-widest uppercase transition-all flex items-center gap-1.5 cursor-pointer interactive-hover ${
              soundEnabled 
                ? "bg-[#FFE03A] text-black border-[#0d0d0d]" 
                : "bg-transparent text-[#faf6ec]/55 hover:text-white border-white/20"
            }`}
          >
            <span>{soundEnabled ? "🔊" : "🔇"}</span>
            <span className="hidden sm:inline">SFX: {soundEnabled ? "ON" : "OFF"}</span>
          </button>

          {/* Dynamic Nav Section Active Indicator */}
          <div className="bg-[#FFE03A] border-2 border-[#0d0d0d] px-3 py-1 font-mono text-[10px] text-[#0d0d0d] uppercase tracking-widest font-extrabold flex items-center gap-2">
            <div className="w-[6px] h-[6px] bg-[#0d0d0d] rounded-full nav-pulse-dot" />
            <span id="nav-section">{activeSection}</span>
          </div>
        </div>
      </nav>

      {/* MAIN CONTAINER */}
      <main id="main-content" className="pt-[58px] overflow-hidden select-none">
        
        {/* SECTION 1: HERO */}
        <section id="hero" className="min-h-[calc(100vh-58px)] grid grid-cols-1 lg:grid-cols-2 border-b-[3px] border-[#0d0d0d] bg-[#faf6ec] relative overflow-hidden">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_27px,rgba(13,13,13,0.03)_27px,rgba(13,13,13,0.03)_28px)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(13,13,13,0.055)_1.2px,transparent_1.2px)] bg-[size:24px_24px] pointer-events-none" />
          
          {/* Left panel */}
          <motion.div 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true }} 
            variants={staggerContainer}
            className="relative z-10 flex flex-col justify-center p-8 sm:p-14 lg:pr-8"
          >
            <motion.div variants={slideUp} className="font-mono text-[10px] tracking-[0.35em] text-[#0d0d0d]/45 uppercase mb-6 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#0d0d0d]" /> Chapter 04 &middot; 2026 — Building Products
            </motion.div>
            
            <motion.h1 variants={slideUp} className="mb-6 font-bangers text-6xl leading-[0.85] tracking-[0.03em] text-[#0d0d0d] sm:text-8xl lg:text-9xl">
              <span
                onClick={triggerScramble}
                className="text-[#FFE03A] drop-shadow-[5px_5px_0px_#0d0d0d] inline-block hover:scale-[1.03] transition-transform cursor-pointer interactive-hover relative z-50"
                onMouseEnter={(e) => {
                  if (photoTimeout.current) clearTimeout(photoTimeout.current);
                  // Set initial position
                  if (photoPopupRef.current) {
                    photoPopupRef.current.style.top = `${e.clientY - 20}px`;
                    photoPopupRef.current.style.left = `${e.clientX + 24}px`;
                  }
                  setShowPhoto(true);
                }}
                onMouseLeave={() => {
                  photoTimeout.current = setTimeout(() => setShowPhoto(false), 150);
                }}
              >
                {scrambleAnurudh}
              </span>
              <br />
              {scrambleSingh}
            </motion.h1>

            <motion.div variants={slideUp} className="flex flex-wrap gap-2 mt-4">
              <span className="font-mono text-[10px] font-extrabold tracking-widest uppercase bg-[#0d0d0d] text-[#FFE03A] px-3 py-1.5 border-2 border-[#0d0d0d]">
                Full-Stack Dev
              </span>
              <span className="font-mono text-[10px] font-extrabold tracking-widest uppercase bg-transparent text-[#0d0d0d] px-3 py-1.5 border-2 border-[#0d0d0d]">
                UI/UX Designer
              </span>
              <span className="font-mono text-[10px] font-extrabold tracking-widest uppercase bg-transparent text-[#0d0d0d] px-3 py-1.5 border-2 border-[#0d0d0d]">
                Creative Tech
              </span>
            </motion.div>

            <motion.p variants={slideUp} className="font-elite text-lg leading-relaxed text-[#0d0d0d]/80 mt-8 max-w-lg">
              Designer turned developer. Started with Canva and Figma, fell in love with code, and now I build full-stack products. Currently deep in React, DSA, and modern web technologies.
            </motion.p>

            <motion.div variants={slideUp} className="flex flex-wrap gap-4 mt-8">
              <a href="#projects" className="btn filled px-6 py-3.5 border-[3px] border-[#0d0d0d] bg-[#0d0d0d] text-[#FFE03A] font-mono text-[11px] font-bold tracking-widest uppercase shadow-[4px_4px_0_#FFE03A] active:translate-y-1 active:shadow-[1px_1px_0_#FFE03A] transition-all flex items-center gap-2 interactive-hover">
                View Work <ArrowDown className="w-3.5 h-3.5" />
              </a>
              <a href="#contact" className="btn px-6 py-3.5 border-[3px] border-[#0d0d0d] bg-transparent text-[#0d0d0d] font-mono text-[11px] font-bold tracking-widest uppercase shadow-[4px_4px_0_#0d0d0d] active:translate-y-1 active:shadow-[1px_1px_0_#0d0d0d] transition-all flex items-center gap-2 interactive-hover">
                Get In Touch <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          </motion.div>

          {/* Visual stack */}
          <div className="relative z-10 flex flex-col justify-center p-6 sm:p-10 lg:p-14">
            <div className="relative flex items-center justify-center overflow-visible">
              {/* Cursor-tracked portrait */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="relative z-10 w-[280px] sm:w-[360px]"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                  className="relative"
                >
                  <div className="relative bg-transparent">
                  <div
                    ref={avatarCardRef}
                    className="relative aspect-square overflow-hidden drop-shadow-[0px_5px_0px_#0d0d0d] will-change-transform interactive-hover"
                    style={{
                      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1.75)",
                      transformStyle: "preserve-3d"
                    }}
                    onMouseMove={handleMouseMoveAvatar}
                    onMouseLeave={handleMouseLeaveAvatar}
                  >
                    <img
                      src={anurudhAnimatedAvatar}
                      alt="Animated portrait of Anurudh Singh"
                      draggable={false}
                      className="absolute inset-0 h-full w-full object-cover select-none"
                      style={{ transform: "translateZ(26px)" }}
                    />
                    
                    {/* Hair flow animation overlay */}
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-[45%] pointer-events-none avatar-hair-flow"
                      style={{
                        background: "radial-gradient(ellipse at center 30%, rgba(0,0,0,0.08) 0%, transparent 70%)",
                        transform: "translateZ(27px)"
                      }}
                    />

                    <span
                      className="absolute left-[42.7%] top-[33.5%] z-20 flex h-[12px] w-[25px] items-center justify-center overflow-hidden pointer-events-none sm:h-[15px] sm:w-[31px]"
                      style={{ clipPath: "ellipse(50% 45% at 50% 50%)", transform: "translate(-50%, -50%)" }}
                    >
                      <span ref={leftPupilRef} className="relative block h-[6.5px] w-[6.5px] rounded-full bg-[#0d0d0d] sm:h-[8.5px] sm:w-[8.5px]">
                        <span className="absolute left-[1px] top-[1px] h-[1.5px] w-[1.5px] rounded-full bg-white" />
                      </span>
                      <span className="avatar-blink-lid absolute inset-0 z-10 block bg-[#d47b3d]" style={{ animation: "avatarBlink 5.8s ease-in-out 0s infinite" }} />
                    </span>

                    <span
                      className="absolute left-[58.4%] top-[34.0%] z-20 flex h-[12px] w-[25px] items-center justify-center overflow-hidden pointer-events-none sm:h-[15px] sm:w-[31px]"
                      style={{ clipPath: "ellipse(50% 45% at 50% 50%)", transform: "translate(-50%, -50%)" }}
                    >
                      <span ref={rightPupilRef} className="relative block h-[6.5px] w-[6.5px] rounded-full bg-[#0d0d0d] sm:h-[8.5px] sm:w-[8.5px]">
                        <span className="absolute left-[1px] top-[1px] h-[1.5px] w-[1.5px] rounded-full bg-white" />
                      </span>
                      <span className="avatar-blink-lid absolute inset-0 z-10 block bg-[#d47b3d]" style={{ animation: "avatarBlink 5.8s ease-in-out 0s infinite" }} />
                    </span>

                  </div>
                  </div>
                </motion.div>
              </motion.div>

              </div>
            </div>
        </section>

        {/* SECTION 2: ABOUT */}
        <section id="about" className="grid grid-cols-1 md:grid-cols-[300px_1fr] border-b-[3px] border-[#0d0d0d]">
          {/* Left branding layout */}
          <div className="bg-[#0d0d0d] p-12 flex flex-col justify-between border-r-[3px] border-[#0d0d0d] reveal-transition">
            <div>
              <div className="font-mono text-[10px] tracking-widest text-[#FFE03A] uppercase mb-4 font-bold">
                // overview matrix
              </div>
              <h2 className="font-bangers text-6xl text-[#faf6ec] tracking-wider leading-none select-none">
                WHO<br />IS<br /><span className="text-[#FFE03A] drop-shadow-[3px_3px_0px_rgba(232,40,26,0.85)]">AN?</span>
              </h2>
            </div>
            
            <div className="flex flex-col gap-3 mt-12">
              <div className="inline-flex items-center gap-2 border-[1.5px] border-white/20 px-3 py-1.5 bg-neutral-900/40 w-fit select-none">
                <span className="w-2.5 h-2.5 bg-[#2ECC71] rounded-full nav-pulse-dot" />
                <span className="font-mono text-[9px] text-[#faf6ec]/60 tracking-widest uppercase font-bold">
                  Open to opportunities
                </span>
              </div>
              <div className="inline-flex items-center gap-2 border-[1.5px] border-white/20 px-3 py-1.5 bg-neutral-900/40 w-fit select-none">
                <span className="w-2.5 h-2.5 bg-[#1A5CE8] rounded-full" />
                <span className="font-mono text-[9px] text-[#faf6ec]/60 tracking-widest uppercase font-bold">
                  Vadodara, Gujarat, IN
                </span>
              </div>
            </div>
          </div>

          {/* Bento story blocks */}
          <motion.div 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true, margin: "-100px" }} 
            variants={staggerContainer}
            className="p-8 sm:p-14 flex flex-col justify-center gap-6"
          >
            <motion.div variants={popIn} className="bg-white border-[3px] border-[#0d0d0d] p-7 shadow-[6px_6px_0_rgba(13,13,13,1)] relative transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0_rgba(13,13,13,1)] interactive-hover">
              <span className="absolute top-[-13px] left-4 bg-[#FFE03A] border-2 border-[#0d0d0d] px-3 py-0.5 font-mono text-[9px] font-extrabold tracking-widest uppercase text-[#0d0d0d]">
                Origin
              </span>
              <p className="font-elite text-lg leading-relaxed text-[#0d0d0d] mt-2">
                B.Tech Computer Science &amp; Engineering student at Parul Institute of Technology, Vadodara (2023–2027). Started the journey in 2023 with zero coding experience and a pure, raw passion for computational systems.
              </p>
            </motion.div>

            <motion.div variants={popIn} className="bg-[#0d0d0d] border-[3px] border-[#0d0d0d] p-7 shadow-[6px_6px_0_rgba(13,13,13,1)] relative transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0_rgba(13,13,13,1)] interactive-hover">
              <span className="absolute top-[-13px] left-4 bg-[#E8281A] border-2 border-[#0d0d0d] px-3 py-0.5 font-mono text-[9px] font-extrabold tracking-widest uppercase text-[#faf6ec]">
                Evolution
              </span>
              <p className="font-elite text-lg leading-relaxed text-[#faf6ec]/90 mt-2">
                2024 was the visual era — graphics, Canva, and wireframes. In 2025 I crossed the threshold into full code. By 2026, I build full-stack web architectures equipped with a designer's standard that is rarely matched.
              </p>
            </motion.div>

            <motion.div variants={popIn} className="bg-white border-[3px] border-[#0d0d0d] p-7 shadow-[6px_6px_0_rgba(13,13,13,1)] relative transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0_rgba(13,13,13,1)] interactive-hover">
              <span className="absolute top-[-13px] left-4 bg-[#FFE03A] border-2 border-[#0d0d0d] px-3 py-0.5 font-mono text-[9px] font-extrabold tracking-widest uppercase text-[#0d0d0d]">
                Philosophy
              </span>
              <p className="font-elite text-lg leading-relaxed text-[#0d0d0d] mt-2">
                High-quality software is equal parts artistic expression and computational logic. Every pixel and state hook matters. Bridging design and robust logic is exactly where I live.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* SECTION 3: SKILLS */}
        <section id="skills" className="border-b-[3px] border-[#0d0d0d]">
          <div className="bg-[#0d0d0d] p-8 sm:p-12 border-b-[3px] border-[#0d0d0d] flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="font-mono text-[10px] tracking-widest text-[#faf6ec]/40 uppercase mb-2">
                // capabilities matrix
              </div>
              <h2 className="font-bangers text-5xl text-white tracking-widest leading-none select-none">
                DEV ARSENAL SYSTEM<span className="text-[#FFE03A]">.</span>
              </h2>
            </div>
            <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-[#faf6ec]/45">
              10+ Technologies / 3 Core Genres
            </div>
          </div>

          <motion.div 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true, margin: "-50px" }} 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 divide-[#0d0d0d] skill-category-box"
          >
            {/* FRONTEND */}
            <motion.div variants={slideUp} className="p-8 sm:p-10">
              <div className="flex items-center gap-3 border-b-2 border-[#0d0d0d]/10 pb-4 mb-6">
                <div className="w-[30px] h-[30px] bg-[#0d0d0d] text-[#FFE03A] flex items-center justify-center font-bold text-lg select-none">
                  ⚡
                </div>
                <h3 className="font-bebas text-2xl tracking-widest text-[#0d0d0d] select-none">
                  Frontend Engineering
                </h3>
              </div>
              {[
                { name: "React.js", skill: 82, color: "bg-[#FFE03A]" },
                { name: "JavaScript", skill: 78, color: "bg-[#FFE03A]" },
                { name: "HTML / CSS", skill: 92, color: "bg-[#FFE03A]" },
              ].map((item, idx) => (
                <div key={idx} className="mb-4">
                  <div className="flex justify-between font-mono text-[11px] font-bold uppercase mb-1">
                    <span>{item.name}</span>
                    <span className="text-[#0d0d0d]/60">{item.skill}%</span>
                  </div>
                  <div className="h-[7px] border-2 border-[#0d0d0d] bg-transparent">
                    <div
                      className={`h-full skill-progress-fill transition-all duration-[1200ms] ease-out w-0 ${item.color}`}
                      data-width={item.skill}
                    />
                  </div>
                </div>
              ))}
            </motion.div>

            {/* PROGRAMMING/DSA */}
            <motion.div variants={slideUp} className="p-8 sm:p-10">
              <div className="flex items-center gap-3 border-b-2 border-[#0d0d0d]/10 pb-4 mb-6">
                <div className="w-[30px] h-[30px] bg-[#0d0d0d] text-[#E8281A] flex items-center justify-center font-bold text-lg select-none">
                  ☕
                </div>
                <h3 className="font-bebas text-2xl tracking-widest text-[#0d0d0d] select-none">
                  Languages &amp; Algos
                </h3>
              </div>
              {[
                { name: "Java", skill: 72, color: "bg-[#E8281A]" },
                { name: "OOP", skill: 78, color: "bg-[#E8281A]" },
                { name: "DSA", skill: 65, color: "bg-[#E8281A]" },
              ].map((item, idx) => (
                <div key={idx} className="mb-4">
                  <div className="flex justify-between font-mono text-[11px] font-bold uppercase mb-1">
                    <span>{item.name}</span>
                    <span className="text-[#0d0d0d]/60">{item.skill}%</span>
                  </div>
                  <div className="h-[7px] border-2 border-[#0d0d0d] bg-transparent">
                    <div
                      className={`h-full skill-progress-fill transition-all duration-[1200ms] ease-out w-0 ${item.color}`}
                      data-width={item.skill}
                    />
                  </div>
                </div>
              ))}
            </motion.div>

            {/* DESIGN */}
            <motion.div variants={slideUp} className="p-8 sm:p-10">
              <div className="flex items-center gap-3 border-b-2 border-[#0d0d0d]/10 pb-4 mb-6">
                <div className="w-[30px] h-[30px] bg-[#0d0d0d] text-[#1A5CE8] flex items-center justify-center font-bold text-lg select-none">
                  🎨
                </div>
                <h3 className="font-bebas text-2xl tracking-widest text-[#0d0d0d] select-none">
                  Visual UI/UX Design
                </h3>
              </div>
              {[
                { name: "Figma", skill: 85, color: "bg-[#1A5CE8]" },
                { name: "Canva", skill: 90, color: "bg-[#1A5CE8]" },
                { name: "Adobe XD", skill: 80, color: "bg-[#1A5CE8]" },
              ].map((item, idx) => (
                <div key={idx} className="mb-4">
                  <div className="flex justify-between font-mono text-[11px] font-bold uppercase mb-1">
                    <span>{item.name}</span>
                    <span className="text-[#0d0d0d]/60">{item.skill}%</span>
                  </div>
                  <div className="h-[7px] border-2 border-[#0d0d0d] bg-transparent">
                    <div
                      className={`h-full skill-progress-fill transition-all duration-[1200ms] ease-out w-0 ${item.color}`}
                      data-width={item.skill}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
          
          <div className="p-8 sm:p-14 border-t-[3px] border-[#0d0d0d] bg-white flex flex-col gap-8">
            <MetroActivityList />
            <LeetCodeHeatmap />
          </div>
        </section>

        {/* SECTION 4: PROJECTS */}
        <section id="projects" className="border-b-[3px] border-[#0d0d0d] bg-[#faf6ec]">
          <div className="p-8 sm:p-12 border-b-[3px] border-[#0d0d0d] flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="font-mono text-[10px] tracking-widest text-[#0d0d0d]/45 uppercase mb-2">
                // recent engineering records
              </div>
              <h2 className="font-bangers text-[clamp(2.5rem,5vw,4rem)] tracking-widest leading-none select-none">
                SHIPPED PRODUCTS<span className="text-[#E8281A]">.</span>
              </h2>
            </div>

            {/* Neo-brutalist Filtering buttons */}
            <div className="flex flex-wrap gap-2 select-none">
              {(["all", "web", "java"] as const).map((genre) => (
                <button
                  key={genre}
                  onClick={() => {
                    playClickOscillator(500, "triangle", 0.04);
                    setProjectFilter(genre);
                  }}
                  className={`border-2 border-[#0d0d0d] px-4 py-2 font-mono text-[11px] font-bold tracking-widest uppercase transition-all shadow-[2px_2px_0_#0d0d0d] active:translate-y-0.5 active:shadow-[1px_1px_0_#0d0d0d] cursor-pointer interactive-hover ${
                    projectFilter === genre
                      ? "bg-[#FFE03A] text-black -translate-y-0.5 shadow-[4px_4px_0_#0d0d0d]"
                      : "bg-white text-[#0d0d0d] hover:bg-stone-50"
                  }`}
                >
                  {genre === "all" ? "All Systems" : genre === "web" ? "React / Web" : "Java / OOP"}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-[#0d0d0d]">
            <AnimatePresence>
            {PROJECTS_LIST
              .filter((p) => projectFilter === "all" || p.genre === projectFilter)
              .map((proj) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  key={proj.id}
                  className="p-8 sm:p-12 relative flex flex-col justify-between tilt-card bg-[#faf6ec] select-none hover:bg-[#0d0d0d] transition-colors group"
                  onMouseMove={(e) => handleCardTilt(e, proj.id)}
                  onMouseLeave={handleCardLeave}
                >
                  <div className="font-bangers text-8xl text-[#0d0d0d]/5 group-hover:text-white/5 absolute top-4 right-8 select-none pointer-events-none transition-colors">
                    {proj.index}
                  </div>

                  <div>
                    {/* SVG Visual Illustration Graphic */}
                    <div className="w-full h-[140px] border-2 border-[#0d0d0d]/10 bg-neutral-900/5 group-hover:bg-neutral-800/10 group-hover:border-white/10 flex items-center justify-center mb-6 select-none transition-all duration-300">
                      {proj.renderSVG()}
                    </div>

                    <div className="flex items-center gap-2 font-mono text-[9px] font-bold tracking-wider uppercase mb-2">
                      <span className="text-[#0d0d0d]/45 group-hover:text-[#faf6ec]/45 select-none transition-colors">
                        {proj.years}
                      </span>
                      <span className="bg-[#FFE03A] text-black border border-[#0d0d0d] px-2 py-0.5">
                        {proj.type}
                      </span>
                    </div>

                    <h3 className="font-bangers text-[2.2rem] text-[#0d0d0d] group-hover:text-[#FFE03A] mb-4 tracking-wide transition-colors duration-200">
                      {proj.title}
                    </h3>

                    <p className="font-elite text-base leading-relaxed text-[#0d0d0d]/80 group-hover:text-[#faf6ec]/75 mb-6 transition-colors">
                      {proj.desc}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-8">
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[9px] tracking-wider uppercase border border-[#0d0d0d]/15 group-hover:border-white/15 text-[#0d0d0d]/60 group-hover:text-[#faf6ec]/60 px-2 py-1 transition-all"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playClickOscillator(700, "sine", 0.08)}
                    className="font-mono text-[10px] font-bold tracking-widest uppercase border-b-2 border-black group-hover:border-[#FFE03A] text-[#0d0d0d] group-hover:text-[#FFE03A] w-fit pb-1 transition-colors interactive-hover z-10"
                  >
                    GitHub Codebase ↗
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>
            {/* If no projects exist under the filtered mode */}
            {projectFilter !== "all" &&
              PROJECTS_LIST.filter((p) => p.genre === projectFilter).length === 0 && (
                <div className="col-span-2 p-12 text-center text-stone-500 font-mono text-sm leading-relaxed select-none">
                  // NO RECORDS FOUND UNDER SELECTION
                </div>
              )}
          </motion.div>
        </section>

        {/* SECTION 5: TIMELINE */}
        <section id="timeline" className="border-b-[3px] border-[#0d0d0d] bg-[#faf6ec]">
          <div className="p-8 sm:p-12 border-b-[3px] border-[#0d0d0d]">
            <div className="font-mono text-[10px] tracking-widest text-[#0d0d0d]/45 uppercase mb-2">
              // career progression track
            </div>
            <h2 className="font-bangers text-[clamp(2.5rem,5vw,4rem)] tracking-widest leading-none select-none">
              EXPERIENCE JOURNEY<span className="text-[#FFE03A]">.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-[#0d0d0d]">
            {/* Timeline Left: Chapters */}
            <div className="p-8 sm:p-12 flex flex-col gap-8">
              {[
                {
                  chapter: "01",
                  year: "2023",
                  title: "Beginning at Parul",
                  desc: "Enrolled in B.Tech Computer Science & Engineering at Parul Institute of Technology, Vadodara. Took first steps in programming with core computational courses.",
                  icon: "🎓",
                },
                {
                  chapter: "02",
                  year: "2024",
                  title: "The Design Year",
                  desc: "Studied design principles, wireframing, high-fidelity mockups, and typography rules in Canva, Figma, and Adobe XD. Discovered the magic of interface design.",
                  icon: "🎨",
                },
                {
                  chapter: "03",
                  year: "2025",
                  title: "Crossing Into Development",
                  desc: "Bridged my layout skills into code. Built responsive UI blueprints on the web using core JS, React frameworks, and Tailwind grids.",
                  icon: "💻",
                },
                {
                  chapter: "04",
                  year: "2026",
                  title: "Complex Systems & DSA",
                  desc: "Active focus shifting towards robust backend logic, Data Structures & Algorithms, and shipping complete full-stack tools such as Evento and Hopin.",
                  icon: "🚀",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 relative group select-none reveal-transition">
                  <div className="flex flex-col items-center">
                    <div className="w-[36px] h-[36px] border-2 border-[#0d0d0d] bg-[#FFE03A] group-hover:bg-[#0d0d0d] group-hover:text-[#FFE03A] flex items-center justify-center font-bold text-base transition-colors shadow-[2px_2px_0_#0d0d0d] z-10">
                      {item.icon}
                    </div>
                    {idx < 3 && <div className="w-[2.5px] flex-1 bg-[#0d0d0d] mt-2 border-dashed border-l border-[#0d0d0d]/30" />}
                  </div>

                  <div className="pb-4">
                    <div className="font-mono text-[9px] tracking-widest uppercase text-[#0d0d0d]/40 mb-1">
                      Chapter {item.chapter} &middot; {item.year}
                    </div>
                    <h4 className="font-bebas text-xl tracking-wider text-[#0d0d0d] font-bold">
                      {item.title}
                    </h4>
                    <p className="font-elite text-sm leading-relaxed text-[#0d0d0d]/75 mt-1.5 font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Timeline Right: Milestones Bento */}
            <div className="p-8 sm:p-12 flex flex-col justify-center">
              <div className="font-mono text-[10px] tracking-widest text-[#0d0d0d]/40 uppercase mb-6 font-bold">
                // professional checkpoints
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: <BookOpen className="w-5 h-5 text-[#E8281A]" />,
                    title: "B.Tech Student",
                    desc: "Parul Institute of Technology, Vadodara. Graduating in 2027.",
                  },
                  {
                    icon: <Palette className="w-5 h-5 text-[#1A5CE8]" />,
                    title: "Visual Designer Background",
                    desc: "Figma, Canva, Adobe XD, UI/UX expert.",
                  },
                  {
                    icon: <CodeIcon className="w-5 h-5 text-[#2ECC71]" />,
                    title: "Frontend & Full Stack Builder",
                    desc: "React, custom backend APIs, fully working products shipped.",
                  },
                  {
                    icon: <Award className="w-5 h-5 text-[#FFE03A]" />,
                    title: "OOP / DSA Focused",
                    desc: "Daily problem-solving, structured algorithms, cleaner compilers.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 border-2 border-[#0d0d0d] bg-white hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[5px_5px_0_#0d0d0d] transition-all shadow-[3px_3px_0_#0d0d0d] flex flex-col gap-3 interactive-hover"
                  >
                    <div className="p-2 border border-[#0d0d0d] bg-stone-50 w-fit">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bebas text-[11px] tracking-wider text-[#0d0d0d] font-bold">
                        {item.title}
                      </h4>
                      <p className="font-mono text-[10px] leading-relaxed text-[#0d0d0d]/50 mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: AI CHATBOT ASSISTANT */}
        <section id="chat-section" className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] border-b-[3px] border-[#0d0d0d]">
          {/* Intro area */}
          <div className="bg-[#0d0d0d] p-8 sm:p-12 flex flex-col justify-center gap-6 border-r-[3px] border-[#0d0d0d] reveal-transition">
            <div>
              <div className="font-mono text-[9px] tracking-widest text-[#FFE03A] uppercase mb-3">
                // contextual ai sandbox
              </div>
              <h2 className="font-bangers text-[clamp(2.5rem,5vw,4.5rem)] text-white tracking-wider leading-[0.9]">
                ASK<br />ABOUT<br /><span className="text-[#FFE03A] drop-shadow-[4px_4px_0px_#E8281A]">ANURUDH.</span>
              </h2>
            </div>

            <p className="font-elite text-base leading-relaxed text-[#faf6ec]/60 font-medium">
              Interact with Anurudh's trained AI double. Ask about his programming stacks, design background, or how to get in touch.
            </p>

            <div className="bg-[#faf6ec] border-2 border-[#0d0d0d] p-4 text-[#0d0d0d] font-elite text-sm leading-relaxed shadow-[4px_4px_0_#FFE03A] select-none uppercase">
              "What tech stack does Anurudh know?" — Ask away!
            </div>

            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#2ECC71] nav-pulse-dot" />
              <span className="font-mono text-[9px] tracking-widest text-[#faf6ec]/40 uppercase font-black">
                AS.AI Agent &middot; Active Online Node
              </span>
            </div>
          </div>

          {/* Interact panel */}
          <div className="p-8 sm:p-12 flex flex-col justify-between bg-white relative">
            {/* Header info */}
            <div className="flex items-center justify-between border-b-2 border-[#0d0d0d]/10 pb-4 mb-6 select-none">
              <span className="font-bebas text-lg tracking-widest text-[#0d0d0d] font-bold">
                AS.AI INTERACTIVE TERMINAL
              </span>
              <div className="flex items-center gap-2 font-mono text-[9px] font-bold text-[#2ECC71]">
                <span className="w-1.5 h-1.5 bg-[#2ECC71] rounded-full nav-pulse-dot" />
                SECURE PORTAL
              </div>
            </div>

            {/* Message Thread */}
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[350px] min-h-[280px] pr-2 mb-6">
              {messages.map((m) => (
                <div key={m.id} className={`flex flex-col gap-1 ${m.sender === "user" ? "items-end" : "items-start"}`}>
                  <span className="font-mono text-[8px] text-[#0d0d0d]/40 tracking-wider">
                    {m.sender === "user" ? "USER_PROBE" : "AS.AI_BROADCAST"}
                  </span>
                  <div
                    className={`p-4 font-elite text-sm leading-relaxed border-2 border-[#0d0d0d] max-w-[85%] ${
                      m.sender === "user"
                        ? "bg-[#0d0d0d] text-[#FFE03A]"
                        : "bg-[#faf6ec] text-[#0d0d0d] shadow-[3px_3px_0_#0d0d0d]"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex flex-col gap-1 items-start">
                  <span className="font-mono text-[8px] text-[#0d0d0d]/40 tracking-wider">AS.AI_COMPUTING...</span>
                  <div className="p-4 font-mono text-xs border-2 border-[#0d0d0d] bg-[#faf6ec] text-[#0d0d0d] shadow-[3px_3px_0_#0d0d0d]">
                    <span className="animate-[pulse_1s_infinite]">⚡ Processing transmission node</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompt Suggestions */}
            <div className="mb-5">
              <div className="font-mono text-[8px] tracking-widest text-[#0d0d0d]/40 mb-2 uppercase font-black select-none">
                📥 TRANSMIT SHORTCUT SUGGESTIONS:
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "What is Anurudh's tech stack?",
                  "Tell me about the Evento project",
                  "Is Anurudh open to internships?",
                ].map((sugg, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      sendChat(sugg);
                    }}
                    className="px-2.5 py-1.5 border-2 border-[#0d0d0d] bg-[#faf6ec] hover:bg-[#FFE03A] text-black font-mono text-[9px] font-extrabold tracking-wider uppercase transition-all shadow-[2px_2px_0_#0d0d0d] active:translate-y-0.5 active:shadow-[1px_1px_0_#0d0d0d] cursor-pointer"
                  >
                    {sugg}
                  </button>
                ))}
              </div>
            </div>

            {/* Text Input Row */}
            <div className="flex gap-2">
              <input
                type="text"
                id="user-chat-box"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendChat();
                }}
                maxLength={200}
                placeholder="Query: 'View skills', 'Contact info', 'Evento'..."
                className="flex-1 px-4 py-3 border-2 border-[#0d0d0d] bg-[#faf6ec] text-[#0d0d0d] font-mono text-sm placeholder-[#0d0d0d]/35 outline-none focus:shadow-[5px_5px_0_#0d0d0d] transition-all outline-transparent"
              />
              <button
                onClick={() => sendChat()}
                disabled={isTyping}
                className="px-6 py-3 bg-[#FFE03A] text-black border-2 border-[#0d0d0d] font-mono text-xs font-bold tracking-widest uppercase hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0_#0d0d0d] transition-all disabled:opacity-50 interactive-hover"
              >
                Send &rarr;
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 7: CONTACT LINK PORT */}
        <section id="contact" className="grid grid-cols-1 md:grid-cols-2 border-b-[3px] border-[#0d0d0d] bg-[#faf6ec]">
          <div className="p-8 sm:p-14 border-r-[3px] border-[#0d0d0d] flex flex-col justify-center gap-8 reveal-transition left">
            <div className="font-mono text-[10px] tracking-widest text-[#0d0d0d]/45 uppercase font-bold">
              // contact node gateways
            </div>
            <h2 className="font-bangers text-[clamp(3.5rem,7vw,5.5rem)] tracking-wide leading-[0.88] select-none text-[#0d0d0d]">
              LET'S BUILD<br />SOMETHING<br /><span className="text-[#E8281A] drop-shadow-[4px_4px_0_rgba(13,13,13,1)]">GREAT.</span>
            </h2>

            {/* Custom Interactive Wiping Hyperlink items */}
            <div className="flex flex-col">
              {[
                { type: "Email", value: "sanurudh938@gmail.com", href: "mailto:sanurudh938@gmail.com" },
                { type: "Phone", value: "+91 73893 82433", href: "tel:+917389382433" },
                { type: "GitHub", value: "github.com/Anurudrr", href: "https://github.com/Anurudrr" },
                { type: "LeetCode", value: "LeetCode Profile ↗", href: "https://leetcode.com/u/ANURUDH_SINGH_RAJAWAT/" },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-6 py-4 border-t-2 border-[#0d0d0d]/10 relative overflow-hidden group hover:pl-4 transition-all duration-300 interactive-hover"
                >
                  {/* Slide-wipe hover element */}
                  <span className="absolute inset-0 bg-[#FFE03A] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />
                  <span className="font-mono text-[9px] tracking-widest uppercase text-[#0d0d0d]/40 group-hover:text-black z-10 w-16 relative">
                    {item.type}
                  </span>
                  <span className="font-elite text-base text-[#0d0d0d] font-bold group-hover:text-black z-10 flex-1 relative truncate">
                    {item.value}
                  </span>
                  <span className="font-mono text-base text-[#0d0d0d]/35 group-hover:text-black z-10 relative">
                    &rarr;
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right bento side */}
          <div className="p-8 sm:p-14 bg-[#0d0d0d] flex flex-col justify-center gap-8 reveal-transition right relative">
            {/* Dot matrices */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.02)_1.5px,transparent_1.5px)] bg-[size:16px_16px] pointer-events-none" />
            <h3 className="font-bangers text-[clamp(3.5rem,8vw,6rem)] text-[#FFE03A] tracking-widest leading-none select-none relative z-10">
              OPEN<br />TO<br />WORK
            </h3>
            
            <div className="flex flex-wrap gap-2 relative z-10">
              {["Internships", "Freelance Jobs", "Collaborations", "R&D Projects"].map((item) => (
                <span
                  key={item}
                  className="font-mono text-[9px] font-bold tracking-widest uppercase border-2 border-white/20 text-[#faf6ec]/55 px-3 py-1.5"
                >
                  {item}
                </span>
              ))}
            </div>

            <p className="font-elite text-base leading-relaxed text-[#faf6ec]/75 relative z-10 font-bold">
              Currently accepting exciting development or design opportunities. Let's work together to convert your blueprints into production-ready platforms.
            </p>

            <a
              href="mailto:sanurudh938@gmail.com"
              className="btn yellow px-8 py-4 border-[3px] border-black bg-[#FFE03A] text-black font-mono text-[11px] font-bold tracking-widest uppercase shadow-[4px_4px_0_white] active:translate-y-1 active:shadow-[1px_1px_0_white] transition-all relative z-10 w-fit inline-flex items-center gap-2 interactive-hover"
            >
              ✉ Message Anurudh Directly
            </a>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="p-8 sm:p-12 bg-[#0d0d0d] border-t-[3px] border-[#FFE03A] flex flex-col md:flex-row items-center justify-between gap-6 relative select-none z-10">
        <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
          <span className="font-bangers text-3xl text-[#FFE03A] tracking-[0.1em]">
            AS.DEV
          </span>
          <span className="font-mono text-[9px] text-[#faf6ec]/35 uppercase tracking-widest font-extrabold">
            CRITICAL CODE_BASE // SHIPPED 2026
          </span>
        </div>

        {/* Slid-wipe custom footer items */}
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { tag: "GitHub", href: "https://github.com/Anurudrr" },
            { tag: "LeetCode", href: "https://leetcode.com/u/ANURUDH_SINGH_RAJAWAT/" },
            { tag: "Mail Link", href: "mailto:sanurudh938@gmail.com" },
          ].map((lnk) => (
            <a
              key={lnk.tag}
              href={lnk.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-4 py-2 border-2 border-white/20 text-[#faf6ec]/70 hover:text-black font-mono text-[11px] font-bold uppercase transition-colors duration-300 overflow-hidden cursor-pointer interactive-hover"
            >
              <span className="absolute inset-0 bg-[#FFE03A] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />
              <span className="relative z-10">{lnk.tag}</span>
            </a>
          ))}
        </div>

        <span className="font-mono text-[10px] text-[#faf6ec]/35 tracking-widest uppercase text-center md:text-right max-w-sm">
          &copy; {new Date().getFullYear()} Anurudh Singh &middot; Systems Developer
        </span>
      </footer>
    </>
  );
}
