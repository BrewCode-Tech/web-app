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
        title="Brew Code Tech — Founder-Led Offshore Software Development, India"
        description="A senior offshore engineer in India for web, SaaS, data, and AI products. Founder-led, real overlap with your hours, code in your GitHub from day one. Book a free 30-minute call."
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
