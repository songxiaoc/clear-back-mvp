import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {},
  // Add the user's IP to allowed origins to bypass Next.js dev server security
  allowedDevOrigins: ['170.106.98.251', 'localhost:3000', '*'],
};

export default nextConfig;
