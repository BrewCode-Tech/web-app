import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Served from the custom domain https://brewcodetech.com/ (via CNAME),
  // so assets resolve from root rather than a GitHub Pages project subpath.
  base: '/',
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
