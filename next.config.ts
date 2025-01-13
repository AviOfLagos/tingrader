import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  output: 'standalone',
  // Removed experimental.appDir as it's enabled by default in Next.js 13+
};

export default nextConfig;
