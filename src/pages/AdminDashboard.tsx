import React, { useState, useEffect } from "react";
import { useDB } from "../useDB";
import { motion } from "motion/react";

// Import modular panels
import ProjectEditor from "../components/admin/ProjectEditor";
import BlogEditor from "../components/admin/BlogEditor";
import GalleryEditor from "../components/admin/GalleryEditor";
import MessagesPanel from "../components/admin/MessagesPanel";
import SiteSettingsPanel from "../components/admin/SiteSettingsPanel";

export default function AdminDashboard() {
  const {
    refresh,
    projects,
    blog,
    gallery,
    messages,
    siteSettings
  } = useDB();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  // Core tab state
  const [activeTab, setActiveTab] = useState<"projects" | "blog" | "gallery" | "messages" | "settings" | "hobbies">("projects");

  // Editorial modal states
  const [projectForm, setProjectForm] = useState<any | null>(null); // For edit/create project
  const [blogForm, setBlogForm] = useState<any | null>(null);       // For edit/create blog post
  const [galleryForm, setGalleryForm] = useState<any | null>(null); // For create gallery item
  const [settingsForm, setSettingsForm] = useState<any | null>(null); // Site settings edit state

  // Check existing token (from sessionStorage instead of localStorage)
  useEffect(() => {
    const token = sessionStorage.getItem("as_dev_admin_session");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Handle Login submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) throw new Error("Incorrect system keycode.");
      const data = await res.json();
      if (data.success) {
        sessionStorage.setItem("as_dev_admin_session", data.token);
        setIsAuthenticated(true);
      } else {
        throw new Error(data.error || "System authorization rejected.");
      }
    } catch (err: any) {
      setLoginError(err.message || "Credential verification failed.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("as_dev_admin_session");
    setIsAuthenticated(false);
  };

  // CRUD API Dispatches (with JWT Session token in Bearer authorization)
  const dispatchProjectSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("as_dev_admin_session");
      const isEdit = !!projectForm.id;
      const url = isEdit ? `/api/admin/projects/${projectForm.id}` : "/api/admin/projects";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          title: projectForm.title,
          slug: projectForm.slug,
          year: projectForm.year,
          category: projectForm.category,
          image: projectForm.image,
          description: projectForm.description,
          tags: typeof projectForm.tags === "string" ? projectForm.tags.split(",").map((s: string) => s.trim()) : projectForm.tags,
          problem: projectForm.problem,
          solution: projectForm.solution,
          challenges: projectForm.challenges,
          learnings: projectForm.learnings,
          githubUrl: projectForm.githubUrl,
          demoUrl: projectForm.demoUrl
        }),
      });

      if (!res.ok) throw new Error("Project write operation rejected.");
      setProjectForm(null);
      refresh();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const dispatchProjectDelete = async (id: string) => {
    if (!confirm("Confirm removal of this project node?")) return;
    try {
      const token = sessionStorage.getItem("as_dev_admin_session");
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error("Project delete operation failed.");
      refresh();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const dispatchBlogSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("as_dev_admin_session");
      const isEdit = !!blogForm.id;
      const url = isEdit ? `/api/admin/blog/${blogForm.id}` : "/api/admin/blog";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          title: blogForm.title,
          slug: blogForm.slug,
          category: blogForm.category,
          tags: typeof blogForm.tags === "string" ? blogForm.tags.split(",").map((s: string) => s.trim()) : blogForm.tags,
          summary: blogForm.summary,
          content: blogForm.content,
          author: "Anurudh Singh"
        }),
      });

      if (!res.ok) throw new Error("Blog write operation rejected.");
      setBlogForm(null);
      refresh();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const dispatchBlogDelete = async (id: string) => {
    if (!confirm("Confirm permanent deletion of this blog record?")) return;
    try {
      const token = sessionStorage.getItem("as_dev_admin_session");
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error("Blog deletion failed.");
      refresh();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const dispatchGallerySave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("as_dev_admin_session");
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(galleryForm),
      });
      if (!res.ok) throw new Error("Could not construct gallery image node.");
      setGalleryForm(null);
      refresh();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const dispatchGalleryDelete = async (id: string) => {
    if (!confirm("Confirm removal of this image asset from active gallery?")) return;
    try {
      const token = sessionStorage.getItem("as_dev_admin_session");
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error("Gallery asset clear failed.");
      refresh();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const dispatchMessageDelete = async (id: string) => {
    if (!confirm("Delete this communication message record?")) return;
    try {
      const token = sessionStorage.getItem("as_dev_admin_session");
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error("Message index drop failed.");
      refresh();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const dispatchSettingsSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("as_dev_admin_session");
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(settingsForm),
      });
      if (!res.ok) throw new Error("Settings write failed.");
      alert("✓ Site Preferences synced successfully!");
      setSettingsForm(null);
      refresh();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // 1. LOGIN PREVIEW
  if (!isAuthenticated) {
    return (
      <section className="min-h-screen bg-[#111] text-white flex items-center justify-center px-4 relative">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none select-none" />
        
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full border-[3px] border-[#FFE03A] bg-[#000] p-8 shadow-[8px_8px_0_#E8281A] relative"
        >
          <div className="absolute top-[-12px] left-6 border border-black bg-[#E8281A] text-white font-mono text-[8px] uppercase tracking-widest px-2.5 py-0.5 font-extrabold">
            ADMINISTRATIVE PROBE
          </div>

          <h1 className="font-bangers text-4xl text-center text-[#FFE03A] tracking-widest leading-none mb-2 select-none">
            AS.DEV CORE DOCK
          </h1>
          <p className="font-mono text-[9px] text-center text-white/40 uppercase tracking-widest mb-8 select-none">
            Enter administrator authorization passcode key sequence
          </p>

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label className="font-mono text-[9.5px] tracking-widest text-[#FFE03A] uppercase font-bold block mb-2 select-none">
                System Passcode Key
              </label>
              <input
                type="password"
                required
                placeholder="•••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-white/20 bg-neutral-900 text-[#FFE03A] font-mono text-sm placeholder-white/10 tracking-widest outline-none focus:border-[#FFE03A] transition-all"
              />
              <span className="font-mono text-[8px] text-white/30 block mt-2 select-none">
                PRO TIP: Real credentials stored safely in your systems context.
              </span>
            </div>

            {loginError && (
              <div className="p-3 border-2 border-red-600 bg-red-950/40 text-red-500 font-mono text-[10px] leading-relaxed uppercase select-none">
                ⚠️ ACCESS DENIED: {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full font-mono text-xs font-bold uppercase tracking-widest py-3.5 border-2 border-black bg-[#FFE03A] text-black hover:bg-white hover:text-black shadow-[3px_3px_0_#FFF] transition-colors cursor-pointer"
            >
              INITIALIZE GATEWAYS &ge;
            </button>
          </form>
        </motion.div>
      </section>
    );
  }

  // 2. MAIN ADMIN SHELL SYSTEM
  return (
    <section className="bg-[#FAF6EC] min-h-screen text-black py-16 px-6 sm:px-12 relative z-10" style={{ cursor: "none" }}>
      <div className="max-w-7xl mx-auto">
        
        {/* TOP STATUS CONTROL HUB */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-6 border-b-2 border-dashed border-black/20 pb-6 mb-8 select-none">
          <div>
            <span className="font-mono text-xs text-[#E8281A] tracking-[0.3em] uppercase block font-black">
              // backoffice database station
            </span>
            <h1 className="font-bangers text-4xl sm:text-5xl text-black tracking-wider leading-none mt-2">
              ADMINISTRATIVE DOCK<span className="text-[#1A5CE8]">.</span>
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="font-mono text-xs font-extrabold text-[#E8281A] border-2 border-black bg-stone-200 px-4 py-2 shadow-[2px_2px_0_#000] hover:bg-black hover:text-white transition-all cursor-pointer"
          >
            DISCONNECT LOCKOUT [X]
          </button>
        </div>

        {/* METABOLIC NAVIGATION TAB TRACKS */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-10 select-none">
          {(["projects", "blog", "gallery", "messages", "settings"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-mono text-xs font-bold tracking-widest uppercase py-3 px-4 border-2 border-black text-center shadow-[2px_2px_0_#000] cursor-pointer transition-all ${
                activeTab === tab
                  ? "bg-[#FFE03A] -translate-x-0.5 -translate-y-0.5 shadow-[4px_4px_0_#000]"
                  : "bg-white hover:bg-neutral-100"
              }`}
            >
              {tab === "messages" && messages.length > 0 ? `✉️ Messages (${messages.length})` : tab}
            </button>
          ))}
        </div>

        {/* TAB WORKSPACES */}
        <div className="bg-white border-[3px] border-black p-6 sm:p-8 shadow-[6px_6px_0_#0d0d0d] relative min-h-[400px]">
          
          {/* TAB 1: PROJECTS MODULES */}
          {activeTab === "projects" && (
            <ProjectEditor
              projects={projects}
              projectForm={projectForm}
              setProjectForm={setProjectForm}
              dispatchProjectSave={dispatchProjectSave}
              dispatchProjectDelete={dispatchProjectDelete}
            />
          )}

          {/* TAB 2: BLOG POSTS MANAGMENT */}
          {activeTab === "blog" && (
            <BlogEditor
              blog={blog}
              blogForm={blogForm}
              setBlogForm={setBlogForm}
              dispatchBlogSave={dispatchBlogSave}
              dispatchBlogDelete={dispatchBlogDelete}
            />
          )}

          {/* TAB 3: VISUAL GALLERY MODULES */}
          {activeTab === "gallery" && (
            <GalleryEditor
              gallery={gallery}
              galleryForm={galleryForm}
              setGalleryForm={setGalleryForm}
              dispatchGallerySave={dispatchGallerySave}
              dispatchGalleryDelete={dispatchGalleryDelete}
            />
          )}

          {/* TAB 4: VISITOR MESSAGES SYSTEM REPLICATOR */}
          {activeTab === "messages" && (
            <MessagesPanel
              messages={messages}
              dispatchMessageDelete={dispatchMessageDelete}
            />
          )}

          {/* TAB 5: SITE SYSTEM PREFERENCES */}
          {activeTab === "settings" && (
            <SiteSettingsPanel
              siteSettings={siteSettings}
              settingsForm={settingsForm}
              setSettingsForm={setSettingsForm}
              dispatchSettingsSave={dispatchSettingsSave}
            />
          )}
        </div>
      </div>
    </section>
  );
}
