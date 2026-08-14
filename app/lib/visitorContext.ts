'use client'

/**
 * Visitor attribution + journey tracking.
 *
 * A tiny, cookie-less, first-party tracker: it keeps one record per browser
 * session in sessionStorage (where the visitor landed, what referred them, the
 * UTM tags on that first URL, and every page they've opened since) plus a
 * visit counter in localStorage so returning visitors are recognisable.
 *
 * `recordPageView` is called once per route change by <VisitorTracker />, and
 * `getVisitorContext()` snapshots everything into the `meta` object that the
 * contact forms POST to /api/contact, which prints it into the SMTP email.
 *
 * Nothing here is personally identifying beyond what the browser sends on any
 * request anyway, and it never leaves the site until a form is submitted.
 */

const SESSION_KEY = 'nx_visit_session'
const VISITS_KEY = 'nx_visit_count'
const FIRST_SEEN_KEY = 'nx_first_seen'

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
    /** Which form was used, e.g. 'contact-overlay' or 'home-contact-section' */
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
        visitNumber: number
        firstSeen?: string
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

const isBrowser = () => typeof window !== 'undefined'

const readSession = (): VisitorSession | null => {
    try {
        const raw = sessionStorage.getItem(SESSION_KEY)
        return raw ? (JSON.parse(raw) as VisitorSession) : null
    } catch {
        return null
    }
}

const writeSession = (session: VisitorSession) => {
    try {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
    } catch {
        /* private mode / storage full — tracking is best-effort */
    }
}

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

/** Bump the cross-session visit counter once per browser session. */
const trackVisitCount = () => {
    try {
        if (!localStorage.getItem(FIRST_SEEN_KEY)) {
            localStorage.setItem(FIRST_SEEN_KEY, new Date().toISOString())
        }
        const next = Number(localStorage.getItem(VISITS_KEY) ?? '0') + 1
        localStorage.setItem(VISITS_KEY, String(next))
    } catch {
        /* best-effort */
    }
}

/**
 * Records the current page in the session journey. Safe to call repeatedly —
 * consecutive views of the same path are collapsed.
 */
export function recordPageView(path: string, title?: string) {
    if (!isBrowser()) return

    const now = Date.now()
    const existing = readSession()

    if (!existing) {
        trackVisitCount()
        writeSession({
            startedAt: now,
            landingPage: path,
            landingTitle: title,
            referrer: document.referrer || '',
            utm: collectUtm(),
            journey: [{ path, title, at: now }],
        })
        return
    }

    const last = existing.journey[existing.journey.length - 1]
    if (last && last.path === path) return

    // A UTM-tagged link opened mid-session still tells us where the click came
    // from, so fill in anything the landing URL did not carry.
    const utm = { ...collectUtm(), ...existing.utm }

    writeSession({
        ...existing,
        utm,
        journey: [...existing.journey, { path, title, at: now }].slice(-MAX_JOURNEY_STEPS),
    })
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

    // Direct visits to a form (no tracker run yet) still deserve a record.
    let session = readSession()
    if (!session) {
        recordPageView(path, document.title)
        session = readSession()
    }
    if (!session) return undefined

    const journey = session.journey.map((step, i) => {
        const nextAt = session.journey[i + 1]?.at ?? now
        return {
            path: step.path,
            title: step.title,
            secondsOnPage: Math.max(0, Math.round((nextAt - step.at) / 1000)),
        }
    })

    let visitNumber = 1
    let firstSeen: string | undefined
    try {
        visitNumber = Number(localStorage.getItem(VISITS_KEY) ?? '1') || 1
        firstSeen = localStorage.getItem(FIRST_SEEN_KEY) ?? undefined
    } catch {
        /* best-effort */
    }

    return {
        page: { path, url: window.location.href, title: document.title },
        formLocation: extra.formLocation,
        trigger: extra.trigger,
        landingPage: session.landingPage,
        referrer: session.referrer,
        referrerDomain: domainOf(session.referrer),
        utm: session.utm,
        journey,
        session: {
            startedAt: new Date(session.startedAt).toISOString(),
            durationSeconds: Math.round((now - session.startedAt) / 1000),
            pageCount: session.journey.length,
            visitNumber,
            firstSeen,
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
