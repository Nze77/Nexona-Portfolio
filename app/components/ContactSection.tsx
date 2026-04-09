'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, Variants } from 'framer-motion'
import { DARK, SAND, INTER } from '../lib/constants'

export default function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const inView = useInView(sectionRef, { once: true, margin: '-5%' })

    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 1024)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    })
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        // Custom simple validation
        const phoneRegex = /^\+?[0-9\s\-\(\)]{7,15}$/
        if (!phoneRegex.test(formData.phone)) {
            setStatus('error')
            setErrorMessage('Please enter a valid phone number.')
            return
        }

        setStatus('loading')
        setErrorMessage('')

        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
            const response = await fetch(`${baseUrl}/nexona-portfolio`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                setStatus('success')
                setFormData({ name: '', email: '', phone: '', message: '' })
                setTimeout(() => setStatus('idle'), 5000) // Reset after 5 seconds
            } else if (response.status === 422) {
                setStatus('error')
                setErrorMessage('Please check your information and try again.')
            } else {
                setStatus('error')
                setErrorMessage('Something went wrong. Please try again later.')
            }
        } catch (error) {
            setStatus('error')
            setErrorMessage('Network error. Please try again later.')
        }
    }

    const variants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.15,
                duration: 0.8,
                ease: [0.23, 1, 0.32, 1] as [number, number, number, number]
            }
        })
    }

    return (
        <section
            ref={sectionRef}
            id="contact"
            data-theme="light"

            className="product-theme-trigger"
            style={{
                backgroundColor: SAND,
                color: DARK,
                minHeight: '100vh',
                padding: isMobile ? '8rem 5% 10rem' : '10rem 8%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: isMobile ? 'center' : 'left',
                position: 'relative',
            }}
        >
            <div style={{ 
                maxWidth: '1300px', 
                width: '100%',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: isMobile ? 'center' : 'flex-start',
                justifyContent: 'space-between',
                gap: isMobile ? '4rem' : '6rem',
            }}>
                {/* Left Side: Headers */}
                <motion.div
                    variants={variants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    custom={0}
                    style={{ flex: isMobile ? 'none' : '1', maxWidth: '600px' }}
                >
                    <h2 style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 800,
                        fontSize: 'clamp(2.5rem, 8vw, 6.5rem)',
                        letterSpacing: '-0.04em',
                        lineHeight: 0.9,
                        textTransform: 'uppercase',
                        margin: 0,
                    }}>
                        Let&apos;s Talk <br /> Business
                    </h2>
                    <p style={{
                        fontFamily: INTER,
                        fontSize: '1rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        marginTop: '1.5rem',
                        opacity: 0.6,
                        fontWeight: 600,
                    }}>
                        Ready to automate and elevate?
                    </p>
                </motion.div>

                {/* Right Side: Minimal Vertical Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    variants={variants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    custom={1}
                    style={{
                        flex: isMobile ? 'none' : '1',
                        width: '100%',
                        maxWidth: '520px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2.5rem',
                        textAlign: 'left',
                    }}
                >
                    <div style={{ position: 'relative' }}>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="NAME" required style={inputStyle} />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="EMAIL" required style={inputStyle} />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="PHONE NUMBER" required style={inputStyle} />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <textarea name="message" value={formData.message} onChange={handleChange} placeholder="PROJECT DETAILS / MESSAGE" required style={{ ...inputStyle, minHeight: '120px', resize: 'none' }} />
                    </div>
                    
                    {status === 'error' && (
                        <motion.p 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ color: '#ef4444', fontSize: '0.85rem', fontFamily: INTER, fontWeight: 600, margin: 0, letterSpacing: '0.05em', textTransform: 'uppercase' }}
                        >
                            {errorMessage}
                        </motion.p>
                    )}
                    
                    {status === 'success' && (
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            style={{
                                backgroundColor: DARK,
                                color: SAND,
                                padding: '1.5rem',
                                border: `1px solid ${DARK}`,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                            }}
                        >
                            <div style={{
                                width: '2rem', height: '2rem', borderRadius: '50%', border: `1.5px solid ${SAND}`, display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                            <p style={{ fontFamily: INTER, fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', margin: 0, textTransform: 'uppercase' }}>
                                RECEIVED. WE WILL BE IN TOUCH SHORTLY.
                            </p>
                        </motion.div>
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
                            padding: '1.5rem 2rem',
                            textTransform: 'uppercase',
                            cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                            opacity: status === 'loading' ? 0.7 : 1,
                            width: '100%',
                            transition: 'all 0.3s ease',
                            marginTop: '1.5rem',
                        }}
                        onMouseEnter={(e) => {
                            if (status !== 'loading') e.currentTarget.style.filter = 'brightness(1.15)'
                        }}
                        onMouseLeave={(e) => {
                            if (status !== 'loading') e.currentTarget.style.filter = 'brightness(1)'
                        }}
                    >
                        {status === 'loading' ? 'Sending...' : 'Submit Inquiry'}
                    </button>
                </motion.form>
            </div>
        </section>
    )
}



const inputStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: `1.5px solid ${DARK}`,
    padding: '1rem 0',
    fontFamily: INTER,
    fontSize: '0.8rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    color: DARK,
    outline: 'none',
}

