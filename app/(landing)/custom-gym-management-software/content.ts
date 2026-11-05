export interface FaqItem {
    question: string
    answer: string
}

/** Visible "last updated" date. Keep equal to `updated` in landingPages.ts. */
export const LAST_UPDATED = '5 November 2026'
export const LAST_UPDATED_ISO = '2026-11-05'

// ── Pricing rule for this page ───────────────────────────────────────────────
// "Starts from" ₹22,000 for gym software, user-approved 2026-11-05. Never a flat
// price or a range, don't describe what it includes until the user says, and
// don't extend it to Pilates, yoga or other non-gym builds without asking. Keep
// in step with `business.startingPrice` in landingPages.ts. Other ₹ figures are
// third-party market numbers with a named source.
export const STARTING_PRICE = '₹22,000'

// ── Proof rule for this page ─────────────────────────────────────────────────
// Aim Fitness is a real client. Its figures match the Thane landing page and
// come from the client: do not round up, do not add a fourth. Modules listed as
// running there must stay limited to what was actually delivered. Anything else
// belongs in ADD_ONS, which is what we can build, not what Aim Fitness uses.
export const AIM_RESULTS = [
    { value: '+88%', label: 'Renewals' },
    { value: '8–12 hrs', label: 'Saved per week' },
    { value: '<90 → 500+', label: 'Members handled, same desk' },
]

export const AIM_FACTS: [string, string][] = [
    ['What we built', 'Custom gym management system + CRM'],
    ['Replaced', 'A paper register, a spreadsheet and a phone'],
    ['Runs on', 'Their own infrastructure. Their code.'],
]

