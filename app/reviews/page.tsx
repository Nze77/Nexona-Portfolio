import type { Metadata } from 'next'
import Link from 'next/link'
import StickyHeader from '../components/StickyHeader'
import Footer from '../components/Footer'
import BlogCta from '../components/BlogCta'
import ReviewsJsonLd from '../components/ReviewsJsonLd'
import { REVIEWS, businessInline, reviewerCredit, type Review } from '../data/reviews'
import { DARK, SAND, HELVETICA, INTER, CLUTCH_URL, GBP_URL, SITE_URL } from '../lib/constants'
import styles from './reviews.module.css'

const TITLE = 'Client Reviews | Nexona Labs'
const DESCRIPTION =
    'Unedited reviews from businesses Nexona Labs built custom software, mobile apps and automation for. Who they are, what we built, and what changed.'

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: '/reviews' },
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: `${SITE_URL}/reviews`,
        siteName: 'Nexona',
        type: 'website',
        locale: 'en_US',
        images: [{ url: `${SITE_URL}/logo.png`, width: 1080, height: 1080, alt: TITLE }],
    },
    twitter: {
        card: 'summary',
        title: TITLE,
        description: DESCRIPTION,
        images: [`${SITE_URL}/logo.png`],
    },
}

/* ── Shared type styles ─────────────────────────────────────────────────── */

const EYEBROW: React.CSSProperties = {
    fontFamily: INTER,
    fontSize: '0.72rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    opacity: 0.55,
}

const DT: React.CSSProperties = { ...EYEBROW, fontSize: '0.68rem', marginBottom: '0.3rem' }
const DD: React.CSSProperties = { fontFamily: INTER, fontSize: '0.95rem', lineHeight: 1.5, margin: 0 }
const RULE = '1px solid rgba(46,42,38,0.18)'

