import { ProjectDetail } from '../lib/types'

export const PROJECT_DETAILS: ProjectDetail[] = [
    {
        id: '1327',
        name: '1327',
        client: '1327',
        year: '2026',
        role: 'Full Stack Development, UI/UX Design',
        description: 'A comprehensive branding and web development project for 1327, featuring a bespoke Cloth Customization landing page engineered specifically for high-end cafes. We built a custom identity that reflects their modern principles, including a sophisticated color scheme and branding tools that allow cafes to visualize their unique identity on premium fabrics with high-performance animations.',
        image: '/logos/1327.png',
        deliverables: ['Web Design', 'Full Stack Development', 'Brand Identity', 'Custom Motion'],
        landingPage: 'https://1327.in'
    },
    {
        id: 'dariza',
        name: 'DARIZA FABRICS',
        client: 'Dariza Fabrics',
        year: '2026',
        role: 'E-commerce Development, Creative Direction',
        description: 'For Dariza, we developed a premium e-commerce platform that matches their minimalist fashion aesthetic. The solution features seamless product transitions, a robust cart system, and an optimized mobile shopping experience.',
        image: '/logos/dariza.jpg',
        deliverables: ['E-commerce Platform', 'UX Research', 'Frontend Development'],
        landingPage: 'https://darizafabrics.com'
    },
    {
        id: 'autoparts',
        name: 'AUTO PARTS PRO',
        client: 'Global Motors Group',
        year: '2024',
        role: 'Web Application Development',
        description: 'A large-scale inventory management and customer portal for an international auto parts supplier. We focused on building a lightning-fast search experience and a reliable backend architecture to manage over 100,000 SKUs.',
        image: '/logos/autoparts.png',
        deliverables: ['Web Application', 'Backend Engineering', 'Search Optimization']
    },
    {
        id: 'froven',
        name: 'FROVEN INNOVATIONS',
        client: 'Froven Commercial Refrigeration',
        year: '2026',
        role: 'Full Stack Development, Web Design',
        description: 'A dedicated platform for a sales and rental business for commercial refrigeration showcasing all their products along with detailed key features and specs for a flawless enterprise offering.',
        image: '/froven image/Gemini_Generated_Image_gqcanogqcanogqca-Photoroom.png',
        deliverables: ['Web Application', 'Rental System', 'Product Showcasing'],
        landingPage: 'https://froveninnovations.com'
    },
    {
        id: 'portfolio-ai',
        name: 'PORTFOLIO AI',
        client: 'Amaan',
        year: '2026',
        role: 'AI Architecture & Full Stack Integration',
        description: 'An unbelievably advanced AI chatbot embedded directly into a personal portfolio website. This isn’t a simple FAQ bot—it acts as an omnipresent digital clone of our client, Amaan. It possesses superhuman knowledge of every single project he has engineered, his exact design philosophies, and his entire professional history. It flawlessly answers deeply technical questions about the architecture he built, explaining his exact codebase decisions to recruiters instantly, creating a mind-blowing interactive resume experience.',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
        deliverables: ['Custom LLM Fine-tuning', 'Vector Databases', 'Real-time Omnipresent Chat'],
        caseStudy: {
            images: ['/portfolio-ai-images/amaan-ref.png', '/portfolio-ai-images/amaan-ref-2.png'],
            title: "CASE STUDY: AMAAN'S DIGITAL CLONE",
            text: "This specific implementation was engineered for our client, Amaan. We processed his entire body of work—every GitHub repository, design file, and professional milestone—into a high-dimensional vector database. The website doesn't just display his projects; it *knows* them. By leveraging advanced RAG (Retrieval-Augmented Generation), Amaan's portfolio can now hold deep, architectural conversations with anyone, explaining his exact technical vision as if he were there in person."
        }
    },
    {
        id: 'rag-chatbot',
        name: 'ENTERPRISE RAG CHATBOT',
        client: 'Global Enterprises',
        year: '2026',
        role: 'Advanced AI Systems Engineering',
        description: 'We revolutionized corporate data retrieval by engineering a hyper-accurate Retrieval-Augmented Generation (RAG) chatbot. This astonishing AI essentially devours thousands of pages of dense company documents, manuals, and policies in seconds. It completely eliminates the need for human search, flawlessly retrieving exact information, resolving complex internal queries instantaneously, and saving businesses tens of thousands of work hours while practically neutralizing human error.',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
        deliverables: ['RAG Pipeline Construction', 'Semantic Search', 'Automated Workflows']
    },
    {
        id: 'voice-agent',
        name: 'AUTONOMOUS VOICE AGENT',
        client: 'Outbound Sales Agency',
        year: '2026',
        role: 'Voice AI Integration & Telephony',
        description: 'A shockingly realistic, entirely autonomous Voice AI agent that approaches outbound leads in massive, unprecedented bulk. Capable of dialing thousands of numbers simultaneously, this system converses with absolute human-like inflection, effortlessly navigating objections, booking meetings, and closing sales without a single human intervention. It never sleeps, never hesitates, and converts leads at a completely unprecedented, sky-high scale.',
        image: '/logos/voice-agent-ai.png',
        deliverables: ['Real-time Voice Synthesis', 'Telephony Bulk Dialing', 'Conversational AI Navigation']
    },
    {
        id: 'cards',
        name: 'PRODUCTIVITY DASHBOARD',
        client: 'Nexona Automation',
        year: '2024',
        role: 'Dashboard Development',
        description: 'A centralized portal for tracking business insights and streamlining repetitive data-entry workflows to save time.',
        image: '/logos/cards.jpg',
        deliverables: ['UI/UX Design', 'Dashboard Development', 'API Interconnection']
    },
    {
        id: 'whatsapp',
        name: 'WHATSAPP NOTIFICATIONS',
        client: 'Nexona Automation',
        year: '2025',
        role: 'Backend Integration',
        description: 'Automated notification pipelines via the WhatsApp API to deliver real-time order updates and booking alerts directly to users globally.',
        image: '/logos/whatsapp.png',
        deliverables: ['API Connectors', 'Automation Engine', 'Marketing Triggers']
    },
    {
        id: 'chatapp',
        name: 'ENTERPRISE CHAT APP',
        client: 'Business Solutions Org',
        year: '2024',
        role: 'Full Stack Web App',
        description: 'A robust internal chat dashboard providing real-time data-driven messaging strategies for corporate communications.',
        image: '/logos/chatapp.png',
        deliverables: ['WebSockets', 'Frontend Development', 'Security Audits']
    },
    {
        id: 'attendance',
        name: 'ATTENDANCE SYSTEM',
        client: 'Business Solutions Org',
        year: '2024',
        role: 'Software Development',
        description: 'Holistic system integrations managing team metrics actively, complete with face recognition capabilities for remote check-ins.',
        image: '/logos/attendance.png',
        deliverables: ['Database Architecture', 'Mobile Integration', 'Analytics']
    }
]
