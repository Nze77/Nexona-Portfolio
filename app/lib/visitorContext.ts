'use client'

/**
 * Visitor attribution + journey tracking — deliberately storage-free.
 *
 * The whole record lives in the module-level `session` variable below, which
 * lasts exactly as long as the document: it survives client-side route changes
 * (the module is evaluated once per page load and kept by the browser's module
 * registry), and is gone on a hard reload, a new tab, or a closed browser.
 *
 * Nothing is ever written to the visitor's device. That is the point: the rule
 * behind cookie banners (ePrivacy Art. 5(3) / UK PECR) covers "storing
 * information in the terminal equipment of the user" and is technology-neutral
 * — localStorage and sessionStorage count the same as cookies. Keeping the
 * journey in memory never triggers it, so this needs no consent banner.
 *
 * The accepted trade-offs: no returning-visitor counter (that needs persistent
 * storage), and the journey restarts if the visitor hard-reloads.
 *
 * `recordPageView` is called once per route change by <VisitorTracker />, and
 * `getVisitorContext()` snapshots everything into the `meta` object that the
 * contact forms POST to /api/contact, which prints it into the SMTP email.
 * Nothing leaves the browser until the visitor actually submits a form.
 */

const UTM_KEYS = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'gclid',
    'fbclid',
    'msclkid',
] as const

const MAX_JOURNEY_STEPS = 30

export interface JourneyStep {
    path: string
    title?: string
    /** epoch ms the step was entered */
    at: number
}

interface VisitorSession {
    startedAt: number
    landingPage: string
    landingTitle?: string
    referrer: string
    utm: Record<string, string>
    journey: JourneyStep[]
}

export interface VisitorMeta {
    page: { path: string; url: string; title: string }
    /** Which form was used, e.g. 'contact-overlay' or 'contact-section' */
    formLocation?: string
    /** What opened it: 'timer' | 'scroll' | 'manual' | undefined for inline forms */
    trigger?: string
    landingPage: string
    referrer: string
    referrerDomain: string
    utm: Record<string, string>
    journey: Array<{ path: string; title?: string; secondsOnPage: number }>
    session: {
        startedAt: string
        durationSeconds: number
        pageCount: number
    }
    device: {
        type: 'mobile' | 'tablet' | 'desktop'
        viewport: string
        screen: string
        language: string
        timezone: string
        userAgent: string
    }
}

/**
 * The entire tracking state. Module scope, never persisted — see the file
 * comment above before moving any of this into web storage.
 */
let session: VisitorSession | null = null

const isBrowser = () => typeof window !== 'undefined'

const collectUtm = (): Record<string, string> => {
    const params = new URLSearchParams(window.location.search)
    const utm: Record<string, string> = {}
    for (const key of UTM_KEYS) {
        const value = params.get(key)
        if (value) utm[key] = value.slice(0, 120)
    }
    return utm
}

const deviceType = (): 'mobile' | 'tablet' | 'desktop' => {
    const w = window.innerWidth
    if (w <= 768) return 'mobile'
    if (w <= 1024) return 'tablet'
    return 'desktop'
}

const domainOf = (url: string) => {
    if (!url) return ''
    try {
        return new URL(url).hostname.replace(/^www\./, '')
    } catch {
        return ''
    }
}

/**
 * Records the current page in the journey. Safe to call repeatedly —
 * consecutive views of the same path are collapsed.
 */
export function recordPageView(path: string, title?: string) {
    if (!isBrowser()) return

    const now = Date.now()

    if (!session) {
        session = {
            startedAt: now,
            landingPage: path,
            landingTitle: title,
            referrer: document.referrer || '',
            utm: collectUtm(),
            journey: [{ path, title, at: now }],
        }
        return
    }

    const last = session.journey[session.journey.length - 1]
    if (last && last.path === path) return

    // A UTM-tagged link opened mid-visit still tells us where the click came
    // from, so fill in anything the landing URL did not carry.
    session.utm = { ...collectUtm(), ...session.utm }
    session.journey = [...session.journey, { path, title, at: now }].slice(-MAX_JOURNEY_STEPS)
}

/**
 * Snapshot of where this visitor came from and what they've looked at, ready to
 * be sent alongside a contact submission.
 */
export function getVisitorContext(
    extra: { formLocation?: string; trigger?: string } = {},
): VisitorMeta | undefined {
    if (!isBrowser()) return undefined

    const path = window.location.pathname
    const now = Date.now()

    // A form reached before the tracker ran still deserves a record.
    if (!session) recordPageView(path, document.title)
    const current = session
    if (!current) return undefined

    const journey = current.journey.map((step, i) => {
        const nextAt = current.journey[i + 1]?.at ?? now
        return {
            path: step.path,
            title: step.title,
            secondsOnPage: Math.max(0, Math.round((nextAt - step.at) / 1000)),
        }
    })

    return {
        page: { path, url: window.location.href, title: document.title },
        formLocation: extra.formLocation,
        trigger: extra.trigger,
        landingPage: current.landingPage,
        referrer: current.referrer,
        referrerDomain: domainOf(current.referrer),
        utm: current.utm,
        journey,
        session: {
            startedAt: new Date(current.startedAt).toISOString(),
            durationSeconds: Math.round((now - current.startedAt) / 1000),
            pageCount: current.journey.length,
        },
        device: {
            type: deviceType(),
            viewport: `${window.innerWidth}x${window.innerHeight}`,
            screen: `${window.screen.width}x${window.screen.height}`,
            language: navigator.language,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            userAgent: navigator.userAgent,
        },
    }
}
