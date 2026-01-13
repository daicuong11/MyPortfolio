/**
 * Get the base path for GitHub Pages
 * This handles both local development (no basePath) and GitHub Pages (with basePath)
 */
export function getBasePath(): string {
  // Check if we're running on GitHub Pages (production)
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;
    
    // If hostname is github.io, we're on GitHub Pages and need basePath
    if (hostname.includes("github.io")) {
      return "/MyPortfolio";
    }
    
    // Fallback: check if pathname already includes MyPortfolio
    if (pathname.startsWith("/MyPortfolio")) {
      return "/MyPortfolio";
    }
  }
  // Local development - no basePath
  return "";
}

/**
 * Get a path with the correct basePath prefix
 * @param path - The path to prefix (e.g., "cv/file.pdf" or "/cv/file.pdf")
 * @returns Path with basePath if needed
 */
export function getPathWithBasePath(path: string): string {
  const basePath = getBasePath();
  // Remove leading slash from path to avoid double slashes
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return basePath ? `${basePath}/${cleanPath}` : `/${cleanPath}`;
}

/**
 * Get full URL for file access (for use in href)
 * This ensures the correct path for static files like PDFs
 */
export function getFileUrl(path: string): string {
  if (typeof window === "undefined") {
    // Server-side: just return the path with basePath
    return getPathWithBasePath(path);
  }
  
  // Client-side: construct full URL
  const basePath = getBasePath();
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  const fullPath = basePath ? `${basePath}/${cleanPath}` : `/${cleanPath}`;
  
  // Return full URL with origin
  return `${window.location.origin}${fullPath}`;
}
