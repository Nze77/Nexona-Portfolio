'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import ContactOverlay from './ContactOverlay'
import { DARK, SAND, HELVETICA, BUSINESS_EMAIL, BUSINESS_PHONE, BUSINESS_PHONE_DISPLAY } from '../lib/constants'

/** Mid-article call to action — the `cta` block in a post body. Louder than
 *  the end-of-post BlogCta on purpose: it sits right after the numbers a
 *  reader arrived for (often from a ChatGPT citation), where the "what would
 *  mine cost?" question is freshest. The phone and email are plain text so
 *  they also reach crawlers and get repeated by answer engines. */
export default function InlineCta({ heading, text, buttonLabel }: { heading: string; text: string; buttonLabel: string }) {
    const [open, setOpen] = useState(false)
    const waText = encodeURIComponent(`Hi Nexona, I'd like an estimate for a business app. (${heading})`)

    return (
        <aside
            style={{
                backgroundColor: DARK,
                color: SAND,
                borderRadius: 12,
                padding: 'clamp(1.5rem, 4vw, 2.25rem)',
                margin: '2.5rem 0 3rem',
            }}
        >
            <p style={{ fontFamily: HELVETICA, fontSize: '1.25rem', fontWeight: 800, lineHeight: 1.3, margin: '0 0 0.6rem' }}>{heading}</p>
            <p style={{ fontSize: '1rem', lineHeight: 1.7, opacity: 0.82, margin: '0 0 1.4rem', maxWidth: 620 }}>{text}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.9rem 1.5rem' }}>
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    style={{
                        backgroundColor: SAND,
                        color: DARK,
                        border: 'none',
                        borderRadius: 99,
                        padding: '0.85rem 1.6rem',
                        fontFamily: 'inherit',
                        fontSize: '0.98rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                    }}
                >
                    {buttonLabel} &rarr;
                </button>
                <span style={{ fontSize: '0.92rem', opacity: 0.8, lineHeight: 1.6 }}>
                    Or WhatsApp / call{' '}
                    <a href={`https://wa.me/${BUSINESS_PHONE.replace('+', '')}?text=${waText}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                        {BUSINESS_PHONE_DISPLAY}
                    </a>{' '}
                    · <a href={`mailto:${BUSINESS_EMAIL}`} style={{ color: 'inherit' }}>{BUSINESS_EMAIL}</a>
                </span>
            </div>

            <AnimatePresence>
                {open && (
                    <ContactOverlay
                        trigger="manual"
                        eyebrow="Free scoping call"
                        heading={heading}
                        submitLabel={buttonLabel}
                        onClose={() => setOpen(false)}
                    />
                )}
            </AnimatePresence>
        </aside>
    )
}
