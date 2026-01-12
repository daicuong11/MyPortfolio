import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export", // Enable static export for GitHub Pages
  images: {
    unoptimized: true, // Required for static export
  },
  // Uncomment and set basePath if your repo is NOT username.github.io
  // basePath: "/MyPortfolio", // Replace with your repo name
  // trailingSlash: true,
};

export default nextConfig;
