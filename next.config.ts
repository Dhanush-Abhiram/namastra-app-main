import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  // Enable static optimization
  output: "standalone",
  // Enable ISR for dynamic pages
  experimental: {
    // ISR configuration
  },
};

export default nextConfig;
