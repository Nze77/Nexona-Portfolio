import type { Metadata } from 'next'
import StickyHeader from '../components/StickyHeader'
import Footer from '../components/Footer'
import {
    DARK,
    SAND,
    HELVETICA,
    INTER,
    BUSINESS_NAME,
    BUSINESS_EMAIL,
    BUSINESS_PHONE,
    BUSINESS_PHONE_DISPLAY,
    BUSINESS_LOCATION_DISPLAY,
} from '../lib/constants'

/** Bump this whenever the policy text changes — Meta reviewers and visitors
 *  both read it as the version stamp. */
const LAST_UPDATED = '11 October 2026'

export const metadata: Metadata = {
    title: 'Privacy Policy for Meta Ads & Lead Forms | Nexona',
    description:
        'How Nexona collects, uses and deletes the details you share through our Facebook and Instagram ads, lead forms and website, and how to ask us to remove them.',
    alternates: { canonical: '/meta-privacy-policy' },
}

const SECTIONS: { id: string; heading: string; body: React.ReactNode }[] = [
    {
        id: 'short-version',
        heading: 'The short version',
        body: (
            <>
                <p>
                    If you fill in one of our forms on Facebook, Instagram or this website, we get the details you typed in and use them to
                    get back to you about your project. That&apos;s it. We don&apos;t sell your data, we don&apos;t rent it out, and
                    we won&apos;t add you to a mailing list you didn&apos;t ask for.
                </p>
                <p>
                    Want it deleted? Email <Mail /> with the subject &ldquo;Delete my data&rdquo;. Details in{' '}
                    <a href="#data-deletion">section 8</a>.
                </p>
            </>
        ),
    },
    {
        id: 'who-we-are',
        heading: 'Who we are',
        body: (
            <p>
                {BUSINESS_NAME} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) builds custom software, ERPs, CRMs and AI automation, based in{' '}
                {BUSINESS_LOCATION_DISPLAY}. We decide what happens to the personal data described here, so for the purposes of
                India&apos;s Digital Personal Data Protection Act 2023, and the GDPR where it applies, we are the data fiduciary /
                controller. You can reach us at <Mail /> or <a href={`tel:${BUSINESS_PHONE}`}>{BUSINESS_PHONE_DISPLAY}</a>.
            </p>
        ),
    },
    {
        id: 'what-we-collect',
        heading: 'What we collect',
        body: (
            <>
                <h3>From Meta lead forms (Instant Forms)</h3>
                <p>
                    When you submit a lead form inside a Facebook or Instagram ad, Meta passes us what&apos;s on that form, usually your
                    name, email, phone number and your answers to any questions we asked (what you want built, company size, that sort
                    of thing). Meta pre-fills some fields from your profile. You can edit them before you hit submit, and nothing reaches
                    us until you do.
                </p>
                <h3>From forms on this website</h3>
                <p>
                    Name, email, phone number and the requirement you describe. Along with the form, the site sends some context about
                    your visit: the pages you looked at in this session and roughly how long on each, the page you landed on, the site
                    that referred you, campaign tags in the link (UTM parameters and click IDs such as <code>fbclid</code>), and basic
                    device information (device type, screen size, language, time zone, browser user agent). That journey is held in
                    your browser&apos;s memory only, never written to your device, and it&apos;s sent only if you submit the form.
                </p>
                <h3>From the Meta Pixel and Conversions API</h3>
                <p>
                    We use the Meta Pixel on this website and Meta&apos;s Conversions API on our server to measure whether our ads work.
                    They tell Meta things like &ldquo;someone who clicked the ad viewed this page&rdquo; or &ldquo;submitted a contact
                    form&rdquo;. The Pixel may set Meta cookies (<code>_fbp</code>, <code>_fbc</code>) and send Meta your IP address,
                    browser details and the page URL. When we send a conversion, contact details such as email or phone are hashed
                    (scrambled one-way with SHA-256) before they leave our systems, so Meta can match them to an account without us
                    handing over the raw values.
                </p>
                <h3>From Google</h3>
                <p>
                    The site loads Google Tag Manager, which may run Google Analytics. It records aggregated usage, pages viewed, rough
                    location, device type, using Google cookies.
                </p>
                <p>We don&apos;t ask for, and don&apos;t want, sensitive data like health, financial account or ID numbers.</p>
            </>
        ),
    },
    {
        id: 'how-we-use-it',
        heading: 'How we use it',
        body: (
            <ul>
                <li>To call, email or WhatsApp you about the enquiry you sent: scoping, a proposal, a follow-up call.</li>
                <li>To work out which ads and pages actually bring in enquiries, so we stop paying for the ones that don&apos;t.</li>
                <li>To show our ads to people similar to those who&apos;ve enquired, and not keep showing them to you once you have.</li>
                <li>To keep records we&apos;re legally required to keep, and to protect against spam and abuse of our forms.</li>
            </ul>
        ),
    },
    {
        id: 'legal-basis',
        heading: "Why we're allowed to",
        body: (
            <p>
                Your consent, given when you submit a form. You can withdraw it whenever you like, and withdrawing doesn&apos;t
                undo anything we did lawfully before. For measurement through the Pixel, we rely on consent where the law requires it
                (for example, visitors in the EU or UK) and on our legitimate interest in measuring our own advertising elsewhere.
            </p>
        ),
    },
    {
        id: 'sharing',
        heading: 'Who we share it with',
        body: (
            <>
                <p>Only the services that keep this running, and only what each one needs:</p>
                <ul>
                    <li>
                        <strong>Meta Platforms</strong>: lead form delivery, Pixel and Conversions API events, ad measurement. Meta
                        handles that data under its own <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
                    </li>
                    <li>
                        <strong>Google</strong>: Tag Manager and Analytics, under{' '}
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google&apos;s Privacy Policy</a>.
                    </li>
                    <li><strong>Our email and hosting providers</strong>: form submissions arrive in our inbox by email.</li>
                    <li><strong>WhatsApp</strong>: only if you choose to message us there.</li>
                    <li><strong>Authorities</strong>: if a court or law actually requires it. Not on a casual request.</li>
                </ul>
                <p>We don&apos;t sell or rent personal data. To anyone. Ever.</p>
            </>
        ),
    },
    {
        id: 'retention',
        heading: 'How long we keep it',
        body: (
            <p>
                Lead details from an enquiry that doesn&apos;t turn into a project: up to 24 months, then deleted. If you become a
                client, for as long as we work together, plus whatever tax and contract law requires after that, which in India is
                usually 8 years for invoices. Lead data stored inside Meta Ads Manager is cleared on Meta&apos;s own 90-day download
                window; we keep our copy under the rules above.
            </p>
        ),
    },
    {
        id: 'data-deletion',
        heading: 'Deleting your data',
        body: (
            <>
                <p>Email <Mail /> with the subject <strong>&ldquo;Delete my data&rdquo;</strong> and include the email or phone number you used on the form. We&apos;ll:</p>
                <ol>
                    <li>Confirm we got your request within 3 working days.</li>
                    <li>Delete your details from our inbox, CRM, spreadsheets and Meta lead exports within 30 days.</li>
                    <li>Reply to confirm it&apos;s done, or explain what we have to keep by law and why.</li>
                </ol>
                <p>
                    To stop Meta using your activity for ads, go to{' '}
                    <a href="https://www.facebook.com/adpreferences" target="_blank" rel="noopener noreferrer">Facebook Ad Preferences</a>{' '}
                    and{' '}
                    <a href="https://accountscenter.facebook.com/info_and_permissions/off_facebook_activity" target="_blank" rel="noopener noreferrer">
                        Your activity off Meta technologies
                    </a>
                    , where you can disconnect this website. Clearing or blocking cookies in your browser stops the Pixel too.
                </p>
            </>
        ),
    },
    {
        id: 'your-rights',
        heading: 'Your rights',
        body: (
            <p>
                You can ask us what we hold about you, have it corrected, have it deleted, withdraw consent, or nominate someone to act
                for you. If you&apos;re in the EU or UK you can also object to processing, ask for a portable copy, and complain to your
                local data protection authority. In India, if we don&apos;t sort out a complaint, you can go to the Data Protection Board
                of India. Start with us, though. Most things get fixed in one email.
            </p>
        ),
    },
    {
        id: 'security',
        heading: "Security and where it's stored",
        body: (
            <p>
                Access is limited to the people at {BUSINESS_NAME} who respond to enquiries, accounts are protected with two-factor
                authentication, and the site runs over HTTPS. Meta and Google may process data on servers outside India, including the
                US. They use their own safeguards (such as standard contractual clauses) for those transfers. No system is perfectly
                secure. If we ever have a breach that affects you, we&apos;ll tell you and the relevant authority as the law requires.
            </p>
        ),
    },
    {
        id: 'children',
        heading: 'Children',
        body: (
            <p>
                Our ads and forms are for businesses. They&apos;re not aimed at anyone under 18, and we don&apos;t knowingly collect
                their data. If you think a minor has sent us something, tell us and we&apos;ll delete it.
            </p>
        ),
    },
    {
        id: 'contact',
        heading: 'Contact and grievances',
        body: (
            <p>
                Questions, complaints, deletion requests: <Mail />, or call <a href={`tel:${BUSINESS_PHONE}`}>{BUSINESS_PHONE_DISPLAY}</a>.
                This is also our grievance contact under the DPDP Act. If we change this policy we&apos;ll update the date at the top, and
                if the change is significant we&apos;ll say so on the page for at least 30 days.
            </p>
        ),
    },
]

