/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove 'output: export' for development
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Configure for Replit environment
  experimental: {
    allowedHosts: true,
  },
  // Allow all hosts for development
  async rewrites() {
    return []
  },
}

module.exports = nextConfig
