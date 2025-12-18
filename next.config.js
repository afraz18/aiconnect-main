/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'api.dicebear.com',
      'images.unsplash.com', // Common image hosting
      'source.unsplash.com', // Common image hosting
      'picsum.photos',      // For placeholder images
      'i.pravatar.cc',      // For avatar placeholders
      'localhost',          // For local development
      '127.0.0.1',         // For local development
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60, // 1 minute cache for external images
  },
  // Add other Next.js config options here if needed
};

module.exports = nextConfig;
