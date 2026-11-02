import BrewPromise from '../components/BrewPromise'
import CostCompare from '../components/CostCompare'
import CtaBanner from '../components/CtaBanner'
import Founder from '../components/Founder'
import Hero from '../components/Hero'
import Portfolio from '../components/Portfolio'
import ProofStrip from '../components/ProofStrip'
import Seo from '../components/Seo'
import Services from '../components/Services'
import Testimonials from '../components/Testimonials'
import TimezoneOverlap from '../components/TimezoneOverlap'

export function Component() {
  return (
    <>
      <Seo
        path="/"
        title="Brew Code Tech — Hire a Senior Engineer, Grow Into a Team"
        description="Hire a senior engineer for your web, SaaS, data, and AI products, and add vetted engineers as you grow. Founder-led, real overlap with your hours, code in your GitHub from day one. Book a free 30-minute call."
      />
      <Hero />
      <ProofStrip />
      <Services />
      <Portfolio limit={3} />
      <BrewPromise linkToDetails />
      <TimezoneOverlap />
      <Founder />
      <Testimonials />
      <CostCompare />
      <CtaBanner />
    </>
  )
}