// FAQ doubles as FAQPage structured data, so every answer opens with the actual
// answer. Questions are phrased the way people type them into ChatGPT.
export const FAQ_ITEMS: FaqItem[] = [
    {
        question: 'What is the best gym management software in India?',
        answer: 'There is no single best one. It depends on what you run. For one gym on standard monthly plans, start with a ready-made Indian tool such as Easy Gym Software, OkFit or Gymforce. Boutique studios often look at Glofox or Mindbody. If you run several branches or unusual plans, or you want to own your data, custom gym management software usually fits better.',
    },
    {
        question: 'What is custom gym management software?',
        answer: 'Custom gym management software is a system built for one gym business, around its own plans, renewal process and front desk, instead of a shared product rented by the month. It covers members, renewals, attendance, payments and follow-ups. You own the source code and the data, and there is no per-member fee.',
    },
    {
        question: 'How much does gym management software cost in India?',
        answer: `Custom gym management software from Nexona Labs starts from ${STARTING_PRICE}. The final quote depends on scope, and you get it after a free workflow audit, before we start. For comparison, ready-made gym software in India runs about ₹1,000 to ₹3,500 a month for up to 300 members, and ₹8,000 to ₹25,000 or more at 1,000-plus members or for a franchise, according to Easy Gym Software’s 2026 pricing guide.`,
    },
    {
        question: 'Is custom gym software worth it for a small gym?',
        answer: `It can be, and member count alone does not decide it. Aim Fitness had fewer than 90 paying members when it went custom, and the same system now handles more than 500. Custom software starts from ${STARTING_PRICE} and makes sense when your plans do not fit a template, you are opening a second branch, or renewals are leaking. If a ready-made tool already handles how you run, stay on it.`,
    },
    {
        question: 'Has Nexona Labs built a gym management system for a real gym?',
        answer: 'Yes. Nexona Labs built a custom gym management system and CRM for Aim Fitness in Lokmanya Nagar, Thane West. It replaced a paper register, a spreadsheet and a personal phone. Renewals are up 88%, the desk saves eight to twelve hours a week, and it now handles more than 500 members, up from fewer than 90.',
    },
    {
        question: 'What is the difference between a gym management system, a gym management app and a fitness management system?',
        answer: 'Mostly the words. A gym management system is the whole thing: members, renewals, attendance and billing. A gym management app is that same system on a phone, for the owner, the desk or the member. A fitness management system usually means the same software for yoga, Pilates, CrossFit and boutique studios, with class bookings added.',
    },
    {
        question: 'Can gym management software send WhatsApp renewal reminders?',
        answer: 'Yes, through the official WhatsApp Business API. Reminders go out from the gym’s number on a schedule you set, and stop the moment the member responds. No staff phone involved. Meta charges per message, and we pass that through at cost.',
    },
    {
        question: 'Does it work with biometric attendance machines like ZKTeco or eSSL?',
        answer: 'Usually, yes. We can connect biometric and face-recognition devices when the machine exposes an SDK or pushes its attendance data, which common ZKTeco and eSSL models tend to. Support varies by model and firmware, so send us the exact model number before anyone promises anything. No machine yet? QR check-in on a phone works fine.',
    },
    {
        question: 'Can gym software stop expired members from entering?',
        answer: 'Yes. At minimum, the desk sees a red expired flag the moment the member checks in. With an access-controlled turnstile or door and a compatible biometric device, the system can refuse entry until the renewal is paid, then let the member straight back in.',
    },
    {
        question: 'What is the GST rate on gym membership in India?',
        answer: 'Gym and fitness centre services moved from 18% to 5% GST without input tax credit on 22 September 2025, after the 56th GST Council meeting. Plenty of pages and billing tools still show 18%. Confirm your rate and SAC code with your CA. In a system we build the rate is a setting, so the next change takes a minute, not a developer.',
    },
    {
        question: 'Can it track personal training sessions and trainer commissions?',
        answer: 'Yes. PT packs count down one session at a time, visible to the member and the trainer, so the “you said 11, I count 9” conversation stops. Commissions calculate from your own rules: a flat cut, a slab, or a different split per trainer.',
    },
    {
        question: 'Do I need a member app for my gym?',
        answer: 'Not on day one. Most gyms get more out of renewal follow-ups first, because members rarely open a gym app after the second week and they always open WhatsApp. Add a member app when you have something worth opening it for: class bookings, PT slots or workout plans.',
    },
    {
        question: 'What is the difference between gym software and studio software?',
        answer: 'Gyms sell time. Studios sell spots. A gym member buys a plan with an end date and walks in whenever. A Pilates or yoga client books one place in one class, so the software needs capacity limits, waitlists, credits and cancellation rules. Run a studio on gym software and you will keep a WhatsApp group for bookings.',
    },
    {
        question: 'What should Pilates studio management software do?',
        answer: 'Cap every class at the number of reformers, sell group and private credits, run a waitlist, enforce your late-cancel rule and schedule instructors. It should also remind clients on WhatsApp and show which credits are about to expire. Those last two are where most of the renewal money sits, same as a gym.',
    },
    {
        question: 'What is the best Pilates or yoga studio management software in India?',
        answer: 'For one studio on standard classes and credit packs, compare ready-made booking tools such as Glofox and Mindbody first, and check how they handle GST and WhatsApp. Custom Pilates studio software makes sense when you run several rooms, your own credit rules or multiple branches, or you want to own the system and the client list.',
    },
    {
        question: 'Do you build custom software for yoga studios, dance academies, swimming pools and sports clubs?',
        answer: 'Yes. We build custom management software for Pilates and yoga studios, dance and martial arts academies, swimming pools, turfs and sports clubs. Aim Fitness is a gym, and it is the fitness build we can show you today. For other businesses we start from the same core and build what differs, then quote before starting.',
    },
    {
        question: 'Can you build court or slot booking software for a turf, pool or badminton academy?',
        answer: 'Yes. Slot booking by court, lane or hour, peak-time pricing, pay-and-play next to memberships and coaching batches on one calendar. The system refuses a double booking, which is the whole point. Payment links go out on WhatsApp, so a slot is not held for someone who never pays.',
    },
    {
        question: 'Does it work for multiple gym branches?',
        answer: 'Yes. Each branch gets its own collections, renewals due and staff logins. The owner sees all of them on one screen. Members can be tied to a branch or allowed across all of them, depending on what you sold them. There is no per-branch licence on software you own.',
    },
    {
        question: 'Can I move my data from a register, Excel or another gym software?',
        answer: 'Yes. Excel sheets and exports from other software come across directly. A paper register has to be typed in once, so we help you clean up active members first and leave the 2019 pages where they are. Check that your current vendor lets you export before you give notice.',
    },
    {
        question: 'How long does it take to build custom gym management software?',
        answer: 'The first working module, usually members and renewals, is typically live in two to three weeks. A fuller system takes six to ten weeks and arrives in stages, so your front desk is using real screens from the first month. A ready-made tool is faster to start. It usually goes live in days.',
    },
    {
        question: 'Do I own the software and my member data?',
        answer: 'Yes. The source code, the database and the documentation are yours, and it runs on your own infrastructure if you want. Aim Fitness runs that way. Leave us one day and you can hand it to another developer, member list included.',
    },
    {
        question: 'Do you build gym software for gyms outside Mumbai and Thane?',
        answer: 'Yes. Nexona Labs is based in Mumbai and works with gyms across India. Most of the build runs remotely, with a walkthrough of how your desk works today. For Aim Fitness in Thane West we came to site, because the front desk is where the real process lives.',
    },
    {
        question: 'How do I reduce member churn at my gym?',
        answer: 'Catch the expiry before it passes. Most churn is quiet: a plan lapses, nobody calls for three weeks, and the member has already joined somewhere else. A renewal list that surfaces dates early, plus a follow-up that does not depend on someone remembering, moved renewals up 88% at Aim Fitness.',
    },
]

