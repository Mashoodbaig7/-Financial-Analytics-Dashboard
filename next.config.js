/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  // For Netlify deployment
  trailingSlash: true,
  output: 'export',
}

module.exports = nextConfig
