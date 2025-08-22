import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "raw.githubusercontent.com", // update this to your domain
      pathname: "/**",
    },
  ],
},

};

export default nextConfig;
