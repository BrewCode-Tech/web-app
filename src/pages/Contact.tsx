import { TbCalendarEvent, TbMail } from 'react-icons/tb'
import ContactForm from '../components/ContactForm'
import PageHeader from '../components/PageHeader'
import Seo from '../components/Seo'
import { CAL_BOOKING_URL, CONTACT_EMAIL } from '../content/company'

const NEXT_STEPS = [
  'We read your brief and reply within one business day.',
  'A 30-minute call with the founder — NDA first if you like.',
  'You get a written proposal: scope, team, timeline, and cost.',
  'We start with a short pilot sprint, so you can judge real work.',
]

export function Component() {
  return (
    <>
      <Seo
        path="/contact"
        title="Contact"
        description="Tell us what you're building. Send a short project brief or book a free 30-minute call with the founder of Brew Code Tech."
      />
      <PageHeader
        eyebrow="Get in Touch"
        title={
          <>
            Tell Us What You&apos;re <span className="text-accent">Building</span>
          </>
        }
        description="Send a short brief or book a call — whichever is easier. Either way, you'll hear from the founder, not a sales team."
      />
      <section className="w-full bg-background pb-20 sm:pb-28">
        <div className="container-page grid gap-8 lg:grid-cols-[1.5fr,1fr] lg:gap-12">
          <ContactForm />

          <aside className="flex flex-col gap-5">
            <div className="rounded-2xl border border-white/5 bg-surface p-6 sm:p-7">
              <h2 className="font-heading text-lg font-semibold text-white">Rather just talk?</h2>
              <p className="mt-2 text-sm leading-relaxed text-secondary">
                Pick a time that suits you — 30 minutes, no commitment.
              </p>
              <a
                href={CAL_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-5 flex items-center justify-center gap-2 text-sm"
              >
                <TbCalendarEvent aria-hidden="true" size={18} />
                Book a Free Call
                <span className="sr-only"> (opens in new tab)</span>
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-4 flex items-center justify-center gap-2 break-all text-sm text-secondary transition-colors hover:text-white"
              >
                <TbMail aria-hidden="true" size={16} className="shrink-0" />
                {CONTACT_EMAIL}
              </a>
            </div>

            <div className="rounded-2xl border border-white/5 bg-surface p-6 sm:p-7">
              <h2 className="font-heading text-lg font-semibold text-white">What happens next</h2>
              <ol role="list" className="mt-4 flex flex-col gap-4">
                {NEXT_STEPS.map((step, index) => (
                  <li key={step} className="flex gap-3 text-sm text-secondary">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent/30 font-heading text-xs font-bold text-accent">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
