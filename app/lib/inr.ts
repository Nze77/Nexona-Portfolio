/** ₹ in Indian notation: ₹37,500 · ₹1.53 lakh · ₹2.62 crore. */
export function inr(n: number): string {
    const sign = n < 0 ? '−' : ''
    const v = Math.abs(n)
    if (v >= 10000000) return `${sign}₹${Number((v / 10000000).toFixed(2))} crore`
    if (v >= 100000) return `${sign}₹${Number((v / 100000).toFixed(2))} lakh`
    return `${sign}₹${Math.round(v).toLocaleString('en-IN')}`
}
