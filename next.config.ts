import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["raw.githubusercontent.com"], // allow external Pokémon sprites
  },
};

export default nextConfig;
