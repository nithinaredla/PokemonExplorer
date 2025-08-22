import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["raw.githubusercontent.com"], // allow external Pokémon sprites
  },
};

export default nextConfig;
