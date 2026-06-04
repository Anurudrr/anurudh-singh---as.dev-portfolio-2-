import { useState, useEffect } from "react";

export function navigateTo(path: string) {
  // Push standard URL to the browser
  window.history.pushState(null, "", path);
  // Dispatch custom event to let route listener trigger reactive state render
  const popEvent = new PopStateEvent("popstate");
  window.dispatchEvent(popEvent);
  
  // Also scroll smoothly to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export interface ParsedRoute {
  path: string;
  page: string;
  params: Record<string, string>;
}

export function useAppRouter() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);

    // Intercept client-side regular clicks to anchors
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      
      if (anchor) {
        const href = anchor.getAttribute("href");
        
        // Only intercept absolute-looking relative paths (e.g., "/about", "/projects")
        // Do NOT intercept absolute URLs, mailto, tel, or hash scroll highlights (e.g. "#about")
        if (href && href.startsWith("/") && !href.startsWith("//")) {
          e.preventDefault();
          navigateTo(href);
        }
      }
    };

    document.addEventListener("click", handleGlobalClick);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  // Simple, powerful path-matching rules
  const parseRoute = (): ParsedRoute => {
    const path = currentPath;
    
    // Project detailed page checks: /projects/:slug
    if (path.startsWith("/projects/") && path.length > 10) {
      const slug = path.substring(10);
      return { path, page: "project-detail", params: { slug } };
    }

    // Blog detailed page checks: /blog/:slug
    if (path.startsWith("/blog/") && path.length > 6) {
      const slug = path.substring(6);
      return { path, page: "blog-detail", params: { slug } };
    }

    // Standard static routes
    switch (path) {
      case "/about":
        return { path, page: "about", params: {} };
      case "/projects":
        return { path, page: "projects", params: {} };
      case "/gallery":
        return { path, page: "gallery", params: {} };
      case "/hobbies":
        return { path, page: "hobbies", params: {} };
      case "/blog":
        return { path, page: "blog", params: {} };
      case "/experience":
        return { path, page: "experience", params: {} };
      case "/contact":
        return { path, page: "contact", params: {} };
      case "/resume":
        return { path, page: "resume", params: {} };
      case "/admin":
        return { path, page: "admin", params: {} };
      case "/":
      default:
        return { path, page: "home", params: {} };
    }
  };

  return parseRoute();
}
