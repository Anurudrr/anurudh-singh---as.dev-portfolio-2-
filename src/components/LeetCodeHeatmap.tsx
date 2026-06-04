import { useState, useEffect } from "react";

interface HeatmapData {
  submissionCalendar: string;
}

export function LeetCodeHeatmap() {
  const [data, setData] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://alfa-leetcode-api.onrender.com/ANURUDH_SINGH_RAJAWAT/calendar")
      .then((res) => res.json())
      .then((json: HeatmapData) => {
        setData(JSON.parse(json.submissionCalendar));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching LeetCode data", err);
        setLoading(false);
      });
  }, []);

  const getColor = (count: number) => {
    if (count === 0) return "bg-[#0d0d0d]/10";
    if (count <= 2) return "bg-[#FFE03A]/40";
    if (count <= 5) return "bg-[#FFE03A]/70";
    if (count <= 8) return "bg-[#FFE03A]";
    return "bg-[#E8281A]";
  };

  // Generate last 52 weeks (approx 365 days)
  const today = new Date();
  const days: { date: Date; count: number }[] = [];
  
  // Backtrack so Sunday is top of grid
  for (let i = 364; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    days.push({ date: d, count: 0 });
  }

  // Map counts
  Object.entries(data).forEach(([timestampStr, count]) => {
    const timestamp = parseInt(timestampStr, 10) * 1000;
    const date = new Date(timestamp);
    const dateString = date.toISOString().split("T")[0];
    
    const dayMatch = days.find((d) => d.date.toISOString().split("T")[0] === dateString);
    if (dayMatch) {
      dayMatch.count = count;
    }
  });

  return (
    <div className="w-full bg-[#faf6ec] border-[3px] border-[#0d0d0d] p-6 sm:p-8 shadow-[6px_6px_0_rgba(13,13,13,1)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="font-bangers text-3xl tracking-widest text-[#0d0d0d] flex items-center gap-3 uppercase">
          <span className="w-3 h-3 bg-[#E8281A] inline-block animate-pulse"></span>
          LeetCode Heatmap
        </h3>
        <a 
          href="https://leetcode.com/u/ANURUDH_SINGH_RAJAWAT/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-mono text-[9px] font-bold tracking-widest uppercase border-b-2 border-[#0d0d0d] text-[#0d0d0d] hover:text-[#E8281A] hover:border-[#E8281A] transition-colors"
        >
          View Profile ↗
        </a>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[120px] font-mono text-[10px] tracking-widest text-[#0d0d0d]/50 uppercase font-bold animate-pulse">
          Fetching Data...
        </div>
      ) : (
        <div className="flex overflow-x-auto pb-4 hide-scrollbar">
          <div className="min-w-max">
            <div className="grid grid-rows-7 grid-flow-col gap-[3px]">
              {days.map((day, i) => (
                <div
                  key={i}
                  title={`${day.date.toDateString()}: ${day.count} submissions`}
                  className={`w-[11px] h-[11px] border border-[#0d0d0d]/20 transition-all hover:scale-125 hover:border-[#0d0d0d] hover:z-10 cursor-crosshair ${getColor(day.count)}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2 mt-4 font-mono text-[9px] font-bold tracking-widest text-[#0d0d0d]/50 uppercase">
              <span>Less</span>
              <div className="flex gap-[3px]">
                <div className="w-[11px] h-[11px] bg-[#0d0d0d]/10 border border-[#0d0d0d]/20"></div>
                <div className="w-[11px] h-[11px] bg-[#FFE03A]/40 border border-[#0d0d0d]/20"></div>
                <div className="w-[11px] h-[11px] bg-[#FFE03A]/70 border border-[#0d0d0d]/20"></div>
                <div className="w-[11px] h-[11px] bg-[#FFE03A] border border-[#0d0d0d]/20"></div>
                <div className="w-[11px] h-[11px] bg-[#E8281A] border border-[#0d0d0d]/20"></div>
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
