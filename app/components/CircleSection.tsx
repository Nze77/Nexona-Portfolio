'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SAND, DARK } from '../lib/constants'

gsap.registerPlugin(ScrollTrigger)

export default function CircleSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const stickyRef = useRef<HTMLDivElement>(null)
    const circleRef = useRef<HTMLDivElement>(null)
    const imgRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    useEffect(() => {
        if (!sectionRef.current || !circleRef.current) return

        const ctx = gsap.context(() => {
            const vw = window.innerWidth
            const vh = window.innerHeight
            const mobile = vw <= 768

            // Starting circle: much smaller on mobile for more drama
            const initSize = mobile ? 140 : Math.min(vw * 0.78, 620)
            const initRadius = initSize / 2

            // End state: fill entire screen on mobile
            const endW = vw
            const endH = mobile ? vh : vh * 0.86
            const endR = mobile ? 0 : 36

            gsap.set(circleRef.current, {
                width: initSize,
                height: initSize,
                borderRadius: initRadius,
            })

            const st: ScrollTrigger.Vars = {
                trigger: sectionRef.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
            }

            // The main expansion
            gsap.to(circleRef.current, {
                width: endW,
                height: endH,
                borderRadius: endR,
                ease: 'none',
                scrollTrigger: st,
            })

            // BG color change
            gsap.to(sectionRef.current, {
                backgroundColor: SAND,
                ease: 'none',
                scrollTrigger: {
                    ...st,
                    end: '65% bottom',
                },
            })

            // Content parallax - disabled for perfect centering
            gsap.to(imgRef.current, {
                yPercent: 0,
                ease: 'none',
                scrollTrigger: st,
            })


            // Fade text in only after circle is large enough
            if (textRef.current) {
                gsap.set(textRef.current, { opacity: 0 })
                gsap.to(textRef.current, {
                    opacity: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: '40% bottom',
                        end: '60% bottom',
                        scrub: true,
                    },
                })
            }

            // Ensure everything is calculated for the current layout
            ScrollTrigger.refresh()

        }, sectionRef)

        return () => ctx.revert()
    }, [isMobile])

    return (
        <section
            ref={sectionRef}
            data-theme="circle"
            style={{
                backgroundColor: DARK,
                height: isMobile ? '200vh' : '260vh',
                position: 'relative',
            }}
        >
            <div
                ref={stickyRef}
                style={{
                    position: 'sticky',
                    top: 0,
                    height: '105vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }}
            >
                <div
                    ref={circleRef}
                    style={{
                        position: 'relative',
                        overflow: 'hidden',
                        willChange: 'width, height, border-radius',
                        flexShrink: 0,
                    }}
                >
                    <div
                        ref={imgRef}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: DARK,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: SAND,
                            textAlign: 'center',
                        }}
                    >
                        <div ref={textRef} className="circle-content-panel" style={{ opacity: 0 }}>
                            <h2 className="circle-title" style={{
                                fontFamily: "'Montserrat', sans-serif",
                                fontWeight: 600,
                                letterSpacing: '-0.02em',
                            }}>WELCOME TO NEXONA</h2>
                            <p className="circle-para" style={{
                                maxWidth: '900px',
                                lineHeight: 1.5,
                                margin: '0 auto',
                                textAlign: 'center'
                            }}>

                                We craft seamless digital experiences, automate the mundane, and elevate businesses with next-generation AI agents.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .circle-content-panel {
                    padding: 4rem;
                }
                .circle-title {
                    font-size: clamp(3rem, 8vw, 6rem);
                    margin-bottom: 2rem;
                }
                .circle-para {
                    font-size: clamp(1.2rem, 3vw, 2rem);
                }

                @media (max-width: 768px) {
                    .circle-content-panel {
                        padding: 2rem;
                        max-width: 90vw;
                    }
                    .circle-title {
                        font-size: clamp(1.8rem, 8vw, 2.8rem);
                        margin-bottom: 1rem;
                    }
                    .circle-para {
                        font-size: clamp(1rem, 4.5vw, 1.25rem);
                        max-width: 85vw;
                    }
                }
            `}</style>
        </section>
    )
}