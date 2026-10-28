import { useRef } from 'react'
import { m as motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BREW_PROMISE } from '../content/promise'
import { fadeUp, inViewConfig, stagger, staggerItem } from '../lib/motion'
import SectionHeader from './SectionHeader'

interface BrewPromiseProps {
  /** Show a "how we work" link under the grid (used on the home page). */
  linkToDetails?: boolean
}

function BrewPromise({ linkToDetails = false }: BrewPromiseProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, inViewConfig)

  return (
    <section id="promise" className="relative w-full overflow-hidden bg-surface section-padding">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] max-w-full -translate-x-1/2"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(45,212,191,0.10) 0%, transparent 70%)' }}
      />

      <div ref={ref} className="container-page relative">
        <SectionHeader
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          eyebrow="The Brew Promise"
          heading={
            <>
              Six Commitments, <span className="text-accent">In Writing</span>
            </>
          }
          description="Most offshore horror stories come down to the same few failures: vanishing teams, hostage code, and silence. These go into every contract, so none of them can happen with us."
        />

        <motion.ol
          role="list"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger(0.08)}
          className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
        >
          {BREW_PROMISE.map(({ icon: Icon, title, description }, index) => (
            <motion.li
              key={title}
              variants={staggerItem}
              className="relative flex gap-4 rounded-2xl border border-white/5 bg-background p-6 sm:p-7"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent/10">
                <Icon aria-hidden="true" size={22} className="text-accent" />
              </div>
              <div className="min-w-0">
                <p className="font-heading text-xs font-bold tracking-widest text-accent/85">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-1 font-heading text-base font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-secondary">{description}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>

        {linkToDetails && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 text-center text-sm text-secondary sm:mt-12"
          >
            Engagement models, process, and answers to common questions.{' '}
            <Link to="/how-we-work" className="font-medium text-white transition-colors hover:text-accent">
              See how we work →
            </Link>
          </motion.p>
        )}
      </div>
    </section>
  )
}

export default BrewPromise
