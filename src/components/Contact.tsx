import { useRef } from 'react'
import { m as motion, useInView } from 'framer-motion'
import { TbCalendarEvent, TbMail } from 'react-icons/tb'
import { fadeUp, inViewConfig } from '../lib/motion'
import { CAL_BOOKING_URL, CONTACT_EMAIL } from '../lib/constants'
import Eyebrow from './Eyebrow'

function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, inViewConfig)

  return (
    <section id="contact" className="w-full bg-background section-padding">
      <div ref={ref} className="container-page">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="relative overflow-hidden rounded-2xl border border-white/5 bg-surface px-6 py-16 text-center sm:rounded-3xl sm:px-12 sm:py-20 md:px-20"
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 cta-gradient-bg" />
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px cta-shimmer-line" />

          <div className="relative mx-auto flex max-w-xl flex-col items-center">
            <Eyebrow variants={fadeUp} className="mb-5" centered>
              Get in Touch
            </Eyebrow>

            <motion.h2
              variants={fadeUp}
              className="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl"
            >
              Let&apos;s Build Something <span className="text-accent">Amazing.</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="mt-5 text-sm leading-relaxed text-secondary sm:text-base">
              Whether you have a fully scoped project or just an early idea, book a free 30-minute
              discovery call — no commitment required.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 sm:mt-10">
              <motion.a
                href={CAL_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary group inline-flex items-center gap-3 px-7 py-3.5 text-sm sm:px-8 sm:py-4 sm:text-base"
              >
                <TbCalendarEvent aria-hidden="true" size={18} />
                Book a Free Discovery Call
                <span className="sr-only"> (opens in new tab)</span>
              </motion.a>
            </motion.div>

            <motion.address variants={fadeUp} className="mt-5 not-italic">
              <p className="text-sm text-secondary">
                Prefer email?{' '}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-medium text-white transition-colors hover:text-accent"
                >
                  <TbMail aria-hidden="true" size={14} className="mb-0.5 mr-1 inline-block" />
                  {CONTACT_EMAIL}
                </a>
              </p>
            </motion.address>

            <motion.div
              variants={fadeUp}
              className="mt-8 w-full rounded-2xl border border-white/5 bg-background p-4 sm:mt-10 sm:p-5"
            >
              <p className="text-xs leading-relaxed text-secondary sm:text-sm">
                <span className="font-medium text-white">No commitment required.</span> Pick a time
                that works for you — we&apos;ll spend 30 minutes understanding your project before
                any engagement.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