// Real Aim Fitness screens. Attendance and Expiring are redacted copies: the raw
// screenshots show real member names and phone numbers and must never be served.
// Dashboard figures are the gym's own, as of the capture date on 5 November 2026.
export const AIM_SCREENS = {
    dashboard: {
        src: '/gymsoftware/aim-fitness-gym-management-dashboard.webp',
        width: 1917,
        height: 968,
        alt: 'Admin dashboard of the custom gym management system Nexona Labs built for Aim Fitness, showing 681 total members, 660 active members and 72 recent check-ins, with navigation for check-in, attendance, members, expiring plans, messages, enquiries and export.',
        caption: 'The admin dashboard at Aim Fitness on 5 November 2026: 681 members, 660 of them active. Check-in, attendance, members, expiring plans, messages, enquiries and export all sit in one sidebar.',
    },
    expiring: {
        src: '/gymsoftware/aim-fitness-expiring-memberships.webp',
        width: 1917,
        height: 966,
        alt: 'Expiring Soon screen of a gym management system at Aim Fitness, listing memberships that expire today with a selectable time horizon. Member names and phone numbers are hidden.',
        title: 'The screen behind the 88%',
        caption: 'Every plan about to run out, over whichever horizon you pick. Member names and numbers hidden here.',
    },
    attendance: {
        src: '/gymsoftware/aim-fitness-attendance-log.webp',
        width: 1917,
        height: 968,
        alt: 'Attendance screen of a gym management system at Aim Fitness, with a monthly calendar and each member’s check-in and check-out times for 5 November. Member names and photos are hidden.',
        title: 'Attendance, day by day',
        caption: 'A calendar of the month, and who came in and left on each day, with times. Names and photos hidden here.',
    },
}

/** Hero quick-facts. Three are Aim Fitness results; attribution sits right above. */
export const HERO_FACTS = [
    { value: '+88%', label: 'renewals at Aim Fitness' },
    { value: '8–12 hrs', label: 'desk time saved a week' },
    { value: '<90 → 500+', label: 'members, same front desk' },
    { value: `From ${STARTING_PRICE}`, label: 'custom-built, and the code is yours' },
]

