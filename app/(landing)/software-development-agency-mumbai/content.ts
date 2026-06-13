// Shared content for the Mumbai landing page.
// Imported by both page.tsx (visible UI) and layout.tsx (JSON-LD schema)
// so the FAQ copy and the FAQPage structured data never drift apart.

export interface FaqItem {
    question: string
    answer: string
}

export const FAQ_ITEMS: FaqItem[] = [
    {
        question: 'What does a software development agency in Mumbai do?',
        answer:
            'A software development agency in Mumbai designs, builds, and maintains custom software — including websites, mobile apps, ERPs, CRMs, and automation tools — tailored to a business’s specific operational needs, rather than relying on generic off-the-shelf products.',
    },
    {
        question: 'How much does custom software development cost in Mumbai?',
        answer:
            'Costs vary based on project scope, complexity, and timeline. Nexona offers a free initial consultation to scope your project and provide a transparent quote based on your exact requirements.',
    },
    {
        question: 'Does Nexona work with startups as well as large enterprises?',
        answer:
            'Yes. Nexona works with early-stage startups, growing SMEs, and established enterprises across Mumbai and India, scaling our process to match the size and needs of each client.',
    },
    {
        question: 'What technologies does Nexona use for software development?',
        answer:
            'We primarily build with React, Next.js, and Node.js for web applications, alongside cloud infrastructure and AI integration tools for automation and intelligent agents.',
    },
    {
        question: 'How long does a typical software development project take?',
        answer:
            'Timelines depend on project scope — simple web applications may take a few weeks, while custom ERP/CRM systems or AI-integrated platforms typically take a few months. We provide a detailed timeline after the discovery phase.',
    },
]
