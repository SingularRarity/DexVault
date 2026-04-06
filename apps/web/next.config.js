/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@dexvault/ui"],
  images: {
    domains: ["storage.singularraritylabs.com"],
  },
  output: 'standalone',
};

module.exports = nextConfig;
