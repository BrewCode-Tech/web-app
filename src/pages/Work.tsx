import CtaBanner from '../components/CtaBanner'
import Portfolio from '../components/Portfolio'
import Seo from '../components/Seo'

export function Component() {
  return (
    <>
      <Seo
        path="/work"
        title="Our Work"
        description="Case studies from production systems our founder and network have built: analytics platforms ingesting billions of events a day, AI analytics, sales automation, and enterprise integrations."
      />
      <Portfolio asPage />
      <CtaBanner />
    </>
  )
}
