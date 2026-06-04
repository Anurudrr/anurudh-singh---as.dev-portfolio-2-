import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse json
  app.use(express.json());

  // Server-side Gemini AI client initialization with standard header for telemetry
  let ai: GoogleGenAI | null = null;
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }

  // API route for Chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;

      // 1. Sanitization & Length Restrictions
      if (!message || typeof message !== "string") {
         res.status(400).json({ error: "Invalid message payload" });
         return;
      }
      
      const safeMessage = message.trim().slice(0, 500); // Prevent overflow bombing

      // 2. History Poisoning Prevention
      const safeHistory = Array.isArray(history) 
        ? history
            .slice(-10) // Limit to last 10 interactions to prevent context window overflow
            .filter(h => h && typeof h.text === "string" && ["user", "model"].includes(h.role))
            .map(h => ({
              role: h.role,
              parts: [{ text: h.text.slice(0, 500) }]
            }))
        : [];

      if (!ai) {
        // Fallback or placeholder response when API key is missing
        res.json({
          text: "I am Anurudh's AI assistant. (Demo Mode: GEMINI_API_KEY is not configured yet. You can attach it in Settings > Secrets!) Here is some info: Anurudh is a 3rd-year B.Tech CSE student at Parul University specializing in React, Java, and UI/UX design. You can email him at sanurudh938@gmail.com!"
        });
        return;
      }

      const systemInstruction = 
        "You are AS.AI, the highly intelligent and charismatic personal AI assistant of Anurudh Singh (AS.DEV).\n" +
        "Answer questions about Anurudh in a helpful, concise, confident, and professional neo-brutalist tech persona.\n" +
        "Here are the absolute facts to use when answering questions:\n\n" +
        "- Name: Anurudh Singh\n" +
        "- Brand/Handle: AS.DEV\n" +
        "- Present Role: 3rd Year B.Tech Computer Science & Engineering student at Parul Institute of Technology, Vadodara, Gujarat, India (2023-2027).\n" +
        "- Background: Started with zero coding background in 2023. Dedicated 2024 to visual UI/UX design (Figma, Canva, Adobe XD), crossing over into frontend & React in 2025. In 2026, he operates at the high-impact intersection of full-stack systems and high-fidelity design.\n" +
        "- Key Projects:\n" +
        "  1. Evento (2025-2026): A sophisticated web platform for full-stack event and booking management. Features a highly refined React frontend, custom UI/UX animations, and robust API integrations.\n" +
        "  2. Hopin (2025): A tour and travel scheduling application written in Core Java utilizing clean OOP principles.\n" +
        "- Skills Arsenal:\n" +
        "  * Frontend: React.js, JavaScript, HTML, CSS, Tailwind CSS, Framer/Motion\n" +
        "  * Core Programming: Java, OOP, Data Structures & Algorithms (DSA), Problem Solving\n" +
        "  * Design & UI: Figma, Canva, Adobe XD, Responsive Layout Design, Interactive Prototyping\n" +
        "  * Tools: Git, GitHub, VS Code\n" +
        "- Contacts and Profiles:\n" +
        "  * Email: sanurudh938@gmail.com\n" +
        "  * Phone: +91 73893 82433\n" +
        "  * GitHub: https://github.com/Anurudrr\n" +
        "  * LeetCode: https://leetcode.com/u/ANURUDH_SINGH_RAJAWAT/\n" +
        "  * Location: Vadodara, Gujarat, India. Open to internships, remote contracts, frontend roles, and full-stack partnerships.\n\n" +
        "Rule: Keep answers short, fun, and extremely clear. Maintain a polite and professional tone.";

      // Query Gemini
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [
          ...safeHistory,
          { role: "user", parts: [{ text: safeMessage }] }
        ],
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (err: any) {
      console.error("Gemini server error:", err);
      res.status(500).json({ error: "Something went wrong during generation." });
    }
  });

  // API route for Spotify Currently Playing
  app.get("/api/spotify/currently-playing", async (req, res) => {
    try {
      const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;
      
      if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
        res.status(503).json({ error: "Spotify credentials are not configured.", mock: true });
        return;
      }

      const encodedCredentials = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64");
      
      const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${encodedCredentials}`
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: SPOTIFY_REFRESH_TOKEN,
        }).toString(),
      });

      if (!tokenResponse.ok) {
        throw new Error("Failed to refresh Spotify token: " + tokenResponse.statusText);
      }
      
      const tokenData = (await tokenResponse.json()) as any;
      const accessToken = tokenData.access_token;
      
      const playerResponse = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (playerResponse.status === 204 || playerResponse.status > 400) {
        res.json({ isPlaying: false, mock: false });
        return;
      }
      
      const playerData = (await playerResponse.json()) as any;
      
      if (!playerData.item) {
          res.json({ isPlaying: false, mock: false });
          return;
      }

      res.json({
        isPlaying: playerData.is_playing,
        title: playerData.item.name,
        artist: playerData.item.artists.map((a: any) => a.name).join(", "),
        albumUrl: playerData.item.album?.images?.[0]?.url,
        trackUrl: playerData.item.external_urls?.spotify,
        mock: false
      });
      
    } catch (err: any) {
      console.error("Spotify API error:", err);
      res.status(500).json({ error: "Failed to fetch Spotify data.", mock: true });
    }
  });

  // Vite Integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
