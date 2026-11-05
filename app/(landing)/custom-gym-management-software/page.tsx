'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence } from 'framer-motion'
import LandingHeader from '../../components/LandingHeader'
import ClientStrip from '../../components/ClientStrip'
import ContactOverlay from '../../components/ContactOverlay'
import Footer from '../../components/Footer'
import { useContactPopup } from '../../lib/useContactPopup'
import { DARK, SAND, INTER, CLUTCH_URL } from '../../lib/constants'
import {
    LAST_UPDATED,
    LAST_UPDATED_ISO,
    STARTING_PRICE,
    AIM_RESULTS,
    AIM_FACTS,
    AIM_SCREENS,
    HERO_FACTS,
    PAIN_TO_FIX,
    FEATURES,
    ADD_ONS,
    APP_VIEWS,
    COMPARISON,
    FITNESS_BUSINESSES,
    INTEGRATIONS,
    RENT_ROWS,
    RENT_SOURCE,
    COST_DRIVERS,
    VENDOR_QUESTIONS,
    MARKET_STATS,
    GST_SOURCE,
    FAQ_ITEMS,
} from './content'

// Same palette as the other vertical landing pages.
const TEXT = '#F2EEE8'
const PANEL = '#25221F'
const LINE = 'rgba(232,223,211,0.14)'
const MONTSERRAT = 'var(--font-montserrat), sans-serif'

const H2: React.CSSProperties = {
    fontFamily: MONTSERRAT,
    fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
    fontWeight: 800,
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
    textTransform: 'uppercase',
    margin: 0,
}

const EYEBROW: React.CSSProperties = {
    fontFamily: INTER,
    fontSize: '0.8rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    fontWeight: 700,
    opacity: 0.55,
    display: 'block',
    marginBottom: '1rem',
}

const LEAD: React.CSSProperties = {
    fontFamily: INTER,
    fontSize: 'clamp(1rem, 1.35vw, 1.15rem)',
    lineHeight: 1.7,
    letterSpacing: '0.01em',
}

const H3: React.CSSProperties = {
    fontFamily: INTER,
    fontSize: '1.05rem',
    fontWeight: 700,
    letterSpacing: '0.01em',
    margin: 0,
}

const CARD: React.CSSProperties = {
    border: `1px solid ${LINE}`,
    borderRadius: '1.25rem',
    padding: '1.75rem 1.5rem',
    backgroundColor: 'rgba(232,223,211,0.03)',
}

const CARD_BODY: React.CSSProperties = {
    fontSize: '0.92rem',
    lineHeight: 1.65,
    opacity: 0.72,
    marginTop: '0.7rem',
    marginBottom: 0,
}

const INLINE_LINK: React.CSSProperties = {
    color: SAND,
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
}

const CTA: React.CSSProperties = {
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
    padding: '1.2rem 1.25rem 1.2rem 0',
    borderBottom: '1px solid rgba(232,223,211,0.1)',
    fontSize: '0.93rem',
    lineHeight: 1.6,
    verticalAlign: 'top',
}

const SCREEN_FRAME: React.CSSProperties = {
    border: `1px solid ${LINE}`,
    borderRadius: '1rem',
    overflow: 'hidden',
    boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
}

const FIGCAPTION: React.CSSProperties = {
    fontSize: '0.88rem',
    lineHeight: 1.6,
    opacity: 0.62,
    marginTop: '0.9rem',
    maxWidth: '760px',
}

const SR_ONLY: React.CSSProperties = {
    position: 'absolute',
    width: 1,
    height: 1,
    overflow: 'hidden',
    clip: 'rect(0 0 0 0)',
}

