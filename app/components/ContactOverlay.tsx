'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DARK, SAND, INTER } from '../lib/constants'

/**
 * Contact overlay — name / email / phone / requirement, posted to /api/contact
 * (the same SMTP endpoint the #contact section on /home submits to).
 *
 * Self-contained: it locks body scroll and closes on Escape by itself, so a
 * host only has to render it. Wrap it in <AnimatePresence> to keep the exit
 * animation:
 *
 *   <AnimatePresence>
 *     {open && <ContactOverlay onClose={() => setOpen(false)} />}
 *   </AnimatePresence>
 */
export default function ContactOverlay({ onClose }: { onClose: () => void }) {
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')
    const [closeHovered, setCloseHovered] = useState(false)

    // Lock body scroll + close on Escape for as long as the overlay is mounted.
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', onKey)
        return () => {
            document.body.style.overflow = ''
            window.removeEventListener('keydown', onKey)
        }
    }, [onClose])

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/
        if (!phoneRegex.test(form.phone)) {
            setStatus('error')
            setErrorMessage('Please enter a valid phone number.')
            return
        }

        setStatus('loading')
        setErrorMessage('')

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
            if (res.ok) {
                setStatus('success')
                setForm({ name: '', email: '', phone: '', message: '' })
            } else if (res.status === 422) {
                setStatus('error')
                setErrorMessage('Please check your information and try again.')
            } else {
                setStatus('error')
                setErrorMessage('Something went wrong. Please try again later.')
            }
        } catch {
            setStatus('error')
            setErrorMessage('Network error. Please try again later.')
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 130,
                backgroundColor: 'rgba(46,42,38,0.55)',
                backdropFilter: 'blur(6px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem',
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label="Contact us"
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: 520,
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    backgroundColor: SAND,
                    color: DARK,
                    borderRadius: '1.25rem',
                    padding: 'clamp(2rem, 5vw, 3rem)',
                    boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
                    fontFamily: 'var(--font-montserrat), sans-serif',
                }}
            >
                {/* Styled inline rather than via styled-jsx so the overlay carries
                    its own look wherever it's mounted. */}
                <button
                    onClick={onClose}
                    aria-label="Close"
                    onMouseEnter={() => setCloseHovered(true)}
                    onMouseLeave={() => setCloseHovered(false)}
                    style={{
                        position: 'absolute',
                        top: '1.1rem',
                        right: '1.1rem',
                        width: 38,
                        height: 38,
                        borderRadius: 999,
                        border: '1px solid rgba(46,42,38,0.2)',
                        background: closeHovered ? 'rgba(46,42,38,0.08)' : 'transparent',
                        color: DARK,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: closeHovered ? 'rotate(90deg)' : 'none',
                        transition: 'background-color 0.25s ease, transform 0.25s ease',
                    }}
                >
                    ✕
                </button>

                <span style={{
                    fontFamily: INTER,
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    opacity: 0.5,
                }}>
                    Get in touch
                </span>
                <h3 style={{
                    fontWeight: 800,
                    fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
                    lineHeight: 1.1,
                    margin: '0.6rem 0 1.75rem',
                }}>
                    Let&apos;s talk business
                </h3>

                {status === 'success' ? (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            backgroundColor: DARK,
                            color: SAND,
                            padding: '1.5rem',
                            borderRadius: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                        }}
                    >
                        <span style={{
                            width: '2rem',
                            height: '2rem',
                            borderRadius: '50%',
                            border: `1.5px solid ${SAND}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                        }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </span>
                        <p style={{ fontFamily: INTER, fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.08em', margin: 0, textTransform: 'uppercase' }}>
                            Received. We will be in touch shortly.
                        </p>
                    </motion.div>
                ) : (
                    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <input type="text" name="name" value={form.name} onChange={onChange} placeholder="NAME" required style={overlayInputStyle} />
                        <input type="email" name="email" value={form.email} onChange={onChange} placeholder="EMAIL" required style={overlayInputStyle} />
                        <input type="tel" name="phone" value={form.phone} onChange={onChange} placeholder="PHONE NUMBER" required style={overlayInputStyle} />
                        <textarea name="message" value={form.message} onChange={onChange} placeholder="YOUR REQUIREMENT" required style={{ ...overlayInputStyle, minHeight: 110, resize: 'none' }} />

                        {status === 'error' && (
                            <p style={{ color: '#c0392b', fontSize: '0.8rem', fontFamily: INTER, fontWeight: 600, margin: 0, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                                {errorMessage}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            style={{
                                fontFamily: INTER,
                                fontWeight: 700,
                                fontSize: '0.75rem',
                                letterSpacing: '0.2em',
                                color: SAND,
                                backgroundColor: DARK,
                                border: 'none',
                                borderRadius: '999px',
                                padding: '1.15rem 2rem',
                                textTransform: 'uppercase',
                                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                                opacity: status === 'loading' ? 0.7 : 1,
                                width: '100%',
                                marginTop: '0.5rem',
                            }}
                        >
                            {status === 'loading' ? 'Sending…' : 'Submit Inquiry'}
                        </button>
                    </form>
                )}
            </motion.div>
        </motion.div>
    )
}

const overlayInputStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: `1.5px solid ${DARK}`,
    padding: '0.85rem 0',
    fontFamily: INTER,
    fontSize: '0.8rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    color: DARK,
    outline: 'none',
}
