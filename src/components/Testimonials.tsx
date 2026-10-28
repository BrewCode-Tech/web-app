import { useRef } from 'react'
import { m as motion, useInView } from 'framer-motion'
import { TESTIMONIALS } from '../content/company'
import { fadeUp, inViewConfig, stagger, staggerItem } from '../lib/motion'
import SectionHeader from './SectionHeader'

// Renders nothing until real quotes are added to TESTIMONIALS.
function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, inViewConfig)

  if (TESTIMONIALS.length === 0) return null

  return (
    <section id="testimonials" className="w-full bg-background section-padding">
      <div ref={ref} className="container-page">
        <SectionHeader
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          eyebrow="In Their Words"
          heading={
            <>
              From People We&apos;ve <span className="text-accent">Shipped With</span>
            </>
          }
          description="Feedback from clients, managers, and teammates on work our founder and network have delivered."
        />

        <motion.ul
          role="list"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger(0.1)}
          className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3"
        >
          {TESTIMONIALS.map(({ quote, name, role }) => (
            <motion.li key={name} variants={staggerItem} className="rounded-2xl border border-white/5 bg-surface p-6 sm:p-7">
              <figure className="flex h-full flex-col">
                <span aria-hidden="true" className="font-heading text-5xl leading-none text-accent/40">
                  &ldquo;
                </span>
                <blockquote className="mt-2 text-sm leading-relaxed text-white sm:text-base">{quote}</blockquote>
                <figcaption className="mt-auto pt-6 text-sm">
                  <span className="font-semibold text-white">{name}</span>
                  <span className="block text-secondary">{role}</span>
                </figcaption>
              </figure>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

export default Testimonials
