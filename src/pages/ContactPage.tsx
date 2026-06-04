import React, { useState } from "react";
import { motion } from "motion/react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", text: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(null);
    setError(null);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Connection failed. Could not upload communication block.");
      const data = await res.json();
      
      if (data.success) {
        setSuccess("Affirmative! Communication packet has been dispatched and stored securely in Anurudh's system journals.");
        setFormData({ name: "", email: "", subject: "", text: "" });
      } else {
        throw new Error(data.error || "System rejected package.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to contact proxy server.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-[#faf6ec] py-16 px-6 sm:px-12 lg:px-16 min-h-screen flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        
        {/* LEFT COORDINATES BOARD */}
        <div className="lg:col-span-5 bg-black text-white p-8 sm:p-12 shadow-[10px_10px_0_#FFE03A] flex flex-col justify-between relative overflow-hidden min-h-[400px]">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1.5px,transparent_1.5px)] bg-[size:16px_16px] pointer-events-none" />

          {/* Heading Label */}
          <div className="relative z-10 select-none">
            <span className="font-mono text-xs text-[#FFE03A] tracking-[0.3em] uppercase block mb-3 font-bold">
              // coordinate metrics
            </span>
            <h2 className="font-bangers text-4xl sm:text-5xl text-white tracking-wider leading-none mb-6">
              LET&apos;S CO-AUTH CODE<span className="text-[#E8281A]">.</span>
            </h2>
            <p className="font-elite text-xs text-white/70 leading-relaxed max-w-sm">
              Whether you are a recruiter looking for an engineer with precise Figma-to-code execution capabilities, or a fellow developer wanting to debate Spring filters &amp; arrays, Anurudh is online.
            </p>
          </div>

          {/* Core metadata stats selection */}
          <div className="relative z-10 space-y-4 font-mono text-[10px] sm:text-xs text-white/80 block tracking-widest uppercase select-none border-t border-white/10 pt-6 mt-8">
            <div>
              <span className="text-white/40 block">COMMUNICATION_HUB</span>
              <a href="mailto:sanurudh938@gmail.com" className="hover:text-[#FFE03A] font-bold">
                sanurudh938@gmail.com
              </a>
            </div>
            <div>
              <span className="text-white/40 block">HOTLINE_INDIA</span>
              <a href="tel:+917389382433" className="hover:text-[#FFE03A] font-bold">
                +91 73893 82433
              </a>
            </div>
            <div>
              <span className="text-white/40 block">CURRENT_GRID_COORDS</span>
              <span className="text-[#FFE03A] font-bold">Vadodara, Gujarat, India</span>
            </div>
          </div>
        </div>

        {/* RIGHT TRANSMITTER form */}
        <div className="lg:col-span-7 bg-white border-[3px] border-black p-8 sm:p-12 shadow-[10px_10px_0_#0d0d0d]">
          <span className="font-mono text-xs text-[#E8281A] tracking-[0.3em] uppercase block mb-3 font-bold select-none">
            // client console input
          </span>
          <h3 className="font-bebas text-3xl text-black tracking-widest uppercase mb-6 border-b border-black/10 pb-3">
            SECURE TRANSMISSION STREAM
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="font-mono text-[9px] tracking-widest text-[#0d0d0d]/50 font-extrabold uppercase block mb-2">
                  Sender name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="E.G., AGENT SMITH"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-black bg-white text-black font-mono text-xs placeholder-black/30 uppercase tracking-widest outline-none focus:bg-[#FFE03A]/5 transition-all"
                />
              </div>

              <div>
                <label className="font-mono text-[9px] tracking-widest text-[#0d0d0d]/50 font-extrabold uppercase block mb-2">
                  Sender email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="EMAIL_ADDR@PROVIDER.COM"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-black bg-white text-black font-mono text-xs placeholder-black/30 tracking-widest outline-none focus:bg-[#FFE03A]/5 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="font-mono text-[9px] tracking-widest text-[#0d0d0d]/50 font-extrabold uppercase block mb-2">
                Subject
              </label>
              <input
                type="text"
                placeholder="E.G., RECRUITMENT_INTERNSHIP_2026"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2.5 border-2 border-black bg-white text-black font-mono text-xs placeholder-black/30 uppercase tracking-widest outline-none focus:bg-[#FFE03A]/5 transition-all"
              />
            </div>

            <div>
              <label className="font-mono text-[9px] tracking-widest text-[#0d0d0d]/50 font-extrabold uppercase block mb-2">
                Transmission block *
              </label>
              <textarea
                required
                rows={4}
                placeholder="TYPE SECURE MEMO PROTOCOL HERE..."
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                className="w-full px-4 py-2.5 border-2 border-black bg-white text-black font-mono text-xs placeholder-black/30 uppercase tracking-widest outline-none resize-none focus:bg-[#FFE03A]/5 transition-all"
              />
            </div>

            {success && (
              <div className="p-4 border-2 border-green-700 bg-green-50 text-green-800 font-mono text-[11px] leading-relaxed select-none">
                ✓ {success}
              </div>
            )}

            {error && (
              <div className="p-4 border-2 border-[#E8281A] bg-red-50 text-[#E8281A] font-mono text-[11px] leading-relaxed select-none">
                ☠️ {error}
              </div>
            )}

            <div className="pt-3">
              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: 1.03, translate: "-2px -2px", boxShadow: "5px 5px 0px #000" }}
                whileTap={{ scale: 0.97, translate: "1px 1px", boxShadow: "1px 1px 0px #000" }}
                className="w-full font-mono text-xs font-bold uppercase tracking-widest py-3.5 border-2 border-black bg-[#FFE03A] text-black cursor-pointer shadow-[3px_3px_0_#0d0d0d] hover:bg-black hover:text-[#FFE03A] transition-colors disabled:opacity-50"
              >
                {submitting ? "DISPATCHING PACKET..." : "TRANSMIT DATA PACKET &rarr;"}
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