function Mail() {
    return <a href={`mailto:${BUSINESS_EMAIL}`}>{BUSINESS_EMAIL}</a>
}

export default function MetaPrivacyPolicyPage() {
    return (
        <main style={{ backgroundColor: SAND, color: DARK, minHeight: '100vh' }}>
            <StickyHeader theme="light" />

            <section data-theme="light" style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 5% 5rem' }}>
                <div style={{ maxWidth: 760, margin: '0 auto' }}>
                    <h1
                        style={{
                            fontFamily: HELVETICA,
                            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.04em',
                            textTransform: 'uppercase',
                            lineHeight: 0.9,
                            margin: 0,
                        }}
                    >
                        Privacy Policy
                    </h1>
                    <p style={{ fontFamily: INTER, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '1.5rem', opacity: 0.6 }}>
                        Meta ads, lead forms &amp; this website · Last updated {LAST_UPDATED}
                    </p>

                    <nav
                        aria-label="On this page"
                        style={{
                            marginTop: '3rem',
                            padding: '1.5rem 0',
                            borderTop: '1px solid rgba(46,42,38,0.18)',
                            borderBottom: '1px solid rgba(46,42,38,0.18)',
                        }}
                    >
                        <ol style={{ margin: 0, paddingLeft: '1.25rem', columns: '2 220px', columnGap: '2rem', fontFamily: INTER, fontSize: '0.88rem', lineHeight: 1.9 }}>
                            {SECTIONS.map(s => (
                                <li key={s.id}>
                                    <a href={`#${s.id}`} style={{ color: 'inherit' }}>{s.heading}</a>
                                </li>
                            ))}
                        </ol>
                    </nav>

                    <div className="policy-body">
                        {SECTIONS.map((s, i) => (
                            <section key={s.id} id={s.id} style={{ scrollMarginTop: '7rem', marginTop: '3rem' }}>
                                <h2
                                    style={{ fontFamily: HELVETICA, fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 1rem' }}
                                >
                                    {i + 1}. {s.heading}
                                </h2>
                                {s.body}
                            </section>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
