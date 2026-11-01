// Public DMS cost figures — used by /distributor-management-system-cost-in-india
// and the rent-vs-own section + FAQ on /distributor-management-system.
//
// RULE (user, 2026-11-01): publish what READY-MADE DMS vendors charge, never
// Nexona's own DMS price — no build cost, AMC, hosting, exact savings or
// payback months (savings = their price − ours, so they would give ours away).
// Our side is described in words: "₹0 per distributor", "lakhs, if not crores".
// Exact numbers go to a prospect privately, in the free 5-year comparison.
//
// Do NOT add Nexona cost figures to this file: the DMS landing page is a client
// component, so anything it imports from here ships in the browser bundle.
//
// The "lakhs at ~50 distributors, crores past ~250" claim was checked against
// an internal estimate on 2026-11-01. Re-check it if the rented price changes.
//
// RULE (user, 2026-11-01): nothing that promotes ready-made / rented software
// or any competitor — no "renting is cheaper below X", no "when to rent".

import { inr } from '../lib/inr'

/** Ready-made DMS bundling a distributor portal, CRM and loyalty, per
 *  distributor per MONTH. User-supplied market average, 2026-11-01. Per-rep
 *  seats are NOT included, so every rented figure here is understated. */
export const RENT_PER_DISTRIBUTOR_MONTH = 2000

export interface RentedCost {
    distributors: number
    month: number
    year: number
    threeYears: number
    fiveYears: number
}

export function rented(distributors: number): RentedCost {
    const month = distributors * RENT_PER_DISTRIBUTOR_MONTH
    return { distributors, month, year: month * 12, threeYears: month * 36, fiveYears: month * 60 }
}

export const NETWORK_SIZES = [25, 50, 100, 250, 500, 1000]
export const RENTED = NETWORK_SIZES.map(rented)

export { inr }
