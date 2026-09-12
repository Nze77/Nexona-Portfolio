export const DARK = '#2e2a26'
export const SAND = '#E8E2DA'
export const MID_DARK = '#3d3731'

export const HELVETICA = '"Helvetica Neue", Helvetica, Arial, sans-serif'
export const INTER = '"Inter", sans-serif'

/** Canonical production origin — single source of truth for absolute URLs.
 *  Must match the host that actually serves 200 (the apex 307-redirects to www),
 *  otherwise canonical tags point at a redirecting URL and pages fall out of the
 *  index ("canonical URL preventing indexing"). */
export const SITE_URL = 'https://www.nexonalabs.com'

/** Height of the fixed nav bar in px — keep in sync with StickyHeader (6rem) */
export const NAV_H = 96

/* ── NAP (Name / Address / Phone) ──────────────────────────────────────────
 * Single source of truth for the business identity. These strings must match
 * the Google Business Profile listing LETTER FOR LETTER — that textual match
 * is how Google associates this site with the GBP listing. Change them here
 * and in GBP together, never one without the other.                        */

export const BUSINESS_NAME = 'Nexona'

/** Nexona is a SERVICE-AREA BUSINESS: the Google Business Profile deliberately
 *  hides the street address, because customers are not served at it. The site
 *  must not contradict that, so the street line and postcode are kept here for
 *  internal/billing use but are NOT published — see PUBLIC_ADDRESS below.
 *
 *  If the business ever moves to a verified storefront, flip
 *  ADDRESS_IS_PUBLIC to true and unhide the address on GBP at the same time. */
export const ADDRESS_IS_PUBLIC = false

const FULL_ADDRESS = {
    streetAddress: 'Mindspace, Malad West',
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
    postalCode: '400064',
    addressCountry: 'IN',
} as const

/** The address as it may appear publicly (site copy + structured data).
 *  For a service-area business that is city/region level only. */
export const BUSINESS_ADDRESS = ADDRESS_IS_PUBLIC
    ? FULL_ADDRESS
    : {
          addressLocality: FULL_ADDRESS.addressLocality,
          addressRegion: FULL_ADDRESS.addressRegion,
          addressCountry: FULL_ADDRESS.addressCountry,
      }

/** Human-readable location line for visible UI. */
export const BUSINESS_LOCATION_DISPLAY = ADDRESS_IS_PUBLIC
    ? 'Mindspace, Malad West, Mumbai 400064'
    : 'Mumbai, Maharashtra, India'

/** E.164 — the format Google expects in structured data (no spaces/dashes). */
export const BUSINESS_PHONE = '+919082207416'
/** Human-readable form for visible UI. */
export const BUSINESS_PHONE_DISPLAY = '+91 90822 07416'
export const BUSINESS_EMAIL = 'info@nexonalabs.com'

/** Exact coordinates of the Google Business Profile pin. */
export const BUSINESS_GEO = { latitude: 19.180716, longitude: 72.833317 } as const

/** Profiles that prove this entity is the same one Google already knows about.
 *  The Google Business Profile share link is the important one — add it as
 *  soon as you have it (GBP → Share → copy link). */
export const BUSINESS_SAME_AS: string[] = [
    // Google Business Profile (canonical share link).
    'https://maps.app.goo.gl/D7UJVuVm3ckSibtw5',
    // Third-party directory listings. These carry more weight than own-brand
    // socials: they are independent records of the same entity.
    'https://clutch.co/profile/nexona-labs',
    'https://techbehemoths.com/company/nexona-labs',
    'https://themanifest.com/company/nexona-labs',
    'https://www.linkedin.com/company/nexonalabs',
    'https://www.instagram.com/nexonalabs',
]