export default function ReviewsPage() {
    const named = REVIEWS.filter((r) => r.businessIsNamed).length

    return (
        <main style={{ backgroundColor: SAND, color: DARK, minHeight: '100vh' }}>
            <ReviewsJsonLd />
            <StickyHeader theme="light" />

            <section data-theme="light" style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 5% 5rem' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    {/* ── Header ─────────────────────────────────────────── */}
                    <header style={{ maxWidth: 820 }}>
                        <h1
                            style={{
                                fontFamily: HELVETICA,
                                fontSize: 'clamp(3rem, 8vw, 6rem)',
                                fontWeight: 800,
                                letterSpacing: '-0.04em',
                                textTransform: 'uppercase',
                                lineHeight: 0.9,
                                margin: 0,
                            }}
                        >
                            Reviews
                        </h1>
                        <p style={{ fontFamily: INTER, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '1.5rem', opacity: 0.6 }}>
                            From the people running on what we built.
                        </p>
                        <p style={{ fontFamily: INTER, fontSize: 'clamp(1rem, 1.6vw, 1.15rem)', lineHeight: 1.7, marginTop: '2rem', opacity: 0.85 }}>
                            This is what Nexona Labs clients say about working with us. Word for word. We
                            don&rsquo;t edit the text or fix the grammar, and we don&rsquo;t cut the long ones down.
                            A few clients asked to keep their name off &mdash; those reviews say so, and still tell
                            you the business and what we built, which is the bit you probably came for.
                        </p>

                        <dl
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '1rem 2.5rem',
                                margin: '2.5rem 0 0',
                                paddingTop: '1.5rem',
                                borderTop: RULE,
                            }}
                        >
                            <div>
                                <dt style={DT}>Reviews</dt>
                                <dd style={{ ...DD, fontFamily: HELVETICA, fontSize: '1.6rem', fontWeight: 800 }}>{REVIEWS.length}</dd>
                            </div>
                            <div>
                                <dt style={DT}>Named clients</dt>
                                <dd style={{ ...DD, fontFamily: HELVETICA, fontSize: '1.6rem', fontWeight: 800 }}>{named}</dd>
                            </div>
                            <div>
                                <dt style={DT}>Also reviewed on</dt>
                                <dd style={{ ...DD, fontSize: '1rem', paddingTop: '0.35rem' }}>
                                    <a href={CLUTCH_URL} target="_blank" rel="noopener noreferrer" className={styles.link}>Clutch</a>
                                    {' · '}
                                    <a href={GBP_URL} target="_blank" rel="noopener noreferrer" className={styles.link}>Google</a>
                                </dd>
                            </div>
                        </dl>
                    </header>

                    {/* ── Index — only worth showing once there is more than one ── */}
                    {REVIEWS.length > 1 && (
                        <nav aria-label="Reviews on this page" style={{ marginTop: '3.5rem' }}>
                            <h2 style={{ ...EYEBROW, margin: '0 0 1rem' }}>On this page</h2>
                            <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '0.6rem 1.75rem' }}>
                                {REVIEWS.map((r) => (
                                    <li key={r.id} style={{ fontFamily: INTER, fontSize: '0.95rem' }}>
                                        <a href={`#${r.id}`} className={styles.link}>
                                            {r.business}
                                            {r.reviewer ? ` — ${r.reviewer}` : ''}
                                        </a>
                                    </li>
                                ))}
                            </ol>
                        </nav>
                    )}

                    {/* ── Reviews ─────────────────────────────────────────── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', marginTop: '4rem' }}>
                        {REVIEWS.map((r) => (
                            <ReviewCard key={r.id} review={r} />
                        ))}
                    </div>

                    <div style={{ maxWidth: 820 }}>
                        <BlogCta
                            heading="Want something built around how you run?"
                            text="Tell us what eats your week. We'll tell you, straight, whether custom software fixes it or a ready-made tool would do."
                        />
                        <p style={{ fontFamily: INTER, fontSize: '0.9rem', marginTop: '2rem', opacity: 0.7 }}>
                            Or look at the work first: <Link href="/projects" className={styles.link}>projects</Link>.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}

/* ── One review ─────────────────────────────────────────────────────────── */

function ReviewCard({ review: r }: { review: Review }) {
    const headingId = `${r.id}-heading`

    return (
        <article id={r.id} aria-labelledby={headingId} className={styles.card}>
            {/* Who, where, what — as a definition list so it reads as facts,
                not decoration, to a parser as much as to a person. */}
            <aside className={styles.aside}>
                <div>
                    <p style={{ ...EYEBROW, margin: '0 0 0.6rem' }}>{r.industry ?? (r.businessIsNamed ? 'Client' : 'Client name withheld')}</p>
                    <h2
                        id={headingId}
                        style={{
                            fontFamily: HELVETICA,
                            fontSize: 'clamp(1.6rem, 3vw, 2.1rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.025em',
                            lineHeight: 1.05,
                            margin: 0,
                        }}
                    >
                        {r.business}
                    </h2>
                </div>

                {r.highlight && (
                    <div>
                        <p style={{ fontFamily: HELVETICA, fontSize: 'clamp(2.2rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1, margin: 0 }}>
                            {r.highlight.value}
                        </p>
                        <p style={{ ...EYEBROW, margin: '0.5rem 0 0' }}>{r.highlight.label}</p>
                    </div>
                )}

                <dl style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                    <div>
                        <dt style={DT}>Reviewer</dt>
                        <dd style={DD}>
                            {reviewerCredit(r) ?? <span style={{ fontStyle: 'italic', opacity: 0.75 }}>Name withheld at the client&rsquo;s request</span>}
                        </dd>
                    </div>
                    {r.role && r.reviewer && (
                        <div>
                            <dt style={DT}>Role</dt>
                            <dd style={DD}>{r.role}</dd>
                        </div>
                    )}
                    {r.location && (
                        <div>
                            <dt style={DT}>Location</dt>
                            <dd style={DD}>{r.location}</dd>
                        </div>
                    )}
                    <div>
                        <dt style={DT}>What we built</dt>
                        <dd style={DD}>{r.project}</dd>
                    </div>
                    {r.date && (
                        <div>
                            <dt style={DT}>Date</dt>
                            <dd style={DD}>
                                <time dateTime={r.date}>
                                    {new Date(r.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </time>
                            </dd>
                        </div>
                    )}
                    {r.service && (
                        <div>
                            <dt style={DT}>Related</dt>
                            <dd style={DD}>
                                <Link href={r.service.href} className={styles.link}>{r.service.name}</Link>
                            </dd>
                        </div>
                    )}
                </dl>
            </aside>

            <figure style={{ margin: 0, minWidth: 0 }}>
                <p
                    aria-hidden="true"
                    style={{
                        fontFamily: HELVETICA,
                        fontSize: 'clamp(1.35rem, 2.6vw, 1.9rem)',
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        lineHeight: 1.25,
                        margin: '0 0 2rem',
                        paddingBottom: '2rem',
                        borderBottom: RULE,
                    }}
                >
                    &ldquo;{r.pullQuote}&rdquo;
                </p>

                <blockquote style={{ margin: 0 }}>
                    {r.body.map((para, i) => (
                        <p key={i} style={{ fontFamily: INTER, fontSize: '1.02rem', lineHeight: 1.8, margin: i === 0 ? 0 : '1.1rem 0 0', opacity: 0.88 }}>
                            {para}
                        </p>
                    ))}
                </blockquote>

                <figcaption style={{ fontFamily: INTER, fontSize: '0.9rem', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span aria-hidden="true" style={{ width: 28, height: 2, backgroundColor: DARK, display: 'inline-block' }} />
                    <span>
                        <cite style={{ fontStyle: 'normal', fontWeight: 700 }}>{reviewerCredit(r) ?? 'Name withheld'}</cite>
                        {/* Role-only credit ("Founder of Valyrian Voice") already names the business. */}
                        {r.reviewer && r.role ? `, ${r.role}` : ''}
                        {r.reviewer || !reviewerCredit(r) ? `, ${businessInline(r)}` : ''}
                        {r.location ? ` · ${r.location.split(',')[0]}` : ''}
                    </span>
                </figcaption>
            </figure>
        </article>
    )
}
