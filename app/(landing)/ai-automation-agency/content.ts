// Shared content for the AI automation agency landing page.
// Imported by both page.tsx (visible UI) and layout.tsx (JSON-LD schema) so the
// FAQ copy and the FAQPage structured data never drift apart.
//
// Deliberately non-geographic. The Mumbai and Navi Mumbai pages own the
// location queries; this page owns "AI automation agency" and the outcome-intent
// queries around it ("process automation", "AI automation services").
//
// Does NOT answer "how do you build an agent" / "what does an agent cost" —
// ai-agent-development-company owns those. Keeping the two FAQ sets disjoint is
// what stops the FAQPage schema on both pages competing for the same snippet.

export interface FaqItem {
    question: string
    answer: string
}

export const FAQ_ITEMS: FaqItem[] = [
    {
        question: 'What does an AI automation agency actually do?',
        answer:
            'An AI automation agency maps how work moves through your business, finds the steps a person is doing only because no system does them, and replaces those steps with software. In practice that means three things: process automation for the deterministic work (data entry, approvals, reports, reminders), AI automation for the judgement work (reading a messy email, classifying an enquiry, drafting a reply), and the integrations that let your existing tools pass information to each other without a person copying it across.',
    },
    {
        question: 'What is the difference between AI automation and process automation?',
        answer:
            'Process automation handles work with a fixed rule: when an order is approved, generate the invoice, update stock, notify dispatch. Same input, same output, every time. AI automation handles work where the input is messy and the rule cannot be written down — a customer email that half-describes a problem, a scanned PO with the quantity in a different column each time, a support ticket that needs routing. Most real projects use both. The rules do the spine of the workflow and the AI handles the parts that used to need a human to read something first.',
    },
    {
        question: 'How long does an automation project take?',
        answer:
            'The first working automation is usually live in three to five weeks. Full engagements run eight to sixteen weeks depending on how many systems have to talk to each other. We deliberately ship the single highest-cost workflow first, because the argument about scope gets much easier once one thing is already saving hours.',
    },
    {
        question: 'How much does process automation cost?',
        answer:
            'It tracks scope, not seats. A single workflow — one process, start to finish, with the systems it touches wired up — sits at the bottom. A multi-workflow build with AI agents and integrations across three or four systems sits well above it, and the distance between those two is mostly about how many places the information has to travel. We scope first and quote after, because a fixed figure before anyone has watched the work happen is a guess dressed up as a proposal. There is no per-user licence afterwards either — you own what we build, and hiring four more people does not cost you anything extra.',
    },
    {
        question: 'How do you decide which processes to automate first?',
        answer:
            'We count. During discovery we follow one job end to end and write down every point where a person re-enters, re-checks or chases something, then multiply by how often it happens. The winner is almost never the process people complain about most — it is the small five-minute one running forty times a day. That is where we start.',
    },
    {
        question: 'Will automation replace our team?',
        answer:
            'Not in any project we have run. What it removes is the part of the job nobody wanted: retyping, reconciling, chasing approvals, rebuilding the same report every Monday. Teams usually end up doing more of the work they were hired for, and companies stop hiring for pure data-entry roles. If your goal is a headcount cut, say so upfront so we can tell you honestly whether the numbers support it.',
    },
    {
        question: 'Do we have to replace the software we already use?',
        answer:
            'No, and we would push back if you suggested it. Tally, your accounting stack, your existing CRM, the WhatsApp number everyone actually uses — those stay. Automation sits between them. We connect through APIs where they exist and build a thin custom layer where they do not, so the systems you already trust keep being the system of record.',
    },
    {
        question: 'What can AI agents realistically handle without a person watching?',
        answer:
            'Answering repeat customer questions against your real data, qualifying an inbound enquiry and writing it into your CRM, reading incoming documents and pulling structured fields out of them, drafting first-pass replies for a human to approve, and flagging the exceptions. What they should not do unsupervised is anything irreversible — issuing refunds, sending contracts, changing prices. We build those as draft-and-approve, always.',
    },
    {
        question: 'How do you measure whether the automation worked?',
        answer:
            'Hours and error rate, agreed before we build. We baseline how long a workflow takes today and how often it goes wrong, then measure the same two numbers eight weeks after go-live. If a workflow is not measurably faster or cleaner, it was the wrong thing to automate and we will say so rather than invoice around it.',
    },
    {
        question: 'We are a small team with no technical staff. Is this too early for us?',
        answer:
            'Usually the opposite. Small teams feel the repeat work harder because the same four people absorb all of it. You do not need an IT department — you need two workflows removed. We handle hosting, monitoring, updates and the odd 9pm message when something looks wrong, and you get one person to talk to rather than a ticket queue.',
    },
]
