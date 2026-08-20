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
]
