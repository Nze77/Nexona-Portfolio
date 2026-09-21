// Shared content for the AI automation company in Thane landing page.
// Imported by both page.tsx (visible UI) and layout.tsx (JSON-LD schema) so the
// FAQ copy and the FAQPage structured data never drift apart.
//
// CANNIBALISATION BOUNDARY — this page is the LOCAL SPOKE of the automation
// cluster. The hierarchy is deliberate:
//
//   /ai-automation-agency            → PILLAR. Non-geographic. Owns "AI
//                                      automation agency" and the un-located
//                                      service queries. Never gets "Thane"
//                                      added to its slug, title or H1.
//   /ai-automation-company-in-thane  → THIS PAGE. Owns "AI automation company
//                                      in Thane" + "AI automation agency in
//                                      Thane" and the node-level Thane queries.
//   /ai-agent-development-company    → BUILD cluster. Agent engineering.
//
// The FAQ sets are kept disjoint on purpose. The pillar answers "what is an
// automation agency / what does it cost / how do you pick processes" in the
// abstract. This page only answers questions a Thane buyer asks that the
// pillar cannot: local presence, Tally, Marathi, GST, on-site visits, and the
// vendor-selection questions that disqualify the city-page template shops.
// Overlapping the two FAQPage schemas would put our own pages in competition
// for the same snippet.
//
// NOTE ON LOCATION HONESTY: Nexona is a service-area business registered in
// Mumbai (see constants.ts — ADDRESS_IS_PUBLIC is false). Thane is a market we
// serve, not an address we hold. Several competitors ranking for this term
// claim Thane offices while operating out of Nashik, Noida and Vadodara. We do
// not match that, and FAQ 14 says so plainly — it converts the one thing that
// looks like a weakness into the most checkable claim on the page.

export interface FaqItem {
    question: string
    answer: string
}

