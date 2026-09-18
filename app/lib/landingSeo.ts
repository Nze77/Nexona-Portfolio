import type { Metadata } from 'next'
import { LANDING_PAGES } from '../data/landingPages'
import { SITE_URL } from './constants'

/**
 * Builds the Metadata object for a landing page from the central registry.
 *
 * The critical part is `alternates.canonical`: it is set to the page's OWN
 * path (`/<slug>`), which Next.js resolves against `metadataBase` into an
 * absolute, self-referencing canonical URL. This is what tells Google to
 * index each landing page independently instead of folding it into the
 * homepage. Setting a canonical in the ROOT layout instead would inherit
 * down to every child route — so it is deliberately kept per-page here.
 */
export function buildLandingMetadata(slug: string): Metadata {
    const page = LANDING_PAGES.find((p) => p.slug === slug)
    if (!page) {
        throw new Error(
            `buildLandingMetadata: no LANDING_PAGES entry for slug "${slug}". ` +
                `Add it to app/data/landingPages.ts.`,
        )
    }

    const url = `${SITE_URL}/${slug}`
    const ogTitle = page.og?.title ?? page.title
    const ogDescription = page.og?.description ?? page.description
    // A dedicated card is assumed to be the 1200x630 the platforms want. The
    // fallback is the square logo, so its real dimensions are declared instead
    // — claiming 1200x630 for a 1080x1080 file makes Twitter/LinkedIn crop it
    // badly rather than fall back to the small-card layout they handle well.
    const ogImage = page.og?.image
        ? { url: `${SITE_URL}${page.og.image}`, width: 1200, height: 630, alt: ogTitle }
        : { url: `${SITE_URL}/logo.png`, width: 1080, height: 1080, alt: ogTitle }

    return {
        title: page.title,
        description: page.description,
        keywords: page.keywords,
        alternates: {
            canonical: `/${slug}`,
        },
        openGraph: {
            title: ogTitle,
            description: ogDescription,
            url,
            siteName: 'Nexona',
            type: 'website',
            locale: 'en_US',
            // Next.js merges metadata SHALLOWLY: an `openGraph` object declared
            // here replaces the root layout's wholesale, so the site-wide image
            // is dropped unless it is repeated. Without this every landing page
            // shares — and gets previewed by AI search — as a blank card.
            images: [ogImage],
        },
        twitter: {
            card: 'summary_large_image',
            title: ogTitle,
            description: ogDescription,
            // Same shallow-merge rule; `summary_large_image` with no image is
            // downgraded to a plain text card.
            images: [ogImage.url],
        },
    }
}
