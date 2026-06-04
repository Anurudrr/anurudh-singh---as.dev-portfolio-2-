import React from "react";
import { useDB } from "../useDB";
import { motion } from "motion/react";

interface BlogDetailPageProps {
  slug: string;
}

export default function BlogDetailPage({ slug }: BlogDetailPageProps) {
  const { blog } = useDB();

  // Find post by slug
  const post = blog.find((p) => p.slug === slug || p.id === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#faf6ec] text-center select-none">
        <span className="font-bangers text-8xl text-[#E8281A] drop-shadow-[4px_4px_0_#000] mb-4">
          404_PORT
        </span>
        <h2 className="font-bebas text-3xl tracking-widest uppercase text-black mb-2">
          Article Protocol Not Resolved
        </h2>
        <p className="font-mono text-xs text-black/60 max-w-sm mb-8 uppercase tracking-widest">
          The requested system writeup could not be retrieved from the server journals.
        </p>
        <a
          href="/blog"
          className="font-mono text-xs font-bold uppercase tracking-widest px-6 py-3 border-3 border-black bg-black text-[#FFE03A] hover:bg-white hover:text-black shadow-[4px_4px_0_#0d0d0d] transition-all"
        >
          &larr; Return to Diaries
        </a>
      </div>
    );
  }

  // A bespoke, high-performance, lightweight markdown line-by-line parser for comic brutalism!
  // Converted completely inside client for gorgeous, flawless, lightning-fast rendering.
  const renderBrutalistMarkdown = (rawContent: string) => {
    const lines = rawContent.split("\n");
    let insideCodeBlock = false;
    let codeContent: string[] = [];

    return lines.map((line, idx) => {
      const trimmed = line.trim();

      // CODE BLOCK TRIGGERS
      if (trimmed.startsWith("```")) {
        if (insideCodeBlock) {
          insideCodeBlock = false;
          const mergedCode = codeContent.join("\n");
          codeContent = [];
          return (
            <div key={idx} className="border-3 border-black bg-[#0d0d0d] text-[#FFE03A] p-5 my-6 overflow-x-auto shadow-[4px_4px_0_#000] rounded font-mono text-xs">
              <span className="text-[9px] text-[#faf6ec]/30 block tracking-widest uppercase border-b border-white/10 pb-2 mb-3 select-none">
                {trimmed.substring(3).toUpperCase() || "SYSTEM_CODE"} // SYSTEM RUNTIME BUFFER
              </span>
              <pre className="leading-relaxed"><code>{mergedCode}</code></pre>
            </div>
          );
        } else {
          insideCodeBlock = true;
          return null;
        }
      }

      // If inside code block, gather lines
      if (insideCodeBlock) {
        codeContent.push(line);
        return null;
      }

      // HEADINGS
      if (trimmed.startsWith("### ")) {
        return (
          <h3 key={idx} className="font-bangers text-3xl text-black tracking-widest pt-8 pb-3 uppercase">
            {trimmed.substring(4)}
          </h3>
        );
      }
      if (trimmed.startsWith("#### ")) {
        return (
          <h4 key={idx} className="font-bebas text-2xl text-[#E8281A] tracking-wider pt-6 pb-2 uppercase">
            {trimmed.substring(5)}
          </h4>
        );
      }
      if (trimmed.startsWith("## ")) {
        return (
          <h2 key={idx} className="font-bangers text-4xl text-black tracking-widest pt-10 pb-4 border-b-2 border-dashed border-black/20 uppercase">
            {trimmed.substring(3)}
          </h2>
        );
      }

      // LISTS
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        return (
          <li key={idx} className="font-elite text-sm text-black/85 leading-relaxed pl-6 relative py-1 list-none before:content-['■'] before:text-[#E8281A] before:absolute before:left-0 before:top-1 before:text-[10px]">
            {trimmed.substring(2)}
          </li>
        );
      }
      if (trimmed.match(/^\d+\.\s/)) {
        const dotIndex = trimmed.indexOf(". ");
        return (
          <li key={idx} className="font-mono text-xs text-black/85 leading-relaxed pl-6 relative py-1 list-none before:content-[attr(data-num)] before:text-[#1A5CE8] before:font-bold before:absolute before:left-0 before:top-1 pr-6" data-num={`${trimmed.substring(0, dotIndex)}.`}>
            {trimmed.substring(dotIndex + 2)}
          </li>
        );
      }

      // EMPTY LINE
      if (!trimmed) {
        return <div key={idx} className="h-4" />;
      }

      // REGULAR PARAGRAPHS WITH INLINE STRONG TAG SUPPORT
      const parts = line.split("**");
      if (parts.length > 1) {
        return (
          <p key={idx} className="font-elite text-sm text-black/80 leading-relaxed py-2">
            {parts.map((part, pIdx) => {
              if (pIdx % 2 === 1) {
                return (
                  <strong key={pIdx} className="font-mono text-xs font-black bg-[#FFE03A] text-black border border-black px-1 mx-0.5 shadow-[1px_1px_0_#000]">
                    {part}
                  </strong>
                );
              }
              return part;
            })}
          </p>
        );
      }

      return (
        <p key={idx} className="font-elite text-sm text-black/80 leading-relaxed py-2">
          {line}
        </p>
      );
    });
  };

  return (
    <article className="bg-[#faf6ec] py-16 px-6 sm:px-12 lg:px-16 min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* NAV ROUTE BACK */}
        <div className="flex items-center justify-between pb-6 border-b-2 border-dashed border-black/20 mb-10 select-none">
          <a
            href="/blog"
            className="font-mono text-xs font-bold uppercase tracking-widest text-[#E8281A] hover:underline"
          >
            &larr; BACK TO DIARIES INDEX
          </a>
          <span className="font-mono text-[9px] bg-black text-[#FFE03A] border border-black px-2 py-0.5 uppercase font-bold">
            JOURNAL // DEPLOY_SPEC
          </span>
        </div>

        {/* TOP META CAROUSEL */}
        <div className="border-3 border-black p-6 sm:p-8 bg-white shadow-[8px_8px_0_#0d0d0d] mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4 select-none">
            <span className="font-mono text-[9px] font-black bg-[#FFE03A] text-black border border-black px-2.5 py-0.5 uppercase">
              {post.category}
            </span>
            <span className="font-mono text-xs text-black/45 uppercase font-bold">
              ⏰ {post.readingTime} &middot; AUTHOR: {post.author}
            </span>
          </div>

          <h1 className="font-bangers text-4xl sm:text-5xl lg:text-6xl text-black tracking-widest leading-[0.95] mb-4">
            {post.title}
          </h1>

          <div className="font-mono text-xs text-[#E8281A] uppercase tracking-widest font-bold border-l-4 border-[#E8281A] pl-3">
            Published on: {post.date}
          </div>
        </div>

        {/* PARSED MARKDOWN LAYOUT CONTENT */}
        <div className="prose max-w-none text-black select-text bg-[#faf6ec]">
          {renderBrutalistMarkdown(post.content)}
        </div>

        {/* BASE END OF ENTRY LOG */}
        <div className="border-t-3 border-black mt-12 pt-8 select-none">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tg: string) => (
                <span
                  key={tg}
                  className="font-mono text-[9px] font-bold bg-[#E8281A]/10 text-[#E8281A] border border-black/15 px-2.5 py-1 rounded-sm"
                >
                  #{tg}
                </span>
              ))}
            </div>

            <a
              href="/blog"
              className="font-mono text-xs font-bold uppercase tracking-widest px-5 py-3 border-2 border-black bg-[#FFE03A] text-black hover:bg-black hover:text-[#FFE03A] shadow-[3px_3px_0_#0d0d0d] transition-all text-center inline-block"
            >
              Back to Journal
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
