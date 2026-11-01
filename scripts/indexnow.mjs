// Tell Bing (and the other IndexNow engines: Yandex, Seznam, Naver) that
// pages changed, so they are recrawled in hours instead of weeks. ChatGPT
// search draws on Bing's index, so this is the fastest route from "deployed"
// to "citable by ChatGPT".
//
// Run AFTER the deploy is live — the engines fetch the URLs straight away:
//
//   npm run indexnow                       (the default list below)
//   npm run indexnow -- /some-page /other  (specific paths)
//
// The key file public/<KEY>.txt must be live at the site root; IndexNow
// fetches it to prove we own the domain.

const SITE = 'https://www.nexonalabs.com'
const KEY = 'e69bf3f700ee41ba93a51bb5a4e92228'

// Pages changed with the business app cost guide (2026-11-01).
const DEFAULT_PATHS = [
    '/business-app-development-cost-in-india',
    '/distributor-management-system-cost-in-india',
    '/mobile-app-development-company-in-mumbai',
    '/software-development-agency-mumbai',
    '/manufacturing-erp',
    '/business-management-software-development',
    '/distributor-management-system',
    '/blogs/ready-made-vs-custom-distributor-management-system',
    '/blogs',
    '/llms.txt',
    '/llms-full.txt',
    '/sitemap.xml',
]

const paths = process.argv.slice(2).length ? process.argv.slice(2) : DEFAULT_PATHS
const urlList = paths.map((p) => (p.startsWith('http') ? p : `${SITE}${p.startsWith('/') ? p : `/${p}`}`))

// Sanity check: the key file and the first page must already be live.
for (const url of [`${SITE}/${KEY}.txt`, urlList[0]]) {
    const res = await fetch(url, { redirect: 'manual' })
    if (res.status !== 200) {
        console.error(`✗ ${url} returned ${res.status}. Deploy first, then run this again.`)
        process.exit(1)
    }
}

const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
})

// 200 = accepted, 202 = accepted, key validation pending. Anything else failed.
if (res.status === 200 || res.status === 202) {
    console.log(`✓ IndexNow accepted ${urlList.length} URLs (HTTP ${res.status}):`)
    urlList.forEach((u) => console.log(`  ${u}`))
} else {
    console.error(`✗ IndexNow returned HTTP ${res.status}: ${await res.text()}`)
    process.exit(1)
}
