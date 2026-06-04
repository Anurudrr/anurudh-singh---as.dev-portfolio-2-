import { useState, useEffect } from "react";
import { ProjectItem, GalleryItem, HobbyItem } from "./types";

export interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  readingTime: string;
  summary: string;
  content: string;
}

export interface SiteMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  text: string;
  date: string;
}

export interface SitePreferences {
  socialLinks: Record<string, string>;
  seo: Record<string, string>;
  welcomeMessage: string;
}

export interface DBState {
  projects: any[];
  gallery: any[];
  blog: any[];
  hobbies: any[];
  messages: any[];
  siteSettings: SitePreferences;
}

let cachedDB: DBState | null = null;
let listeners: Array<(db: DBState) => void> = [];

export function useDB() {
  const [db, setDb] = useState<DBState | null>(cachedDB);
  const [loading, setLoading] = useState(!cachedDB);
  const [error, setError] = useState<string | null>(null);

  const fetchDB = async (force = false) => {
    if (cachedDB && !force) {
      setDb(cachedDB);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/db");
      if (!res.ok) throw new Error("Could not retrieve full stack datasets.");
      const data = await res.json();
      cachedDB = data;
      setDb(data);
      listeners.forEach((l) => l(data));
      setError(null);
    } catch (e: any) {
      setError(e.message || "Failed to contact proxy.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleUpdate = (updated: DBState) => {
      setDb(updated);
    };
    listeners.push(handleUpdate);

    if (!cachedDB) {
      fetchDB();
    }

    return () => {
      listeners = listeners.filter((l) => l !== handleUpdate);
    };
  }, []);

  const refresh = () => fetchDB(true);

  return {
    db,
    loading,
    error,
    refresh,
    projects: (db?.projects || []).map((p: any) => ({
      ...p,
      tags: p.tags || p.technologies || []
    })),
    gallery: db?.gallery || [],
    blog: (db?.blog || []).map((b: any) => ({
      ...b,
      tags: b.tags || []
    })),
    hobbies: db?.hobbies || [],
    messages: db?.messages || [],
    siteSettings: db?.siteSettings || { socialLinks: {}, seo: {}, welcomeMessage: "" }
  };
}
