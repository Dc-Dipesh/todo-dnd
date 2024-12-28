import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
        pathname: "*/**",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
