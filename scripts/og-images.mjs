// Generates the 1200×630 social preview image for every page into public/og/.
// Run after adding a case study or changing page titles:  npm run og
// Needs Node 22.18+ (imports a .ts content file) and Google Chrome, or run
// `npx playwright install chromium` once.

import { mkdir, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import { CASE_STUDIES } from '../src/content/caseStudies.ts'

const root = fileURLToPath(new URL('..', import.meta.url))
const outDir = `${root}public/og`

// File names must match ogImageFor() in src/components/Seo.tsx.
const PAGES = [
  { file: 'home', eyebrow: 'Founder-led offshore engineering', title: 'The Offshore Partner You Don’t Have to Chase.', meta: 'Web · SaaS · Data · AI — from India, in your hours' },
  { file: 'work', eyebrow: 'Our work', title: 'Production Systems, Real Numbers', meta: '280+ TB · 8–16B events a day · 3.4× faster queries' },
  { file: 'how-we-work', eyebrow: 'How we work', title: 'Six Commitments, In Writing', meta: 'You own the code · Real overlap · No lock-in' },
  { file: 'about', eyebrow: 'About', title: 'A Small Studio, Built on Big Systems', meta: 'Founder-led · Vetted engineer network' },
  { file: 'contact', eyebrow: 'Get in touch', title: 'Tell Us What You’re Building', meta: 'Free 30-minute call · Reply within one business day' },
  { file: 'privacy', eyebrow: 'Privacy', title: 'Privacy Policy', meta: 'What we collect, and how to have it removed' },
  ...CASE_STUDIES.map((study) => ({
    file: `work-${study.slug}`,
    eyebrow: `Case study · ${study.sector}`,
    title: study.title,
    metric: study.highlight,
  })),
]

const font = async (pkg, file) =>
  (await readFile(`${root}node_modules/@fontsource/${pkg}/files/${file}`)).toString('base64')

const mark = (await readFile(`${root}public/logo-mark.svg`, 'utf8')).replace('<svg ', '<svg width="72" height="72" ')

const escape = (text) => text.replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`)

function html({ eyebrow, title, meta, metric }, fonts) {
  return `<!doctype html><html><head><style>
    @font-face { font-family: 'Space Grotesk'; font-weight: 500; src: url(data:font/woff2;base64,${fonts.sg500}) format('woff2'); }
    @font-face { font-family: 'Space Grotesk'; font-weight: 700; src: url(data:font/woff2;base64,${fonts.sg700}) format('woff2'); }
    @font-face { font-family: 'Inter'; font-weight: 400; src: url(data:font/woff2;base64,${fonts.inter}) format('woff2'); }
    * { margin: 0; box-sizing: border-box; }
    body { width: 1200px; height: 630px; background: #090909; color: #fff; font-family: Inter; padding: 72px 80px;
      display: flex; flex-direction: column; position: relative; overflow: hidden; }
    .glow { position: absolute; width: 760px; height: 760px; right: -220px; top: -260px; border-radius: 50%;
      background: radial-gradient(circle, rgba(45,212,191,.16) 0%, transparent 65%); }
    .grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px); background-size: 48px 48px;
      mask-image: radial-gradient(ellipse at 30% 40%, #000 0%, transparent 75%); }
    .brand { display: flex; align-items: center; gap: 16px; position: relative; }
    .word { font-family: 'Space Grotesk'; font-weight: 700; font-size: 34px; letter-spacing: .02em; text-transform: uppercase; line-height: 1; }
    .tech { display: flex; align-items: center; gap: 10px; font-family: 'Space Grotesk'; font-weight: 500; font-size: 16px;
      letter-spacing: .45em; text-transform: uppercase; color: rgba(255,255,255,.8); margin-top: 8px; }
    .tech i { height: 2px; flex: 1; background: #2DD4BF; }
    .eyebrow { margin-top: auto; font-family: 'Space Grotesk'; font-weight: 500; font-size: 22px; letter-spacing: .14em;
      text-transform: uppercase; color: #2DD4BF; position: relative; }
    h1 { font-family: 'Space Grotesk'; font-weight: 700; font-size: 68px; line-height: 1.06; margin-top: 18px; max-width: 980px; position: relative; }
    .meta { margin-top: 26px; font-size: 26px; color: #B3B3B3; position: relative; }
    .metric { margin-top: 28px; display: flex; align-items: baseline; gap: 18px; position: relative; }
    .metric b { font-family: 'Space Grotesk'; font-size: 52px; color: #2DD4BF; }
    .metric span { font-size: 26px; color: #B3B3B3; }
    .url { position: absolute; right: 80px; top: 86px; font-size: 22px; color: #B3B3B3; }
  </style></head><body>
    <div class="grid"></div><div class="glow"></div>
    <div class="brand">${mark}<div><div class="word">Brew <span style="color:#2DD4BF">Code</span></div>
      <div class="tech"><i></i>Tech<i></i></div></div></div>
    <div class="url">brewcodetech.com</div>
    <p class="eyebrow">${escape(eyebrow)}</p>
    <h1>${escape(title)}</h1>
    ${metric ? `<div class="metric"><b>${escape(metric.metric)}</b><span>${escape(metric.label)}</span></div>` : `<p class="meta">${escape(meta)}</p>`}
  </body></html>`
}

const fonts = {
  sg500: await font('space-grotesk', 'space-grotesk-latin-500-normal.woff2'),
  sg700: await font('space-grotesk', 'space-grotesk-latin-700-normal.woff2'),
  inter: await font('inter', 'inter-latin-400-normal.woff2'),
}

await mkdir(outDir, { recursive: true })
const browser = await chromium.launch().catch(() => chromium.launch({ channel: 'chrome' }))
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
for (const entry of PAGES) {
  await page.setContent(html(entry, fonts), { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: `${outDir}/${entry.file}.png` })
  console.log(`og/${entry.file}.png`)
}
await browser.close()
