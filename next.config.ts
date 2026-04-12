/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  generateBuildId: async () => {
    return 'luxury-lagoon-v1.0.2'
  },
};

export default nextConfig;
