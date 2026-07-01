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