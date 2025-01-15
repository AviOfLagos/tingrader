// next.config.js
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  output: 'standalone',
  experimental: {
    serverActions: true,
  },
  // Removed experimental.appDir as it's enabled by default in Next.js 13+
};

module.exports = nextConfig;
