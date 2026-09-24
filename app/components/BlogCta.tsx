'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import ContactOverlay from './ContactOverlay'
import { DARK, HELVETICA } from '../lib/constants'

/** End-of-post note. Deliberately quiet — a bordered aside and a text link,
 *  not a landing-page CTA block. Opens the shared contact overlay. */
export default function BlogCta({
    heading,
    text,
    buttonLabel = 'Get in touch',
}: {
    heading: string
    text: string
    buttonLabel?: string
}) {
    const [open, setOpen] = useState(false)
    const [hovered, setHovered] = useState(false)

    return (
        <aside
            style={{
                borderTop: `2px solid ${DARK}`,
                padding: '1.75rem 0 0',
                margin: '4rem 0 0',
            }}
        >
            <p style={{ fontFamily: HELVETICA, fontSize: '1.15rem', fontWeight: 700, lineHeight: 1.35, margin: '0 0 0.6rem' }}>
                {heading}
            </p>
            <p style={{ fontSize: '1rem', lineHeight: 1.7, opacity: 0.8, margin: '0 0 1rem', maxWidth: 600 }}>{text}</p>
            <button
                type="button"
                onClick={() => setOpen(true)}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    color: DARK,
                    fontFamily: 'inherit',
                    fontSize: '1rem',
                    fontWeight: 700,
                    textDecoration: 'underline',
                    textDecorationThickness: hovered ? '2px' : '1px',
                    textUnderlineOffset: '4px',
                }}
            >
                {buttonLabel} &rarr;
            </button>

            <AnimatePresence>
                {open && (
                    <ContactOverlay
                        trigger="manual"
                        eyebrow="From the blog"
                        heading="Tell us what's breaking"
                        onClose={() => setOpen(false)}
                    />
                )}
            </AnimatePresence>
        </aside>
    )
}
