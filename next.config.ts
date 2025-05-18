import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.coincap.io',
        pathname: '/assets/icons/**',
      },
    ],
  },
};

export default nextConfig;
