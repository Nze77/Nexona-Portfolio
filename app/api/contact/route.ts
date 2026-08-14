import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// nodemailer requires the Node.js runtime (not edge)
export const runtime = 'nodejs'

/**
 * Attribution sent by the client forms (see app/lib/visitorContext.ts). Every
 * field is untrusted and optional — it only ever gets escaped and printed into
 * the notification email, never used for logic.
 */
interface ContactMeta {
    page?: { path?: string; url?: string; title?: string }
    formLocation?: string
    trigger?: string
    landingPage?: string
    referrer?: string
    referrerDomain?: string
    utm?: Record<string, string>
    journey?: Array<{ path?: string; title?: string; secondsOnPage?: number }>
    session?: {
        startedAt?: string
        durationSeconds?: number
        pageCount?: number
    }
    device?: {
        type?: string
        viewport?: string
        screen?: string
        language?: string
        timezone?: string
        userAgent?: string
    }
}

interface ContactPayload {
    name?: string
    email?: string
    phone?: string
    message?: string
    meta?: ContactMeta
}

const escapeHtml = (value: string) =>
    value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')

const clean = (value: unknown, max = 300) =>
    typeof value === 'string' ? value.trim().slice(0, max) : ''

const formatDuration = (seconds?: number) => {
    if (typeof seconds !== 'number' || !isFinite(seconds) || seconds < 0) return '—'
    const s = Math.round(seconds)
    if (s < 60) return `${s}s`
    return `${Math.floor(s / 60)}m ${s % 60}s`
}

const TRIGGER_LABELS: Record<string, string> = {
    timer: 'Auto popup — 20s on page',
    scroll: 'Auto popup — scrolled to 3rd section',
    manual: 'Clicked a contact button',
}

/** Human-readable attribution block, as plain-text lines. */
function buildJourneyLines(meta: ContactMeta | undefined, serverInfo: string[]): string[] {
    const lines: string[] = []
    if (!meta) return serverInfo

    const submittedFrom = clean(meta.page?.url) || clean(meta.page?.path)
    if (submittedFrom) lines.push(`Submitted from: ${submittedFrom}`)
    if (clean(meta.page?.title)) lines.push(`Page title: ${clean(meta.page?.title)}`)
    if (clean(meta.formLocation)) lines.push(`Form: ${clean(meta.formLocation)}`)
    if (clean(meta.trigger)) {
        const t = clean(meta.trigger)
        lines.push(`Opened by: ${TRIGGER_LABELS[t] ?? t}`)
    }

    if (clean(meta.landingPage)) lines.push(`Landed on: ${clean(meta.landingPage)}`)
    lines.push(`Came from: ${clean(meta.referrer, 500) || 'Direct / no referrer'}`)

    const utm = meta.utm ?? {}
    const utmPairs = Object.entries(utm)
        .filter(([, v]) => clean(v))
        .map(([k, v]) => `${k}=${clean(v, 120)}`)
    if (utmPairs.length) lines.push(`Campaign: ${utmPairs.join(', ')}`)

    const journey = Array.isArray(meta.journey) ? meta.journey.slice(0, 30) : []
    if (journey.length) {
        lines.push('')
        lines.push('Journey on the site:')
        journey.forEach((step, i) => {
            const path = clean(step?.path) || '(unknown)'
            const title = clean(step?.title, 120)
            const last = i === journey.length - 1
            lines.push(
                `  ${i + 1}. ${path}${title ? ` — ${title}` : ''} (${formatDuration(step?.secondsOnPage)})${last ? '  <-- submitted here' : ''}`,
            )
        })
    }

    // The journey is tracked in memory only (see app/lib/visitorContext.ts), so
    // it covers this browsing session since the last full page load — there is
    // deliberately no returning-visitor counter.
    const session = meta.session ?? {}
    lines.push('')
    lines.push(
        `Time on site: ${formatDuration(session.durationSeconds)} across ${session.pageCount ?? (journey.length || '?')} page(s)`,
    )

    const device = meta.device ?? {}
    const deviceBits = [
        clean(device.type),
        clean(device.viewport, 40) && `viewport ${clean(device.viewport, 40)}`,
        clean(device.language, 20),
        clean(device.timezone, 60),
    ].filter(Boolean)
    if (deviceBits.length) lines.push(`Device: ${deviceBits.join(' · ')}`)
    if (clean(device.userAgent, 400)) lines.push(`User agent: ${clean(device.userAgent, 400)}`)

    return [...lines, ...serverInfo]
}

export async function POST(request: Request) {
    let body: ContactPayload

    try {
        body = await request.json()
    } catch {
        return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
    }

    const name = body.name?.trim() ?? ''
    const email = body.email?.trim() ?? ''
    const phone = body.phone?.trim() ?? ''
    const message = body.message?.trim() ?? ''

    // Server-side validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/

    if (!name || !email || !phone || !message) {
        return NextResponse.json({ error: 'All fields are required.' }, { status: 422 })
    }
    if (!emailRegex.test(email)) {
        return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 422 })
    }
    if (!phoneRegex.test(phone)) {
        return NextResponse.json({ error: 'Please enter a valid phone number.' }, { status: 422 })
    }

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
        console.error('Contact form: missing SMTP environment variables.')
        return NextResponse.json({ error: 'Email service is not configured.' }, { status: 500 })
    }

    const port = Number(SMTP_PORT)

    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port,
        secure: port === 465, // true for 465, false for 587/STARTTLS
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
        },
        // Fail fast instead of hanging until the serverless function times out
        connectionTimeout: 8000,
        greetingTimeout: 8000,
        socketTimeout: 8000,
    })

    const recipient = CONTACT_TO || SMTP_USER

    // Signals only the server sees. Vercel adds the geo headers in production.
    const h = request.headers
    const serverInfo = [
        `IP: ${clean(h.get('x-forwarded-for')?.split(',')[0]) || 'unknown'}`,
        `Approx. location: ${[h.get('x-vercel-ip-city'), h.get('x-vercel-ip-country-region'), h.get('x-vercel-ip-country')]
            .map((v) => clean(v, 80))
            .filter(Boolean)
            .join(', ') || 'unknown'}`,
    ]

    const journeyLines = buildJourneyLines(body.meta, serverInfo)
    const journeyText = journeyLines.join('\n')
    const journeyHtml = journeyLines
        .map((line) => (line ? escapeHtml(line).replace(/^(\s+)/, (m) => '&nbsp;'.repeat(m.length)) : ''))
        .join('<br />')

    // The page the lead came from is the most useful thing to see in an inbox.
    const source = clean(body.meta?.page?.path) || clean(body.meta?.landingPage)

    try {
        await transporter.sendMail({
            from: `"Nexona Website" <${SMTP_USER}>`,
            to: recipient,
            replyTo: email,
            subject: `New inquiry from ${name}${source ? ` — ${source}` : ''}`,
            text:
                `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}\n\n` +
                `----- Visitor context -----\n${journeyText}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${escapeHtml(name)}</p>
                <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
                <p><strong>Message:</strong></p>
                <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
                <hr />
                <h3>Visitor context</h3>
                <p style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:13px;line-height:1.6;">
                    ${journeyHtml}
                </p>
            `,
        })

        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.error('Contact form: failed to send email.', error)
        const err = error as { message?: string; code?: string }
        return NextResponse.json(
            {
                error: 'Failed to send message. Please try again later.',
                // TEMPORARY diagnostic — remove once production SMTP is confirmed working
                debug: { message: err?.message, code: err?.code },
            },
            { status: 500 },
        )
    }
}
