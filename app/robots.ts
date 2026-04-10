import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'Googlebot', 'Bingbot'],
        allow: '/',
      },
    ],
    sitemap: 'https://nexonalabs.com/sitemap.xml',
  }
}