export const FAQ_ITEMS: FaqItem[] = [
    {
        question: 'What does an AI automation company in Thane actually do?',
        answer:
            'It finds the work your team is doing only because no system does it, and replaces those steps with software. In a Thane business that usually looks like three things: reading documents that arrive as PDFs, scans and WhatsApp photos and turning them into structured records; wiring up systems that currently only talk to each other through a person retyping between them; and handling the enquiries, approvals and follow-ups that sit in someone\'s inbox waiting for attention. The work is not abstract. It is the dispatch challan, the purchase order, the quotation nobody chased.',
    },
    {
        question: 'What is the difference between an AI automation company and an AI automation agency in Thane?',
        answer:
            'Practically, nothing — the two terms get used for the same service, and most businesses searching for an AI automation agency in Thane and one searching for a company mean the same thing. The distinction worth making is a different one: whether the firm writes software or configures a subscription tool. A company that builds in code can handle your scanned purchase orders, your Tally export and your odd approval chain. One reselling a no-code platform can handle whatever the platform already supports, and quotes you a per-user licence forever. Ask which one you are talking to before you ask anything else.',
    },
    {
        question: 'Which processes should we automate first?',
        answer:
            'Not the one people complain about most. During discovery we follow one job end to end and count every point where somebody re-enters, re-checks or chases something, then multiply by frequency. The winner is almost always a small five-minute task running thirty or forty times a day, not the quarterly reporting exercise everyone hates. We ship that one first, because the conversation about scope becomes much easier once one thing is already saving hours.',
    },
    {
        question: 'Do we have to replace Tally, or our existing ERP or CRM?',
        answer:
            'No, and we would argue against it. Tally stays. Your accounting stack stays. The WhatsApp number your customers actually message stays. Automation sits between those systems rather than on top of them. Where a tool has an API we connect through it; where it does not — and with Tally it often does not, cleanly — we build a thin layer that reads and writes the formats it does support. The systems you already trust keep being the system of record.',
    },
    {
        question: 'How long before the first automation is live?',
        answer:
            'Three to five weeks for the first working workflow, and eight to sixteen for a full engagement, depending on how many systems have to talk to each other. A demo can be running in days, and that is worth being honest about: the demo is not the thing. The gap between a workflow that handles the clean case and one that survives the scanned invoice, the missing field and the vendor who names the same product three different ways is where most of the timeline actually goes.',
    },
    {
        question: 'What does AI automation cost, and what makes it cost more?',
        answer:
            'It tracks scope, not seats, and we quote after discovery rather than before — a figure produced before anyone has watched the work happen is a guess in a nice font. What moves the number: how many systems the automation touches, whether your source documents are digital or scanned, how much error tolerance the process has, whether your existing software has an API or has to be worked around, and whether it runs in our infrastructure or yours. There is no per-user licence afterwards. You own what we build, and adding four people to your team costs you nothing extra.',
    },
    {
        question: 'Will this replace our staff?',
        answer:
            'It has not in any project we have run. What it removes is the part of the job nobody wanted — retyping, reconciling, chasing approvals, rebuilding the same Monday report. Teams end up doing more of what they were hired for, and businesses stop hiring for pure data-entry roles rather than cutting the ones they have. If a headcount reduction is the actual goal, say so at the start so we can tell you honestly whether the numbers support it. Sometimes they do not.',
    },
    {
        question: 'Where is our data stored, and does it leave India?',
        answer:
            'That is your decision, and we build to it. Automations can run entirely in infrastructure you own, in an Indian cloud region, or in ours. Where a workflow uses a language model, we are specific about what gets sent, what is redacted first and what never leaves your systems at all — and for a lot of document work the model only ever sees an extracted fragment rather than the whole file. If your compliance position rules out third-party models entirely, that is a constraint we can build inside, not a reason the project stops.',
    },
    {
        question: 'Can it handle Marathi and Hindi documents and messages?',
        answer:
            'Yes, and in this market it usually has to. Customer messages arrive in Marathi, Hindi and English, often mixed inside one sentence and typed in Latin script. Supplier paperwork is more often English, but vendor names, site names and item descriptions are not. We build the classification and extraction against how your documents and messages actually read, using real samples from your business rather than clean test data, and we hold back the ones the system is unsure about instead of guessing at them.',
    },
    {
        question: 'What happens when the AI makes a mistake?',
        answer:
            'It gets caught before it matters, because that is designed in rather than hoped for. Every extraction and classification carries a confidence score, and anything below the threshold you set goes to a human review queue instead of straight through. Every automated action is logged with what the system saw and why it decided what it did, so a wrong result can be traced rather than argued about. Anything irreversible — issuing a credit note, sending a contract, changing a price — is built as draft-and-approve. A person presses the button. Always.',
    },
    {
        question: 'Do we own the code?',
        answer:
            'Yes, in full, including the prompts and the configuration. It is written in Python and standard frameworks, it lives in a repository you control, and it is documented well enough that another engineer can pick it up. We would rather you stayed because the work is good than because leaving is expensive. Ask every vendor you are speaking to this question, and be careful with any answer that describes ownership of your data but not of the system processing it.',
    },
    {
        question: 'Can you automate WhatsApp enquiries into our CRM?',
        answer:
            'Yes, and it is one of the most common first projects in this market, because in Thane WhatsApp is not a marketing channel — it is where the business actually happens. A typical build reads incoming messages on your WhatsApp Business number, works out what the enquiry is and whether it is genuine, writes it into your CRM with the source and the context attached, routes it to whoever should handle it, and follows up if nobody has replied within the window you set. Your team keeps replying from the same number they always have.',
    },
    {
        question: 'Is this viable for a small business, or only for large manufacturers?',
        answer:
            'Small teams often get more out of it, because the same four people absorb every repeat task and there is nobody to hand it to. The gym management system and CRM we built for Aim Fitness in Thane West is not an enterprise deployment — it is one business that was running memberships, renewals and follow-ups across a register, a spreadsheet and somebody\'s phone. You do not need an IT department to start. You need two processes removed.',
    },
    {
        question: 'Are you based in Thane?',
        answer:
            'No. Nexona is registered in Mumbai and works across the MMR, including Thane — we have clients here, Aim Fitness in Thane West among them, and we come to site for discovery. We are telling you this directly because several firms ranking for this search claim a Thane address while operating from Nashik, Noida, Vadodara or Powai, and it takes about thirty seconds to check. Ask anyone you shortlist for the address on their GST registration. Where the engineering actually happens matters more than a pin on a page, but an honest answer to that question tells you something about everything else you will be told.',
    },
    {
        question: 'Which is the best AI automation company in Thane?',
        answer:
            'There is no honest single answer, so use criteria instead of a ranking. Does the firm write code or resell a no-code subscription? Can they show you a working system they built rather than stock screenshots? Who owns the source code afterwards? What is their evaluation method before go-live, and who maintains it in month four when something breaks? Is the office they claim the office they have? Most firms ranking for this term are web-development or digital-marketing agencies that added an AI page. That is not disqualifying on its own, but it should change what you ask them.',
    },
    {
        question: 'What do you need from us to get started?',
        answer:
            'An hour, and an honest description of the part of your week that keeps going wrong. No spec, no process map, no shortlist of tools. We will want to see the real thing at some point — the actual invoice, the actual WhatsApp thread, the actual spreadsheet with the nine tabs — because clean examples hide the exact cases that make automation hard. After that we come back with what we would build first and what we expect it to save. If the answer is that automation is not your problem, we will say that instead.',
    },
]
