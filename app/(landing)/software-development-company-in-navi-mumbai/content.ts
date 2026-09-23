// Shared content for the Navi Mumbai landing page.
// Imported by both page.tsx (visible UI) and layout.tsx (JSON-LD schema)
// so the FAQ copy and the FAQPage structured data never drift apart.
//
// Deliberately worded around custom software, business management systems and
// process automation for Navi Mumbai startups, so it does not compete with the
// Mumbai page for the same queries.

export interface FaqItem {
    question: string
    answer: string
}

export const FAQ_ITEMS: FaqItem[] = [
    {
        question: 'What kind of software does Nexona build for Navi Mumbai startups?',
        answer:
            'Three things, mostly. Custom software built from scratch for how your business actually runs, business management systems that put orders, customers, inventory and reporting in one place, and process automation that removes the repeat work nobody should still be doing by hand. Web apps, mobile apps, internal tools, AI agents — whichever of those the problem actually needs.',
    },
    {
        question: 'We are an early-stage startup. Is custom software too early for us?',
        answer:
            'Usually not, but it depends what you build. A startup at eleven people does not need a full platform — it needs the two or three workflows that are eating everyone’s day turned into software. We scope in phases for exactly this reason, so you ship the piece that pays for itself before committing to the rest.',
    },
    {
        question: 'Which parts of Navi Mumbai does Nexona work across?',
        answer:
            'All of it, Airoli down to Panvel. Most of our work sits around the Thane–Belapur belt, the CBD Belapur and Vashi offices, and the newer startup setups in Kharghar and Seawoods. If you are on that stretch we can be at your office the same week.',
    },
    {
        question: 'How do I choose a software company in Navi Mumbai?',
        answer:
            'Ask four things before anything else. Who actually writes the code — the people in the meeting, or a team you never meet? Will the repository be in your account from day one? What happens in the three months after launch, and who picks up the phone? And can they show you a live system a client uses today, not a portfolio PDF. A company that goes vague on any of those will go vague on your project too.',
    },
    {
        question: 'We have no in-house tech team. Can we still do this?',
        answer:
            'Yes. Roughly half our Navi Mumbai clients have nobody technical on staff. We handle hosting, backups, the domain, updates, and the odd 9pm call when something looks wrong. You get one person to message, not a ticket queue.',
    },
    {
        question: 'Do you visit our office, or is everything done remotely?',
        answer:
            'We come to you for discovery, and usually once more before launch. Seeing the actual desk, the actual register, the actual person doing the data entry changes what gets built. After that the work runs remotely with a weekly call, because dragging four people across the Vashi bridge for a status update helps nobody.',
    },
    {
        question: 'What can process automation realistically remove from our week?',
        answer:
            'The re-typing, mostly. Orders copied from email into a sheet and then into invoicing. Follow-up reminders somebody sets manually. Reports assembled every Monday morning. Approvals chased over WhatsApp. Those are the ones that go first, and they are usually where the hours are hiding.',
    },
    {
        question: 'We already use Tally and some spreadsheets. Do we throw those out?',
        answer:
            'No. Tally handles accounts well and we will not try to replace it — we connect to it. The custom layer covers what Tally was never meant to do: operations, field teams, customer follow-ups, approvals, and whatever is currently living in a spreadsheet one person guards.',
    },
    {
        question: 'How do you scope a project without knowing our exact requirements?',
        answer:
            'We start with a discovery session, not a quote. Two or three hours walking through how work actually moves through your business, where it stalls, who re-enters what. You come out of it with a written scope and a phased plan, and you are free to take that anywhere.',
    },
    {
        question: 'What decides the cost of custom software?',
        answer:
            'Four things, mostly. How many workflows the first phase covers, how many systems it has to talk to — Tally, a payment gateway, a courier API, an old database nobody has documented — whether AI is part of it, and how hard the deadline is. A tight six-week window costs differently from the same build spread over twelve. We do not quote off a phone call. We scope first, then you get a number for that scope, in writing.',
    },
    {
        question: 'How long until we have something working?',
        answer:
            'A working link within the first two weeks, and a first phase your team can use day to day in about six. That first link is rough — a real screen with real data, not a mock-up. Larger systems run longer, but they ship in phases, so you are never waiting four months to see anything.',
    },
    {
        question: 'Who owns the code once it is built?',
        answer:
            'You do. Code, database, designs, documentation, the lot. The repository sits in your account, or is transferred to it, and you have access from the first commit. If you move the work in-house or to another team, nothing is held back — and on a React, Node and Postgres stack, any competent developer can pick it up.',
    },
    {
        question: 'Do you sign an NDA?',
        answer:
            'Yes, before discovery, as standard. You will be showing us pricing sheets, customer lists and how your operation actually runs. That should be covered before anyone walks through your office, not after.',
    },
    {
        question: 'What happens after launch? Is there a maintenance plan?',
        answer:
            'The eight weeks after go-live are included — bug fixes, the adjustments real usage throws up, and a second training round once your team knows what they want to ask. After that there is an optional monthly plan for hosting, backups, security updates and small changes. Some clients move straight to a retainer for new features instead. Either way you are messaging the person who built it.',
    },
    {
        question: 'When is off-the-shelf software the better choice?',
        answer:
            'More often than agencies admit. If your process looks like everyone else’s — standard accounting, basic invoicing, a simple CRM — Zoho, Odoo or Tally will do it cheaper and faster, and we will tell you so. Custom earns its keep when the way you work is the advantage, when you are paying for five tools and stitching them with spreadsheets, or when per-user licences start to cost more than owning the thing outright.',
    },
]
