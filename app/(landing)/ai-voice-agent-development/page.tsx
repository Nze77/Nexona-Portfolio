'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence } from 'framer-motion'
import LandingHeader from '../../components/LandingHeader'
import ContactOverlay from '../../components/ContactOverlay'
import Footer from '../../components/Footer'
import { useContactPopup } from '../../lib/useContactPopup'
import { DARK, SAND, INTER, CLUTCH_URL } from '../../lib/constants'
import {
    TEXT,
    PANEL,
    LINE,
    MONTSERRAT,
    SCOPING_CTA,
    H2,
    EYEBROW,
    LEAD,
    H3,
    CARD,
    CARD_BODY,
    NOTE,
    SOURCE,
    INLINE_LINK,
    CTA,
    SCREEN_FRAME,
    ExternalLink,
    DataTable,
    EstimateForm,
} from '../../components/LandingBlocks'
import {
    LAST_UPDATED,
    LAST_UPDATED_ISO,
    INTRO,
    VALYRIAN_URL,
    CASE_BUILT,
    CASE_NUMBERS,
    WHAT_WE_BUILD,
    COST_ROWS,
    COST_SOURCES,
    COST_DRIVERS,
    COMPARE_TABLE,
    COMPARE_PRICE_SOURCES,
    UNIT_ROWS,
    INDUSTRIES,
    PROCESS,
    COMPLIANCE,
    COMPLIANCE_SOURCES,
    FAQ_ITEMS,
} from './content'

