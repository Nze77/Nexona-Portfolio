// Shared content for the business management software development landing page.
// Imported by both page.tsx (visible UI) and layout.tsx (JSON-LD schema) so the
// FAQ copy and the FAQPage structured data never drift apart.
//
// Deliberately non-geographic and deliberately NOT an ERP page. The
// manufacturing-erp and college-erp pages own vertical ERP queries; the
// automation page owns "automation agency". This page owns the horizontal
// "business management software" cluster — custom internal tools, replacing
// Excel, unified sales/inventory/operations systems for startups and SMEs.
// No shared H1/H2 phrasing with those pages.

export interface FaqItem {
    question: string
    answer: string
}

export const FAQ_ITEMS: FaqItem[] = [
    {
        question: 'What is business management software?',
        answer:
            'Business management software is one system that runs the operational side of a company — sales, inventory, purchasing, jobs, customers, staff tasks and reporting — instead of those things living in separate spreadsheets, WhatsApp threads and one person’s memory. Custom business management software means it is built around your actual workflow rather than you reshaping the workflow to fit a product someone else designed for a different company. The practical test: can one person answer “what is the status of order 4417” in under ten seconds without opening a second file? If not, you do not have a business management system. You have records.',
    },
    {
        question: 'How do I replace Excel with custom software?',
        answer:
            'Start with the one workbook that hurts most, not all of them. We copy its real data into a proper database, rebuild the columns people actually use as screens, wire in the validation Excel never enforced, and run both side by side for two to three weeks so nobody has to trust it on faith. The spreadsheet stays readable the whole time — you export back to Excel whenever finance asks. Most first phases take four to seven weeks. The mistake we see is trying to replace eleven spreadsheets at once, which turns a build into a migration project and stalls at the halfway point.',
    },
    {
        question: 'When should a startup build custom internal tools?',
        answer:
            'Usually somewhere between 8 and 25 people, and the signal is not headcount — it is when you are about to hire someone whose job is mostly moving information between systems. If a new operations hire would spend half their week copying, chasing and reconciling, build the tool instead. Software you pay for once, against a salary that repeats every year. Before that point spreadsheets and off-the-shelf SaaS are genuinely fine, and we will tell you so.',
    },
    {
        question: 'How much does custom business management software cost?',
        answer:
            'We do not publish a number — the range is too wide for one to mean anything before we have seen how you work. What moves it: how many workflows go into the first phase (one, say sales orders through to dispatch, or sales, inventory and operations together), how many roles and approval rules there are, how many existing tools it has to talk to, and whether reporting or AI is in scope. A focused first system and a unified one spanning three departments are very different builds. We price by scope, not per user — we scope first, then quote. There is no licence afterwards, no seat cost when you hire four more people, and you own the code.',
    },
    {
        question: 'What is the best software to manage growing business operations?',
        answer:
            'Honest answer: for most companies under about 15 people it is a well-organised off-the-shelf tool plus discipline. Zoho, a decent inventory app, one CRM. Custom operations software becomes the better answer when your process has a step no product supports — a two-stage approval, a pricing rule with seven exceptions, stock that moves between locations in a way the software refuses to model — and your team has invented spreadsheet workarounds to cover the gap. Count the workarounds. Three or more and off-the-shelf is now costing you more than it saves.',
    },
    {
        question: 'Can one system handle sales, inventory and operations in one place?',
        answer:
            'That is the whole point of building it custom. Sales and inventory management software sharing one database means a quotation checks live stock, a confirmed order reserves it, dispatch decrements it, and the operations dashboard reflects all three without an overnight sync or a person reconciling at month-end. Off-the-shelf stacks can be integrated to approximate this, and sometimes that is the right call — but integration means two sources of truth and a nightly job that will eventually fail on a Saturday.',
    },
    {
        question: 'How long does a business management software project take?',
        answer:
            'First usable module in four to seven weeks. A full unified system across three or four areas runs three to six months, shipped in phases so you are using part of it long before the whole thing is finished. We do not do the twelve-month big-bang build where nothing works until month eleven. Every phase ends with something your team opens on a Monday.',
    },
    {
        question: 'Do we have to throw away the tools we already use?',
        answer:
            'No. Tally stays, your accounting stack stays, the WhatsApp number your customers actually message stays. We build the operational layer that sits between them and push data across through APIs where they exist. Ripping out a working accounting system to satisfy a tidy architecture diagram is how projects die in month four.',
    },
    {
        question: 'What happens when our process changes after launch?',
        answer:
            'It changes — that is the argument for custom software in the first place. You own the code, so a new approval step or an extra warehouse is a change request, not a feature request sitting in a queue behind 400 other customers. We keep most clients on a small monthly retainer for changes, hosting and monitoring, and some just call us twice a year. Both are fine.',
    },
    {
        question: 'What does custom dashboard development for business actually give us?',
        answer:
            'The number, correct, at 8am, without anybody assembling it. Real dashboards pull from the same live database the operations run on — stock position, order pipeline, overdue payments, job status by person — so the figure on screen is not a snapshot somebody exported on Thursday. We build them role-based: the owner sees margin and cash, the warehouse sees what ships today, sales sees their own pipeline. One truth, different windows onto it.',
    },
    {
        question: 'Is custom software risky for a small company with no IT team?',
        answer:
            'Less risky than the spreadsheet, usually. The risk people imagine is the build failing. The risk we actually see is a business running on a file only one employee fully understands, who then leaves. We handle hosting, backups, monitoring and updates, and you get one person to message rather than a support portal. Most of our SME clients have zero technical staff.',
    },
    {
        question: 'What kinds of businesses do you build management software for?',
        answer:
            'Startups scaling past the spreadsheet stage, distributors and wholesalers, small manufacturers, service businesses running jobs and field teams, education groups, and agencies managing work across several clients. The common thread is not the industry — it is a company doing something specific enough that generic software makes it slower.',
    },
]
