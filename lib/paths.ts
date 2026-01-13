/**
 * Get the base path from the current pathname
 * This handles both local development (no basePath) and GitHub Pages (with basePath)
 */
export function getBasePath(pathname: string): string {
  // Check if pathname starts with /MyPortfolio (GitHub Pages basePath)
  if (pathname.startsWith("/MyPortfolio")) {
    return "/MyPortfolio";
  }
  return "";
}

/**
 * Get a path with the correct basePath prefix
 * @param path - The path to prefix (e.g., "/cv/file.pdf")
 * @param pathname - Current pathname from usePathname()
 * @returns Path with basePath if needed
 */
export function getPathWithBasePath(path: string, pathname: string): string {
  const basePath = getBasePath(pathname);
  // Remove leading slash from path if basePath exists to avoid double slashes
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return basePath ? `${basePath}/${cleanPath}` : `/${cleanPath}`;
}
