/** "2026-09-24" → "24 September 2026". Parsed as UTC so the day never shifts. */
export function formatPostDate(iso: string): string {
    return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
    })
}
