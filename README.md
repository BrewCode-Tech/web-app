# Brew Code Tech — Landing Page

The marketing landing page for **Brew Code Tech**, a software development studio. Built as a
fast, accessible, single-page React site with animated sections, no backend, and a
mailto-based contact flow.

Live site: https://brewcodetech.com/

## Project Overview

This is a static, client-only landing page — there is no backend, database, or contact-form
API. The site is a single `index.html` page that React hydrates into distinct sections
(Hero, About, Services, Process, Why Choose Us, Portfolio, CTA, Contact, Footer), each
lazy-loaded below the fold to keep the initial bundle small.

Key production concerns this project addresses:

- **Performance** — code-split routes, a lazy-loaded Framer Motion features chunk, self-hosted
  variable fonts, and lazy-loaded below-the-fold sections.
- **Accessibility** — semantic landmarks, skip link, keyboard-navigable mobile menu with focus
  trapping, `aria-current` on nav links, and WCAG-checked color contrast.
- **SEO** — descriptive title/meta tags, Open Graph and Twitter Card tags, `robots.txt`, and a
  `sitemap.xml`.

## Tech Stack

| Category         | Choice                                             |
| ----------------- | --------------------------------------------------- |
| Framework         | [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (strict mode) |
| Build tool        | [Vite 5](https://vite.dev/)                          |
| Styling           | [Tailwind CSS 3](https://tailwindcss.com/)           |
| Animation         | [Framer Motion](https://www.framer.com/motion/) (`LazyMotion`/`m`, code-split) |
| Icons             | [react-icons](https://react-icons.github.io/react-icons/) (Tabler + Simple Icons) |
| Fonts             | [Fontsource](https://fontsource.org/) (Inter, Space Grotesk) — self-hosted, no external font requests |
| Linting           | [ESLint 9](https://eslint.org/) + `typescript-eslint` |
| Deployment        | [GitHub Pages](https://pages.github.com/) via GitHub Actions |

## Folder Structure

```
web-app/
├── .github/workflows/deploy.yml   # CI: build + deploy to GitHub Pages on push to main
├── public/                        # Copied verbatim to dist/ (favicons, robots.txt, sitemap.xml, manifest)
├── src/
│   ├── components/                # One component per landing page section, plus shared UI
│   │   ├── Navbar.tsx / Footer.tsx
│   │   ├── Hero.tsx / About.tsx / Services.tsx / Process.tsx
│   │   ├── WhyChooseUs.tsx / Portfolio.tsx / CTA.tsx / Contact.tsx
│   │   ├── Terminal.tsx / TechBadge.tsx / TechStack.tsx   # supporting UI (TechStack currently unmounted, see below)
│   │   └── Eyebrow.tsx / SectionHeader.tsx                # shared building blocks reused across sections
│   ├── hooks/
│   │   └── useActiveSection.ts    # IntersectionObserver-based active nav-link tracking
│   ├── lib/
│   │   ├── motion.ts              # shared Framer Motion variants (fadeUp, slideLeft, stagger, ...)
│   │   └── motion-features.ts     # async-imported Framer Motion feature bundle (domMax)
│   ├── styles/
│   │   └── globals.css            # Tailwind layers, custom utility classes, reduced-motion handling
│   ├── types/
│   │   └── index.ts               # shared TypeScript types
│   ├── App.tsx                    # section composition, lazy-loading, LazyMotion provider
│   └── main.tsx                   # React root
├── index.html                     # document shell + all SEO/meta/Open Graph tags
├── tailwind.config.js
├── vite.config.ts                 # base path + dev-server file-watch config
└── package.json
```

## Installation

Requires Node.js 20+ and npm.

```bash
npm install
```

## Development

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

**If you see `ENOSPC: System limit for number of file watchers reached`** — this is an OS-level
limit (Linux `inotify`), not a project issue. Either raise the limit:

```bash
sudo sysctl -w fs.inotify.max_user_instances=1024
```

...or fall back to polling-based file watching (no sudo required):

```bash
VITE_USE_POLLING=true npm run dev
```

## Production Build

```bash
npm run build
```

This runs a full TypeScript project build (`tsc -b`) followed by `vite build`, and outputs
static assets to `dist/`. Preview the production build locally with:

```bash
npm run preview
```

## Deployment to GitHub Pages

The site is served from the custom domain **brewcodetech.com** via GitHub Pages, so the Vite
`base` is `'/'` in [`vite.config.ts`](vite.config.ts) and [`public/CNAME`](public/CNAME) pins
the domain (committed to the repo so it survives every deploy, rather than relying only on the
dashboard setting). If you fork this repo without a custom domain, set `base: '/your-repo-name/'`
instead and delete `public/CNAME`.

**Automatic (recommended):** [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
type-checks, lints, builds, and deploys to GitHub Pages on every push to `main`. Enable it once
per repo under **Settings → Pages → Source → GitHub Actions**.

**Manual:** deploy the current `dist/` build directly to the `gh-pages` branch:

```bash
npm run deploy
```

This runs `predeploy` (`npm run build`) automatically, then publishes `dist/` via
[`gh-pages`](https://www.npmjs.com/package/gh-pages).

### Custom domain setup (one-time)

1. **GitHub → Settings → Pages → Custom domain**: enter `brewcodetech.com` and save. GitHub
   verifies the domain once DNS resolves (next step) and provisions a Let's Encrypt TLS
   certificate automatically.
2. **DNS records** (add at your registrar/DNS provider):
   | Type  | Host/Name | Value                        |
   | ----- | --------- | ---------------------------- |
   | A     | `@`       | `185.199.108.153`             |
   | A     | `@`       | `185.199.109.153`             |
   | A     | `@`       | `185.199.110.153`             |
   | A     | `@`       | `185.199.111.153`             |
   | CNAME | `www`     | `brewcode-tech.github.io`     |
3. Once DNS propagates (minutes to a few hours), check **Enforce HTTPS** in the same Pages
   settings page. GitHub automatically 301-redirects `www.brewcodetech.com` to the apex domain
   set in `public/CNAME`.

## Customization Guide

- **Copy & content** — each section's text lives inline in its component
  (`src/components/*.tsx`), typically in a `CONST_ARRAY` or JSX literal near the top of the
  file (e.g. `SERVICES` in `Services.tsx`, `CASE_STUDIES` in `Portfolio.tsx`).
- **Colors & fonts** — brand colors (`background`, `surface`, `accent`, `secondary`) and font
  families are defined once in `tailwind.config.js`.
- **Animations** — shared motion variants (`fadeUp`, `slideLeft`, `stagger`, etc.) live in
  `src/lib/motion.ts`; most sections consume them via `variants={fadeUp}` rather than redefining
  timings locally.
- **Shared section header** — `Eyebrow.tsx` (small accent label) and `SectionHeader.tsx`
  (eyebrow + heading + description block) are reused by Services, Process, WhyChooseUs,
  Portfolio, and TechStack. Update the shared component to change that pattern everywhere at
  once, or pass a `className` override for one-off spacing.
- **Contact email** — set via the `CONTACT_EMAIL` constant in `Contact.tsx` and `Footer.tsx`.
- **Re-enabling the Tech Stack section** — `TechStack.tsx` and `TechBadge.tsx` are fully built
  but not currently mounted. To bring it back, import and render `<TechStack />` in `App.tsx`
  and re-add a nav link in `Navbar.tsx`.
- **SEO metadata** — page title, meta description, and Open Graph/Twitter tags live in
  `index.html`; `robots.txt`, `sitemap.xml`, and `site.webmanifest` live in `public/`.

## License

Proprietary — © Brew Code Tech. All rights reserved. This source is not licensed for reuse,
modification, or redistribution without permission.
