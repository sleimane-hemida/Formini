import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure Turbopack picks the frontend folder as the workspace root
  turbopack: {
    root: ".",
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
