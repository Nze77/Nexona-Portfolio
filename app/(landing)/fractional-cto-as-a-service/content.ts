// Shared content for the Fractional CTO as a Service landing page.
// Imported by both page.tsx (visible UI) and layout.tsx (JSON-LD schema) so the
// FAQ copy and the FAQPage structured data never drift apart.
//
// Scope boundary: this page sells the DECISION-MAKING — architecture calls,
// hiring, AI strategy, due diligence. ai-automation-agency and
// ai-agent-development-company sell the BUILD. The FAQ sets are kept disjoint
// so the FAQPage schema on each page is not competing for the same snippet.
//
// NO PRICING FIGURES ANYWHERE. Engagements are scoped per client, so the cost
// question is answered with what drives the number, never with a number.

export interface FaqItem {
    question: string
    answer: string
}

export const FAQ_ITEMS: FaqItem[] = [
    {
        question: 'What is Fractional CTO as a Service?',
        answer:
            'Fractional CTO as a Service is senior technology leadership on a monthly retainer instead of a full-time executive hire. You get someone who owns the architecture decisions, runs the engineering team, sets the AI strategy and answers to your board — for a slice of the week rather than all of it. Nexona Labs embeds as that person. Same authority, same accountability, none of the equity conversation.',
    },
    {
        question: 'How much does a fractional CTO cost in India?',
        answer:
            'We do not publish a rate, and anyone who does is quoting you before they have seen your stack. What moves the number: how many engineers you already have, whether there is an existing codebase to inherit or a blank page, how often you need someone in the room versus on call, and whether AI adoption is part of the mandate. A two-engineer startup wanting architecture direction and a company with fourteen engineers and a failing release process are not the same engagement. We scope first, then quote. It is still a fraction of a full-time CTO once you add salary, equity and the months of searching.',
    },
    {
        question: 'Who needs a fractional CTO?',
        answer:
            'Four situations, mostly. Startups without a technical co-founder who are paying an agency and cannot tell whether the invoices are honest. Companies scaling an engineering team past the point where the first developer can lead it. Businesses heading into a funding round who need a technical narrative that survives investor diligence. And MSMEs — manufacturers especially — adopting AI and automation with nobody internal who can separate a real use case from a demo.',
    },
    {
        question: 'What does a fractional CTO actually do day-to-day?',
        answer:
            'Reviews what shipped, decides what ships next, and says no to things. Concretely: architecture reviews, release process oversight, sprint direction with your engineering lead, vendor and tooling decisions, hiring — writing the scorecard, sitting in the technical interviews, making the call — and a monthly written report your board can read without a translator. Some weeks it is four hours of unblocking one engineer. Other weeks it is a full argument about rewriting the data layer. The work is lumpy.',
    },
    {
        question: 'How is a fractional CTO different from an IT consultant?',
        answer:
            'A consultant delivers a document and leaves. A fractional CTO owns the outcome of the decision and is still there in March when it turns out to be wrong. That difference shows up in incentives — a consultant is rewarded for the recommendation, we are rewarded for what the recommendation does to your release cadence six months later. IT consultants also tend to stop at the infrastructure layer. Product architecture, engineering hiring and AI strategy sit outside that brief.',
    },
    {
        question: 'Can you do both strategy and hands-on work?',
        answer:
            'Yes, and we would be suspicious of a fractional CTO who cannot. Reading a pull request is how you find out whether the architecture you drew survived contact with the team. We write code when it unblocks something — a proof of concept, a migration nobody wants to own, the first AI pipeline so the pattern gets set correctly. We do not become your senior developer. That is the cheapest hour we would ever sell you, and it quietly stops the leadership work from happening.',
    },
    {
        question: 'What does technical due diligence involve?',
        answer:
            'Two forms of it. Buy-side: you are acquiring or investing, and you need to know whether the codebase is an asset or a liability — we audit architecture, dependency risk, security posture, key-person risk, and what it would genuinely cost to maintain. Sell-side: you are raising or being acquired, and we get the technical story and the repository into a state that survives the other side’s audit. Both end in a written report with findings ranked by what they cost you, not by severity label.',
    },
    {
        question: 'How many hours per month does the engagement take?',
        answer:
            'It varies by mandate, and we set the rhythm before we start rather than counting minutes afterwards. In practice: a fixed weekly leadership slot, availability for the decisions that cannot wait for it, and a monthly written report. Retainers billed by the hour go strange fast — people stop asking questions because they can hear the meter running. We would rather you called.',
    },
    {
        question: 'Can a fractional CTO help with AI adoption?',
        answer:
            'It is most of why companies call us now. The job is largely deciding what should not be built with AI, which is a longer list than vendors admit. We assess where your data actually lives and what state it is in, identify the two or three workflows where a model earns its cost, set the guardrails for anything customer-facing, and draw the build-versus-buy line. Then we oversee the implementation, whether that is our team or yours.',
    },
    {
        question: 'Do you work with manufacturers and MSMEs?',
        answer:
            'A large share of our work sits there. Manufacturing has a specific version of the problem: the ERP was bought years ago, the shop floor has quietly built workarounds for the parts that never fitted, and nobody senior enough to fix that is technical. A fractional CTO in that context spends less time on cloud architecture and more on whether the production data being captured is trustworthy enough to automate against. Usually it is not, at first. That becomes the first project.',
    },
    {
        question: 'What happens when we are ready to hire a full-time CTO?',
        answer:
            'We help you hire them and then we leave. Writing the scorecard, screening the shortlist, running the technical interviews, and handing over a codebase with documented decisions rather than folklore. Planning that exit is part of the job — a fractional CTO who makes themselves permanent has failed at something.',
    },
    {
        question: 'Do you work with companies outside India?',
        answer:
            'Yes. We are based in Mumbai and the engagement is remote-first, so the constraint is timezone overlap rather than geography. IST covers a European morning and a US evening, which is enough to run architecture calls, interviews and board reporting without anybody taking a 2am slot. We work with teams in India, the US, the UK, the UAE, Singapore and Australia. Where the overlap is genuinely too thin — a team entirely on the US west coast, usually — we say so before you sign rather than after, because a fractional CTO you cannot reach on the day of the decision is not doing the job.',
    },
    {
        question: 'How quickly can you start?',
        answer:
            'Usually inside two weeks. The first engagement is an assessment — architecture, team, delivery process, and whatever the thing is that everybody in the company knows is broken but nobody has written down. You get that as a document at the end of it, and it is yours whether or not the retainer continues.',
    },
]
