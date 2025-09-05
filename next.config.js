/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["i.dummyjson.com"],
  },
};

module.exports = nextConfig;
