import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // basePath: '/e-commerceweb',
 images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.divine.lk',
      },
      {
        protocol: 'https',
        hostname: 'www.cakefactory.lk',
      },
      {
        protocol: 'https',
        hostname: '*.gstatic.com', // This will cover all subdomains of gstatic.com
      },
    ],
  },
};

export default nextConfig;
