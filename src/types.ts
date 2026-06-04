export interface SkillItem {
  name: string;
  rating: number; // percentage out of 100
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: SkillItem[];
}

export interface ProjectItem {
  id: string;
  pNo: string;
  year: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
}

export interface TimelineEvent {
  year: string;
  month: string;
  title: string;
  detail: string;
  dotOpen?: boolean;
}

export interface AchievementItem {
  icon: string;
  title: string;
  description: string;
}

// Full comprehensive static datasets for Anurudh's portfolio

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend Development",
    icon: "⚛️",
    skills: [
      { name: "React.js", rating: 85 },
      { name: "JavaScript", rating: 80 },
      { name: "Tailwind CSS", rating: 90 },
      { name: "Figma (Designer)", rating: 88 },
    ],
  },
  {
    title: "Backend Development",
    icon: "☕",
    skills: [
      { name: "Java Core", rating: 75 },
      { name: "Spring Boot", rating: 60 },
      { name: "Node.js / Express", rating: 55 },
      { name: "REST APIs", rating: 72 },
    ],
  },
  {
    title: "Creative Design",
    icon: "🎨",
    skills: [
      { name: "Adobe XD", rating: 85 },
      { name: "Illustrator", rating: 80 },
      { name: "Photoshop", rating: 75 },
      { name: "UI/UX & Handoff", rating: 82 },
    ],
  },
  {
    title: "Data & Tools",
    icon: "📊",
    skills: [
      { name: "MySQL / SQL", rating: 65 },
      { name: "Git & GitHub", rating: 78 },
      { name: "VS Code Core", rating: 90 },
      { name: "Postman API Development", rating: 70 },
    ],
  },
  {
    title: "Computer Concepts",
    icon: "🧠",
    skills: [
      { name: "Data Structures (DSA)", rating: 70 },
      { name: "OOP (Java)", rating: 80 },
      { name: "Operating Systems", rating: 62 },
      { name: "Computer Networks", rating: 60 },
    ],
  },
  {
    title: "Professional Attributes",
    icon: "🏆",
    skills: [
      { name: "Problem Solving", rating: 90 },
      { name: "Technical Communication", rating: 85 },
      { name: "Leadership Edge", rating: 75 },
      { name: "Self-Learning Loop", rating: 92 },
    ],
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "p1",
    pNo: "01",
    year: "2025",
    category: "Full Stack Design",
    title: "Evento",
    description: "A full-stack event management platform designed to simplify event planning, service booking and event organization. Integrates highly tactile UI layouts with interactive responsive web workflows.",
    tags: ["React.js", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/Anurudrr",
  },
  {
    id: "p2",
    pNo: "02",
    year: "2025-2026",
    category: "Software Engineering",
    title: "Hopin",
    description: "Travel management application focused on trip planning and travel organization. Engineered using pure object-oriented methodology in Java.",
    tags: ["Java", "Object Oriented Programming", "Logic Architecture"],
    githubUrl: "https://github.com/Anurudrr",
  },
];

export const TIMELINE_DATA: TimelineEvent[] = [
  {
    year: "2023",
    month: "Chapter 1",
    title: "Beginning at Parul",
    detail: "Started B.Tech Computer Science & Engineering at Parul Institute of Technology, Vadodara, laying down foundational programming and core engineering skills.",
  },
  {
    year: "2024",
    month: "Chapter 2",
    title: "Discovering Design",
    detail: "Began exploring graphic design, Canva, Figma, UI/UX design and digital creativity, establishing a strong geometric and visual layout instinct.",
  },
  {
    year: "2025",
    month: "Chapter 3",
    title: "From Designer to Developer",
    detail: "Worked on graphic design projects and developed a strong interest in web development. Transitioned design components into modular, functional React codebases.",
  },
  {
    year: "2026",
    month: "Chapter 4",
    title: "Building Products & DSA",
    detail: "Focused on Data Structures and Algorithms in Java, React ecosystem, and building robust full-stack systems like Evento & Hopin.",
    dotOpen: true,
  },
  {
    year: "Future",
    month: "Chapter 5",
    title: "Future Goals",
    detail: "Seeking high-performance technical assignments, mastering advanced DSA architectures, and shipping scalable full-stack products globally.",
    dotOpen: true,
  },
];

