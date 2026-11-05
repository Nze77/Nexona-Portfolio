'use client'

import { useState } from 'react'
import { DARK, SAND, INTER } from '../lib/constants'
import { getVisitorContext } from '../lib/visitorContext'

// Shared by the product-engineering landing pages (AI voice, email). Inline
// styles throughout, matching the other landing pages.
export const TEXT = '#F2EEE8'
export const PANEL = '#25221F'
export const LINE = 'rgba(232,223,211,0.14)'
export const MONTSERRAT = 'var(--font-montserrat), sans-serif'
export const SCOPING_CTA = 'Book a 30-minute scoping call'

export const H2: React.CSSProperties = {
    fontFamily: MONTSERRAT,
    fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
    fontWeight: 800,
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
    textTransform: 'uppercase',
    margin: 0,
}

export const EYEBROW: React.CSSProperties = {
    fontFamily: INTER,
    fontSize: '0.8rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    fontWeight: 700,
    opacity: 0.55,
    display: 'block',
    marginBottom: '1rem',
}

export const LEAD: React.CSSProperties = {
    fontFamily: INTER,
    fontSize: 'clamp(1rem, 1.35vw, 1.15rem)',
    lineHeight: 1.7,
    letterSpacing: '0.01em',
}

export const H3: React.CSSProperties = {
    fontFamily: INTER,
    fontSize: '1.05rem',
    fontWeight: 700,
    letterSpacing: '0.01em',
    margin: 0,
}

export const CARD: React.CSSProperties = {
    border: `1px solid ${LINE}`,
    borderRadius: '1.25rem',
    padding: '1.75rem 1.5rem',
    backgroundColor: 'rgba(232,223,211,0.03)',
}

export const CARD_BODY: React.CSSProperties = {
    fontSize: '0.92rem',
    lineHeight: 1.65,
    opacity: 0.72,
    marginTop: '0.7rem',
    marginBottom: 0,
}

export const NOTE: React.CSSProperties = {
    fontSize: '0.92rem',
    lineHeight: 1.7,
    opacity: 0.68,
    marginTop: '1.1rem',
    marginBottom: 0,
}

export const SOURCE: React.CSSProperties = {
    fontSize: '0.8rem',
    lineHeight: 1.55,
    opacity: 0.58,
    marginTop: '0.9rem',
    marginBottom: 0,
}

export const INLINE_LINK: React.CSSProperties = {
    color: SAND,
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
}

export const CTA: React.CSSProperties = {
    backgroundColor: SAND,
    color: DARK,
    fontWeight: 600,
    fontSize: '0.95rem',
    padding: '0.95rem 1.8rem',
    borderRadius: '999px',
    textDecoration: 'none',
    display: 'inline-block',
    border: 'none',
    cursor: 'pointer',
    fontFamily: INTER,
}

export const SCREEN_FRAME: React.CSSProperties = {
    border: `1px solid ${LINE}`,
    borderRadius: '1rem',
    overflow: 'hidden',
    boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
}

const TH: React.CSSProperties = {
    textAlign: 'left',
    padding: '0 1.25rem 0.9rem 0',
    borderBottom: '1px solid rgba(232,223,211,0.2)',
    fontSize: '0.72rem',
    fontWeight: 700,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    opacity: 0.5,
    verticalAlign: 'bottom',
}

const TD: React.CSSProperties = {
    padding: '1rem 1.25rem 1rem 0',
    borderBottom: '1px solid rgba(232,223,211,0.1)',
    fontSize: '0.9rem',
    lineHeight: 1.55,
    verticalAlign: 'top',
}

export function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" style={INLINE_LINK}>
            {children}
        </a>
    )
}

