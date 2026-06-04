import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_QUESTIONS = [
  "What is Anurudh's dev stack?",
  "Where is he studying?",
  "Are his projects open source?",
  "Looking for internships?",
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hey recruiters and developers! I am Anurudh's personal AI representative. Ask me anything about his skills, projects, computer science theories, or how to contact him directly!",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    // Append user message
    const updatedMessages = [...messages, { role: "user", content: trimmed } as Message];
    setMessages(updatedMessages);
    setInputValue("");
    setIsTyping(true);
    setErrorDetails(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply || "No reply processed." },
        ]);
      } else {
        // Handle mock or backend error response
        if (data.isMock) {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: data.reply },
          ]);
          setErrorDetails(data.error);
        } else {
          throw new Error(data.error || "Failed API transaction.");
        }
      }
    } catch (err: any) {
      console.error(err);
      // Clean fallback response so the recruiter gets a functional experience even under connection errors
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ [Offline Assistant] Connection timed out! Anurudh's backend port is offline, but you can consult his vital coordinates directly: Email him at sanurudh938@gmail.com, or Call him at +91 73893 82433! He is currently fully active.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage(inputValue);
    }
  };

  return (
    <section id="chat-section" className="border-b-[3px] border-[#0d0d0d] grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
      {/* LEFT CHAT EXPLAINER PANEL */}
      <div className="bg-[#1A5CE8] p-8 sm:p-12 lg:p-16 border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-[#0d0d0d] flex flex-col justify-center text-left text-white relative">
        <div className="absolute top-4 left-4 font-mono text-[9px] text-[#FFE03A] tracking-[0.3em] uppercase opacity-40 select-none">
          SECURE_AI_PROXY_NODE
        </div>

        <div className="font-mono text-xs text-[#FFE03A] tracking-[0.3em] uppercase mb-4 font-bold">
          // ai-representitive
        </div>
        <h2 className="font-bangers text-5xl sm:text-6xl lg:text-7xl text-white tracking-widest leading-[0.9] mb-6">
          ASK ABOUT <br />
          <span className="text-[#FFE03A] drop-shadow-[5px_5px_0_#0d0d0d] inline-block hover:scale-[1.02] transition-transform">
            ANURUDH
          </span>
        </h2>

        {/* Tactile micro comic dialog trigger */}
        <div className="bg-[#faf6ec] text-black border-[3px] border-black p-5 relative shadow-[6px_6px_0_#0d0d0d] mb-6">
          <p className="font-elite text-xs sm:text-sm leading-relaxed">
            &ldquo;Can Anurudh write backend APIs in Spring Boot?&rdquo; &larr; Ask questions on skills, portfolios, or hiring arrangements!
          </p>
          {/* Comic speech triangle pointer */}
          <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-black absolute bottom-[-13px] left-8" />
          <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#faf6ec] absolute bottom-[-8px] left-8.5" />
        </div>

        <p className="font-mono text-[10px] sm:text-xs text-[#faf6ec]/60 leading-relaxed uppercase tracking-wider">
          Powered securely on Gemini 3.5 Flash server routes. Fully calibrated with Anurudh&apos;s real B.Tech credentials and portfolio records.
        </p>
      </div>

      {/* RIGHT ACTUAL CHAT CONCENT PANEL */}
      <div className="p-4 sm:p-8 flex flex-col bg-[#faf6ec] justify-between">
        {/* Chat window Header */}
        <div className="border-b-[2px] border-black pb-4 mb-4 flex items-center justify-between">
          <div>
            <div className="font-mono text-[9px] text-black/40 uppercase tracking-widest font-extrabold">
              LIVE_CHAT_LOG
            </div>
            <div className="font-bebas text-lg lg:text-xl tracking-wider text-black">
              AI ASSISTANT AGENT &mdash; ACTIVE
            </div>
          </div>
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse border border-black shadow-[1px_1px_0_#0d0d0d]" />
        </div>

        {/* Alerts panel in case of demo warnings */}
        {errorDetails && (
          <div className="bg-[#E8281A] text-white font-mono text-[9px] sm:text-[10px] p-2 border-2 border-black inline-block shadow-[2px_2px_0_#0d0d0d] mb-4 text-center leading-normal">
            🔓 Developer Secret Warning: {errorDetails}
          </div>
        )}

        {/* Messaging Area container */}
        <div className="flex-1 overflow-y-auto max-h-[460px] min-h-[300px] flex flex-col gap-4 pr-1 scrollbar-thin scrollbar-thumb-black">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col max-w-[85%] ${
                msg.role === "user" ? "self-end items-end" : "self-start items-start"
              }`}
            >
              <span className="font-mono text-[8px] sm:text-[9px] text-[#0d0d0d]/40 font-bold tracking-widest uppercase mb-1">
                {msg.role === "user" ? "YOU" : "AS.AI.SYS"}
              </span>
              <div
                className={`border-2 border-black px-4 py-3 leading-relaxed text-xs sm:text-sm font-elite shadow-[3px_3px_0_#000000] ${
                  msg.role === "user"
                    ? "bg-[#0d0d0d] text-[#FFE03A] rounded-l-lg rounded-t-lg"
                    : "bg-white text-black rounded-r-lg rounded-t-lg"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Typing Animation indicators */}
          {isTyping && (
            <div className="flex flex-col items-start self-start max-w-[85%]">
              <span className="font-mono text-[9px] text-[#0d0d0d]/40 font-bold tracking-widest uppercase mb-1">
                AS.AI.SYS [TYPING]
              </span>
              <div className="border-2 border-black px-4 py-2 bg-white text-black rounded-lg shadow-[3px_3px_0_#000000] flex gap-1 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-black animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-black animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-black animate-bounce" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Quick Chips */}
        <div className="mt-4 pb-2">
          <span className="font-mono text-[9px] text-black/50 block font-bold uppercase mb-2 tracking-wider">
            Quick Inquiries:
          </span>
          <div className="flex flex-wrap gap-2">
            {QUICK_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => handleSendMessage(q)}
                disabled={isTyping}
                className="font-mono text-[8px] sm:text-[9px] font-bold text-black border border-black px-2 py-1 bg-white hover:bg-[#FFE03A] cursor-pointer shadow-[2px_2px_0_#0d0d0d] disabled:opacity-50 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Chat inputs row */}
        <div className="flex items-center gap-3 border-t-2 border-black pt-4 mt-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isTyping}
            placeholder="Type a message about Anurudh's credentials..."
            className="flex-1 font-mono text-xs sm:text-sm border-2 border-black bg-white px-4 py-3 outline-none text-black select-text shadow-[4px_4px_0_#000000] focus:shadow-[2px_2px_0_#000000] focus:translate-x-0.5 focus:translate-y-0.5 placeholder:text-black/35 transition-all"
            maxLength={200}
          />
          <button
            onClick={() => handleSendMessage(inputValue)}
            disabled={isTyping}
            className="font-mono text-xs font-bold leading-none tracking-widest uppercase bg-black text-[#FFE03A] border-2 border-black px-5 py-3.5 shadow-[4px_4px_0_rgba(0,0,0,0.4)] hover:bg-[#E8281A] hover:text-white transition-colors cursor-pointer"
          >
            SEND &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
