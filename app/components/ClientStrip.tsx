'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { DARK, SAND, INTER } from '../lib/constants'

// `aspect` is the source image's natural width ÷ height. Each frame is sized from
// it so the box hugs its logo exactly: object-fit: contain scales every logo to
// the frame height, so any leftover box width is dead space that gets added to the
// marquee gap — and since it differs per logo, the spacing reads as uneven.
// `scale` grows logos that carry a lot of internal whitespace, which otherwise
// render optically smaller than their neighbours.
// `href` is omitted where the client has no entry in projectDetails.ts yet.
const CLIENT_LOGOS: { src: string; alt: string; aspect: number; scale?: number; href?: string }[] = [
    { src: '/logos/dariza.jpg', alt: 'Dariza Fabrics', aspect: 1535 / 1024, href: '/projects/dariza' },
    { src: '/logos/1327.png', alt: '1327', aspect: 3572 / 2128, href: '/projects/1327' },
    { src: '/froven image/Gemini_Generated_Image_gqcanogqcanogqca-Photoroom.png', alt: 'Froven Innovations', aspect: 1280 / 1184, href: '/projects/froven' },
    { src: '/logos/aimfitness.png', alt: 'Aim Fitness Gym', aspect: 500 / 500, scale: 1.5 }
]

const LOGO_BASE_HEIGHT = { mobile: 70, desktop: 90 }

// Every logo sits in a frame of this height so the captions below them share one
// baseline, regardless of each logo's individual scale.
const LOGO_FRAME_SCALE = Math.max(...CLIENT_LOGOS.map((c) => c.scale ?? 1))

interface ClientStripProps {
    eyebrow?: string
    heading?: string
}

export default function ClientStrip({
    eyebrow = 'Trusted By',
    heading = 'Businesses That Trust Nexona',
}: ClientStripProps) {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    return (
        <section style={{ backgroundColor: SAND, color: DARK, padding: isMobile ? '4rem 0' : '6rem 0' }}>
            <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: isMobile ? '3rem' : '4rem', padding: '0 5%' }}>
                    <span style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1rem' }}>{eyebrow}</span>
                    <h2 style={{
                        fontFamily: "var(--font-montserrat), sans-serif",
                        fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                        fontWeight: 800,
                        lineHeight: 1.1,
                        textTransform: 'uppercase',
                        letterSpacing: '-0.02em',
                        margin: 0
                    }}>
                        {heading}
                    </h2>
                </div>

                {/* Right-to-left marquee. The list is rendered twice back to back and
                    the track is shifted by exactly half its width, so the loop is seamless. */}
                <div
                    style={{
                        overflow: 'hidden',
                        paddingBottom: '3rem',
                        maskImage: 'linear-gradient(to right, transparent, black 2%, black 98%, transparent)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent, black 2%, black 98%, transparent)'
                    }}
                >
                    {/* Four groups, i.e. two per half. Each half must be wider than the
                        viewport or the -50% shift would expose empty track on the right. */}
                    <div className="clientMarqueeTrack">
                        {[0, 1, 2, 3].map((copy) => (
                            <div key={copy} className="clientMarqueeGroup" aria-hidden={copy !== 0}>
                                {CLIENT_LOGOS.map((client) => {
                                    const base = isMobile ? LOGO_BASE_HEIGHT.mobile : LOGO_BASE_HEIGHT.desktop
                                    const imageHeight = base * (client.scale ?? 1)
                                    const image = (
                                        <Image
                                            src={client.src}
                                            alt={copy === 0 ? `${client.alt} – Nexona client` : ''}
                                            draggable={false}
                                            fill
                                            sizes="220px"
                                            style={{ objectFit: 'contain' }}
                                        />
                                    )
                                    return (
                                        <div
                                            key={client.alt}
                                            className="clientLogo"
                                            style={{
                                                height: `${base * LOGO_FRAME_SCALE}px`,
                                                width: `${imageHeight * client.aspect}px`,
                                            }}
                                        >
                                            <div
                                                className="clientLogoImage"
                                                style={{ height: `${imageHeight}px` }}
                                            >
                                                {client.href ? (
                                                    <Link
                                                        href={client.href}
                                                        tabIndex={copy !== 0 ? -1 : undefined}
                                                        style={{ position: 'absolute', inset: 0, display: 'block' }}
                                                    >
                                                        {image}
                                                    </Link>
                                                ) : (
                                                    image
                                                )}
                                            </div>
                                            <span className="clientLogoName" aria-hidden="true">
                                                {client.alt}
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .clientMarqueeTrack {
                    display: flex;
                    width: max-content;
                    animation: clientMarquee 28s linear infinite;
                }
                .clientMarqueeTrack:hover {
                    animation-play-state: paused;
                }
                /* The gap is the whole visible spacing now that each frame hugs its
                   logo, so it has to carry what the old boxes' dead space used to
                   pad out — 8rem ≈ the spacing this strip previously averaged. The
                   padding-right must match the gap: it is what separates the last
                   logo of one group from the first of the next. */
                .clientMarqueeGroup {
                    display: flex;
                    align-items: center;
                    gap: 8rem;
                    padding-right: 8rem;
                }
                .clientLogo {
                    position: relative;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .clientLogoImage {
                    position: relative;
                    width: 100%;
                    opacity: 0.85;
                    transition: opacity 0.3s ease, transform 0.3s ease;
                }
                .clientLogo:hover .clientLogoImage,
                .clientLogo:focus-within .clientLogoImage {
                    opacity: 1;
                    transform: scale(1.04);
                }
                .clientLogoName {
                    position: absolute;
                    top: calc(100% + 0.9rem);
                    left: 50%;
                    transform: translateX(-50%);
                    white-space: nowrap;
                    font-family: ${INTER};
                    font-size: 0.8rem;
                    font-weight: 700;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: ${DARK};
                    opacity: 0.65;
                    transition: opacity 0.3s ease;
                    pointer-events: none;
                }
                .clientLogo:hover .clientLogoName,
                .clientLogo:focus-within .clientLogoName {
                    opacity: 1;
                }
                @keyframes clientMarquee {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                @media (prefers-reduced-motion: reduce) {
                    .clientMarqueeTrack { animation: none; }
                }
            `}</style>
        </section>
    )
}
