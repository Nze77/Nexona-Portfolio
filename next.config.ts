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
      // Cost guides moved under /blogs, and the DMS cost guide was merged into
      // the ready-made vs custom DMS post (2026-11-01). Permanent, so anything
      // already crawled or submitted passes its signals to the live URL.
      {
        source: '/business-app-development-cost-in-india',
        destination: '/blogs/business-app-development-cost-in-india',
        permanent: true,
      },
      {
        source: '/distributor-management-system-cost-in-india',
        destination: '/blogs/ready-made-vs-custom-distributor-management-system',
        permanent: true,
      },
      {
        source: '/blogs/distributor-management-system-cost-in-india',
        destination: '/blogs/ready-made-vs-custom-distributor-management-system',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
