import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure Turbopack picks the frontend folder as the workspace root
  turbopack: {
    root: ".",
  },
};

export default nextConfig;