export const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    icon: "🎓",
    title: "3rd Year Computer Science Candidate",
    description: "Studying B.Tech under Parul University with strong academic performance in OOP, DSA, Systems, and Software Craft.",
  },
  {
    icon: "💻",
    title: "Continuous Algorithm Practice",
    description: "Active practicing on LeetCode with continuous commitment to algorithmic thinking and computational optimizations.",
  },
  {
    icon: "🎨",
    title: "Graphic Design Professional Root",
    description: "3+ years of professional editing, structural framing, vector illustration, and creative direction before migrating to code.",
  },
  {
    icon: "🚀",
    title: "Shipped & Tested Applications",
    description: "Released fully interactive, client-reviewed products into public development space, growing functional mastery.",
  },
];

export interface HobbyItem {
  id: string;
  icon: string;
  title: string;
  category: string;
  description: string;
  accent: string;
  funFact: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  tag: string;
  imageUrl: string;
  date: string;
  description: string;
}

export const HOBBIES_DATA: HobbyItem[] = [
  {
    id: "h1",
    icon: "🖋️",
    title: "Vector & Lettering Illustration",
    category: "Design Craft",
    description: "Designing quirky brand logos, bespoke geometric vector iconography, and bold typographic layouts. Maintaining a continuous visual practice that informs front-end component structures.",
    accent: "bg-[#FFE03A]",
    funFact: "Enjoys using halftone filters and retro ink bleed effects to give digital art a physical printed vibe.",
  },
  {
    id: "h2",
    icon: "🧩",
    title: "Algorithmic Speed Puzzles",
    category: "Logic Engine",
    description: "Engaging in algorithmic strategy card games and solving complex multi-dimensional mathematical puzzles. Practicing speed-solving Rubik's cubes as a cognitive warmup.",
    accent: "bg-[#E8281A] text-white",
    funFact: "Best solving time for a standard 3x3 Rubik's Cube is 17.4 seconds!",
  },
  {
    id: "h3",
    icon: "⛰️",
    title: "Travel & Landscape Photography",
    category: "Visual Archive",
    description: "Exploring historical architectures of Gujarat, identifying geometric proportions in heritage sites, and documenting cityscapes under low-light high-contrast compositions.",
    accent: "bg-[#1A5CE8] text-white",
    funFact: "Keeps a growing analog journal filled with architectural sketch drafts and high-contrast street photos.",
  },
  {
    id: "h4",
    icon: "💿",
    title: "Generative Audio & Synth",
    category: "Soundscapes",
    description: "Modulating analog synthesizers and programming mathematical sound loops. Exploring how audio waves oscillate under distinct web audio API sound canvases.",
    accent: "bg-[#faf6ec]",
    funFact: "Actually coded a custom Web Audio synthesizer that converts mouse movement coordinates into low-fi minor-pentatonic melody scales.",
  },
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: "g1",
    title: "Brutalist Grid Typography Study",
    tag: "Graphic Design",
    imageUrl: "https://images.unsplash.com/photo-1561070791-26c113006238?q=80&w=600&auto=format&fit=crop",
    date: "Feb 2025",
    description: "An interactive graphic study researching vintage print media, coarse Swiss grid structures, and dense layouts. Features custom high-contrast palettes and hand-drawn vectors.",
  },
  {
    id: "g2",
    title: "Full-Stack System Architecture Schema",
    tag: "Software Engineering",
    imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600&auto=format&fit=crop",
    date: "May 2025",
    description: "Data-flow diagrams mapping out spring security filters, CORS configs, and database connection queries designed for low latency high throughput dashboard feeds.",
  },
  {
    id: "g3",
    title: "Industrial Aesthetics on Canvas",
    tag: "Illustration Art",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    date: "Oct 2024",
    description: "Abstract vector shapes designed to replicate traditional printing press overlays, utilizing ink splatters, line misalignments, and vivid primary halftone shades.",
  },
  {
    id: "g4",
    title: "Vadodara Heritage Architectural Capture",
    tag: "Photography",
    imageUrl: "https://images.unsplash.com/photo-1548013146-72479768b906?q=80&w=600&auto=format&fit=crop",
    date: "Dec 2024",
    description: "High contrast shadow experiment highlighting symmetry and geometric structures across historic domes, framing design patterns from the physical world.",
  },
  {
    id: "g5",
    title: "Ergonomic Code Station Vibe",
    tag: "Dev Environment",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
    date: "Jan 2026",
    description: "A dark theme vertical monitor config aligned perfectly for scanning compiler logs, practicing daily competitive algorithms, and checking UI margin offsets.",
  },
  {
    id: "g6",
    title: "HAL 9000 Vector Redesign",
    tag: "UI/UX Prototype",
    imageUrl: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=600&auto=format&fit=crop",
    date: "Apr 2025",
    description: "An experimental futuristic interface built with neon indicators, flat grids, telemetry parameters, and smooth animations reflecting clean, non-standard user journeys.",
  },
];

