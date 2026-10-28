import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes'
import './styles/globals.css'

// Every route is pre-rendered to static HTML at build time (see `ssgOptions`
// in vite.config.ts), then hydrated in the browser.
export const createRoot = ViteReactSSG({ routes })
