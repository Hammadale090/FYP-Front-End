/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'res.cloudinary.com',
      'oaidalleapiprodscus.blob.core.windows.net',
      'photos.zillowstatic.com',
      'maps.googleapis.com',
    ], // Add any other image domains as needed
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  },
};

export default nextConfig;