export default function CustomGymManagementSoftwarePage() {
    const [isMobile, setIsMobile] = useState(false)
    // Shared across every landing page: the form opens after 20s on the page or
    // once the visitor scrolls to the third section, whichever comes first.
    const { triggerRef: thirdSectionRef, contactOpen, openContact, closeContact, trigger } =
        useContactPopup<HTMLElement>()

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    const pad = isMobile ? '4rem 5%' : '7rem 8%'
    const grid = (desktopCols: number, gap = '1.25rem'): React.CSSProperties => ({
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : `repeat(${desktopCols}, 1fr)`,
        gap,
    })

    return (
        <main style={{ backgroundColor: DARK, color: TEXT, fontFamily: INTER }}>
            <LandingHeader theme="dark" onContactClick={openContact} />

            {/* Hero. The H1 and the first sentence both open on the exact primary keyword. */}
            <section data-theme="dark" style={{ padding: isMobile ? '4rem 5% 3rem' : '7rem 8% 4rem' }}>
                <div style={{ maxWidth: '1100px' }}>
                    <nav aria-label="Breadcrumb" style={{ fontSize: '0.8rem', opacity: 0.55, marginBottom: '1.25rem' }}>
                        <Link href="/" style={{ color: 'inherit' }}>Home</Link>
                        <span aria-hidden="true"> / </span>
                        <span>Custom Gym Management Software</span>
                        <span aria-hidden="true"> · </span>
                        <span>
                            Last updated <time dateTime={LAST_UPDATED_ISO}>{LAST_UPDATED}</time>
                        </span>
                    </nav>
                    <h1
                        style={{
                            fontFamily: MONTSERRAT,
                            fontSize: 'clamp(2.1rem, 5.5vw, 4.25rem)',
                            fontWeight: 800,
                            lineHeight: 1.03,
                            letterSpacing: '-0.03em',
                            margin: 0,
                            maxWidth: '980px',
                        }}
                    >
                        Custom Gym Management Software for Indian Gyms and Fitness Studios
                    </h1>
                    <p style={{ ...LEAD, marginTop: '1.75rem', maxWidth: '700px', opacity: 0.88 }}>
                        Custom gym management software from Nexona Labs puts your members, renewals, attendance and
                        payments in one system you own. No register. No monthly rent. We built one for Aim Fitness in
                        Thane West, and renewals there are up 88%. Run a Pilates or yoga studio, an academy or a
                        pool?{' '}
                        <a href="#fitness-management-system" style={INLINE_LINK}>We build those too</a>.
                    </p>

                    <div
                        style={{
                            marginTop: '1.75rem',
                            maxWidth: '700px',
                            borderLeft: `2px solid ${SAND}`,
                            paddingLeft: '1.25rem',
                        }}
                    >
                        <p style={{ fontSize: '0.98rem', lineHeight: 1.7, opacity: 0.78, margin: 0 }}>
                            <strong>A gym management system</strong> is one piece of software that runs the business
                            side of a gym: member records, plans, renewals, attendance, payments and follow-ups. For
                            Indian gyms it also has to handle GST, UPI, WhatsApp and whichever biometric machine is
                            already bolted to your wall. Studios and chains often call the same thing a fitness
                            management system.
                        </p>
                    </div>

                    <p style={{ fontSize: '0.92rem', lineHeight: 1.65, opacity: 0.62, marginTop: '1.25rem', maxWidth: '700px' }}>
                        Nexona Labs is a Mumbai-based software studio that builds custom gym management software, ERPs
                        and CRMs for Indian businesses, and hands over the source code when it is done.
                    </p>

                    <div style={{ marginTop: '2.25rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <button type="button" onClick={openContact} style={CTA}>
                            Get a free gym workflow audit
                        </button>
                        <a
                            href="#aim-fitness"
                            style={{
                                ...CTA,
                                backgroundColor: 'transparent',
                                color: TEXT,
                                border: '1px solid rgba(232,223,211,0.35)',
                            }}
                        >
                            See the Aim Fitness build
                        </a>
                    </div>

                    <dl
                        style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
                            gap: isMobile ? '1.25rem' : '2rem',
                            marginTop: '3.5rem',
                            paddingTop: '2rem',
                            borderTop: `1px solid ${LINE}`,
                            marginBottom: 0,
                        }}
                    >
                        {HERO_FACTS.map((fact) => (
                            <div key={fact.label}>
                                <dt style={{ fontFamily: MONTSERRAT, fontSize: 'clamp(1.15rem, 2vw, 1.5rem)', fontWeight: 800 }}>
                                    {fact.value}
                                </dt>
                                <dd style={{ margin: '0.35rem 0 0', fontSize: '0.85rem', opacity: 0.6 }}>{fact.label}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            {/* Proof, early. A real, named gym is the thing competing pages don't have. */}
            <section
                id="aim-fitness"
                data-theme="dark"
                style={{ backgroundColor: PANEL, padding: pad, scrollMarginTop: '5rem' }}
            >
                <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Real client · Thane West</span>
                    <h2 style={H2}>What changed at Aim Fitness?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '720px', opacity: 0.85 }}>
                        Renewals went up 88%. The front desk got eight to twelve hours a week back. The same desk that
                        was straining at under 90 members now handles more than 500.
                    </p>

                    <figure style={{ margin: '2.5rem 0 0' }}>
                        <div style={SCREEN_FRAME}>
                            <Image
                                src={AIM_SCREENS.dashboard.src}
                                width={AIM_SCREENS.dashboard.width}
                                height={AIM_SCREENS.dashboard.height}
                                sizes="(max-width: 768px) 90vw, 1150px"
                                priority
                                alt={AIM_SCREENS.dashboard.alt}
                                style={{ width: '100%', height: 'auto', display: 'block' }}
                            />
                        </div>
                        <figcaption style={FIGCAPTION}>{AIM_SCREENS.dashboard.caption}</figcaption>
                    </figure>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : '0.8fr 1.2fr',
                            gap: isMobile ? '2.5rem' : '4rem',
                            alignItems: 'start',
                            marginTop: '3rem',
                        }}
                    >
                        <div style={{ ...CARD, padding: isMobile ? '2rem 1.5rem' : '2.25rem 2rem' }}>
                            {/* Sand tile: the logo's lettering is dark and vanishes on this card. */}
                            <div
                                style={{
                                    width: '124px',
                                    height: '124px',
                                    borderRadius: '1rem',
                                    backgroundColor: SAND,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Image
                                    src="/logos/aimfitness.png"
                                    width={150}
                                    height={150}
                                    alt="Aim Fitness gym logo, Thane West, a Nexona Labs client"
                                    style={{ width: '112px', height: '112px', objectFit: 'contain' }}
                                />
                            </div>
                            <h3 style={{ ...H3, fontFamily: MONTSERRAT, fontSize: '1.25rem', fontWeight: 800, textTransform: 'uppercase', marginTop: '1.25rem' }}>
                                Aim Fitness
                            </h3>
                            <address style={{ fontSize: '0.92rem', lineHeight: 1.65, opacity: 0.62, fontStyle: 'normal', marginTop: '0.6rem' }}>
                                In front of TMC School, Pada No. 2,<br />
                                Lokmanya Nagar, Thane West,<br />
                                Thane, Maharashtra 400606
                            </address>
                            <dl
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1.25rem',
                                    margin: '1.75rem 0',
                                    padding: '1.75rem 0',
                                    borderTop: `1px solid ${LINE}`,
                                    borderBottom: `1px solid ${LINE}`,
                                }}
                            >
                                {AIM_RESULTS.map((r) => (
                                    <div key={r.label}>
                                        <dt style={{ fontFamily: MONTSERRAT, fontSize: '1.7rem', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                                            {r.value}
                                        </dt>
                                        <dd style={{ margin: '0.35rem 0 0', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.55 }}>
                                            {r.label}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                            <dl style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                                {AIM_FACTS.map(([k, v]) => (
                                    <div key={k}>
                                        <dt style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.5 }}>{k}</dt>
                                        <dd style={{ margin: '0.3rem 0 0', fontSize: '0.95rem', lineHeight: 1.5, opacity: 0.85 }}>{v}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>

                        <div>
                            <h3 style={{ ...H3, fontSize: isMobile ? '1.15rem' : '1.3rem', lineHeight: 1.35 }}>
                                Before: a register, a spreadsheet, somebody&rsquo;s phone
                            </h3>
                            <p style={{ ...LEAD, marginTop: '0.9rem', opacity: 0.76 }}>
                                Memberships sat in a register at the desk. Renewal dates sat in a spreadsheet that one
                                person kept up. Follow-ups went out on WhatsApp from that person&rsquo;s own phone, so
                                they happened when that person remembered. Nothing unusual. Most growing gyms look like
                                this, right up to the point where the member count stops fitting in anyone&rsquo;s head.
                            </p>
                            <h3 style={{ ...H3, fontSize: isMobile ? '1.15rem' : '1.3rem', lineHeight: 1.35, marginTop: '2.25rem' }}>
                                What we built
                            </h3>
                            <p style={{ ...LEAD, marginTop: '0.9rem', opacity: 0.76 }}>
                                A custom gym management system with a CRM underneath it. Members, plans, payments and
                                attendance in one place. Renewal dates that show up before they pass. Follow-ups on a
                                schedule, from the gym&rsquo;s number, that stop the moment someone responds. We came to
                                site to build it, because the real process lives at the desk. It runs on their own
                                infrastructure, and the code is theirs.
                            </p>
                            <h3 style={{ ...H3, fontSize: isMobile ? '1.15rem' : '1.3rem', lineHeight: 1.35, marginTop: '2.25rem' }}>
                                What we will and won&rsquo;t take credit for
                            </h3>
                            <p style={{ ...LEAD, marginTop: '0.9rem', opacity: 0.76 }}>
                                The members, no. Going from under 90 to over 500 is Aim Fitness&rsquo;s doing. They
                                built the gym and ran the marketing. What the software did was stop the admin growing
                                with it, so nobody had to be hired to chase renewals. The 88% we will claim. Well,
                                mostly. That number comes down to a date surfacing before it passes instead of after.
                            </p>
                            <p style={{ fontSize: '0.92rem', lineHeight: 1.7, opacity: 0.62, marginTop: '1.5rem' }}>
                                A small business, not an enterprise rollout. If you run one gym in one building, this is
                                the closest comparison you will find. More of our work is on the{' '}
                                <Link href="/projects" style={INLINE_LINK}>projects page</Link>.
                            </p>
                        </div>
                    </div>

                    <div style={{ ...grid(2, '2rem'), marginTop: isMobile ? '3rem' : '4rem' }}>
                        {[AIM_SCREENS.expiring, AIM_SCREENS.attendance].map((screen) => (
                            <figure key={screen.src} style={{ margin: 0 }}>
                                <div style={SCREEN_FRAME}>
                                    <Image
                                        src={screen.src}
                                        width={screen.width}
                                        height={screen.height}
                                        sizes="(max-width: 768px) 90vw, 560px"
                                        alt={screen.alt}
                                        style={{ width: '100%', height: 'auto', display: 'block' }}
                                    />
                                </div>
                                <figcaption style={FIGCAPTION}>
                                    <strong>{screen.title}. </strong>
                                    {screen.caption}
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </section>

            <ClientStrip />

            {/* What is it. The definitional section answer engines lift. */}
            <section data-theme="dark" style={{ padding: pad }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <span style={EYEBROW}>The short answer</span>
                    <h2 style={H2}>What is custom gym management software?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', opacity: 0.85 }}>
                        It is a gym management system built for one business, around its own plans and its own front
                        desk, instead of a shared product you rent by the month. You pay for the build. You own the
                        result.
                    </p>
                    <div style={{ ...grid(2, isMobile ? '1.25rem' : '2rem'), marginTop: '2.5rem' }}>
                        <div style={CARD}>
                            <h3 style={H3}>Ready-made gym software</h3>
                            <p style={CARD_BODY}>
                                Same product for every gym, a monthly fee, live within days. The right answer for plenty
                                of single gyms. You work the way the settings page lets you.
                            </p>
                        </div>
                        <div style={{ ...CARD, borderColor: 'rgba(232,223,211,0.35)' }}>
                            <h3 style={H3}>Custom gym management software</h3>
                            <p style={CARD_BODY}>
                                Built around how you actually sell and renew. No per-member or per-branch fee, source
                                code and data handed over. Takes weeks, not days. This is what we build.
                            </p>
                        </div>
                    </div>
                    <p style={{ ...LEAD, marginTop: '2rem', opacity: 0.72, maxWidth: '760px' }}>
                        Gym management software, gym management system, gym CRM, fitness management system. You will
                        see all four. Vendors use them almost interchangeably, so ask what it does instead of what it
                        is called.
                    </p>
                </div>
            </section>

            {/* Pain to fix. One of the two contact-popup triggers. */}
            <section ref={thirdSectionRef} data-theme="dark" style={{ backgroundColor: PANEL, padding: pad }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Pain to fix</span>
                    <h2 style={H2}>What problems does a gym management system fix?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '700px', opacity: 0.78 }}>
                        Missed renewals, first. Churn in a gym is rarely dramatic. A plan lapses, nobody rings for three
                        weeks, and the member has already paid someone else.
                    </p>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '2.5rem' }}>
                        <caption style={SR_ONLY}>
                            Common gym problems and how gym management software fixes each one
                        </caption>
                        <thead>
                            <tr>
                                <th scope="col" style={TH}>Running it on a register + WhatsApp</th>
                                <th scope="col" style={TH}>With a gym management system</th>
                            </tr>
                        </thead>
                        <tbody>
                            {PAIN_TO_FIX.map((row) => (
                                <tr key={row.pain}>
                                    <td style={{ ...TD, opacity: 0.6, width: '50%' }}>{row.pain}</td>
                                    <td style={{ ...TD, opacity: 0.92 }}>{row.fix}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Features */}
            <section data-theme="light" style={{ backgroundColor: SAND, color: DARK, padding: pad }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <span style={{ ...EYEBROW, opacity: 0.6 }}>Features</span>
                    <h2 style={H2}>What should gym management software do?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '680px', opacity: 0.72 }}>
                        Seven things at the core: members, plans, payments, attendance, renewals, follow-ups and
                        enquiries. These are what run at Aim Fitness today. Start there.
                    </p>
                    <div style={{ ...grid(3, '1.5rem 2rem'), marginTop: '3rem' }}>
                        {FEATURES.map((feature, i) => (
                            <div key={feature.title} style={{ borderTop: '1px solid rgba(46,42,38,0.18)', paddingTop: '1.1rem' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 700, opacity: 0.4, letterSpacing: '0.1em' }}>
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <h3 style={{ fontFamily: INTER, fontSize: '1rem', fontWeight: 700, margin: '0.4rem 0 0' }}>
                                    {feature.title}
                                </h3>
                                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, opacity: 0.72, marginTop: '0.4rem', marginBottom: 0 }}>
                                    {feature.body}
                                </p>
                            </div>
                        ))}
                    </div>
                    <h3 style={{ ...H3, marginTop: '3.25rem' }}>Added when your gym needs it</h3>
                    <ul
                        style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: '1rem 0 0',
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                            gap: '0.6rem 2rem',
                        }}
                    >
                        {ADD_ONS.map((item) => (
                            <li key={item} style={{ fontSize: '0.92rem', lineHeight: 1.6, opacity: 0.75, display: 'flex', gap: '0.6rem' }}>
                                <span aria-hidden="true" style={{ opacity: 0.45 }}>—</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Gym management app */}
            <section data-theme="dark" style={{ padding: pad }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Gym management app</span>
                    <h2 style={H2}>Do you need a gym management app?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '720px', opacity: 0.8 }}>
                        You need one for yourself, soon. Your members can wait. &ldquo;App&rdquo; here really means three
                        different things, and they should not be built in the order most vendors sell them.
                    </p>
                    <div style={{ ...grid(3), marginTop: '2.5rem' }}>
                        {APP_VIEWS.map((item) => (
                            <div key={item.title} style={CARD}>
                                <h3 style={H3}>{item.title}</h3>
                                <p style={CARD_BODY}>{item.body}</p>
                            </div>
                        ))}
                    </div>
                    <p style={{ fontSize: '0.92rem', lineHeight: 1.7, opacity: 0.65, marginTop: '1.75rem', maxWidth: '720px' }}>
                        Everything runs in a phone browser from day one. When you do want a store-listed Android and iOS
                        app, that is{' '}
                        <Link href="/mobile-app-development-company-in-mumbai" style={INLINE_LINK}>
                            our mobile app team
                        </Link>
                        , working off the same data.
                    </p>
                </div>
            </section>

            {/* Comparison */}
            <section data-theme="dark" style={{ backgroundColor: PANEL, padding: pad }}>
                <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Custom vs ready-made vs register</span>
                    <h2 style={H2}>Should you build custom or use ready-made gym software?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '720px', opacity: 0.78 }}>
                        Use ready-made if you run one gym on standard plans. Build custom if you are opening branches,
                        your plans do not fit a template, or you want the system to be yours. Still on a register with
                        60 members? Stay there a little longer. Honestly.
                    </p>

                    {isMobile ? (
                        <div style={{ marginTop: '2rem' }}>
                            {COMPARISON.map((row) => (
                                <div key={row.point} style={{ padding: '1.25rem 0', borderBottom: `1px solid ${LINE}` }}>
                                    <h3 style={{ ...H3, fontSize: '0.98rem' }}>{row.point}</h3>
                                    <p style={{ fontSize: '0.9rem', lineHeight: 1.6, margin: '0.5rem 0 0' }}>
                                        <strong>Custom (Nexona Labs): </strong>
                                        {row.custom}
                                    </p>
                                    <p style={{ fontSize: '0.9rem', lineHeight: 1.6, margin: '0.4rem 0 0', opacity: 0.6 }}>
                                        <strong>Ready-made software: </strong>
                                        {row.rented}
                                    </p>
                                    <p style={{ fontSize: '0.9rem', lineHeight: 1.6, margin: '0.4rem 0 0', opacity: 0.6 }}>
                                        <strong>Register + WhatsApp: </strong>
                                        {row.register}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '2.5rem' }}>
                            <caption style={SR_ONLY}>
                                Custom gym management software compared with ready-made gym software and a paper register
                            </caption>
                            <thead>
                                <tr>
                                    <td style={{ ...TH, width: '16%' }} />
                                    <th scope="col" style={{ ...TH, opacity: 0.85 }}>Custom (Nexona Labs)</th>
                                    <th scope="col" style={TH}>Ready-made software</th>
                                    <th scope="col" style={{ ...TH, paddingRight: 0 }}>Register + WhatsApp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {COMPARISON.map((row) => (
                                    <tr key={row.point}>
                                        <th scope="row" style={{ ...TD, textAlign: 'left', fontWeight: 700 }}>{row.point}</th>
                                        <td style={{ ...TD, opacity: 0.92 }}>{row.custom}</td>
                                        <td style={{ ...TD, opacity: 0.58 }}>{row.rented}</td>
                                        <td style={{ ...TD, opacity: 0.58, paddingRight: 0 }}>{row.register}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </section>

            {/* Best gym software in India. Names the alternatives so the page can answer the question honestly. */}
            <section data-theme="dark" style={{ padding: pad }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Gym management software India</span>
                    <h2 style={H2}>What is the best gym management software in India?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', opacity: 0.85 }}>
                        Depends on the gym. For one location on monthly plans, look at Indian ready-made tools like
                        Easy Gym Software, OkFit and Gymforce. Glofox and Mindbody are the names boutique studios and
                        premium chains usually compare. Good products, with pricing to match.
                    </p>
                    <p style={{ ...LEAD, marginTop: '1rem', opacity: 0.72 }}>
                        We have not run a gym on any of them, so take this as a starting list and not a verdict. Book two
                        demos. Bring your actual biometric model and your strangest plan, the one with the free month and
                        the couple discount, and watch what happens when someone tries to set it up.
                    </p>
                    <p style={{ ...LEAD, marginTop: '1rem', opacity: 0.72 }}>
                        Neither demo goes well? That is roughly when a call with us makes sense. Want just the renewal
                        and follow-up side, without the rest? See our{' '}
                        <Link href="/customer-retention-management-software" style={INLINE_LINK}>
                            custom CRM
                        </Link>{' '}
                        page.
                    </p>
                </div>
            </section>

            {/* Other fitness businesses: the Pilates, yoga and studio long tail */}
            <section id="fitness-management-system" data-theme="dark" style={{ backgroundColor: PANEL, padding: pad, scrollMarginTop: '5rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Fitness management system</span>
                    <h2 style={H2}>Software for Pilates studios, yoga studios and other fitness businesses</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '740px', opacity: 0.82 }}>
                        We build those too. The spine is the same: client, plan, payment, renewal. What changes is the
                        thing you actually sell, and software built for the wrong unit never quite fits.
                    </p>
                    <p style={{ fontSize: '0.95rem', lineHeight: 1.7, opacity: 0.65, marginTop: '1rem', maxWidth: '740px' }}>
                        Aim Fitness is a gym, and it is the fitness build we can show you today. For anything below we
                        start from the same core and build what differs.
                    </p>
                    <div style={{ ...grid(3), marginTop: '2.75rem' }}>
                        {FITNESS_BUSINESSES.map((item) => (
                            <div key={item.title} style={CARD}>
                                <h3 style={H3}>{item.title}</h3>
                                <p style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.5, margin: '0.6rem 0 0' }}>
                                    Sells: {item.sells}
                                </p>
                                <p style={CARD_BODY}>{item.body}</p>
                            </div>
                        ))}
                    </div>
                    <p style={{ ...LEAD, marginTop: '2.25rem', maxWidth: '740px', opacity: 0.8 }}>
                        Running something odder, like a climbing wall or a kids&rsquo; gymnastics school? Tell us what you
                        sell and how people book it.
                    </p>
                    <button type="button" onClick={openContact} style={{ ...CTA, marginTop: '1.25rem' }}>
                        Tell us what you run
                    </button>
                </div>
            </section>

            {/* Integrations */}
            <section data-theme="dark" style={{ padding: pad }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Integrations</span>
                    <h2 style={H2}>Does it work with WhatsApp, biometric machines, Razorpay and Tally?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '700px', opacity: 0.75 }}>
                        Yes, with one caveat on biometric machines: we check your exact model first. Members keep
                        talking on WhatsApp, pay through UPI links, and your accountant stays in Tally or Zoho Books.
                    </p>
                    <div style={{ ...grid(3), marginTop: '3rem' }}>
                        {INTEGRATIONS.map((item) => (
                            <div key={item.title} style={CARD}>
                                <h3 style={H3}>{item.title}</h3>
                                <p style={CARD_BODY}>{item.body}</p>
                            </div>
                        ))}
                    </div>
                    <p style={{ fontSize: '0.92rem', lineHeight: 1.7, opacity: 0.65, marginTop: '1.75rem', maxWidth: '760px' }}>
                        On GST: gym and fitness centre services moved from 18% to 5% without input tax credit on
                        22 September 2025 (
                        <a href={GST_SOURCE.href} target="_blank" rel="noopener noreferrer" style={INLINE_LINK}>
                            {GST_SOURCE.name}
                        </a>
                        ). Plenty of pages still say 18%. Ask your CA what applies to you.
                    </p>
                </div>
            </section>

            {/* Cost: our starting price, then named market figures */}
            <section id="cost" data-theme="dark" style={{ backgroundColor: PANEL, padding: pad, scrollMarginTop: '5rem' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Cost</span>
                    <h2 style={H2}>How much does gym management software cost in India?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '740px', opacity: 0.82 }}>
                        Custom gym management software from Nexona Labs starts from {STARTING_PRICE}. Renting a
                        ready-made tool costs roughly ₹1,000 to ₹25,000 or more a month. A two-module gym and a
                        five-branch franchise are not the same project, so we scope yours, then quote it before we start.
                    </p>

                    <div style={{ ...CARD, marginTop: '2.25rem', maxWidth: '640px', padding: isMobile ? '1.75rem 1.5rem' : '2rem 2.25rem' }}>
                        <span style={{ ...EYEBROW, marginBottom: '0.5rem' }}>Custom gym software, starting from</span>
                        <p
                            style={{
                                fontFamily: MONTSERRAT,
                                fontSize: 'clamp(2.5rem, 5.5vw, 3.5rem)',
                                fontWeight: 800,
                                letterSpacing: '-0.03em',
                                lineHeight: 1,
                                margin: 0,
                            }}
                        >
                            {STARTING_PRICE}
                        </p>
                        <p style={{ ...CARD_BODY, fontSize: '0.98rem', marginTop: '1rem' }}>
                            Your final price depends on what your gym needs. No per-member fee, and the code is yours.
                        </p>
                        <button type="button" onClick={openContact} style={{ ...CTA, marginTop: '1.25rem' }}>
                            Get your number
                        </button>
                    </div>

                    <div
                        style={{
                            marginTop: '2.5rem',
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : '1.1fr 0.9fr',
                            gap: isMobile ? '2.5rem' : '3.5rem',
                            alignItems: 'start',
                        }}
                    >
                        <div>
                            <h3 style={H3}>What renting costs over five years</h3>
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1.25rem' }}>
                                <caption style={{ textAlign: 'left', fontSize: '0.8rem', lineHeight: 1.55, opacity: 0.55, captionSide: 'bottom', paddingTop: '1rem' }}>
                                    Monthly ranges from{' '}
                                    <a href={RENT_SOURCE.href} target="_blank" rel="noopener noreferrer" style={INLINE_LINK}>
                                        {RENT_SOURCE.name}
                                    </a>
                                    , a vendor&rsquo;s own estimate, not a survey. Five-year figures are our arithmetic
                                    (monthly × 60), before GST, WhatsApp and payment gateway charges.
                                </caption>
                                <thead>
                                    <tr>
                                        <th scope="col" style={TH}>Gym size</th>
                                        <th scope="col" style={TH}>Per month</th>
                                        <th scope="col" style={{ ...TH, paddingRight: 0 }}>Over 5 years</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {RENT_ROWS.map((row) => (
                                        <tr key={row.size}>
                                            <th scope="row" style={{ ...TD, textAlign: 'left', fontWeight: 500, opacity: 0.85 }}>{row.size}</th>
                                            <td style={{ ...TD, opacity: 0.7 }}>{row.monthly}</td>
                                            <td style={{ ...TD, fontWeight: 700, paddingRight: 0 }}>{row.fiveYears}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <p style={{ ...CARD_BODY, fontSize: '0.95rem', marginTop: '1.5rem' }}>
                                A ₹3,500-a-month tool reaches {STARTING_PRICE} in about six months. That comparison only
                                holds if your build stays near the starting price, so get the full quote first. Rent climbs
                                with your member count. A system you own does not send a new bill because you had a good
                                January.
                            </p>
                        </div>

                        <div>
                            <h3 style={H3}>What moves the price up from {STARTING_PRICE}</h3>
                            <div style={{ marginTop: '0.5rem' }}>
                                {COST_DRIVERS.map((d) => (
                                    <div key={d.title} style={{ borderBottom: `1px solid ${LINE}`, padding: '1rem 0' }}>
                                        <h4 style={{ ...H3, fontSize: '0.95rem' }}>{d.title}</h4>
                                        <p style={{ ...CARD_BODY, marginTop: '0.35rem' }}>{d.body}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <h3 style={{ ...H3, marginTop: '3rem' }}>Five questions to ask any gym software vendor, us included</h3>
                    <ol style={{ margin: '1rem 0 0', paddingLeft: '1.25rem', maxWidth: '760px' }}>
                        {VENDOR_QUESTIONS.map((q) => (
                            <li key={q} style={{ fontSize: '0.95rem', lineHeight: 1.65, opacity: 0.75, marginBottom: '0.5rem' }}>
                                {q}
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Market numbers: third-party, attributed */}
            <section data-theme="dark" style={{ padding: pad }}>
                <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
                    <span style={EYEBROW}>By the numbers</span>
                    <h2 style={H2}>How big is India&rsquo;s fitness market?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '700px', opacity: 0.78 }}>
                        Set to more than double by 2030. And mostly not premium chains. Three figures from the
                        Deloitte and Health &amp; Fitness Association report.
                    </p>
                    <div style={{ ...grid(3), marginTop: '3rem' }}>
                        {MARKET_STATS.map((stat) => (
                            <figure key={stat.value} style={{ ...CARD, margin: 0, display: 'flex', flexDirection: 'column' }}>
                                <p
                                    style={{
                                        fontFamily: MONTSERRAT,
                                        fontSize: 'clamp(1.75rem, 3.4vw, 2.5rem)',
                                        fontWeight: 800,
                                        letterSpacing: '-0.02em',
                                        lineHeight: 1,
                                        margin: 0,
                                    }}
                                >
                                    {stat.value}
                                </p>
                                <p style={{ ...CARD_BODY, marginTop: '1rem' }}>{stat.label}</p>
                                <figcaption style={{ fontSize: '0.8rem', opacity: 0.55, marginTop: 'auto', paddingTop: '1rem' }}>
                                    Source:{' '}
                                    <a href={stat.href} target="_blank" rel="noopener noreferrer" style={INLINE_LINK}>
                                        {stat.source}
                                    </a>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ: every answer rendered open, no accordion, so nothing is hidden */}
            <section data-theme="dark" style={{ backgroundColor: PANEL, padding: pad }}>
                <div style={{ maxWidth: '860px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Questions</span>
                    <h2 style={H2}>Gym management software questions, answered straight</h2>
                    <div style={{ marginTop: '2.5rem' }}>
                        {FAQ_ITEMS.map((faq) => (
                            <div key={faq.question} style={{ borderTop: `1px solid ${LINE}`, padding: '1.5rem 0' }}>
                                <h3 style={{ ...H3, fontSize: '1.02rem', lineHeight: 1.45 }}>{faq.question}</h3>
                                <p style={{ fontSize: '0.95rem', lineHeight: 1.7, opacity: 0.72, margin: '0.6rem 0 0', maxWidth: '700px' }}>
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                    <p style={{ fontSize: '0.92rem', lineHeight: 1.7, opacity: 0.65, marginTop: '1.5rem' }}>
                        Not only a gym? See how we approach{' '}
                        <Link href="/business-management-software-development" style={INLINE_LINK}>
                            custom business management software
                        </Link>{' '}
                        more generally.
                    </p>
                </div>
            </section>

            {/* Author + trust */}
            <section data-theme="dark" style={{ padding: isMobile ? '3.5rem 5%' : '5rem 8%' }}>
                <div
                    style={{
                        maxWidth: '860px',
                        margin: '0 auto',
                        ...CARD,
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        gap: '1.5rem',
                        alignItems: isMobile ? 'flex-start' : 'center',
                    }}
                >
                    <Image
                        src="/logo.png"
                        width={64}
                        height={64}
                        alt="Nexona Labs logo"
                        style={{ borderRadius: '0.75rem', flexShrink: 0 }}
                    />
                    <div>
                        <p style={{ ...EYEBROW, marginBottom: '0.4rem' }}>Written by</p>
                        <p style={{ ...H3, margin: 0 }}>The Nexona Labs team</p>
                        <p style={{ ...CARD_BODY, marginTop: '0.5rem' }}>
                            A Mumbai software studio building custom ERPs, CRMs and gym management systems for Indian
                            businesses. 50+ systems shipped. Last updated{' '}
                            <time dateTime={LAST_UPDATED_ISO}>{LAST_UPDATED}</time>.
                        </p>
                        <p style={{ fontSize: '0.88rem', marginTop: '0.75rem', marginBottom: 0, display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                            <a href="https://www.linkedin.com/company/nexonalabs" target="_blank" rel="noopener noreferrer" style={INLINE_LINK}>
                                LinkedIn
                            </a>
                            <a href={CLUTCH_URL} target="_blank" rel="noopener noreferrer" style={INLINE_LINK}>
                                Reviews on Clutch
                            </a>
                        </p>
                    </div>
                </div>
            </section>

            {/* Close */}
            <section data-theme="dark" style={{ backgroundColor: PANEL, padding: pad, textAlign: 'center' }}>
                <div style={{ maxWidth: '720px', margin: '0 auto' }}>
                    <h2 style={H2}>Get a free gym workflow audit</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', opacity: 0.8 }}>
                        Thirty minutes. Walk us through how one member goes from enquiry to renewal today, and we will
                        show you where renewals leak, what we would build first, and what it costs. If a ready-made tool
                        would do the job, we will say that too.
                    </p>
                    <div style={{ marginTop: '2.25rem' }}>
                        <button type="button" onClick={openContact} style={CTA}>
                            Book the audit
                        </button>
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {contactOpen && (
                    <ContactOverlay
                        trigger={trigger}
                        heading="Book your free gym workflow audit"
                        submitLabel="Request a callback"
                        onClose={closeContact}
                    />
                )}
            </AnimatePresence>

            <Footer />
        </main>
    )
}
