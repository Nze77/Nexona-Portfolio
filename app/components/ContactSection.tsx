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
                        <input type="text" placeholder="NAME" style={inputStyle} />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <input type="email" placeholder="EMAIL" style={inputStyle} />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <textarea placeholder="PROJECT DETAILS / MESSAGE" style={{ ...inputStyle, minHeight: '120px', resize: 'none' }} />
                    </div>
                    
                    <button 
                        type="button"
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
                            cursor: 'pointer',
                            width: '100%',
                            transition: 'all 0.3s ease',
                            marginTop: '1.5rem',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.filter = 'brightness(1.15)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.filter = 'brightness(1)'
                        }}
                    >
                        Submit Inquiry
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

