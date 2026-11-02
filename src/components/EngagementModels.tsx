import { useRef } from 'react'
import { m as motion, useInView } from 'framer-motion'
import { TbCheck } from 'react-icons/tb'
import { ENGAGEMENT_MODELS } from '../content/engagement'
import { fadeUp, inViewConfig, stagger, staggerItem } from '../lib/motion'
import SectionHeader from './SectionHeader'

function EngagementModels() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, inViewConfig)

  return (
    <section id="engagement" className="w-full bg-surface section-padding">
      <div ref={ref} className="container-page">
        <SectionHeader
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          eyebrow="Ways to Work Together"
          heading={
            <>
              Pick the Shape <span className="text-accent">That Fits</span>
            </>
          }
          description="Every model is founder-led and starts small, so you can judge us on shipped work before committing to more."
        />

        <motion.ul
          role="list"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger(0.1)}
          className="grid gap-4 md:grid-cols-3 md:gap-5"
        >
          {ENGAGEMENT_MODELS.map(({ icon: Icon, name, bestFor, howItWorks, starts }) => (
            <motion.li
              key={name}
              variants={staggerItem}
              className="flex flex-col rounded-2xl border border-white/5 bg-background p-6 sm:p-7"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/5 bg-white/5">
                <Icon aria-hidden="true" size={22} className="text-accent" />
              </div>
              <h3 className="mt-5 font-heading text-lg font-semibold text-white">{name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-secondary">{bestFor}</p>
              <ul role="list" className="mt-5 flex flex-col gap-2.5">
                {howItWorks.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-white">
                    <TbCheck aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-6 font-heading text-xs font-medium uppercase tracking-widest text-accent">
                {starts}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

export default EngagementModels
