import React from "react";

interface MessagesPanelProps {
  messages: any[];
  dispatchMessageDelete: (id: string) => void;
}

export default function MessagesPanel({
  messages,
  dispatchMessageDelete
}: MessagesPanelProps) {
  return (
    <div>
      <h3 className="font-bebas text-2xl tracking-wider text-black border-b border-black/15 pb-4 mb-6">
        DISPATCHED CLIENT TRANSMISSION COMMUNICATION PACKETS ({messages.length})
      </h3>

      <div className="space-y-6">
        {messages.map((m) => (
          <div
            key={m.id}
            className="border-2 border-black p-5 relative bg-stone-50 hover:bg-[#FFE03A]/5 shadow-[3px_3px_0_#0d0d0d] text-black"
          >
            <button
              onClick={() => dispatchMessageDelete(m.id)}
              className="absolute top-4 right-4 text-[#E8281A] font-mono text-[10px] font-bold hover:scale-105 cursor-pointer"
            >
              [🗑 TRASH PACKET]
            </button>

            <div className="font-mono text-[9px] text-[#faf6ec] bg-black px-2 py-0.5 inline-block select-none mb-3 font-semibold">
              SENDER_DATE: {m.date || "NO EPOCH DATA"}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs mb-4">
              <div>
                <span className="text-black/45 uppercase block text-[10px]">Sender Name</span>
                <span className="font-extrabold text-black">{m.name}</span>
              </div>
              <div>
                <span className="text-black/45 uppercase block text-[10px]">Coordinate Mail</span>
                <a href={`mailto:${m.email}`} className="font-extrabold text-[#1A5CE8] underline">
                  {m.email}
                </a>
              </div>
            </div>

            <div className="pt-2 border-t border-dashed border-black/20 font-mono text-xs">
              <span className="text-black/45 uppercase block text-[10px] mb-1">Subject Header</span>
              <div className="font-bold text-black mb-3">{m.subject}</div>
              
              <span className="text-black/45 uppercase block text-[10px] mb-1">Payload Content</span>
              <p className="font-elite text-sm text-black bg-white p-3 border border-black/20 font-medium">
                {m.text}
              </p>
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <div className="py-20 text-center border-2 border-dashed border-black/15 font-mono text-xs text-black/40 uppercase tracking-widest select-none">
            📬 PACKET VAULT EMPTY. NO CONTACT CHANNELS VISITED YET.
          </div>
        )}
      </div>
    </div>
  );
}
