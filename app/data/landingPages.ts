// Registry of SEO landing pages living under the app/(landing) route group.
// Add a new entry here whenever you create another landing page so it is
// automatically picked up by the sitemap and gets proper <head> metadata.

export interface LandingPage {
    /** URL slug — must match the folder name under app/(landing)/ */
    slug: string
    title: string
    description: string
    /** Sitemap priority (0–1). Landing pages are high-intent, keep this high. */
    priority?: number
}

export const LANDING_PAGES: LandingPage[] = [
    {
        slug: 'software-development-agency-mumbai',
        title: 'Software Development Agency in Mumbai | Nexona',
        description:
            'Nexona is a Mumbai-based software development agency building custom web apps, AI agents, automations, and full-stack solutions for growing businesses.',
        priority: 0.9,
    },
]
