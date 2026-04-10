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
        name: 'Dariza Fabrics',
        client: 'Dariza Fabrics',
        year: '2026',
        role: 'E-commerce Development, Creative Direction',
        description: 'For Dariza, we developed a premium e-commerce platform that matches their minimalist fashion aesthetic. The solution features seamless product transitions, a robust cart system, and an optimized mobile shopping experience.',
        image: '/logos/dariza.jpg',
        deliverables: ['E-commerce Platform', 'UX Research', 'Frontend Development'],
        landingPage: 'https://darizafabrics.com'
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
        id: 'agentic-web-assistant',
        name: 'Agentic Web Assistant',
        client: 'Amaan',
        year: '2026',
        role: 'AI Architecture & Full Stack Integration',
        description: `
We transform traditional business websites into intelligent, interactive experiences powered by AI. Instead of static pages, your site gets a built-in assistant that can answer customer questions, explain your services, and navigate visitors to exactly what they need. It understands what users are viewing in real time, making interactions more relevant and engaging. The AI can highlight key offerings, showcase projects, and even assist users in taking action, like filling out inquiry forms. This not only improves user experience but also increases the chances of converting visitors into clients. Think of it as a 24/7 digital representative for your business.

        `,
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
        deliverables: ['Agentic workflow system', 'ReAct Architecture', 'Fully Autonomous'],
        caseStudy: {
            images: ['/portfolio-ai-images/amaan-ref.png', '/portfolio-ai-images/amaan-ref-2.png'],
            title: "CASE STUDY: AMAAN'S DIGITAL CLONE",
            text: "This specific implementation was engineered for our client, Amaan. We processed his entire body of work—every GitHub repository, design file, and professional milestone—into a high-dimensional vector database. The website doesn't just display his projects; it *knows* them. By leveraging advanced RAG (Retrieval-Augmented Generation), Amaan's portfolio can now hold deep, architectural conversations with anyone, explaining his exact technical vision as if he were there in person."
        }
    },
    {
        id: 'rag-chatbot',
        name: 'ENTERPRISE RAG CHATBOT',
        client: 'Personal Portfolio',
        year: '2026',
        role: 'AI Assistant',
        description: 'This RAG-based chatbot is designed for high-volume customer interactions across websites, acting as an assistant, receptionist, and support agent while minimizing operational costs. It reduces typical support overhead from ~$150–250/day to ~$5–10/day for handling ~800–1200 user queries, by running retrieval and generation pipelines efficiently on a single GPU/CPU setup. The system achieves ~400–700 ms response latency, compared to ~2000–3500 ms in API-dependent architectures. It supports 100s–1000s of concurrent users depending on infrastructure, scaling with compute rather than vendor-imposed limits. By leveraging structured knowledge bases and real-time retrieval, it improves answer accuracy from ~60–70% to ~90–95%, significantly reducing fallback or escalation rates. It not only answers queries but also performs actions such as capturing leads, booking appointments, updating CRM fields, and routing requests—improving conversion rates from ~3–5% to ~15–25%. With minimal reliance on external APIs, it ensures lower costs, faster responses, improved data privacy, and complete control over business workflows.',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
        deliverables: ['RAG Pipeline Construction', 'Semantic Search', 'Automated Workflows']
    },
    {
        id: 'voice-agent',
        name: 'AI Voice Agent',
        client: 'Dialexus',
        year: '2025',
        role: 'Voice AI Integration & Telephony',
        description: `
This AI voice agent is built for high-volume calling without relying on per-call API pricing, reducing operational costs from $200–300/day to $7–12/day for ~1000 calls. It runs the entire Agentic AI pipeline on a single GPU, achieving 600–800 ms response latency, compared to ~3000 ms in multi-provider setups. The system supports 100s of concurrent calls per GPU, scaling based on compute rather than vendor limits. It not only handles conversations but also acts on them, automatically updating CRM data, scheduling callbacks, setting next dial times, and managing lead states in real time. This improves outcomes from ~5 to 30-35 successful engagements per 1000 calls while reducing manual effort. With no dependency on proprietary AI services, it offers lower cost, lower latency, and full control over call workflows.
        `,
        image: '/logos/voice-agent-ai.png',
        deliverables: ['Sales & Lead Engagement Automation', 'Agentic AI', 'CRM AI Automation']
    },
    {
        id: 'ai-support-hub',
        name: 'AI CUSTOMER SUPPORT HUB',
        client: 'Retail & Service Businesses',
        year: '2026',
        role: 'AI Implementation & Automation',
        description: 'A 24/7 automated assistant that handles your WhatsApp, Website, and Social Media queries. It answers recurring questions instantly, qualifies leads, and books appointments, ensuring your business is always "open" even when you are offline.',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
        deliverables: ['Automated Chatbot', 'WhatsApp Integration', 'Lead Capture System']
    },
    {
        id: 'social-autopilot',
        name: 'SOCIAL MEDIA AUTOPILOT',
        client: 'Marketing Agencies & Brands',
        year: '2026',
        role: 'Software Development & Content Automation',
        description: 'A custom software tool that streamlines your social media presence. Simply upload your product info or images, and the system generates weeks of engaging posts and schedules them automatically across all your platforms.',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
        deliverables: ['Content Generator', 'Auto-Scheduler', 'Brand Asset Manager']
    },
    {
        id: 'workflow-connector',
        name: 'MULTI-APP WORKFLOW CONNECTOR',
        client: 'Operational Businesses',
        year: '2025',
        role: 'System Integration & Efficiency',
        description: 'We build the "glue" that connects your existing business apps. Instead of manually copying data from your sales platform to your accounting or shipping software, our connector does it for you in real-time, eliminating human error.',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
        deliverables: ['App Synchronization', 'Data Automation', 'Error Reduction Systems']
    },
    {
        id: 'automated-crm',
        name: 'AUTOMATED SALES & CRM',
        client: 'Sales-Driven Organizations',
        year: '2026',
        role: 'CRM Customization & Sales Automation',
        description: 'A lightweight, easy-to-use sales tracker and follow-up engine. It automatically notifies your team when a lead is cold and sends personalized follow-up emails, ensuring that you close more deals with less manual effort.',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
        deliverables: ['Lead Tracking System', 'Auto-Follow-up Engine', 'Sales Reports']
    },
    {
        id: 'multi-tenant-chat',
        name: 'MULTI-TENANT CHAT APPLICATION',
        client: 'Lead Generation Industry',
        year: '2025',
        role: 'SaaS Architecture & Backend Development',
        description: 'A professional-grade real-time chat application tailored for organizations requiring private and secure communication systems. This platform features full tenant isolation, ensuring that each organization’s data remains completely private while allowing centralized oversight. It implements a sophisticated role-based access control (RBAC) system for Super Admins, Tenant Admins, and Users.',
        image: '/logos/chatapp.png',
        deliverables: ['Secure Tenant Isolation', 'Role-Based Access Control', 'Real-time Messaging Suite', 'Admin Oversight Dashboards'],
        caseStudy: {
            images: ['https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80'],
            title: "BUILDING SCALABLE SAAS COMMUNICATION",
            text: "Developed for a client in the lead-gen space who needed internal monitoring combined with employee privacy. Instead of a single-tenant build, I engineered a multi-tenant architecture that allows for rapid onboarding of new organizations. The system features JWT-based security with HttpOnly cookies, Cloudinary-powered media sharing, and dedicated management dashboards for both global and local administrators."
        }
    },
    {
        id: 'profit-dashboard',
        name: 'BUSINESS PROFIT DASHBOARD',
        client: 'Small Business Owners',
        year: '2024',
        role: 'Data Visualization & BI',
        description: 'Stop guessing your numbers. We build a single, crystal-clear dashboard that pulls data from your bank, ads, and sales platforms to show you exactly how much profit you’re making every single day in one view.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
        deliverables: ['Financial Dashboard', 'Ad-Spend Analysis', 'Profit Tracking']
    }
]
