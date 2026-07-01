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
    sitemap: 'https://www.nexonalabs.com/sitemap.xml',
  }
}
