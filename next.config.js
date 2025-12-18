/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "api.dicebear.com",
      "images.unsplash.com",
      "source.unsplash.com",
      "picsum.photos",
      "i.pravatar.cc"
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60
  }
};

module.exports = nextConfig;
