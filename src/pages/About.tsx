import About from '../components/About'
import CtaBanner from '../components/CtaBanner'
import Founder from '../components/Founder'
import Network from '../components/Network'
import Seo from '../components/Seo'
import WhyChooseUs from '../components/WhyChooseUs'

export function Component() {
  return (
    <>
      <Seo
        path="/about"
        title="About"
        description="Brew Code Tech is a founder-led software studio in India. You work directly with the engineer building your product, backed by a network of engineers we've shipped production systems with."
      />
      <About asPage />
      <Founder />
      <Network />
      <WhyChooseUs />
      <CtaBanner />
    </>
  )
}
