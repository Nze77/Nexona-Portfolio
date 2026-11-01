import type { Metadata } from 'next'
import Link from 'next/link'
import StickyHeader from './components/StickyHeader'
import Footer from './components/Footer'
import { LANDING_PAGES } from './data/landingPages'
import { BLOG_POSTS, postPath } from './data/blogs'
import { DARK, SAND, HELVETICA, INTER, BUSINESS_EMAIL, BUSINESS_PHONE, BUSINESS_PHONE_DISPLAY } from './lib/constants'

/* Site-wide 404. Rendered for any URL with no route, and for notFound() calls
   (e.g. an unknown /blogs/<slug>). Next.js serves it with HTTP 404 and adds
   <meta name="robots" content="noindex"> itself — do not add a second one.

   A 404 is a lost visitor, so it does two jobs: send them somewhere useful
   (link lists come from the same registries as the footer and llms.txt, so
   new pages show up here automatically), and offer a direct line to us. */

export const metadata: Metadata = {
    title: 'Page Not Found | Nexona',
    description: 'This page does not exist. Find custom software, ERP, DMS, mobile apps and AI automation from Nexona, or ask us directly.',
}

const TEXT = '#F2EEE8'

const eyebrow: React.CSSProperties = {
    fontFamily: INTER,
    fontSize: '0.72rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
}

const pill: React.CSSProperties = {
    display: 'inline-block',
    fontFamily: INTER,
    fontSize: '0.95rem',
    fontWeight: 700,
    textDecoration: 'none',
    borderRadius: 99,
    padding: '0.95rem 1.7rem',
}

const linkRow: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: '1rem',
    padding: '0.95rem 0',
    borderBottom: '1px solid rgba(46,42,38,0.14)',
    color: DARK,
    textDecoration: 'none',
    fontSize: '1rem',
    lineHeight: 1.45,
}

function LinkList({ heading, links }: { heading: string; links: { name: string; href: string }[] }) {
    return (
        <div>
            <h2 style={{ ...eyebrow, opacity: 0.55, margin: '0 0 0.5rem' }}>{heading}</h2>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, borderTop: '1px solid rgba(46,42,38,0.14)' }}>
                {links.map((l) => (
                    <li key={l.href}>
                        <Link href={l.href} className="nav-link" style={linkRow}>
                            <span>{l.name}</span>
                            <span aria-hidden style={{ opacity: 0.45 }}>&rarr;</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default function NotFound() {
    const build = LANDING_PAGES.filter((p) => p.footerGroup !== 'local').map((p) => ({ name: p.navLabel ?? p.title, href: `/${p.slug}` }))
    const guides = BLOG_POSTS.map((p) => ({ name: p.title, href: postPath(p) }))
    const company = [
        { name: 'Home', href: '/' },
        { name: 'Projects we have shipped', href: '/projects' },
        { name: 'Blog', href: '/blogs' },
        ...LANDING_PAGES.filter((p) => p.footerGroup === 'local').map((p) => ({ name: p.navLabel ?? p.title, href: `/${p.slug}` })),
    ]

    return (
        <main style={{ backgroundColor: DARK, color: TEXT, minHeight: '100vh' }}>
            <StickyHeader theme="dark" />

            {/* Hero */}
            <section data-theme="dark" style={{ padding: 'clamp(4rem, 10vw, 8rem) 5% clamp(4rem, 9vw, 7rem)' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    <span style={{ ...eyebrow, opacity: 0.6 }}>Error 404 · Page not found</span>
                    <p
                        aria-hidden
                        style={{
                            fontFamily: HELVETICA,
                            fontSize: 'clamp(7rem, 26vw, 19rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.06em',
                            lineHeight: 0.82,
                            margin: '1.5rem 0 0',
                            color: SAND,
                        }}
                    >
                        404
                    </p>
                    <h1
                        style={{
                            fontFamily: HELVETICA,
                            fontSize: 'clamp(1.9rem, 4.6vw, 3.4rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.03em',
                            textTransform: 'uppercase',
                            lineHeight: 1.02,
                            margin: '2rem 0 1.5rem',
                            maxWidth: 900,
                        }}
                    >
                        This page moved. Or it never existed.
                    </h1>
                    <p style={{ fontFamily: INTER, fontSize: '1.1rem', lineHeight: 1.75, opacity: 0.78, margin: 0, maxWidth: 640 }}>
                        Either way, it is not here. The link may be old, or a letter got lost on the way. What you were
                        after is probably one click below — and if it is not, tell us what you were looking for.
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.9rem', marginTop: '2.5rem' }}>
                        <Link href="/" style={{ ...pill, backgroundColor: SAND, color: DARK }}>
                            Back to home &rarr;
                        </Link>
                        <a
                            href={`https://wa.me/${BUSINESS_PHONE.replace('+', '')}?text=${encodeURIComponent('Hi Nexona, I was looking for something on your website and hit a missing page.')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ ...pill, color: TEXT, border: '1px solid rgba(242,238,232,0.4)' }}
                        >
                            Ask us on WhatsApp
                        </a>
                    </div>
                    <p style={{ fontFamily: INTER, fontSize: '0.92rem', opacity: 0.6, margin: '1.5rem 0 0' }}>
                        Or call{' '}
                        <a href={`tel:${BUSINESS_PHONE}`} style={{ color: 'inherit' }}>{BUSINESS_PHONE_DISPLAY}</a>
                        {' '}· <a href={`mailto:${BUSINESS_EMAIL}`} style={{ color: 'inherit' }}>{BUSINESS_EMAIL}</a>
                    </p>
                </div>
            </section>

            {/* Where to go instead */}
            <section data-theme="light" style={{ backgroundColor: SAND, color: DARK, padding: 'clamp(4rem, 8vw, 6.5rem) 5%' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    <span style={{ ...eyebrow, opacity: 0.55 }}>Try one of these</span>
                    <p
                        style={{
                            fontFamily: HELVETICA,
                            fontSize: 'clamp(1.6rem, 3.6vw, 2.5rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.025em',
                            textTransform: 'uppercase',
                            lineHeight: 1.05,
                            margin: '0.9rem 0 3rem',
                            maxWidth: 760,
                        }}
                    >
                        Where most people were headed
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '2.5rem 3rem' }}>
                        <LinkList heading="What we build" links={build} />
                        <LinkList heading="Costs and guides" links={guides} />
                        <LinkList heading="Nexona" links={company} />
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
