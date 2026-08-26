import { MetadataRoute } from 'next'
import { SITE_URL } from './lib/constants'

/**
 * robots.txt — PRESCRIPTIVE (what may be crawled), the counterpart to
 * /llms.txt which is DESCRIPTIVE (what matters).
 *
 * The AI crawlers are named explicitly rather than left to the `*` rule. A
 * wildcard allow already permits them, but several of these agents are
 * commonly blocked by default templates, and an explicit `Allow` makes the
 * intent unambiguous to both the crawler and anyone auditing the file. This
 * is the answer-engine (AEO) / generative-engine (GEO) side of the setup:
 * these are the bots that build the indexes ChatGPT, Claude, Perplexity and
 * Google's AI surfaces answer from.
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
            },
            {
                userAgent: [
                    // Search
                    'Googlebot',
                    'Google-Extended',
                    'Bingbot',
                    'DuckDuckBot',
                    // OpenAI
                    'GPTBot',
                    'ChatGPT-User',
                    'OAI-SearchBot',
                    // Anthropic
                    'ClaudeBot',
                    'Claude-User',
                    'Claude-SearchBot',
                    'anthropic-ai',
                    // Perplexity
                    'PerplexityBot',
                    'Perplexity-User',
                    // Others
                    'Applebot',
                    'Applebot-Extended',
                    'Amazonbot',
                    'Bytespider',
                    'CCBot',
                    'cohere-ai',
                    'Meta-ExternalAgent',
                    'MistralAI-User',
                    'YouBot',
                ],
                allow: '/',
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    }
}
