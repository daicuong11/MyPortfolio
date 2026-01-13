import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export", // Enable static export for GitHub Pages
  images: {
    unoptimized: true, // Required for static export
  },
  // Only use basePath when building for GitHub Pages
  // For local development, basePath will be empty
  basePath: process.env.GITHUB_PAGES === "true" ? "/MyPortfolio" : "",
  trailingSlash: true,
};

export default nextConfig;