export default function AiVoiceAgentDevelopmentPage() {
    const [isMobile, setIsMobile] = useState(false)
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
    const scopingButton = (
        <button type="button" onClick={openContact} style={{ ...CTA, marginTop: '2rem' }}>
            {SCOPING_CTA}
        </button>
    )

    return (
        <main style={{ backgroundColor: DARK, color: TEXT, fontFamily: INTER }}>
            <LandingHeader theme="dark" onContactClick={openContact} />

            {/* Hero */}
            <section data-theme="dark" style={{ padding: isMobile ? '4rem 5% 3rem' : '7rem 8% 4rem' }}>
                <div style={{ maxWidth: '1100px' }}>
                    <nav aria-label="Breadcrumb" style={{ fontSize: '0.8rem', opacity: 0.55, marginBottom: '1.25rem' }}>
                        <Link href="/" style={{ color: 'inherit' }}>Home</Link>
                        <span aria-hidden="true"> / </span>
                        <span>AI Voice Agent Development</span>
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
                        We Build Custom AI Voice Agent and Dialer Platforms
                    </h1>
                    <p style={{ ...LEAD, marginTop: '1.75rem', maxWidth: '720px', opacity: 0.88 }}>{INTRO}</p>
                    <button type="button" onClick={openContact} style={{ ...CTA, marginTop: '2.25rem' }}>
                        {SCOPING_CTA}
                    </button>
                </div>
            </section>

            {/* Case study */}
            <section id="valyrian-voice" data-theme="dark" style={{ backgroundColor: PANEL, padding: pad, scrollMarginTop: '5rem' }}>
                <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Case study</span>
                    <h2 style={H2}>Valyrian Voice: dialer and AI voice agents for call centers</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 0.9fr', gap: isMobile ? '2rem' : '3.5rem', marginTop: '2.5rem', alignItems: 'start' }}>
                        <div>
                            <h3 style={{ ...H3, fontSize: '1.2rem' }}>The problem</h3>
                            <p style={{ ...NOTE, opacity: 0.8, fontSize: '1rem' }}>
                                Call centers run on lists nobody finishes. Renewals pile up, leads go cold within hours,
                                recalls end in voicemail. A faster dialer just reaches voicemail quicker, and more agents
                                cost more. They needed AI on the lines, and their people kept for the calls worth having.
                            </p>
                            <h3 style={{ ...H3, fontSize: '1.2rem', marginTop: '2rem' }}>Stack and architecture</h3>
                            <p style={{ ...NOTE, opacity: 0.8, fontSize: '1rem' }}>
                                Audio comes in over SIP. Agents then run on either Gemini Live or a dedicated GPU pipeline,
                                where speech recognition, the language model and the voice sit on hardware handling only
                                that customer&rsquo;s calls. That GPU inference doesn&rsquo;t store call contents. Agents
                                reach outside systems through HTTP tools and webhooks mid-call, and customers who prefer
                                their own providers, such as Deepgram, OpenAI or ElevenLabs, can bring those API keys.
                            </p>
                        </div>
                        <figure style={{ margin: 0 }}>
                            <a href={VALYRIAN_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'block', ...SCREEN_FRAME }}>
                                <Image
                                    src="/saas/valyrian-voice.webp"
                                    width={1440}
                                    height={900}
                                    sizes="(max-width: 768px) 90vw, 480px"
                                    priority
                                    alt="Valyrian Voice, an AI voice agent and dialer platform for call centers built by Nexona Labs, with a demo dashboard showing calls, connect rate, conversations and conversions."
                                    style={{ width: '100%', height: 'auto', display: 'block' }}
                                />
                            </a>
                            <figcaption style={{ fontSize: '0.85rem', lineHeight: 1.6, opacity: 0.6, marginTop: '0.8rem' }}>
                                The live site. Dashboard figures are its demo workspace, not customer results.{' '}
                                <ExternalLink href={VALYRIAN_URL}>Open Valyrian Voice</ExternalLink>
                            </figcaption>
                        </figure>
                    </div>

                    <h3 style={{ ...H3, fontSize: '1.2rem', marginTop: '3rem' }}>What we built</h3>
                    <dl style={{ ...grid(3, '1.25rem 2rem'), margin: '1.25rem 0 0' }}>
                        {CASE_BUILT.map(([name, body]) => (
                            <div key={name} style={{ borderTop: `1px solid ${LINE}`, paddingTop: '0.9rem' }}>
                                <dt style={{ fontWeight: 700, fontSize: '0.98rem' }}>{name}</dt>
                                <dd style={{ margin: '0.35rem 0 0', fontSize: '0.9rem', lineHeight: 1.6, opacity: 0.72 }}>{body}</dd>
                            </div>
                        ))}
                    </dl>

                    <h3 style={{ ...H3, fontSize: '1.2rem', marginTop: '3rem' }}>The numbers</h3>
                    <dl style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: isMobile ? '1.25rem' : '2rem', margin: '1.25rem 0 0' }}>
                        {CASE_NUMBERS.map((n) => (
                            <div key={n.label}>
                                <dt style={{ fontFamily: MONTSERRAT, fontSize: 'clamp(1.4rem, 2.6vw, 2rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>{n.value}</dt>
                                <dd style={{ margin: '0.3rem 0 0', fontSize: '0.85rem', opacity: 0.62 }}>{n.label}</dd>
                            </div>
                        ))}
                    </dl>
                    <p style={SOURCE}>
                        As published on <ExternalLink href="https://valyrianvoice.com/pricing">Valyrian Voice&rsquo;s pricing page</ExternalLink>. Product prices, not what we charge to build.
                    </p>

                    <h3 style={{ ...H3, fontSize: '1.2rem', marginTop: '3rem' }}>The outcome</h3>
                    <p style={{ ...NOTE, opacity: 0.8, fontSize: '1rem', maxWidth: '800px' }}>
                        The product is live, with public pricing you can check. Customer results aren&rsquo;t public yet, so
                        we won&rsquo;t quote any. What we can show you is the founder&rsquo;s verified review:
                    </p>
                    <blockquote cite={CLUTCH_URL} style={{ margin: '1.25rem 0 0', maxWidth: '800px', borderLeft: '2px solid rgba(232,223,211,0.3)', paddingLeft: '1.5rem' }}>
                        <p style={{ fontFamily: MONTSERRAT, fontSize: isMobile ? '1.05rem' : '1.25rem', fontWeight: 600, lineHeight: 1.45, margin: 0 }}>
                            &ldquo;The thing I found most impressive was that Nexona did not approach the project as a simple
                            &lsquo;build what the client asks for&rsquo; engagement.&rdquo;
                        </p>
                        <footer style={{ fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.55, marginTop: '0.8rem' }}>
                            Founder &amp; CEO, Valyrian Voice · <ExternalLink href={CLUTCH_URL}>Verified on Clutch</ExternalLink>
                        </footer>
                    </blockquote>
                    {scopingButton}
                </div>
            </section>

            {/* What we build */}
            <section data-theme="light" style={{ backgroundColor: SAND, color: DARK, padding: pad }}>
                <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
                    <span style={{ ...EYEBROW, opacity: 0.6 }}>What we build</span>
                    <h2 style={H2}>Seven parts of an AI calling platform</h2>
                    <div style={{ ...grid(2, '1.75rem 3rem'), marginTop: '2.75rem' }}>
                        {WHAT_WE_BUILD.map((item) => (
                            <div key={item.title} style={{ borderTop: '1px solid rgba(46,42,38,0.18)', paddingTop: '1.1rem' }}>
                                <h3 style={H3}>{item.title}</h3>
                                <p style={{ fontSize: '0.93rem', lineHeight: 1.65, opacity: 0.75, margin: '0.5rem 0 0' }}>{item.body}</p>
                            </div>
                        ))}
                    </div>
                    <p style={{ fontSize: '0.95rem', lineHeight: 1.7, opacity: 0.72, marginTop: '2rem', maxWidth: '760px' }}>
                        Agents that work beyond the phone sit under{' '}
                        <Link href="/ai-agent-development-company" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '3px' }}>AI agent development</Link>
                        , and turning this into a subscription product sits under{' '}
                        <Link href="/saas-development-services" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '3px' }}>SaaS development services</Link>.
                    </p>
                </div>
            </section>

            {/* Cost. Trigger for the contact popup. */}
            <section id="cost" ref={thirdSectionRef} data-theme="dark" style={{ padding: pad, scrollMarginTop: '5rem' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Cost and timeline</span>
                    <h2 style={H2}>How much does it cost to build an AI voice agent?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '760px', opacity: 0.85 }}>
                        Roughly ₹2.9 lakh for a simple single-use agent, and over ₹2 crore for a full enterprise platform,
                        going by what other firms publish. We send a written quote after a 30-minute scoping call.
                    </p>
                    <DataTable
                        caption="AI voice agent development cost and timeline by scope"
                        columns={['Scope', 'Typical timeline', 'Typical cost']}
                        rows={COST_ROWS}
                        isMobile={isMobile}
                    />
                    <p style={SOURCE}>
                        Timelines are our planning ranges. Costs are other firms&rsquo; published ranges from{' '}
                        {COST_SOURCES.map((s, i) => (
                            <span key={s.name}>
                                {i > 0 && (i === COST_SOURCES.length - 1 ? ' and ' : ', ')}
                                <ExternalLink href={s.href}>{s.name}</ExternalLink>
                            </span>
                        ))}
                        , matched to these scopes by us and converted at about ₹95 to $1. Vendor blogs, so treat them as rough.
                    </p>
                    <h3 style={{ ...H3, marginTop: '2.5rem' }}>What drives the cost</h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0.75rem 0 0' }}>
                        {COST_DRIVERS.map(([name, body]) => (
                            <li key={name} style={{ borderBottom: `1px solid ${LINE}`, padding: '0.8rem 0', fontSize: '0.93rem', lineHeight: 1.6 }}>
                                <strong>{name}. </strong>
                                <span style={{ opacity: 0.72 }}>{body}</span>
                            </li>
                        ))}
                    </ul>
                    {scopingButton}
                </div>
            </section>

            {/* Build vs buy */}
            <section id="build-vs-buy" data-theme="dark" style={{ backgroundColor: PANEL, padding: pad, scrollMarginTop: '5rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Build vs buy vs API</span>
                    <h2 style={H2}>Custom build, Vapi and Retell, Valyrian Voice or an in-house team?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '780px', opacity: 0.85 }}>
                        If you run a calling operation, buying Valyrian Voice is usually the better deal: finished product, 1¢ a
                        minute. Full disclosure, we built it and we manage it. Your developers experimenting? Vapi or Retell get
                        you there faster. If the platform is your product, build it.
                    </p>
                    <DataTable {...COMPARE_TABLE} isMobile={isMobile} />
                    <p style={SOURCE}>
                        List prices from{' '}
                        {COMPARE_PRICE_SOURCES.map((s, i) => (
                            <span key={s.name}>
                                {i > 0 && (i === COMPARE_PRICE_SOURCES.length - 1 ? ' and ' : ', ')}
                                <ExternalLink href={s.href}>{s.name}</ExternalLink>
                            </span>
                        ))}
                        , read 5 November 2026. Plans change, so check before you decide.
                    </p>

                    <h3 style={{ ...H3, fontSize: '1.2rem', marginTop: '3rem' }}>When per-minute pricing stops making sense</h3>
                    <p style={{ ...NOTE, opacity: 0.8, fontSize: '1rem', maxWidth: '800px' }}>
                        At 20,000 calls a day, 1.5 minutes each, over 22 calling days, you burn 660,000 minutes a month. Here is
                        what Valyrian Voice&rsquo;s own estimator shows:
                    </p>
                    <div style={{ maxWidth: '800px' }}>
                        <DataTable
                            caption="Monthly AI calling cost by minute and by dedicated GPU at 660,000 minutes"
                            columns={['Option', 'Per month']}
                            rows={UNIT_ROWS}
                            isMobile={isMobile}
                        />
                    </div>
                    <p style={{ ...NOTE, maxWidth: '800px' }}>
                        The GPU line leaves out the fixed platform fee and telephony, so compare your full bill before believing
                        the gap. At list price, Vapi&rsquo;s $0.05 hosting alone would be $33,000 on
                        those minutes, before model and voice providers, and before the discount you&rsquo;d negotiate at that
                        volume. At 2,000 minutes a month, none of this applies. Stay on per-minute. (
                        <ExternalLink href="https://valyrianvoice.com/enterprise">Valyrian Voice estimator</ExternalLink>)
                    </p>
                </div>
            </section>

            {/* Industries */}
            <section data-theme="dark" style={{ padding: pad }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Industries</span>
                    <h2 style={H2}>Who uses custom AI voice agents?</h2>
                    <div style={{ ...grid(2), marginTop: '2.5rem' }}>
                        {INDUSTRIES.map((item) => (
                            <div key={item.title} style={CARD}>
                                <h3 style={H3}>{item.title}</h3>
                                <p style={CARD_BODY}>{item.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section data-theme="dark" style={{ backgroundColor: PANEL, padding: pad }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Process</span>
                    <h2 style={H2}>How an AI voice agent project runs</h2>
                    <ol style={{ listStyle: 'none', padding: 0, margin: '2.25rem 0 0' }}>
                        {PROCESS.map(([name, time, body], i) => (
                            <li
                                key={name}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: isMobile ? '1fr' : '2.5rem 13rem 7rem 1fr',
                                    gap: isMobile ? '0.2rem' : '1rem',
                                    borderTop: `1px solid ${LINE}`,
                                    padding: '1.1rem 0',
                                    fontSize: '0.93rem',
                                    lineHeight: 1.6,
                                }}
                            >
                                <span aria-hidden="true" style={{ fontWeight: 700, opacity: 0.4 }}>{String(i + 1).padStart(2, '0')}</span>
                                <strong>{name}</strong>
                                <span style={{ opacity: 0.6 }}>{time}</span>
                                <span style={{ opacity: 0.75 }}>{body}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Compliance */}
            <section id="compliance" data-theme="dark" style={{ padding: pad, scrollMarginTop: '5rem' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Compliance and trust</span>
                    <h2 style={H2}>Is an AI calling platform compliant?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '760px', opacity: 0.82 }}>
                        Software can&rsquo;t make a campaign compliant. It can make the compliant path the default. Consent and
                        lists stay your responsibility.
                    </p>
                    <div style={{ ...grid(2, '1.75rem 3rem'), marginTop: '2.5rem' }}>
                        {COMPLIANCE.map((item) => (
                            <div key={item.title} style={{ borderTop: `1px solid ${LINE}`, paddingTop: '1rem' }}>
                                <h3 style={H3}>{item.title}</h3>
                                <p style={CARD_BODY}>{item.body}</p>
                            </div>
                        ))}
                    </div>
                    <p style={{ ...NOTE, marginTop: '2rem', maxWidth: '800px' }}>
                        On caller ID: rotate only numbers you own and are entitled to use. Rotating to dodge blocks or spam labels
                        is a good way to get a trunk shut off. Valyrian Voice&rsquo;s terms ban spoofing and illegal robocalls.
                    </p>
                    <p style={{ ...SOURCE, maxWidth: '800px' }}>
                        This is general information, not legal advice. Rules change, so confirm your use case with your own
                        counsel. Primary sources:{' '}
                        {COMPLIANCE_SOURCES.map((s, i) => (
                            <span key={s.name}>
                                {i > 0 && ', '}
                                <ExternalLink href={s.href}>{s.name}</ExternalLink>
                            </span>
                        ))}
                        .
                    </p>
                </div>
            </section>

            {/* FAQ */}
            <section data-theme="dark" style={{ backgroundColor: PANEL, padding: pad }}>
                <div style={{ maxWidth: '860px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Questions</span>
                    <h2 style={H2}>AI voice agent questions, answered</h2>
                    <div style={{ marginTop: '2.5rem' }}>
                        {FAQ_ITEMS.map((faq) => (
                            <div key={faq.question} style={{ borderTop: `1px solid ${LINE}`, padding: '1.5rem 0' }}>
                                <h3 style={{ ...H3, lineHeight: 1.45 }}>{faq.question}</h3>
                                <p style={{ fontSize: '0.95rem', lineHeight: 1.7, opacity: 0.75, margin: '0.6rem 0 0', maxWidth: '720px' }}>{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                    {scopingButton}
                </div>
            </section>

            {/* About + authorship */}
            <section data-theme="dark" style={{ padding: isMobile ? '3.5rem 5%' : '5rem 8%' }}>
                <div style={{ maxWidth: '860px', margin: '0 auto', ...CARD, display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1.5rem', alignItems: isMobile ? 'flex-start' : 'center' }}>
                    <Image src="/logo.png" width={64} height={64} alt="Nexona Labs logo" style={{ borderRadius: '0.75rem', flexShrink: 0 }} />
                    <div>
                        <p style={{ ...EYEBROW, marginBottom: '0.4rem' }}>Written by</p>
                        <p style={{ ...H3, margin: 0 }}>The Nexona Labs team</p>
                        <p style={{ ...CARD_BODY, marginTop: '0.5rem' }}>
                            A Mumbai software studio, and the team that developed and manages Valyrian Voice. Last updated{' '}
                            <time dateTime={LAST_UPDATED_ISO}>{LAST_UPDATED}</time>.
                        </p>
                        <p style={{ fontSize: '0.88rem', marginTop: '0.75rem', marginBottom: 0, display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                            <ExternalLink href="https://www.linkedin.com/company/nexonalabs">LinkedIn</ExternalLink>
                            <ExternalLink href={CLUTCH_URL}>Reviews on Clutch</ExternalLink>
                            <Link href="/projects/voice-agent" style={INLINE_LINK}>Earlier voice agent project</Link>
                        </p>
                    </div>
                </div>
            </section>

            {/* Estimate form */}
            <section id="estimate" data-theme="dark" style={{ backgroundColor: PANEL, padding: pad, scrollMarginTop: '5rem' }}>
                <div style={{ maxWidth: '760px', margin: '0 auto' }}>
                    <h2 style={H2}>Get a rough estimate before the call</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', opacity: 0.8 }}>
                        Three questions. We reply with a rough range, and whether you should build this at all.
                    </p>
                    <EstimateForm
                        formLocation="estimate-form-ai-voice"
                        isMobile={isMobile}
                        fields={[
                            { name: 'useCase', label: 'What should the agent do?' },
                            { name: 'volume', label: 'Calls a day', options: ['Under 500', '500 to 5,000', '5,000 to 20,000', 'Over 20,000'] },
                            { name: 'timeline', label: 'When do you need it?', options: ['This month', '1 to 3 months', '3 to 6 months', 'Just exploring'] },
                        ]}
                    />
                </div>
            </section>

            <AnimatePresence>
                {contactOpen && (
                    <ContactOverlay trigger={trigger} heading={SCOPING_CTA} submitLabel="Request a callback" onClose={closeContact} />
                )}
            </AnimatePresence>

            <Footer />
        </main>
    )
}
