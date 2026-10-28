# Brew Code Tech — Website

Marketing site for **Brew Code Tech**, a founder-led offshore software studio.
Live: https://brewcodetech.com/

A multi-page React site where every route is **pre-rendered to static HTML** at build time
(so search engines and link previews see real content), then hydrated in the browser.
It's hosted free on **Cloudflare Pages**, and a small Pages Function handles the contact form.

## Tech stack

| Category   | Choice |
| ---------- | ------ |
| Framework  | React 18 + TypeScript (strict) + React Router 6 |
| Build      | Vite 6 + [`vite-react-ssg`](https://github.com/Daydreamer-riri/vite-react-ssg) (static pre-rendering) |
| Styling    | Tailwind CSS 3 |
| Animation  | Framer Motion (`LazyMotion`, respects reduced-motion) |
| Icons      | react-icons (Tabler) |
| Fonts      | Fontsource, self-hosted, Latin subset only |
| Hosting    | Cloudflare Pages (+ Pages Functions for `/api/contact`) |

## Pages

| Route              | File                         | What's on it |
| ------------------ | ---------------------------- | ------------ |
| `/`                | `src/pages/Home.tsx`         | Hero, proof strip, services, featured work, Brew Promise, timezone overlap, founder, CTA |
| `/work`            | `src/pages/Work.tsx`         | All case studies |
| `/work/:slug`      | `src/pages/CaseStudy.tsx`    | One case study (one page per entry in `caseStudies.ts`) |
| `/how-we-work`     | `src/pages/HowWeWork.tsx`    | Engagement models, process, Brew Promise, FAQ |
| `/about`           | `src/pages/About.tsx`        | Studio story, founder, engineer network, why us |
| `/contact`         | `src/pages/Contact.tsx`      | Project-brief form + booking link |
| `/privacy`         | `src/pages/Privacy.tsx`      | Privacy policy (linked from the footer and contact form) |
| anything else      | `src/pages/NotFound.tsx`     | Rendered to `dist/404.html` |

## Editing content

All copy that changes over time lives in `src/content/`. Components just render it.

- **Add a project:** append to `CASE_STUDIES` in `src/content/caseStudies.ts`. The `/work` page,
  its detail page, and the sitemap pick it up automatically.
- **Founder, email, booking link, working hours, testimonials, rates:** `src/content/company.ts`.
- **The Brew Promise:** `src/content/promise.ts`. **FAQ:** `src/content/faq.ts`.
  **Engagement models:** `src/content/engagement.ts`.

Some sections stay hidden until you give them real data:
- **Testimonials** show once `TESTIMONIALS` has at least one quote.
- **The cost comparison** shows once `COST_COMPARISON.brewMonthlyUsd` is set.

Search for `TODO(content)` to find every placeholder that needs a real answer before launch.

## Brand assets

- **Logo:** `src/components/Logo.tsx` (inline SVG mark + wordmark, used in the navbar and footer).
  The same mark lives in `public/logo-mark.svg`, and on a dark tile in `public/favicon.svg`.
  `favicon-32x32.png`, `apple-touch-icon.png`, and `icon-512.png` are rendered from those SVGs.
- **Social preview images:** every page has its own 1200×630 image in `public/og/`, used for
  LinkedIn, WhatsApp, Slack, and X link previews. They are generated, not hand-made. After adding a
  case study or renaming a page, run:

  ```bash
  npm run og    # needs Node 22.18+ and Google Chrome (or: npx playwright install chromium)
  ```

  Page titles for the images live in `scripts/og-images.mjs`; case studies are read from
  `src/content/caseStudies.ts`. Commit the regenerated PNGs.

## Development

Requires Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:5173 (client-rendered, fast refresh)
npm run lint
npm run build      # type-check + pre-render every route into dist/
```

`npm run build` also:
- writes `dist/sitemap.xml` from the pages it actually rendered (pages marked `noindex` are skipped);
- writes `dist/404.html`;
- fills the CSP in `dist/_headers` with SHA-256 hashes of the inline hydration scripts, which change every build.

To test the production build exactly as Cloudflare serves it (headers, 404 page, contact function):

```bash
npm run build && npm run preview   # http://localhost:8788
```

## Hosting on Cloudflare Pages (free)

One-time setup, about 20 minutes:

1. **Add the domain.** Create a free Cloudflare account → *Add a site* → `brewcodetech.com`. At your
   registrar, switch the nameservers to the two Cloudflare gives you. Existing DNS records are
   imported.
2. **Connect the repo.** *Workers & Pages → Create → Pages → Connect to Git* → `BrewCode-Tech/web-app`.
   Build command `npm run build`, output directory `dist`, environment variable `NODE_VERSION=20`.
   Every push to `main` deploys to production, and every other branch or PR gets its own preview URL.
3. **Custom domain.** In the Pages project → *Custom domains* → add `brewcodetech.com` and
   `www.brewcodetech.com`. Then add a *Redirect Rule* (Rules → Redirect Rules) sending
   `www.brewcodetech.com/*` → `https://brewcodetech.com/${1}` with a 301.
4. **Domain email.** *Email → Email Routing* → route `hello@brewcodetech.com` to your Gmail. To reply
   from it, use Gmail's "Send mail as". Then update `CONTACT_EMAIL` in `src/content/company.ts`.
5. **Contact form.** In the Pages project → *Settings → Variables and Secrets*, set either:
   - `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` for email via [Resend](https://resend.com)
     (free tier; verify the domain with the DNS records Resend gives you), and/or
   - `WEBHOOK_URL` for a Slack or Discord incoming webhook.
6. **Spam protection (optional).** Create a Turnstile widget for the domain. Set
   `TURNSTILE_SECRET_KEY` (secret) and `VITE_TURNSTILE_SITE_KEY` (build variable) in the Pages project.
7. **Analytics.** In the Pages project → *Metrics → Web Analytics* → enable. It's cookie-free, so no
   consent banner is needed.
8. **Retire GitHub Pages.** Once `https://brewcodetech.com` is served by Cloudflare
   (`curl -I` shows `server: cloudflare`), disable GitHub Pages under the repo's *Settings → Pages*.

`.github/workflows/ci.yml` still runs lint + build on every push and PR as a quality gate. Deploys
are done by Cloudflare.

## License

Proprietary — © Brew Code Tech. All rights reserved. This source is not licensed for reuse,
modification, or redistribution without permission.
