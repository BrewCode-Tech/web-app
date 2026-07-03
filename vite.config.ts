import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves this repo as a project page at
  // https://brewcode-tech.github.io/web-app/, so all built asset URLs
  // need to be prefixed with the repo name instead of assuming root "/".
  base: '/web-app/',
  plugins: [react()],
  server: {
    watch: {
      // Opt-in fallback for environments where the OS file-watcher limit
      // (inotify on Linux) is exhausted by other running processes.
      // Enable with: VITE_USE_POLLING=true npm run dev
      usePolling: process.env.VITE_USE_POLLING === 'true',
    },
  },
})
