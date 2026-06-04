import React from "react";

export default function Marquee() {
  const text = "FULL-STACK DEV · UI/UX DESIGNER · REACT · DSA · CREATIVE TECH · BUILDING PRODUCTS · ";

  return (
    <div className="w-full overflow-hidden bg-black">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .asdev-marquee { background: #000; width: 100%; overflow: hidden; }
        .asdev-marquee .track { display: inline-flex; width: 200%; animation: marquee 18s linear infinite; }
        .asdev-marquee:hover .track { animation-play-state: paused; }
        .asdev-marquee .item { color: #F5C800; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; font-size: 13px; white-space: nowrap; font-family: monospace; }
      `}</style>

      <div className="asdev-marquee">
        <div className="track">
          <div className="item">{text}</div>
          <div className="item">{text}</div>
        </div>
      </div>
    </div>
  );
}
