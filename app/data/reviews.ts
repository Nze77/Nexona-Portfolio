/**
 * Client reviews — the single source for /reviews, its Review structured data,
 * and the review section of /llms-full.txt.
 *
 * RULES
 *   • `body` is the client's text VERBATIM, one string per paragraph. Do not
 *     tidy grammar, trim, or "improve" it — a review that reads like our own
 *     copy is worth less to a human and to an answer engine.
 *   • Unnamed review → omit `reviewer`. With a `role` and a named business the
 *     page attributes it as "Founder of Valyrian Voice"; otherwise it says the
 *     name was withheld at the client's request. It never invents one.
 *   • `date` only if we actually know when it was given. No guessed dates.
 *   • `highlight` must be a figure the client states in `body`, in their words.
 */

export interface Review {
    /** URL fragment on /reviews (#id) and the JSON-LD @id suffix. Never change once published. */
    id: string
    /** Person's name. Omit for unnamed reviews. */
    reviewer?: string
    /** Their role, e.g. "Owner". */
    role?: string
    /** Client business. For unnamed reviews this may be a description ("A Mumbai logistics firm"). */
    business: string
    /** True when `business` is the real company name, not a description. */
    businessIsNamed: boolean
    /** Omit when the client hasn't said and it can't be told from the review. */
    industry?: string
    location?: string
    /** What Nexona built, in one line. */
    project: string
    /** Related service page on this site, if one exists. */
    service?: { name: string; href: string }
    /** ISO date (YYYY-MM-DD) the review was given. */
    date?: string
    /** One sentence lifted from `body` to lead the card. */
    pullQuote: string
    /** A figure the client states themselves. */
    highlight?: { value: string; label: string }
    /** Verbatim review, one string per paragraph. */
    body: string[]
}

export const REVIEWS: Review[] = [
    {
        id: 'aim-fitness-akash-mhase',
        reviewer: 'Akash Mhase',
        role: 'Owner',
        business: 'Aim Fitness',
        businessIsNamed: true,
        industry: 'Gym & fitness',
        location: 'Thane West, Thane, Maharashtra',
        project: 'Custom gym management system with a mobile app',
        service: { name: 'Custom gym management software', href: '/custom-gym-management-software' },
        pullQuote: 'The system has helped me save at least 18 hours every week.',
        highlight: { value: '18+ hrs', label: 'Saved every week, per the owner' },
        body: [
            'We had an excellent experience working with Nexona Labs. They developed a complete gym management system along with a mobile app, allowing me to manage and monitor my gym conveniently right from my phone.',
            'The entire system has been thoughtfully designed to suit my exact requirements, making day-to-day gym operations much more organised, efficient, and hassle-free. Everything runs incredibly smoothly, the interface is easy to use, and the mobile app makes managing things on the go so much easier.',
            'One of the biggest benefits has been the amount of time it saves me. The system has helped me save at least 18 hours every week, which is a huge difference when it comes to managing daily operations. Tasks that previously required a lot of manual effort and time are now streamlined and much easier to handle. It has genuinely made my life easier and allowed me to focus on other important aspects of running my gym.',
            'What impressed me most was their exceptionally quick implementation. The team was highly responsive, professional, and efficient, getting everything up and running in a remarkably short time without compromising on quality.',
            "It's clear that Nexona Labs understands the importance of building solutions around the client's actual needs rather than offering a one-size-fits-all product.",
            "I would highly recommend Nexona Labs to anyone looking for a reliable, smooth-running, and customised gym management system with a mobile app. Excellent work by the team! I'm genuinely happy with the results and the difference it has made to my business.",
        ],
    },
    {
        // The founder asked to be credited as "Founder of Valyrian Voice" only —
        // no personal name. Leave `reviewer` unset.
        id: 'valyrian-voice-founder',
        role: 'Founder',
        business: 'Valyrian Voice',
        businessIsNamed: true,
        industry: 'SaaS · AI voice agents',
        project: 'Custom AI voice calling SaaS platform',
        service: { name: 'AI voice agent development', href: '/ai-voice-agent-development' },
        pullQuote:
            'Their work has helped reduce AI voice calling costs by more than 50% per minute compared to other AI voice agents.',
        highlight: { value: '50%+', label: 'Lower AI calling cost per minute, per the founder' },
        body: [
            "Working with Nexona Labs to build my SaaS product, Valyrian Voice, has been one of the best decisions I've made.",
            'Their work has helped me save not just hundreds of hours but also lakhs of rupees. Thanks to Valyrian Voice, my clients can reach out to their leads much faster, which has helped increase their lead-to-close conversion rates by almost 80%.',
            "What impressed me even more was the level of optimization Nexona Labs implemented. Their work has helped reduce AI voice calling costs by more than 50% per minute compared to other AI voice agents. That's a massive saving, especially when you're operating at scale.",
            "Another thing I genuinely appreciate is their after-sales support and AMC. They are incredibly responsive, quick to understand issues, and even quicker to get things resolved. Whenever I've needed something, the team has been there to help without unnecessary delays.",
            "What makes them stand out even more is their willingness to go the extra mile. I've requested additional features even after the initial development, and they implemented them without charging me extra. I'm genuinely grateful for that gesture.",
            "It's rare to find a technology partner that combines technical expertise, cost optimization, reliability, and such a strong commitment to client satisfaction.",
            "If you're planning to build a SaaS product or looking for an AI development partner, I would wholeheartedly recommend Nexona Labs.",
            'Thank you to the entire Nexona Labs team for helping make Valyrian Voice what it is today. Looking forward to building much more together! 🚀',
        ],
    },
    {
        // Client asked to stay unnamed. Do not add the company name, a logo,
        // or any detail beyond what the review itself says.
        id: 'startup-crm-erp',
        business: 'A startup with 40+ employees',
        businessIsNamed: false,
        project: 'Custom CRM and ERP with role-based access control (RBAC)',
        service: { name: 'Custom CRM development', href: '/customer-retention-management-software' },
        pullQuote:
            'With a custom-built solution, we made a one-time development investment and recovered that cost in less than 8 months.',
        highlight: { value: '< 8 months', label: 'To recover the build cost, per the client' },
        body: [
            'We partnered with Nexona Labs to build a custom CRM and ERP system for our startup, and the experience has been fantastic.',
            'One of the most impressive things was their execution speed. They delivered our MVP in under 8 weeks, including a robust Role-Based Access Control (RBAC) system to manage access and permissions across our team of 40+ employees. The system was built around our actual business processes and integrates seamlessly with all our existing systems and workflows.',
            'The impact on our day-to-day operations has been significant. A lot of our repetitive manual work is now automated, our systems are better connected, and our team can operate much more efficiently.',
            "But what really made this investment worthwhile was the financial upside. We were previously paying for a subscription-based CRM with per-user, per-month pricing. With a custom-built solution, we made a one-time development investment and recovered that cost in less than 8 months. Now, as we grow and add more employees, we don't have to worry about our software costs increasing proportionally. That's a huge advantage for a growing startup.",
            'Another thing worth highlighting is how supportive and responsive the Nexona Labs team has been throughout the process. They were very open to feedback, changes, and additional feature requests. Their quick response times and ability to act on feedback made the entire development process smooth and collaborative.',
            "It's rare to find a development partner that combines speed, technical execution, flexibility, and a genuine understanding of business needs.",
            "If you're a startup or growing business looking to build custom software that fits your actual operations rather than adapting your business around off-the-shelf tools, I'd definitely recommend Nexona Labs.",
        ],
    },
]

