import { LazyMotion, MotionConfig } from 'framer-motion'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import StickyCta from './components/StickyCta'

const loadMotionFeatures = () => import('./lib/motion-features').then((mod) => mod.default)

// Shared layout for every route. ScrollRestoration resets scroll on navigation
// and scrolls to `#hash` targets (e.g. /#services) once the page renders.
function App() {
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">
        <Navbar />
        <main id="main-content" tabIndex={-1} className="min-h-screen bg-background text-white">
          <Outlet />
        </main>
        <Footer />
        <StickyCta />
        <ScrollRestoration />
      </MotionConfig>
    </LazyMotion>
  )
}

export default App
