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
  env: {
    NEXT_PUBLIC_COINCAP_REST_ROUTE: process.env.NEXT_PUBLIC_COINCAP_REST_ROUTE,
    NEXT_PUBLIC_COINCAP_KEY: process.env.NEXT_PUBLIC_COINCAP_KEY,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  }
};

export default nextConfig;
