import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// nodemailer requires the Node.js runtime (not edge)
export const runtime = 'nodejs'

interface ContactPayload {
    name?: string
    email?: string
    phone?: string
    message?: string
}

const escapeHtml = (value: string) =>
    value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')

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

    try {
        await transporter.sendMail({
            from: `"Nexona Website" <${SMTP_USER}>`,
            to: recipient,
            replyTo: email,
            subject: `New inquiry from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${escapeHtml(name)}</p>
                <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
                <p><strong>Message:</strong></p>
                <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
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
