import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      // The automation pillar moved to /ai-automation-agency so the slug carries
      // the exact primary keyword. Permanent (308) so the old URL's equity and
      // any existing index entry transfer instead of splitting into two pages.
      {
        source: '/ai-and-process-automation-agency',
        destination: '/ai-automation-agency',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