/** Table on desktop, stacked rows on phones. First column is the row heading. */
export function DataTable({
    caption,
    columns,
    rows,
    isMobile,
}: {
    caption: string
    columns: string[]
    rows: string[][]
    isMobile: boolean
}) {
    if (isMobile) {
        return (
            <div style={{ marginTop: '1.25rem' }}>
                {rows.map((row) => (
                    <div key={row[0]} style={{ padding: '1rem 0', borderBottom: `1px solid ${LINE}` }}>
                        <p style={{ ...H3, fontSize: '0.95rem' }}>{row[0]}</p>
                        {row.slice(1).map((value, i) => (
                            <p key={columns[i + 1]} style={{ fontSize: '0.88rem', lineHeight: 1.55, margin: '0.4rem 0 0', opacity: 0.78 }}>
                                <strong>{columns[i + 1]}: </strong>
                                {value}
                            </p>
                        ))}
                    </div>
                ))}
            </div>
        )
    }
    return (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1.5rem' }}>
            <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>{caption}</caption>
            <thead>
                <tr>
                    {columns.map((col) => (
                        <th key={col} scope="col" style={TH}>{col}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => (
                    <tr key={row[0]}>
                        <th scope="row" style={{ ...TD, textAlign: 'left', fontWeight: 700 }}>{row[0]}</th>
                        {row.slice(1).map((value, i) => (
                            <td key={columns[i + 1]} style={{ ...TD, opacity: 0.78 }}>{value}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export interface EstimateField {
    name: string
    label: string
    /** Omit for a free-text field. */
    options?: string[]
}

const FIELD: React.CSSProperties = {
    width: '100%',
    backgroundColor: 'rgba(232,223,211,0.05)',
    border: `1px solid rgba(232,223,211,0.22)`,
    borderRadius: '0.6rem',
    padding: '0.8rem 0.9rem',
    fontFamily: INTER,
    fontSize: '0.92rem',
    color: TEXT,
    outline: 'none',
    boxSizing: 'border-box',
}

/**
 * Short qualifying form. Posts to /api/contact like the overlay does, with the
 * answers folded into `message`, so leads arrive in the same inbox with the same
 * attribution, including the [ChatGPT lead] subject tag from app/lib/aiSource.ts.
 */
export function EstimateForm({
    formLocation,
    fields,
    isMobile,
}: {
    formLocation: string
    fields: EstimateField[]
    isMobile: boolean
}) {
    const [contact, setContact] = useState({ name: '', email: '', phone: '' })
    const [answers, setAnswers] = useState<Record<string, string>>({})
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [error, setError] = useState('')

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!/^\+?[0-9\s\-()]{7,15}$/.test(contact.phone)) {
            setStatus('error')
            setError('Please enter a valid phone number.')
            return
        }
        setStatus('loading')
        setError('')
        const message = fields.map((f) => `${f.label}: ${answers[f.name] ?? ''}`).join('\n')
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...contact,
                    message: `Estimate request\n${message}`,
                    meta: getVisitorContext({ formLocation }),
                }),
            })
            if (res.ok) {
                setStatus('success')
            } else {
                setStatus('error')
                setError(res.status === 422 ? 'Please check your details and try again.' : 'Something went wrong. Please try again later.')
            }
        } catch {
            setStatus('error')
            setError('Network error. Please try again later.')
        }
    }

    if (status === 'success') {
        return (
            <p role="status" style={{ ...CARD, ...LEAD, marginTop: '2rem' }}>
                Got it. We will come back with a rough estimate and a time for the call.
            </p>
        )
    }

    return (
        <form
            onSubmit={onSubmit}
            style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1rem', marginTop: '2rem', textAlign: 'left' }}
        >
            {fields.map((field) => (
                <label key={field.name} style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                    {field.label}
                    {field.options ? (
                        <select
                            required
                            value={answers[field.name] ?? ''}
                            onChange={(e) => setAnswers((a) => ({ ...a, [field.name]: e.target.value }))}
                            style={{ ...FIELD, marginTop: '0.4rem', colorScheme: 'dark' }}
                        >
                            <option value="" disabled>Choose one</option>
                            {field.options.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    ) : (
                        <input
                            required
                            value={answers[field.name] ?? ''}
                            onChange={(e) => setAnswers((a) => ({ ...a, [field.name]: e.target.value }))}
                            style={{ ...FIELD, marginTop: '0.4rem' }}
                        />
                    )}
                </label>
            ))}
            {(['name', 'email', 'phone'] as const).map((key) => (
                <label key={key} style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'capitalize' }}>
                    {key}
                    <input
                        required
                        type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'}
                        value={contact[key]}
                        onChange={(e) => setContact((c) => ({ ...c, [key]: e.target.value }))}
                        style={{ ...FIELD, marginTop: '0.4rem' }}
                    />
                </label>
            ))}
            {status === 'error' && (
                <p role="alert" style={{ gridColumn: '1 / -1', color: '#E8A598', fontSize: '0.88rem', margin: 0 }}>{error}</p>
            )}
            <div style={{ gridColumn: '1 / -1' }}>
                <button type="submit" disabled={status === 'loading'} style={{ ...CTA, opacity: status === 'loading' ? 0.7 : 1 }}>
                    {status === 'loading' ? 'Sending…' : 'Get a rough estimate'}
                </button>
            </div>
        </form>
    )
}
