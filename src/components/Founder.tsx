import { useRef } from 'react'
import { m as motion, useInView } from 'framer-motion'
import { TbBrandLinkedin, TbCalendarEvent, TbUser } from 'react-icons/tb'
import { CAL_BOOKING_URL, COMPANY_NAME, FOUNDER } from '../content/company'
import { fadeUp, inViewConfig, slideLeft } from '../lib/motion'
import Eyebrow from './Eyebrow'

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

function Founder() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, inViewConfig)
  const { name, title, photo, linkedin, note } = FOUNDER

  return (
    <section id="founder" className="w-full bg-surface section-padding">
      <div ref={ref} className="container-page">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={slideLeft}
          className="grid items-center gap-8 md:grid-cols-[auto,1fr] md:gap-12"
        >
          <div className="relative mx-auto h-40 w-40 shrink-0 sm:h-48 sm:w-48 md:mx-0">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(45,212,191,0.18) 0%, transparent 70%)' }}
            />
            {photo ? (
              <img
                src={photo}
                alt={name ? `${name}, ${title}` : title}
                width={192}
                height={192}
                loading="lazy"
                className="relative h-full w-full rounded-full border border-white/10 object-cover"
              />
            ) : (
              <div className="relative flex h-full w-full items-center justify-center rounded-full border border-white/10 bg-background">
                {name ? (
                  <span className="font-heading text-5xl font-bold text-accent">{initials(name)}</span>
                ) : (
                  <TbUser aria-hidden="true" size={64} className="text-secondary" />
                )}
              </div>
            )}
          </div>

          <div className="min-w-0 text-center md:text-left">
            <Eyebrow variants={fadeUp} className="mb-4">
              Who You&apos;ll Work With
            </Eyebrow>
            <motion.blockquote variants={fadeUp}>
              <p className="font-heading text-xl font-medium leading-snug text-white sm:text-2xl">
                &ldquo;{note}&rdquo;
              </p>
              <footer className="mt-5 text-sm text-secondary">
                {name ? <span className="font-semibold text-white">{name}</span> : null}
                {name ? ' · ' : null}
                {title}, {COMPANY_NAME}
              </footer>
            </motion.blockquote>

            <motion.div
              variants={fadeUp}
              className="mt-7 flex flex-col items-center gap-3 sm:flex-row md:justify-start"
            >
              <a
                href={CAL_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 text-sm"
              >
                <TbCalendarEvent aria-hidden="true" size={18} />
                Talk to me directly
                <span className="sr-only"> (opens in new tab)</span>
              </a>
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-5 py-3 font-heading text-sm font-semibold text-white transition-colors hover:border-accent/60 hover:text-accent"
                >
                  <TbBrandLinkedin aria-hidden="true" size={18} />
                  LinkedIn
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Founder
