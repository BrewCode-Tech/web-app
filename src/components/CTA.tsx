import { useRef } from 'react'
import { m as motion, useInView } from 'framer-motion'
import { fadeUp, inViewConfig } from '../lib/motion'
import Eyebrow from './Eyebrow'

function CTA() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, inViewConfig)

  return (
    <section id="cta" className="w-full bg-background section-padding">
      <div ref={ref} className="container-page">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="relative overflow-hidden rounded-2xl border border-white/5 bg-surface px-6 py-16 text-center sm:rounded-3xl sm:px-12 sm:py-20 md:px-20"
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 cta-gradient-bg" />
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px cta-shimmer-line" />

          <div className="relative flex flex-col items-center">
            <Eyebrow variants={fadeUp} className="mb-5" centered>
              Ready to get started?
            </Eyebrow>

            <motion.h2
              variants={fadeUp}
              className="max-w-3xl font-heading text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
            >
              Let&apos;s Build Something <br className="hidden sm:block" />
              <span className="text-accent">Amazing.</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="mt-5 max-w-xl text-base leading-relaxed text-secondary sm:text-lg">
              Tell us about your idea and we&apos;ll get back to you within one business day.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 sm:mt-10">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary group inline-flex items-center gap-2 px-7 py-3.5 text-sm sm:px-8 sm:py-4 sm:text-base"
              >
                Start Your Project
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA
