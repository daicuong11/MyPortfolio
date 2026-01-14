import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export", // Enable static export for GitHub Pages
  images: {
    unoptimized: true, // Required for static export
  },
  // basePath removed - using custom domain (no subdirectory needed)
  trailingSlash: true,
};

export default nextConfig;
