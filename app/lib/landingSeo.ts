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
        },
        twitter: {
            card: 'summary_large_image',
            title: ogTitle,
            description: ogDescription,
        },
    }
}
