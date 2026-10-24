// Shared content for the mobile app development company in Mumbai landing page.
// Imported by both page.tsx (visible UI) and layout.tsx (JSON-LD schema) so the
// FAQ copy and the FAQPage structured data never drift apart.
//
// KEYWORD MAP — this page is the LOCAL page of the mobile cluster:
//
//   Primary    mobile app development company in mumbai   (slug, title, meta, H1, first line)
//   Secondary  app development company in mumbai, custom mobile app development,
//              mobile app development company in navi mumbai / in thane
//   Supporting android / ios / flutter / react native app development (H3s only —
//              each gets its own page later, so they stay sections here)
//
// The future non-geographic page (/mobile-app-development-services) owns
// "mobile app development company in india" and "mobile app development
// services". Keep "India" out of this page's title and H1.
//
// PRICING: starting prices approved by the user on 2026-10-24 (this page and
// the Mumbai software page only). Always "starts from" — never a flat price or
// a range. Mirrored in APP_STARTING_PRICES on the Mumbai page; keep in step.
//
// NDA: the D2C case study client is never named, and the ClientStrip is left
// off this page on purpose — its logo wall sits too close to the case study.

export interface FaqItem {
    question: string
    answer: string
}

export const APP_PRICE_TIERS: { tier: string; price: string; scope: string; time: string }[] = [
    { tier: 'MVP', price: '₹25,000', scope: 'One type of user, one core flow, one way to pay. Enough to test the idea with real people.', time: '8–12 weeks' },
    { tier: 'Mid-size', price: '₹1.53 lakh', scope: 'Two types of user, or several outside systems to talk to — your ERP, a courier API, a loyalty programme.', time: 'Around 16 weeks' },
    { tier: 'Complex', price: '₹4 lakh', scope: 'On-demand and multi-app platforms, offline sync, hardware like printers and scanners, heavy integrations.', time: 'Scoped per project' }
]

export const FAQ_ITEMS: FaqItem[] = [
    {
        question: 'How long does it take to build a mobile app in Mumbai?',
        answer:
            'Eight to twelve weeks for a focused first version: one type of user, one core flow, one way to pay. Add a second user type — a delivery partner, a vendor, a technician — and it moves closer to sixteen. The part people forget to plan for is the store. Apple review takes anywhere from a day to a week, and the first rejection is usually about something small, like a sign-up screen with no way to delete the account.',
    },
    {
        question: 'How much does mobile app development cost in Mumbai?',
        answer:
            'An MVP app starts from ₹25,000. A mid-size app starts from ₹1.53 lakh, and a complex one from ₹4 lakh. Where yours lands above that depends on scope, and we give the exact number after scoping. What moves it: one platform or both, how many types of user the app has, how many outside systems it talks to (payments, your ERP, a courier API), whether it needs a custom backend and admin panel or one already exists, offline use, and how custom the design is. What does not move it: the number of people who download it. There is no per-user licence. You own the app.',
    },
    {
        question: 'Should I build for Android or iOS first?',
        answer:
            'Android, for most Mumbai businesses. More than nine in ten smartphones in India run it. The exception is a premium consumer brand, where iOS share among your actual buyers can be far higher than the national number — check your website analytics before deciding. Or skip the choice. Flutter and React Native ship both from one codebase, which is how we built the D2C app on this page.',
    },
    {
        question: 'Flutter, React Native or native — which is better?',
        answer:
            'None of them is better in general. Flutter when the design has to look identical on every phone and there is no existing web codebase. React Native when you already run a React website and want to share logic and engineers with it. Native Kotlin and Swift when the app lives on hardware — Bluetooth printers, barcode scanners, background location. If an agency gives the same answer for every project, you are hearing what their team knows.',
    },
    {
        question: 'Do I own the source code and the app store accounts?',
        answer:
            'Yes, both, from day one. The code sits in a repository in your name. The Play Console and App Store Connect accounts are registered to your company, not ours — we are added as developers and removed whenever you like. Ask every agency this question. An app published under the agency’s developer account cannot simply be moved later, and that is exactly how clients get stuck.',
    },
    {
        question: 'Can you take over an app another agency started?',
        answer:
            'Usually, yes. We start with a one-to-two week code audit and tell you plainly whether to continue on what exists or rebuild the parts that are holding it back. Sometimes it is fine and just needs an owner. Sometimes the backend is fine and the app is the problem. The one situation we cannot fix quickly is an app published under the previous agency’s store account — so check that first.',
    },
    {
        question: 'Do you handle Play Store and App Store publishing?',
        answer:
            'Yes. Store listing, screenshots, privacy disclosures, the data-safety form on Google Play, submission, and the back-and-forth with review. We budget time for one rejection on iOS because there usually is one. You need a Google Play developer account and an Apple developer account in your company’s name, and we walk you through setting both up if you have not.',
    },
    {
        question: 'What happens after the app goes live?',
        answer:
            'Crash reporting is switched on before launch, so we usually know about a bug before your customers do. After that it is a monthly retainer or on-call fixes, your choice, with a named engineer you can message on WhatsApp rather than a ticket queue. Plan for one piece of work every year regardless: Apple and Google both ship major OS updates, Apple every September, and something small always needs adjusting.',
    },
    {
        question: 'Can you add AI features to a mobile app?',
        answer:
            'Yes, and it is a large part of the rest of our work. Search that understands what a customer means rather than the exact product name, a support assistant that answers from your own catalogue and policies, voice input in Hindi and Marathi, document or photo reading in field apps. We are specific about what runs on the phone, what runs on your server, and what — if anything — goes to an outside model.',
    },
    {
        question: 'Will you sign an NDA?',
        answer:
            'Yes, before the first call if you want. The D2C case study on this page is anonymised for exactly that reason — the client asked us not to name them, so we do not. Your idea is not the valuable part to steal, honestly. The execution is. But we understand why you would want it on paper.',
    },
    {
        question: 'Are you actually based in Mumbai?',
        answer:
            'Yes. Nexona is registered in Mumbai and works across the MMR. Thane and Navi Mumbai are markets we serve, not offices we claim. Scoping can happen in person at your office; the build itself is remote, the way it is for most engineering teams in this city. Ask anyone you shortlist for the address on their GST registration. It takes thirty seconds and it tells you a lot.',
    },
]
