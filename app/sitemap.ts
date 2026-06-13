import { MetadataRoute } from 'next'
import { SECTIONS } from './data/sections'
import { LANDING_PAGES } from './data/landingPages'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nexonalabs.com'
  const lastModified = new Date()

  // Project detail pages, derived from the sections data
  const projectUrls = SECTIONS.flatMap((section) =>
    section.products.map((product) => ({
      url: `${baseUrl}${product.link}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  )

  // SEO landing pages under the app/(landing) route group
  const landingUrls = LANDING_PAGES.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: page.priority ?? 0.9,
  }))

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...landingUrls,
    ...projectUrls,
  ]
}
