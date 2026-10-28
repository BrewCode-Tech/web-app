import BrewPromise from '../components/BrewPromise'
import CtaBanner from '../components/CtaBanner'
import EngagementModels from '../components/EngagementModels'
import Faq from '../components/Faq'
import PageHeader from '../components/PageHeader'
import Process from '../components/Process'
import Seo from '../components/Seo'
import { FAQ_JSON_LD } from '../content/faq'

export function Component() {
  return (
    <>
      <Seo
        path="/how-we-work"
        title="How We Work"
        description="Engagement models, our delivery process, the six commitments we put in every contract, and straight answers about IP, NDAs, communication, and pricing."
        jsonLd={[FAQ_JSON_LD]}
      />
      <PageHeader
        eyebrow="How We Work"
        title={
          <>
            Offshore, Done the Way <span className="text-accent">You&apos;d Want It</span>
          </>
        }
        description="No black boxes. Here's how an engagement runs, what we commit to in writing, and the answers to the questions every team asks before hiring offshore."
      />
      <EngagementModels />
      <Process />
      <BrewPromise />
      <Faq />
      <CtaBanner />
    </>
  )
}