/** Pain-to-fix table. Each row should stand on its own if quoted alone. */
export const PAIN_TO_FIX: { pain: string; fix: string }[] = [
    {
        pain: 'Renewal dates live in a register. Someone flips pages on the 1st, if they remember.',
        fix: 'Every expiry surfaces days ahead in one renewal list, with a name against it.',
    },
    {
        pain: 'A plan lapses quietly. Three weeks later you call, and they joined the gym down the road.',
        fix: 'Follow-ups run on a schedule and stop the moment the member responds.',
    },
    {
        pain: 'Reminders go out from a staff member’s personal phone. They quit, the chats leave too.',
        fix: 'Messages go from the gym’s number, whoever is on the desk that day.',
    },
    {
        pain: 'Someone paid ₹4,500 in cash on Tuesday. On Friday nobody can find it.',
        fix: 'Cash, UPI and card logged against the member, with a receipt and a daily closing total.',
    },
    {
        pain: 'A walk-in enquiry goes on a sticky note. So does the trial session.',
        fix: 'Every enquiry and trial sits in a pipeline with an owner and a next follow-up date.',
    },
    {
        pain: 'The trainer says 11 PT sessions. The member says 9.',
        fix: 'PT packs count down per session, and both of them can see the number.',
    },
    {
        pain: 'A member whose plan ended in August still walks in every morning.',
        fix: 'Check-in flags the expired plan on the spot. With a compatible door, it can refuse entry.',
    },
]

/** The core. These are the modules actually running at Aim Fitness. */
export const FEATURES = [
    {
        title: 'Member management',
        body: 'One record per member, added from one screen and searchable from another. No flipping through a register.',
    },
    {
        title: 'Membership plans',
        body: 'Your plans, set up the way you actually sell them, with start and end dates that calculate themselves.',
    },
    {
        title: 'Payments',
        body: 'Who paid, how much, when, and who still owes. Logged against the member rather than a notebook at the desk.',
    },
    {
        title: 'Check-in and attendance',
        body: 'Check-ins and check-outs with times, per member, on a calendar you can flip back through. Manual check-in when someone forgets.',
    },
    {
        title: 'Renewal tracking',
        body: 'An Expiring screen lists every plan running out, today or over whichever horizon you pick. Dates surface before they pass.',
    },
    {
        title: 'Automated follow-ups',
        body: 'Messages fire on a schedule from the gym’s number and stop the moment someone responds.',
    },
    {
        title: 'Enquiries and CRM',
        body: 'Walk-ins and calls go on an Enquiry screen instead of a sticky note. Your member data exports whenever you want it.',
    },
]

/** What we can add. Not a claim about what runs at Aim Fitness. */
export const ADD_ONS = [
    'Biometric, face-recognition or QR attendance',
    'GST receipts and invoices',
    'Razorpay and UPI payment links',
    'Personal training packs and session counts',
    'Trainer commissions and salary reports',
    'Membership freezes, couple and family plans',
    'Trial-session tracking',
    'Class and batch booking with capacity limits',
    'Turnstile and door access control',
    'Workout and diet plans for members',
    'Multi-branch reporting and staff roles',
    'Android and iOS member app',
]

/** Who opens the app, and what for. */
export const APP_VIEWS = [
    {
        title: 'Owner app',
        body: 'Today’s collections, renewals due this week, new joins, per branch. For checking from a family function without calling the desk. Worth building first.',
    },
    {
        title: 'Front desk and trainer',
        body: 'Renewals to chase, payments to take, a member lookup, PT sessions to mark. Runs in a phone or tablet browser, so nobody is tied to the desk computer.',
    },
    {
        title: 'Member app',
        body: 'Plan status, attendance, PT sessions left, class bookings, a workout plan. Useful, but later. A reminder on WhatsApp beats a push notification nobody allowed.',
    },
]

