import type { ReactNode } from 'react'
import PageHeader from '../components/PageHeader'
import Seo from '../components/Seo'
import { COMPANY_NAME, CONTACT_EMAIL, FOUNDER } from '../content/company'

const LAST_UPDATED = '28 October 2026'

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-heading text-xl font-bold text-white sm:text-2xl">{title}</h2>
      <div className="mt-3 flex flex-col gap-3 text-base leading-relaxed text-secondary">{children}</div>
    </section>
  )
}

export function Component() {
  const email = (
    <a href={`mailto:${CONTACT_EMAIL}`} className="text-white underline underline-offset-2 hover:text-accent">
      {CONTACT_EMAIL}
    </a>
  )

  return (
    <>
      <Seo
        path="/privacy"
        title="Privacy Policy"
        description="What personal data Brew Code Tech collects through this website, why, who processes it, and how to have it deleted."
      />
      <PageHeader
        eyebrow="Privacy"
        title="Privacy Policy"
        description={`Short and plain: what we collect, why, and how to have it removed. Last updated ${LAST_UPDATED}.`}
      />

      <article className="w-full bg-background pb-20 sm:pb-28">
        <div className="container-page flex max-w-3xl flex-col gap-10">
          <Section title="Who we are">
            <p>
              This website is run by {COMPANY_NAME}, a software development studio based in India and operated by{' '}
              {FOUNDER.name}. For anything about your data, email {email}.
            </p>
          </Section>

          <Section title="What we collect">
            <p>
              <span className="text-white">When you send a project brief:</span> your name, email address, and
              anything you choose to tell us — company, project description, budget range, and timeline.
            </p>
            <p>
              <span className="text-white">When you book a call:</span> booking happens on Cal.com, which collects
              the details you enter there under its own privacy policy and shares them with us.
            </p>
            <p>
              <span className="text-white">When you browse:</span> we use Cloudflare Web Analytics, which counts
              page views without cookies and without tracking you across sites. We do not use advertising or
              tracking cookies.
            </p>
          </Section>

          <Section title="Why we use it">
            <p>
              Only to reply to you, discuss your project, and — if we work together — to run that engagement. We
              never sell your data or add you to a mailing list without asking.
            </p>
          </Section>

          <Section title="Who processes it for us">
            <ul role="list" className="flex list-disc flex-col gap-2 pl-5">
              <li>
                <span className="text-white">Cloudflare</span> — hosts this website, protects the contact form from
                spam (Turnstile), and provides cookie-free analytics.
              </li>
              <li>
                <span className="text-white">Resend</span> — delivers your project brief to our inbox by email.
              </li>
              <li>
                <span className="text-white">Cal.com</span> — schedules calls you book with us.
              </li>
              <li>
                <span className="text-white">Google (Gmail)</span> — where our email is stored.
              </li>
            </ul>
            <p>These providers may process data outside India, under their own security and privacy commitments.</p>
          </Section>

          <Section title="How long we keep it">
            <p>
              Enquiries that don&apos;t lead to work are deleted within 12 months. If we work together, we keep
              project correspondence for as long as needed to deliver the work and meet legal and tax obligations.
            </p>
          </Section>

          <Section title="Your choices">
            <p>
              You can ask us at any time to show you, correct, or delete the personal data we hold about you. Email{' '}
              {email} and we&apos;ll act on it within 30 days.
            </p>
          </Section>

          <Section title="Changes">
            <p>
              If this policy changes, we&apos;ll update it here and change the date at the top of this page.
            </p>
          </Section>
        </div>
      </article>
    </>
  )
}
