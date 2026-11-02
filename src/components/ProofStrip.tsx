import { useRef } from 'react'
import { m as motion, useInView } from 'framer-motion'
import { inViewConfig, stagger, staggerItem } from '../lib/motion'

// Real figures from the case studies in src/content/caseStudies.ts.
const PROOF = [
  { metric: '280+ TB', label: 'data in production systems we have run' },
  { metric: '8–16B', label: 'events ingested per day' },
  { metric: '3.4×', label: 'faster dashboard queries (120s → <35s)' },
  { metric: '~3×', label: 'faster AI report generation' },
]

function ProofStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, inViewConfig)

  return (
    <section aria-label="Results at a glance" className="w-full border-y border-white/5 bg-surface">
      <div ref={ref} className="container-page py-10 sm:py-12">
        <motion.ul
          role="list"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger(0.08)}
          className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4"
        >
          {PROOF.map(({ metric, label }) => (
            <motion.li key={label} variants={staggerItem} className="min-w-0">
              <p className="font-heading text-2xl font-bold text-white sm:text-3xl">{metric}</p>
              <p className="mt-1 text-xs leading-snug text-secondary sm:text-sm">{label}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

export default ProofStrip
