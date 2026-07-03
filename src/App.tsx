import { lazy, Suspense } from 'react'
import { LazyMotion } from 'framer-motion'
import Hero from './components/Hero'
import Navbar from './components/Navbar'

const loadMotionFeatures = () => import('./lib/motion-features').then((mod) => mod.default)

const About = lazy(() => import('./components/About'))
const Services = lazy(() => import('./components/Services'))
const Process = lazy(() => import('./components/Process'))
const WhyChooseUs = lazy(() => import('./components/WhyChooseUs'))
const Portfolio = lazy(() => import('./components/Portfolio'))
const CTA = lazy(() => import('./components/CTA'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

function SectionFallback() {
  return <div className="w-full py-28" aria-hidden="true" />
}

function App() {
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-background text-white">
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <About />
          <Services />
          <Process />
          <WhyChooseUs />
          <Portfolio />
          <CTA />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </LazyMotion>
  )
}

export default App
