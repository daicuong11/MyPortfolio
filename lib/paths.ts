/**
 * Get the base path for GitHub Pages
 * This must match the basePath in next.config.ts
 * Uses environment variable to avoid hydration mismatch
 */
export function getBasePath(): string {
  // Use the same logic as next.config.ts
  // In production build (GitHub Pages), NEXT_PUBLIC_BASE_PATH will be set
  return process.env.NEXT_PUBLIC_BASE_PATH || "";
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
 * Get file URL for static files (PDFs, images, etc.)
 * Always returns relative path to avoid hydration mismatch
 */
export function getFileUrl(path: string): string {
  // Always return relative path (works for both SSR and client)
  // Browser will resolve relative paths correctly
  const basePath = getBasePath();
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return basePath ? `${basePath}/${cleanPath}` : `/${cleanPath}`;
}
