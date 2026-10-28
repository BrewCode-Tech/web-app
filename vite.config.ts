import { createHash } from 'node:crypto'
import { readFile, readdir, writeFile } from 'node:fs/promises'
import { join, relative, sep } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Adds the `ssgOptions` field to Vite's config type.
import type {} from 'vite-react-ssg/node'

const SITE_URL = 'https://brewcodetech.com'

async function htmlFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { recursive: true })
  return entries.filter((entry) => entry.endsWith('.html')).map((entry) => join(dir, entry))
}

/** URL paths of every pre-rendered page in `dir` that isn't marked noindex. */
async function indexablePaths(dir: string): Promise<string[]> {
  const paths: string[] = []
  for (const file of await htmlFiles(dir)) {
    const html = await readFile(file, 'utf8')
    if (html.includes('content="noindex"')) continue
    // Flat output: index.html → /, work.html → /work, work/foo.html → /work/foo
    const route = relative(dir, file).split(sep).join('/').replace(/\.html$/, '')
    paths.push(route === 'index' ? '/' : `/${route}`)
  }
  return paths.sort()
}

/**
 * CSP hashes for the inline hydration scripts the SSG injects into each page.
 * Their content changes every build, so they're hashed here rather than listed by hand.
 */
async function inlineScriptHashes(dir: string): Promise<string[]> {
  const hashes = new Set<string>()
  for (const file of await htmlFiles(dir)) {
    const html = await readFile(file, 'utf8')
    for (const [, attrs, body] of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
      if (!body || /\bsrc=|ld\+json/.test(attrs ?? '')) continue
      hashes.add(`'sha256-${createHash('sha256').update(body).digest('base64')}'`)
    }
  }
  return [...hashes].sort()
}

// https://vite.dev/config/
export default defineConfig({
  // Served from the custom domain https://brewcodetech.com/, so assets resolve from root.
  base: '/',
  plugins: [react()],
  ssgOptions: {
    entry: 'src/main.tsx',
    // /work → dist/work.html. Cloudflare Pages (and GitHub Pages) serve that at /work
    // with no trailing-slash redirect, matching the canonical URLs.
    dirStyle: 'flat',
    script: 'async',
    // Also render the catch-all route to dist/404.html, which static hosts serve
    // for unknown URLs (it's marked noindex, so it stays out of the sitemap).
    includedRoutes: (paths) => [...paths, '/404'],
    async onFinished(dir) {
      // The sitemap is built from what was actually pre-rendered, so it never drifts.
      const urls = (await indexablePaths(dir))
        .map((path) => `  <url><loc>${SITE_URL}${path}</loc></url>`)
        .join('\n')
      await writeFile(
        join(dir, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      )

      // Fill the CSP placeholder in public/_headers with this build's inline-script hashes.
      const headersPath = join(dir, '_headers')
      const headers = await readFile(headersPath, 'utf8')
      const hashes = (await inlineScriptHashes(dir)).join(' ')
      await writeFile(headersPath, headers.replace('__INLINE_SCRIPT_HASHES__', hashes))
    },
  },
  server: {
    watch: {
      // Opt-in fallback for environments where the OS file-watcher limit
      // (inotify on Linux) is exhausted by other running processes.
      // Enable with: VITE_USE_POLLING=true npm run dev
      usePolling: process.env.VITE_USE_POLLING === 'true',
    },
  },
})
