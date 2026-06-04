import React from "react";
import { motion } from "motion/react";

export default function ResumePage() {
  const triggerPrint = () => {
    window.print();
  };

  return (
    <section className="bg-[#faf6ec] py-16 px-6 sm:px-12 lg:px-16 min-h-screen flex flex-col items-center">
      
      {/* HEADER PRINT CONTROL */}
      <div className="max-w-4xl w-full flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-8 print:hidden select-none">
        <div>
          <span className="font-mono text-xs text-[#E8281A] tracking-[0.3em] uppercase block font-bold">
            // portable credentials
          </span>
          <h2 className="font-bangers text-4xl sm:text-5xl text-black tracking-wider leading-none mt-2">
            CURRICULUM VITAE<span className="text-[#1A5CE8]">.</span>
          </h2>
        </div>
        <button
          onClick={triggerPrint}
          className="font-mono text-xs font-bold uppercase tracking-widest px-5 py-3 border-2 border-black bg-[#FFE03A] text-black shadow-[3px_3px_0_#0d0d0d] hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#0d0d0d] transition-all cursor-pointer text-center"
        >
          🖨️ Local System Print
        </button>
      </div>

      {/* CORE RESUME DOCK (Sized strictly for normal full sheets) */}
      <div className="max-w-4xl w-full bg-white border-[3px] border-black p-8 sm:p-12 shadow-[10px_10px_0_#0d0d0d] relative overflow-hidden print:border-0 print:shadow-none print:p-0">
        
        {/* Halftone watermark */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(ellipse_at_center,rgba(13,13,13,0.02)_1.5px,transparent_1.5px)] bg-[size:16px_16px] pointer-events-none select-none" />

        <div className="border-b-[3px] border-black pb-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
          <div>
            <h1 className="font-bangers text-4xl sm:text-5xl lg:text-5xl text-black tracking-widest leading-none mb-1">
              ANURUDH SINGH RAJAWAT
            </h1>
            <h3 className="font-bebas text-xl sm:text-2xl text-[#E8281A] tracking-wider uppercase font-semibold">
              Computer Science &amp; Systems Engineer
            </h3>
          </div>
          <div className="font-mono text-[10px] sm:text-xs text-black/60 space-y-1 block tracking-widest text-left sm:text-right uppercase">
            <div>✉️ <a href="mailto:sanurudh938@gmail.com" className="hover:underline text-black font-extrabold">sanurudh938@gmail.com</a></div>
            <div>📞 +91 73893 82433</div>
            <div>🖥️ <a href="https://github.com/Anurudrr" className="hover:underline text-black font-extrabold">github.com/Anurudrr</a></div>
            <div>📍 Vadodara, Gujarat, India</div>
          </div>
        </div>

        {/* METRICS ROW SECTION grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: EDUCATION AND SKILLS (5) */}
          <div className="md:col-span-5 space-y-8 select-none">
            
            {/* SEGMENT: EDUCATION */}
            <div>
              <h4 className="font-bebas text-lg bg-black text-[#FFE03A] px-2 py-0.5 inline-block tracking-widest uppercase mb-4 shadow-[1.5px_1.5px_0_#E8281A]">
                EDUCATION
              </h4>
              <div className="space-y-4 font-mono text-xs">
                <div>
                  <span className="font-extrabold text-black block text-sm">B.TECH IN COMPUTER SCIENCE</span>
                  <span className="text-black/50 block">PARUL UNIVERSITY &middot; VADODARA</span>
                  <span className="text-[#E8281A] font-bold">2023 - 2027 (EXPECTED)</span>
                  <span className="text-black/70 block mt-1 text-[11px]">Focused in OOP systems, DSA logic, computer networking theories, and database integrity schemas.</span>
                </div>
              </div>
            </div>

            {/* SEGMENT: ARSENAL */}
            <div>
              <h4 className="font-bebas text-lg bg-black text-[#FFE03A] px-2 py-0.5 inline-block tracking-widest uppercase mb-4 shadow-[1.5px_1.5px_0_#E8281A]">
                THE ARSENAL
              </h4>
              <div className="space-y-3 font-mono text-xs">
                <div>
                  <span className="text-black/45 block text-[10px] tracking-widest">FRONTEND CORE</span>
                  <span className="font-bold text-black text-[11px] block">ReactJS, Javascript (ES6), HTML5/CSS3, TailwindCSS, Figma-to-Code master</span>
                </div>
                <div>
                  <span className="text-black/45 block text-[10px] tracking-widest">BACKEND CORE</span>
                  <span className="font-bold text-black text-[11px] block">Java core, Node.js, Express framework, REST API, Spring basic routing</span>
                </div>
                <div>
                  <span className="text-black/45 block text-[10px] tracking-widest">PERSISTENCE</span>
                  <span className="font-bold text-black text-[11px] block">MySQL databases, SQL queries, transactional normalization</span>
                </div>
              </div>
            </div>

            {/* SEGMENT: HIGHLIGHT CERTIFICATIONS */}
            <div>
              <h4 className="font-bebas text-lg bg-black text-[#FFE03A] px-2 py-0.5 inline-block tracking-widest uppercase mb-4 shadow-[1.5px_1.5px_0_#E8281A]">
                CERTIFICATES
              </h4>
              <div className="space-y-3 font-mono text-xs">
                <div>
                  <span className="font-extrabold text-black text-[11px] block">✓ NPTEL Core Java Specialist</span>
                  <span className="text-black/50 text-[10px]">Ministry of Education, IIT</span>
                </div>
                <div>
                  <span className="font-extrabold text-black text-[11px] block">✓ Advanced Responsive UI Systems</span>
                  <span className="text-black/50 text-[10px]">FreeCodeCamp Certified</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: CORE PROJECTS AND PROFILE (7) */}
          <div className="md:col-span-7 space-y-8">
            
            {/* PROFILE OBJECTIVE */}
            <div>
              <h4 className="font-bebas text-lg bg-black text-[#FFE03A] px-2 py-0.5 inline-block tracking-widest uppercase mb-4 shadow-[1.5px_1.5px_0_#E8281A] select-none">
                SYSTEM SUMMARY
              </h4>
              <p className="font-elite text-xs leading-relaxed text-black/80">
                Ambitious, design-focused 3rd Year Computer Science student blending elite Figma layout parameters with robust backend logic. Enjoys problem solving, DSA, and compiling beautifully balanced web interfaces with perfect responsive standards. Seeking software engineering internships and team collaborations.
              </p>
            </div>

            {/* DYNAMIC WORK STICKERS */}
            <div>
              <h4 className="font-bebas text-lg bg-black text-[#FFE03A] px-2 py-0.5 inline-block tracking-widest uppercase mb-4 shadow-[1.5px_1.5px_0_#E8281A] select-none">
                NOTABLE DEPLOYMENTS
              </h4>
              <div className="space-y-5 font-mono text-xs">
                 <div>
                  <div className="flex justify-between items-baseline select-none">
                    <span className="font-extrabold text-black text-sm">EVENTO: FULL-STACK EVENT SYSTEM</span>
                    <span className="text-black/50 text-[10px] uppercase font-bold">RELEASED</span>
                  </div>
                  <span className="text-[#E8281A] font-bold text-[10px] select-none">Stack: React.js, JavaScript, HTML, CSS, Tailwind CSS, Framer Motion</span>
                  <p className="font-elite text-xs text-black/70 mt-1 leading-relaxed">
                    Designed end-to-end UI/UX and coded a highly responsive frontend for Evento, simplifying planning boards, schedules, service bookings, and vendor APIs.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline select-none">
                    <span className="font-extrabold text-black text-sm">HOPIN: TRAVEL ITINERARY MANAGER</span>
                    <span className="text-black/50 text-[10px] uppercase font-bold">RELEASED</span>
                  </div>
                  <span className="text-[#E8281A] font-bold text-[10px] select-none">Stack: Java, Object Oriented Programming (OOP) Core</span>
                  <p className="font-elite text-xs text-black/70 mt-1 leading-relaxed">
                    Engineered robust travel schedulers using pure OOP modular architectures to represent multi-leg travel route options, leg listings, and resource coordinate details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM METADATA BAR FOR PRINTING */}
        <div className="border-t-[3px] border-black mt-10 pt-4 flex justify-between font-mono text-[9px] text-black/45 tracking-widest uppercase select-none">
          <span>VERIFICATION PIN: AS_DEV_SYSTEM_890</span>
          <span>SYSTEM_GENERATED_CV // 2026</span>
        </div>
      </div>
    </section>
  );
}
