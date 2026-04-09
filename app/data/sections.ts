import { SectionData } from '../lib/types'

export const SECTIONS: SectionData[] = [
    {
        id: 'fullstack', category: 'FULL STACK DEVELOPMENT', dark: false,
        products: [
            {
                src: '/logos/1327.png',
                name: '1327',
                alt: '1327', style: { top: '40%', left: '3%', width: '25%', maxWidth: 370, aspectRatio: '1.1/1', clipPath: 'inset(0 2% 0 0)' }, parallaxY: 90,
                description: 'Bespoke Cloth Customization for high-end cafes with integrated branding.',
                link: '/projects/1327'
            },
            {
                src: '/logos/dariza.jpg',
                name: 'Dariza Fabrics',
                alt: 'dariza', style: { top: '38%', left: '40%', width: '17%', maxWidth: 260, aspectRatio: '1/1' }, parallaxY: 115,
                description: 'Premium e-commerce platform matching minimalist aesthetics.',
                link: '/projects/dariza'
            },
            {
                src: '/froven image/Gemini_Generated_Image_gqcanogqcanogqca-Photoroom.png',
                name: 'Froven Innovations',
                alt: 'froven', style: { top: '30%', right: '10%', width: '20%', maxWidth: 430, aspectRatio: '1/1' }, parallaxY: 70,
                description: 'Sales and rental platform for commercial refrigeration showcasing all products with key specs.',
                link: '/projects/froven'
            },
        ],
    },
    {
        id: 'decor', category: 'AI AGENTS', dark: true,
        products: [
            {
                src: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
                name: 'Agentic Web Assistant',
                alt: 'agentic-web-assistant', style: { top: '5%', left: '15%', width: '25%', maxWidth: 350, aspectRatio: '4/3' }, parallaxY: 85,
                description: 'Bring your website to life with an intelligent AI agent that guides, explains, and interacts with visitors in real time.',
                link: '/projects/agentic-web-assistant'
            },
            {
                src: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
                name: 'Enterprise Rag Chatbot',
                alt: 'rag-chatbot', style: { top: '35%', left: '45%', width: '20%', maxWidth: 300, aspectRatio: '1/1' }, parallaxY: 115,
                description: 'Supercharged enterprise RAG chatbots delivering instant, verifiable data retrieval.',
                link: '/projects/rag-chatbot'
            },
            {
                src: '/logos/voice-agent-ai.png',
                name: 'AI Voice Agent',
                alt: 'voice-agent', style: { top: '15%', right: '5%', width: '22%', maxWidth: 320, aspectRatio: '3/4' }, parallaxY: 60,
                description: 'Automate high-volume cutomer outreach with high success rates and instant CRM updates.',
                link: '/projects/voice-agent'
            },
        ],
    },
    {
        id: 'office', category: 'AUTOMATION', dark: false,
        products: [
            {
                src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
                name: 'AI Customer Support Hub',
                alt: 'ai-support-hub', style: { top: '5%', left: '15%', width: '24%', maxWidth: 370, aspectRatio: '1/1' }, parallaxY: 90,
                description: '24/7 Smart Customer Support: Automating your WhatsApp and Website chat so you never miss a lead, even while you sleep.',
                link: '/projects/ai-support-hub'
            },
            {
                src: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
                name: 'Social Autopilot',
                alt: 'social-autopilot', style: { top: '12%', right: '8%', width: '20%', maxWidth: 570, aspectRatio: '1/1' }, parallaxY: 55,
                description: 'Social Media Autopilot: A smart engine that creates and schedules weeks of social content for you automatically.',
                link: '/projects/social-autopilot'
            },
            {
                src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
                name: 'Workflow Connector',
                alt: 'workflow-connector', style: { top: '50%', left: '42%', width: '22%', maxWidth: 320, aspectRatio: '1/1' }, parallaxY: 75,
                description: 'Multi-App Workflow Connector: Linking your business apps together to move data automatically without manual typing.',
                link: '/projects/workflow-connector'
            },
        ],
    },
    {
        id: 'tech', category: 'BUSINESS OPTIMIZATION', dark: true,
        products: [
            {
                src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
                name: 'Automated Sales Tracking',
                alt: 'automated-crm', style: { top: '8%', left: '5%', width: '24%', maxWidth: 370, aspectRatio: '1/1' }, parallaxY: 88,
                description: 'Automated Sales Tracking: A custom tool that monitors every lead and sends auto-reminders to help you close deals faster.',
                link: '/projects/automated-crm'
            },
            {
                src: '/logos/chatapp.png',
                name: 'Secure Multi-Tenant Chat',
                alt: 'multi-tenant-chat', style: { top: '15%', right: '12%', width: '22%', maxWidth: 430, aspectRatio: '1/1' }, parallaxY: 70,
                description: 'Private & Secure Communication: A multi-tenant chat platform with complete data isolation and role-based access for organizations.',
                link: '/projects/multi-tenant-chat'
            },
            {
                src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
                name: 'Business Profit Dashboard',
                alt: 'profit-dashboard', style: { top: '48%', left: '38%', width: '20%', maxWidth: 350, aspectRatio: '1/1' }, parallaxY: 95,
                description: 'Business Profit Dashboard: A single screen showing your real-time sales, ad costs, and profit margins.',
                link: '/projects/profit-dashboard'
            },
        ],
    },
]