/** Custom vs rented SaaS vs register. */
export const COMPARISON: { point: string; custom: string; rented: string; register: string }[] = [
    {
        point: 'Best for',
        custom: 'Chains, unusual plans, or owners who want the system and the data to be theirs.',
        rented: 'One gym on standard monthly plans that wants to start this week.',
        register: 'A new gym with a few dozen members and an owner on the desk.',
    },
    {
        point: 'How you pay',
        custom: `Starts from ${STARTING_PRICE}, scoped and quoted first. Hosting at cost. No per-member fee.`,
        rented: 'A monthly fee, usually higher as members or branches grow.',
        register: 'Free. You pay in missed renewals, and you never see that number.',
    },
    {
        point: 'Time to start',
        custom: 'First module in two to three weeks.',
        rented: 'Days. This is the real advantage, and we will not pretend otherwise.',
        register: 'Already running.',
    },
    {
        point: 'Odd plans and rules',
        custom: 'Built the way you sell. Couple plans, freezes, a 47-day Diwali offer, whatever you run.',
        rented: 'Whatever the settings page allows.',
        register: 'Anything, written in the margin, readable by one person.',
    },
    {
        point: 'Renewal follow-ups',
        custom: 'Your schedule, your wording, from your number.',
        rented: 'Often included. Check for WhatsApp API costs and template limits.',
        register: 'When somebody remembers.',
    },
    {
        point: 'More branches',
        custom: 'No per-branch licence.',
        rented: 'Usually a higher plan or a fee per branch.',
        register: 'One register per branch, and no idea what the total is.',
    },
    {
        point: 'Who owns it',
        custom: 'You. Code, database, documentation.',
        rented: 'You rent access. Your data is yours in theory, so ask how the export works.',
        register: 'You, on paper, in one cupboard.',
    },
]

/** Other fitness businesses. Carries the Pilates / yoga / studio long tail and
 *  the "fitness management system" cluster. Aim Fitness is the only fitness
 *  build we can show, so these describe what we would build, never past work. */
export const FITNESS_BUSINESSES = [
    {
        title: 'Pilates studio management software',
        sells: 'A reformer, for one hour',
        body: 'Eight reformers means eight bookings, and the ninth goes on a waitlist. Group and private credits, instructor schedules, and a late-cancel rule that actually deducts the credit.',
    },
    {
        title: 'Yoga studio management software',
        sells: 'A mat in a batch',
        body: 'A 6:30 am batch that holds 14 mats. Monthly batches and drop-ins side by side, substitute teachers, and workshops billed separately.',
    },
    {
        title: 'CrossFit and functional training',
        sells: 'A capped class',
        body: 'Class caps, coach schedules, and session packs that run out on a count instead of a date. Monthly-only software tends to struggle with that last one.',
    },
    {
        title: 'Personal training studios',
        sells: 'A trainer’s hour',
        body: 'Appointments, not classes. Trainer calendars, session packs that count down, commissions, and a client’s progress in one place.',
    },
    {
        title: 'Dance, Zumba and aerobics studios',
        sells: 'A monthly batch',
        body: 'Batches split by level and age, fee reminders on the 1st, and extra charges for the annual show, because there is always an annual show.',
    },
    {
        title: 'Martial arts and boxing academies',
        sells: 'A term, and a next belt',
        body: 'Belt gradings, kids’ attendance, and fee reminders that go to a parent, who may have two children enrolled on one payment.',
    },
    {
        title: 'Swimming pools and aquatic centres',
        sells: 'A slot in a lane',
        body: 'Slot capacity, seasonal coaching batches, passes checked at the gate, and a summer rush that a register has never once survived.',
    },
    {
        title: 'Sports clubs, turfs and badminton courts',
        sells: 'A court, by the hour',
        body: 'Court booking by the hour, peak-time pricing, pay-and-play next to memberships, and coaching batches on the same calendar. No double bookings.',
    },
    {
        title: 'Gym chains and franchises',
        sells: 'The same plan, many times',
        body: 'This is where custom earns its keep. Branch-level numbers, one owner view, staff who see only their branch, and no fee that climbs with every new location.',
    },
]

