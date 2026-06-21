import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Bunny Stream thumbnails / CDN
      { protocol: "https", hostname: "**.b-cdn.net" },
      // Mux thumbnails (si migras a Mux)
      { protocol: "https", hostname: "image.mux.com" },
      // Supabase storage
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
  experimental: {
    // Server Actions body limit subido para uploads de metadata
    serverActions: { bodySizeLimit: "2mb" },
  },
};

export default nextConfig;
