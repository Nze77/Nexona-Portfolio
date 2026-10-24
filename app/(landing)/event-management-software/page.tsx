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
    STARTING_PRICE,
    LAST_UPDATED,
    HERO_FACTS,
    PAIN_TO_FIX,
    FEATURES,
    MORE_FEATURES,
    EXAMPLE_RESULTS,
    COMPARISON,
    INTEGRATIONS,
    OTHER_USE_CASES,
    COST_DRIVERS,
    PRICE_ROWS,
    MARKET_STATS,
    FAQ_ITEMS,
} from './content'

// Same palette as the manufacturing-erp landing page.
const TEXT = '#F2EEE8'
const PANEL = '#25221F'
const LINE = 'rgba(232,223,211,0.14)'

const H2: React.CSSProperties = {
    fontFamily: 'var(--font-montserrat), sans-serif',
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

export default function EventManagementSoftwarePage() {
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

            {/* Hero */}
            <section data-theme="dark" style={{ padding: isMobile ? '4rem 5% 3rem' : '7rem 8% 4rem' }}>
                <div style={{ maxWidth: '1100px' }}>
                    <nav aria-label="Breadcrumb" style={{ fontSize: '0.8rem', opacity: 0.55, marginBottom: '1.25rem' }}>
                        <Link href="/" style={{ color: 'inherit' }}>Home</Link>
                        <span aria-hidden="true"> / </span>
                        <span>Event Management Software</span>
                        <span aria-hidden="true"> · </span>
                        <span>
                            Last updated <time dateTime="2026-10-24">{LAST_UPDATED}</time>
                        </span>
                    </nav>
                    <span style={EYEBROW}>Event management software · India</span>
                    <h1
                        style={{
                            fontFamily: 'var(--font-montserrat), sans-serif',
                            fontSize: 'clamp(2.1rem, 5.5vw, 4.25rem)',
                            fontWeight: 800,
                            lineHeight: 1.03,
                            letterSpacing: '-0.03em',
                            margin: 0,
                            maxWidth: '980px',
                        }}
                    >
                        Event Management Software Built for Indian Event Planners
                    </h1>
                    <p style={{ ...LEAD, marginTop: '1.75rem', maxWidth: '700px', opacity: 0.88 }}>
                        Custom event management software from Nexona Labs brings your leads, vendors, budgets and
                        GST invoices into one system, so you can stop running events from WhatsApp and Excel.
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
                            <strong>Event management software</strong> is one system an event company uses to run
                            the business side of every event: enquiries, quotations, vendor bookings and payments,
                            budgets, guest lists, check-in and invoicing. Some call it event planner software. For
                            Indian planners it also has to handle GST invoices, Razorpay payment links and WhatsApp,
                            not a spreadsheet per event and a group chat per vendor.
                        </p>
                    </div>

                    <p style={{ fontSize: '0.92rem', lineHeight: 1.65, opacity: 0.62, marginTop: '1.25rem', maxWidth: '700px' }}>
                        Nexona Labs is a Mumbai-based software studio that builds custom event management systems,
                        ERPs and CRMs for Indian businesses, and hands over the source code when it is done.
                    </p>

                    <div style={{ marginTop: '2.25rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <button type="button" onClick={openContact} style={CTA}>
                            Get a free workflow audit
                        </button>
                        <a
                            href="#pricing"
                            style={{
                                ...CTA,
                                backgroundColor: 'transparent',
                                color: TEXT,
                                border: `1px solid rgba(232,223,211,0.35)`,
                            }}
                        >
                            See pricing
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
                                <dt style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(1.15rem, 2vw, 1.5rem)', fontWeight: 800 }}>
                                    {fact.value}
                                </dt>
                                <dd style={{ margin: '0.35rem 0 0', fontSize: '0.85rem', opacity: 0.6 }}>{fact.label}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            {/* Screenshot — the proof, early */}
            <section data-theme="dark" style={{ padding: isMobile ? '0 5% 4rem' : '0 8% 6rem' }}>
                <figure style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div
                        style={{
                            border: `1px solid ${LINE}`,
                            borderRadius: isMobile ? '0.75rem' : '1.25rem',
                            overflow: 'hidden',
                            boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
                        }}
                    >
                        <Image
                            src="/eventsoftware.png"
                            width={1917}
                            height={973}
                            sizes="(max-width: 768px) 90vw, 1200px"
                            priority
                            alt="Dashboard of an event management system built by Nexona Labs, showing a crew clash alert for 8 November, 12 active events, 38 new leads this month, ₹4.8 lakh in payments due with ₹1.57 lakh overdue, a 27% average margin, upcoming events with payment status, a lead pipeline, margin per event and today's tasks."
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                    </div>
                    <figcaption style={{ fontSize: '0.88rem', lineHeight: 1.6, opacity: 0.6, marginTop: '1rem', maxWidth: '760px' }}>
                        The overview screen of an event management system we built. One login shows every live
                        event, who owes what, which leads are close to booking, margin per event and today&rsquo;s
                        tasks. Note the crew clash at the top: one person booked for two events on 8 November, caught
                        at booking, not on the morning.
                    </figcaption>
                </figure>
            </section>

            <ClientStrip />

            {/* What is it — the definitional section answer engines lift */}
            <section data-theme="dark" style={{ padding: pad }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <span style={EYEBROW}>The short answer</span>
                    <h2 style={H2}>What is event management software?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', opacity: 0.85 }}>
                        Event management software is a single system that tracks an event from the first enquiry to
                        the final invoice. Leads, quotes, vendors, money, guests, tasks. Everything a planner now keeps
                        in WhatsApp, Excel and their head.
                    </p>
                    <div style={{ ...grid(2, isMobile ? '1.25rem' : '2rem'), marginTop: '2.5rem' }}>
                        <div style={CARD}>
                            <h3 style={H3}>Attendee-side platforms</h3>
                            <p style={CARD_BODY}>
                                Cvent, Zoho Backstage, InEvent and Eventbrite. Registration, ticketing, badges,
                                event apps, virtual and hybrid sessions. Built for conference organisers who sell
                                seats to thousands of strangers.
                            </p>
                        </div>
                        <div style={{ ...CARD, borderColor: 'rgba(232,223,211,0.35)' }}>
                            <h3 style={H3}>Business-side event management systems</h3>
                            <p style={CARD_BODY}>
                                Leads, quotations, vendor payments, budget vs actual, crew, guest lists and GST
                                invoices. Built for planners, wedding companies, caterers and agencies who run events
                                for a client. This is what we build.
                            </p>
                        </div>
                    </div>
                    <p style={{ ...LEAD, marginTop: '2rem', opacity: 0.72, maxWidth: '760px' }}>
                        Most of the big names you will find on Google are the first kind. Good products. They just
                        don&rsquo;t care that the decorator wants 50% advance by Thursday, or that the client&rsquo;s
                        CA needs a GST invoice with the right SAC code.
                    </p>
                </div>
            </section>

            {/* Pain to fix — third section, one of the two contact-popup triggers */}
            <section ref={thirdSectionRef} data-theme="dark" style={{ backgroundColor: PANEL, padding: pad }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Pain to fix</span>
                    <h2 style={H2}>What problems does an event management system fix?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '700px', opacity: 0.78 }}>
                        The ones that cost money quietly. Late replies to enquiries, slow quotes, double vendor
                        payments, and finding out a wedding lost money three weeks after it ended.
                    </p>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '2.5rem' }}>
                        <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
                            Common event business problems and how event management software fixes each one
                        </caption>
                        <thead>
                            <tr>
                                <th scope="col" style={TH}>Running it on WhatsApp + Excel</th>
                                <th scope="col" style={TH}>With an event management system</th>
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
                    <h2 style={H2}>What does the event management app do?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '680px', opacity: 0.72 }}>
                        Seven things, done properly. Lead tracking, quotations, vendor payments, budget vs actual,
                        guest RSVPs, check-in and GST invoicing. On a laptop in the office and a phone at the venue,
                        same live data.
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
                    <h3 style={{ ...H3, marginTop: '3.25rem' }}>Also in the system</h3>
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
                        {MORE_FEATURES.map((item) => (
                            <li key={item} style={{ fontSize: '0.92rem', lineHeight: 1.6, opacity: 0.75, display: 'flex', gap: '0.6rem' }}>
                                <span aria-hidden="true" style={{ opacity: 0.45 }}>—</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Worked example with numbers */}
            <section data-theme="dark" style={{ padding: pad }}>
                <div
                    style={{
                        maxWidth: '1100px',
                        margin: '0 auto',
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '0.9fr 1.1fr',
                        gap: isMobile ? '2rem' : '4rem',
                        alignItems: 'start',
                    }}
                >
                    <div>
                        <span style={EYEBROW}>Worked example</span>
                        <h2 style={H2}>What changes in the first six weeks?</h2>
                        <p style={{ ...LEAD, marginTop: '1.25rem', opacity: 0.8 }}>
                            Quotes go out the same afternoon. Money owed to you becomes visible on day one. Here is
                            how that plays out for a Mumbai planner running 12 live events, a mix of weddings and
                            corporate.
                        </p>
                        <p style={{ fontSize: '0.92rem', lineHeight: 1.7, opacity: 0.65, marginTop: '1rem' }}>
                            Week one, leads and quotes. Week three, vendor payments and payment milestones. The
                            ₹1.57 lakh overdue figure in the screenshot is what turns up the first time every
                            invoice sits in one place. It was always there. Nobody had added it up.
                        </p>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <caption style={{ textAlign: 'left', fontSize: '0.8rem', opacity: 0.5, paddingBottom: '1rem', captionSide: 'bottom', paddingTop: '1rem' }}>
                            Worked example based on the system shown above.
                        </caption>
                        <thead>
                            <tr>
                                <th scope="col" style={TH}>Measure</th>
                                <th scope="col" style={TH}>Before</th>
                                <th scope="col" style={{ ...TH, paddingRight: 0 }}>After</th>
                            </tr>
                        </thead>
                        <tbody>
                            {EXAMPLE_RESULTS.map((row) => (
                                <tr key={row.metric}>
                                    <th scope="row" style={{ ...TD, fontWeight: 500, textAlign: 'left', opacity: 0.85 }}>{row.metric}</th>
                                    <td style={{ ...TD, opacity: 0.55, whiteSpace: 'nowrap' }}>{row.before}</td>
                                    <td style={{ ...TD, fontWeight: 700, paddingRight: 0, whiteSpace: 'nowrap' }}>{row.after}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Comparison */}
            <section data-theme="dark" style={{ backgroundColor: PANEL, padding: pad }}>
                <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Custom vs Eventbrite / Cvent vs Excel</span>
                    <h2 style={H2}>Should you use Eventbrite, Cvent or a custom event management system?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '720px', opacity: 0.78 }}>
                        Use Eventbrite or Cvent if you sell tickets or run large conferences. Use a custom system if
                        you run events for clients and your problems are vendors, budgets and invoices. Stay on Excel
                        and WhatsApp if you do fewer than five events a month. Honestly.
                    </p>

                    {isMobile ? (
                        <div style={{ marginTop: '2rem' }}>
                            {COMPARISON.map((row) => (
                                <div key={row.point} style={{ padding: '1.25rem 0', borderBottom: `1px solid ${LINE}` }}>
                                    <h3 style={{ ...H3, fontSize: '0.98rem' }}>{row.point}</h3>
                                    <p style={{ fontSize: '0.9rem', lineHeight: 1.6, margin: '0.5rem 0 0' }}>
                                        <strong>Custom (Nexona Labs): </strong>
                                        {row.nexona}
                                    </p>
                                    <p style={{ fontSize: '0.9rem', lineHeight: 1.6, margin: '0.4rem 0 0', opacity: 0.6 }}>
                                        <strong>Eventbrite / Cvent: </strong>
                                        {row.platforms}
                                    </p>
                                    <p style={{ fontSize: '0.9rem', lineHeight: 1.6, margin: '0.4rem 0 0', opacity: 0.6 }}>
                                        <strong>Excel + WhatsApp: </strong>
                                        {row.excel}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '2.5rem' }}>
                            <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
                                Custom event management system compared with Eventbrite or Cvent and with Excel plus WhatsApp
                            </caption>
                            <thead>
                                <tr>
                                    <td style={{ ...TH, width: '16%' }} />
                                    <th scope="col" style={{ ...TH, opacity: 0.85 }}>Custom (Nexona Labs)</th>
                                    <th scope="col" style={TH}>Eventbrite / Cvent</th>
                                    <th scope="col" style={{ ...TH, paddingRight: 0 }}>Excel + WhatsApp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {COMPARISON.map((row) => (
                                    <tr key={row.point}>
                                        <th scope="row" style={{ ...TD, textAlign: 'left', fontWeight: 700 }}>{row.point}</th>
                                        <td style={{ ...TD, opacity: 0.92 }}>{row.nexona}</td>
                                        <td style={{ ...TD, opacity: 0.58 }}>{row.platforms}</td>
                                        <td style={{ ...TD, opacity: 0.58, paddingRight: 0 }}>{row.excel}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </section>

            {/* ERP or CRM */}
            <section data-theme="dark" style={{ padding: pad }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <span style={EYEBROW}>ERP or CRM</span>
                    <h2 style={H2}>Do I need an ERP or a CRM for my event company?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', opacity: 0.85 }}>
                        Probably both, in one system. A CRM handles the front half: enquiries, follow-ups, site
                        visits, quotes. An ERP handles the back half: vendors, crew, inventory, budgets, invoices.
                    </p>
                    <p style={{ ...LEAD, marginTop: '1rem', opacity: 0.72 }}>
                        Buying them separately is how a booked lead ends up retyped into a second tool, by a
                        coordinator, at 11 pm. Under about 50 events a year, a CRM with quotes and payment tracking
                        is enough. Past that you want the back half too, and you want it joined to the front.
                    </p>
                    <p style={{ ...LEAD, marginTop: '1rem', opacity: 0.72 }}>
                        Already have a CRM you like? Fine. We can build only the back half and connect it. See how we
                        approach{' '}
                        <Link href="/business-management-software-development" style={INLINE_LINK}>
                            custom business management software
                        </Link>
                        {' '}more generally.
                    </p>
                </div>
            </section>

            {/* Wedding planners */}
            <section id="wedding-planners" data-theme="dark" style={{ backgroundColor: PANEL, padding: pad, scrollMarginTop: '5rem' }}>
                <div
                    style={{
                        maxWidth: '1100px',
                        margin: '0 auto',
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                        gap: isMobile ? '2.5rem' : '4rem',
                        alignItems: 'start',
                    }}
                >
                    <div>
                        <span style={EYEBROW}>For wedding planners</span>
                        <h2 style={{ ...H2, fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)' }}>
                            Marriage planner software and wedding CRM, in one
                        </h2>
                        <p style={{ ...LEAD, marginTop: '1.25rem', opacity: 0.82 }}>
                            Indian weddings are five events wearing one name. Haldi, mehendi, sangeet, wedding,
                            reception, each with its own venue, vendors and guest count.
                        </p>
                        <p style={{ ...CARD_BODY, fontSize: '0.95rem' }}>
                            The wedding CRM side tracks the enquiry from the first Instagram DM to the signed quote.
                            The planner side splits the wedding into functions, each with its own budget, vendor list
                            and checklist. Families approve the menu and decor through a client portal instead of a
                            forwarded PDF with fourteen voice notes attached. Guests RSVP by link, rooms get allotted,
                            and the caterer gets a live headcount, not a guess made on Tuesday.
                        </p>
                    </div>
                    <div id="caterers" style={{ scrollMarginTop: '5rem' }}>
                        <span style={EYEBROW}>For caterers</span>
                        <h2 style={{ ...H2, fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)' }}>
                            What should catering management software do?
                        </h2>
                        <p style={{ ...LEAD, marginTop: '1.25rem', opacity: 0.82 }}>
                            Turn a headcount and a menu into a purchase list, a staff roster and an invoice, without
                            three people redoing the maths.
                        </p>
                        <p style={{ ...CARD_BODY, fontSize: '0.95rem' }}>
                            Menus are built from recipes with per-plate costs, so a 700-plate quote shows its margin
                            before it goes out. Final RSVP numbers flow into the kitchen&rsquo;s raw material list.
                            Service staff are rostered per event. Advances and balances are tracked per function, and
                            GST invoices go out with the right rate for outdoor catering. If you cater for planners,
                            not direct, they can see their orders in a portal of their own.
                        </p>
                    </div>
                </div>
            </section>

            {/* Corporate + decor/production */}
            <section data-theme="dark" style={{ padding: pad }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Other event businesses</span>
                    <h2 style={H2}>Does it work for corporate agencies and production houses?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '680px', opacity: 0.78 }}>
                        Yes. The spine is the same: enquiry, quote, vendors, money. What changes is the part that
                        hurts most.
                    </p>
                    <div style={{ ...grid(2), marginTop: '2.5rem' }}>
                        {OTHER_USE_CASES.map((item) => (
                            <div key={item.title} style={CARD}>
                                <h3 style={H3}>{item.title}</h3>
                                <p style={CARD_BODY}>{item.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Integrations */}
            <section data-theme="dark" style={{ backgroundColor: PANEL, padding: pad }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Integrations</span>
                    <h2 style={H2}>Does it work with WhatsApp, Razorpay, Tally and Zoho Books?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '680px', opacity: 0.75 }}>
                        Yes, all four. Your clients keep talking on WhatsApp, pay through Razorpay links, and your
                        accountant keeps working in Tally or Zoho Books. The system sits in the middle.
                    </p>
                    <div style={{ ...grid(3), marginTop: '3rem' }}>
                        {INTEGRATIONS.map((item) => (
                            <div key={item.title} style={CARD}>
                                <h3 style={H3}>{item.title}</h3>
                                <p style={CARD_BODY}>{item.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" data-theme="dark" style={{ padding: pad, scrollMarginTop: '5rem' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Pricing</span>
                    <h2 style={H2}>How much does event management software cost in India?</h2>

                    <div
                        style={{
                            marginTop: '2.5rem',
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : '0.9fr 1.1fr',
                            gap: isMobile ? '2rem' : '3.5rem',
                            alignItems: 'start',
                        }}
                    >
                        <div style={{ ...CARD, padding: isMobile ? '2rem 1.5rem' : '2.5rem 2.25rem' }}>
                            <span style={{ ...EYEBROW, marginBottom: '0.5rem' }}>Custom-built for you, from</span>
                            <p
                                style={{
                                    fontFamily: 'var(--font-montserrat), sans-serif',
                                    fontSize: 'clamp(2.75rem, 6vw, 4rem)',
                                    fontWeight: 800,
                                    letterSpacing: '-0.03em',
                                    lineHeight: 1,
                                    margin: 0,
                                }}
                            >
                                {STARTING_PRICE}
                            </p>
                            <p style={{ ...LEAD, opacity: 0.82, marginTop: '1.25rem', marginBottom: 0 }}>
                                That gets your first core module live, usually lead tracking and quotations, built
                                around how your team already works. Not a template with your logo on it.
                            </p>
                            <p style={{ fontSize: '0.92rem', lineHeight: 1.65, opacity: 0.65, marginTop: '1rem', marginBottom: 0 }}>
                                The full system is scoped after a free workflow audit and each stage is quoted before
                                we start it. No per-user licence. Hire six more coordinators for wedding season and
                                the bill stays where it is.
                            </p>
                            <button type="button" onClick={openContact} style={{ ...CTA, marginTop: '1.75rem' }}>
                                Get your number
                            </button>
                        </div>

                        <div>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
                                    Event management software pricing in India from Nexona Labs
                                </caption>
                                <thead>
                                    <tr>
                                        <th scope="col" style={TH}>What</th>
                                        <th scope="col" style={TH}>Price</th>
                                        <th scope="col" style={{ ...TH, paddingRight: 0 }}>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {PRICE_ROWS.map((row) => (
                                        <tr key={row.item}>
                                            <th scope="row" style={{ ...TD, textAlign: 'left', fontWeight: 500, opacity: 0.85 }}>{row.item}</th>
                                            <td style={{ ...TD, fontWeight: 700 }}>{row.price}</td>
                                            <td style={{ ...TD, opacity: 0.6, paddingRight: 0 }}>{row.time}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <h3 style={{ ...H3, fontSize: '1.05rem', marginTop: '2.5rem' }}>What moves the price up</h3>
                            <div style={{ ...grid(2, '1.25rem 2rem'), marginTop: '1.1rem' }}>
                                {COST_DRIVERS.map((d) => (
                                    <div key={d.title} style={{ borderTop: `1px solid ${LINE}`, paddingTop: '0.9rem' }}>
                                        <h4 style={{ ...H3, fontSize: '0.95rem' }}>{d.title}</h4>
                                        <p style={{ ...CARD_BODY, marginTop: '0.4rem' }}>{d.body}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Market numbers — third-party, attributed */}
            <section data-theme="dark" style={{ backgroundColor: PANEL, padding: pad }}>
                <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
                    <span style={EYEBROW}>By the numbers</span>
                    <h2 style={H2}>How big is the Indian events market?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '700px', opacity: 0.78 }}>
                        Big, growing fast, and run on too many disconnected tools. Three figures worth knowing, from
                        people who counted.
                    </p>
                    <div style={{ ...grid(3), marginTop: '3rem' }}>
                        {MARKET_STATS.map((stat) => (
                            <figure key={stat.value} style={{ ...CARD, margin: 0, display: 'flex', flexDirection: 'column' }}>
                                <p
                                    style={{
                                        fontFamily: 'var(--font-montserrat), sans-serif',
                                        fontSize: 'clamp(2rem, 4vw, 2.75rem)',
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
                    <p style={{ ...LEAD, marginTop: '2.5rem', maxWidth: '720px', opacity: 0.72 }}>
                        Put the first and last together. Lakhs of events a season, and most planners juggling tools
                        that don&rsquo;t talk to each other. That gap is the whole reason this page exists.
                    </p>
                </div>
            </section>

            {/* FAQ — every answer rendered open, no accordion, so nothing is hidden */}
            <section data-theme="dark" style={{ padding: pad }}>
                <div style={{ maxWidth: '860px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Questions</span>
                    <h2 style={H2}>Event management software questions, answered straight</h2>
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
                        Want the longer version? Read{' '}
                        <Link href="/blogs/how-to-manage-and-scale-an-event-management-business" style={INLINE_LINK}>
                            how to manage and scale an event management business
                        </Link>
                        .
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
                            A Mumbai software studio building custom ERPs, CRMs and event management systems for
                            Indian businesses. 50+ systems shipped. Last updated{' '}
                            <time dateTime="2026-10-24">{LAST_UPDATED}</time>.
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
                    <h2 style={H2}>Get a free workflow audit</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', opacity: 0.8 }}>
                        Thirty minutes. Walk us through how one event moves from enquiry to final invoice today, and
                        we will show you where the money and the hours leak, what we would build first, and what it
                        costs. No deck.
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
                        heading="Book your free workflow audit"
                        submitLabel="Request a callback"
                        onClose={closeContact}
                    />
                )}
            </AnimatePresence>

            <Footer />
        </main>
    )
}
