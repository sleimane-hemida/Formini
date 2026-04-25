import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure Turbopack picks the frontend folder as the workspace root
  turbopack: {
    root: ".",
  },
  images: {
    // Autoriser les images du backend local (localhost, 127.0.0.1, ::1)
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '5000',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