/** Integrations, named explicitly for entity clarity. */
export const INTEGRATIONS = [
    {
        title: 'WhatsApp Business API',
        body: 'Renewal reminders, payment links and birthday notes from the gym’s own number. Meta bills per message, passed through at cost.',
    },
    {
        title: 'Biometric devices',
        body: 'Attendance from ZKTeco, eSSL and similar machines, where the model exposes an SDK or pushes its data. We check your model first.',
    },
    {
        title: 'Razorpay and UPI',
        body: 'Payment links on every renewal reminder. Paid status updates on the member’s record by itself.',
    },
    {
        title: 'Tally Prime and Zoho Books',
        body: 'Receipts and invoices synced across, so your accountant stays where they already work.',
    },
    {
        title: 'GST billing',
        body: 'Receipts carry your GSTIN and the rate your CA confirms. The rate is a setting, which mattered in September 2025.',
    },
    {
        title: 'Excel import',
        body: 'Existing members, plans and expiry dates come across on day one. A paper register gets typed in once.',
    },
]

/** Rent figures from a named vendor guide. Five-year column is simple ×60. */
export const RENT_ROWS = [
    { size: 'Up to 300 members', monthly: '₹1,000–₹3,500', fiveYears: '₹60,000–₹2.1 lakh' },
    { size: '300–1,000 members', monthly: '₹3,500–₹8,000', fiveYears: '₹2.1–₹4.8 lakh' },
    { size: '1,000+ members', monthly: '₹8,000–₹25,000+', fiveYears: '₹4.8–₹15 lakh+' },
]

export const RENT_SOURCE = {
    name: 'Easy Gym Software’s 2026 pricing guide',
    href: 'https://easygymsoftware.com/blog/gym-software-pricing-in-india',
}

/** What moves the quote up from the starting price. No figures. */
export const COST_DRIVERS = [
    {
        title: 'How many modules',
        body: 'Members and renewals alone is one project. Add PT, classes, a member app and door access and it is a bigger one.',
    },
    {
        title: 'Hardware',
        body: 'A QR code on a phone is simple. Three branches of mixed biometric machines and a turnstile are not.',
    },
    {
        title: 'Branches',
        body: 'One gym has one set of rules. Five franchisees have five opinions about who sees what.',
    },
    {
        title: 'The state of your data',
        body: 'A clean Excel sheet moves in an hour. Four years of registers with renewal dates in pencil take longer.',
    },
]

/** Questions worth asking any vendor, ours included. */
export const VENDOR_QUESTIONS = [
    'What does it cost in year three, with the members and branches you plan to have?',
    'Does WhatsApp go through the official API, and who pays Meta’s per-message charges?',
    'Will it work with your exact biometric model? Ask for a live test, not a compatibility list.',
    'Can you export every member and payment, in a usable format, whenever you want?',
    'Has the GST rate been updated to 5% without ITC? It tells you how closely they are paying attention.',
]

/** Third-party figures. Every one is attributed and linked in the page. */
export const MARKET_STATS = [
    {
        value: '₹37,700 crore',
        label: 'projected size of India’s fitness market by 2030, up from ₹16,200 crore in 2024, growing 15% a year.',
        source: 'Deloitte India and HFA, September 2025',
        href: 'https://www.deloitte.com/in/en/about/press-room/indias-fitness-market-to-double-by-2030-per-a-deloitte-and-hfa-report.html',
    },
    {
        value: '12.3 million',
        label: 'fitness facility members in India in 2024, about 0.8% of the population. Projected to reach 23.3 million by 2030.',
        source: 'Health & Fitness Association, September 2025',
        href: 'https://www.healthandfitness.org/improve-your-club/industry-news/indias-fitness-market-set-to-double-by-2030/',
    },
    {
        value: '80%',
        label: 'of India’s fitness facilities are value gyms, holding 78% of members and 56% of revenue. Most of the market is not a premium chain.',
        source: 'Deloitte India and HFA, September 2025',
        href: 'https://www.deloitte.com/in/en/about/press-room/indias-fitness-market-to-double-by-2030-per-a-deloitte-and-hfa-report.html',
    },
]

export const GST_SOURCE = {
    name: 'Taxscan on the 56th GST Council meeting',
    href: 'https://www.taxscan.in/top-stories/big-relief-for-fitness-lovers-gst-council-proposes-lower-5-tax-on-gyms-salons-yoga-services-1431905',
}
