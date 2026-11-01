/**
 * Which AI assistant (if any) sent this visitor. Used by the contact email
 * subject and the WhatsApp pre-filled message, so a lead from ChatGPT is
 * recognisable at a glance instead of buried in the referrer line.
 *
 * Two signals, either is enough:
 *   • utm_source — ChatGPT appends `utm_source=chatgpt.com` to cited links;
 *     Perplexity and Copilot do something similar on some surfaces.
 *   • referrer domain — set when the assistant does not strip it.
 *
 * Pure function, no browser APIs: safe on the server and the client.
 */
const AI_SOURCES: [RegExp, string][] = [
    [/(^|\.)chatgpt\.com$|(^|\.)openai\.com$|^chatgpt$|^openai$/, 'ChatGPT'],
    [/(^|\.)perplexity\.ai$|^perplexity$/, 'Perplexity'],
    [/(^|\.)claude\.ai$|^claude$/, 'Claude'],
    [/^gemini\.google\.com$|^bard\.google\.com$|^gemini$/, 'Gemini'],
    [/^copilot\.microsoft\.com$|^copilot$/, 'Copilot'],
    [/(^|\.)deepseek\.com$|^deepseek$/, 'DeepSeek'],
]

export function aiSourceOf(referrerDomain?: string, utmSource?: string): string | undefined {
    for (const raw of [utmSource, referrerDomain]) {
        const value = (raw ?? '').trim().toLowerCase().replace(/^www\./, '')
        if (!value) continue
        const hit = AI_SOURCES.find(([re]) => re.test(value))
        if (hit) return hit[1]
    }
    return undefined
}
