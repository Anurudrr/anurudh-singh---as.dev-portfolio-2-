import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface LeetCodeSubmission {
  title: string;
  titleSlug: string;
  timestamp: string;
  lang: string;
}

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumUrl?: string;
  trackUrl?: string;
  mock?: boolean;
}

export function MetroActivityList() {
  const [lastSubmission, setLastSubmission] = useState<LeetCodeSubmission | null>(null);
  const [loading, setLoading] = useState(true);
  const [spotifyData, setSpotifyData] = useState<SpotifyData | null>(null);
  const [spotifyLoading, setSpotifyLoading] = useState(true);

  useEffect(() => {
    fetch("https://alfa-leetcode-api.onrender.com/ANURUDH_SINGH_RAJAWAT/acSubmission")
      .then((res) => res.json())
      .then((json) => {
        if (json.submission && json.submission.length > 0) {
          setLastSubmission(json.submission[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching LeetCode activity", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("/api/spotify/currently-playing")
      .then(async (res) => {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return res.json();
        } else {
          // If the server is restarting, it might return a 502/503 HTML page
          throw new Error("Received non-JSON response from server");
        }
      })
      .then((data) => {
        setSpotifyData(data);
        setSpotifyLoading(false);
      })
      .catch((err) => {
        // We log silently or just set state, without a big error
        setSpotifyLoading(false);
      });
  }, []);

  const formatTime = (ts: string) => {
    const date = new Date(parseInt(ts, 10) * 1000);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {/* Last Question Solved */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.02 }}
        className="bg-[#0d0d0d] border-[3px] border-[#0d0d0d] p-6 shadow-[6px_6px_0_rgba(13,13,13,1)] relative flex flex-col justify-between overflow-hidden group cursor-crosshair"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFE03A]/10 rounded-full blur-3xl group-hover:bg-[#FFE03A]/20 transition-colors pointer-events-none" />
        
        <div>
          <div className="flex justify-between items-start mb-4">
            <span className="bg-[#FFE03A] border-2 border-[#0d0d0d] px-3 py-1 font-mono text-[9px] font-extrabold tracking-widest uppercase text-[#0d0d0d]">
              LeetCode Activity
            </span>
            {loading ? (
              <span className="w-2 h-2 rounded-full bg-[#FFE03A] animate-ping"></span>
            ) : (
              <span className="w-2 h-2 rounded-full bg-[#fff]"></span>
            )}
          </div>
          
          <h4 className="font-mono text-[#faf6ec]/50 text-[10px] tracking-widest uppercase mb-2">Last Question Solved</h4>
          
          {loading ? (
            <div className="h-8 bg-[#faf6ec]/10 animate-pulse w-3/4 mb-2"></div>
          ) : lastSubmission ? (
            <>
              <h3 className="font-elite text-xl text-[#faf6ec] leading-tight mb-2 group-hover:text-[#FFE03A] transition-colors">
                {lastSubmission.title}
              </h3>
              <p className="font-mono text-[10px] text-[#faf6ec]/60 border border-[#faf6ec]/20 px-2 py-0.5 inline-block rounded-sm">
                {lastSubmission.lang.toUpperCase()}
              </p>
            </>
          ) : (
            <p className="font-elite text-xl text-[#faf6ec]">No recent questions found.</p>
          )}
        </div>
        
        <div className="mt-6 flex justify-between items-end border-t border-[#faf6ec]/20 pt-4">
          <span className="font-mono text-[9px] tracking-widest uppercase text-[#faf6ec]/40">
            {lastSubmission ? formatTime(lastSubmission.timestamp) : "..."}
          </span>
          <a
            href={lastSubmission ? `https://leetcode.com/problems/${lastSubmission.titleSlug}/` : "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] font-bold tracking-widest uppercase text-[#FFE03A] hover:underline"
          >
            View Problem ↗
          </a>
        </div>
      </motion.div>

      {/* Last Song Played (Spotify) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.02 }}
        className="bg-[#1DB954] border-[3px] border-[#0d0d0d] p-6 shadow-[6px_6px_0_rgba(13,13,13,1)] relative flex flex-col justify-between overflow-hidden group cursor-crosshair"
      >
        <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse group-hover:bg-white/20 transition-colors pointer-events-none" />
        
        <div>
          <div className="flex justify-between items-start mb-4">
            <span className="bg-[#faf6ec] border-2 border-[#0d0d0d] px-3 py-1 font-mono text-[9px] font-extrabold tracking-widest uppercase text-[#0d0d0d] flex items-center gap-2">
              <span className="flex gap-[2px] items-end h-2">
                <motion.span animate={{ height: [4, 8, 4] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-[3px] bg-[#1DB954]"></motion.span>
                <motion.span animate={{ height: [8, 3, 8] }} transition={{ repeat: Infinity, duration: 1.2 }} className="w-[3px] bg-[#1DB954]"></motion.span>
                <motion.span animate={{ height: [3, 9, 3] }} transition={{ repeat: Infinity, duration: 0.9 }} className="w-[3px] bg-[#1DB954]"></motion.span>
              </span>
              Now Playing
            </span>
          </div>
          
          <h4 className="font-mono text-[#0d0d0d]/70 text-[10px] font-bold tracking-widest uppercase mb-2">
            Last Song Played 
            {(!spotifyData || spotifyData.mock || !spotifyData.isPlaying) && (
              <span className="text-[8px] bg-[#0d0d0d]/10 px-1 py-0.5 rounded ml-1" title="Real-time Spotify integration needs to be configured with Secrets in AI Studio.">MOCK</span>
            )}
          </h4>
          
          {spotifyLoading ? (
            <div className="h-8 bg-[#0d0d0d]/10 animate-pulse w-3/4 mb-2"></div>
          ) : (
            <div className="flex items-center gap-4">
               {spotifyData?.isPlaying && spotifyData?.albumUrl && (
                 <img src={spotifyData.albumUrl} alt="album art" className="w-12 h-12 border-2 border-[#0d0d0d] shadow-[2px_2px_0_#0d0d0d]" />
               )}
               <div>
                <a href={spotifyData?.trackUrl || "#"} target="_blank" rel="noopener noreferrer">
                  <h3 className="font-elite text-2xl text-[#0d0d0d] leading-tight mb-1 group-hover:translate-x-2 transition-transform line-clamp-1 hover:underline">
                    {spotifyData?.isPlaying ? spotifyData.title : "Starboy"}
                  </h3>
                </a>
                <p className="font-mono text-[12px] text-[#0d0d0d]/80 font-bold">
                  {spotifyData?.isPlaying ? spotifyData.artist : "The Weeknd"}
                </p>
               </div>
            </div>
          )}
        </div>
        
        <div className="mt-6 flex justify-between items-end border-t border-[#0d0d0d]/20 pt-4">
          <span className="font-mono text-[9px] font-bold tracking-widest uppercase text-[#0d0d0d]/80">
            Spotify Activity
          </span>
          <div className="w-8 h-8 rounded-full border-2 border-[#0d0d0d] bg-[#0d0d0d] flex items-center justify-center animate-[spin_4s_linear_infinite] shadow-[2px_2px_0_#faf6ec] group-hover:scale-110 transition-transform">
             <div className="w-2 h-2 rounded-full bg-[#1DB954]"></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