/** Lower-cases the first letter for mid-sentence use, leaving acronyms ("CRM", "AI") alone. */
function lowerFirst(s: string): string {
    if (/^[A-Z]{2}/.test(s)) return s
    return s.charAt(0).toLowerCase() + s.slice(1)
}

/** The business as it reads mid-sentence: a real name as-is, a description
 *  ("A startup with…") lower-cased so it doesn't read "Owner, A startup". */
export function businessInline(r: Review): string {
    return r.businessIsNamed ? r.business : lowerFirst(r.business)
}

/** How the reviewer is credited: their name, or — when they asked for role-only
 *  credit at a named business — "Founder of Valyrian Voice". Undefined when
 *  there is nothing to credit beyond "name withheld". */
export function reviewerCredit(r: Review): string | undefined {
    if (r.reviewer) return r.reviewer
    if (r.role && r.businessIsNamed) return `${r.role} of ${r.business}`
    return undefined
}

/** "Akash Mhase, Owner" / "Founder of Valyrian Voice" / "Name withheld". */
export function reviewerLine(r: Review): string {
    if (r.reviewer) return r.role ? `${r.reviewer}, ${r.role}` : r.reviewer
    const credit = reviewerCredit(r)
    if (credit) return credit
    return r.role ? `${r.role} (name withheld at the client's request)` : "Name withheld at the client's request"
}

/** Plain-text attribution sentence, used where a model or screen reader needs it spelled out. */
export function reviewSummary(r: Review): string {
    const who = r.reviewer
        ? `${r.reviewer}${r.role ? `, ${r.role} of ${r.business}` : ` of ${r.business}`}`
        : reviewerCredit(r)
          ? `The ${lowerFirst(reviewerCredit(r)!)}`
          : r.role
          ? `The ${r.role.toLowerCase()} of ${businessInline(r)} (name withheld at their request)`
          : `${r.business} (name withheld at their request)`
    const where = r.location ? ` in ${r.location}` : ''
    return `${who}${where}, reviewing the ${lowerFirst(r.project)} that Nexona Labs built for them.`
}

/** Markdown rendering for /llms-full.txt. */
export function reviewToMarkdown(r: Review, siteUrl: string): string {
    const lines = [
        `### ${r.business}${r.reviewer ? ` — ${r.reviewer}` : ''}`,
        '',
        `URL: ${siteUrl}/reviews#${r.id}`,
        `Reviewer: ${reviewerLine(r)}`,
        `Business: ${r.business}${r.businessIsNamed ? '' : ' (described, not named)'}`,
        ...(r.industry ? [`Industry: ${r.industry}`] : []),
        ...(r.location ? [`Location: ${r.location}`] : []),
        `What Nexona built: ${r.project}`,
        ...(r.service ? [`Related service: ${siteUrl}${r.service.href}`] : []),
        ...(r.date ? [`Date: ${r.date}`] : []),
        '',
        ...r.body.map((p) => `> ${p}\n>`),
    ]
    // Drop the trailing empty quote line.
    if (lines[lines.length - 1].endsWith('\n>')) {
        lines[lines.length - 1] = lines[lines.length - 1].slice(0, -2)
    }
    return lines.join('\n')
}
