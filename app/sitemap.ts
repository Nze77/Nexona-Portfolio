import { MetadataRoute } from 'next'
import { SECTIONS } from './data/sections'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nexonalabs.com'

  // Generate project routes
  const projectUrls = SECTIONS.flatMap((section) =>
    section.products.map((product) => ({
      url: `${baseUrl}${product.link}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  )

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...projectUrls,
  ]
}
