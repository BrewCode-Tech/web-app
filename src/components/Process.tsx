import { useRef } from 'react'
import { m as motion, useInView } from 'framer-motion'
import { ease } from '../lib/motion'
import SectionHeader from './SectionHeader'

interface ProcessStep {
  number: string
  title: string
  description: string
}

const STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery',
    description: 'Deep-dive into your goals, users, and constraints to define a clear scope.',
  },
  {
    number: '02',
    title: 'Planning',
    description: 'System architecture, stack selection, and work broken into milestones.',
  },
  {
    number: '03',
    title: 'Development',
    description: 'Iterative builds with regular demos, code reviews, and CI from day one.',
  },
  {
    number: '04',
    title: 'Testing',
    description: 'Automated tests, manual QA, and performance audits before every release.',
  },
  {
    number: '05',
    title: 'Deployment',
    description: 'Smooth rollout with monitored deployments and zero-downtime pipelines.',
  },
  {
    number: '06',
    title: 'Support',
    description: 'Post-launch monitoring, maintenance, and continuous improvement.',
  },
]

interface StepProps extends ProcessStep {
  index: number
  total: number
}

function Step({ number, title, description, index, total }: StepProps) {
  const ref = useRef<HTMLLIElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const isLast = index === total - 1

  return (
    <li ref={ref} className="relative flex min-w-0 flex-1 flex-row gap-5 md:flex-col md:gap-0">
      {!isLast && (
        <>
          <div
            aria-hidden="true"
            className="absolute left-[calc(50%+20px)] right-[calc(-50%+20px)] top-[19px] z-0 hidden h-px bg-white/5 md:block"
          />
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 + 0.3, ease }}
            style={{ originX: 0 }}
            className="absolute left-[calc(50%+20px)] right-[calc(-50%+20px)] top-[19px] z-10 hidden h-px bg-gradient-to-r from-accent/40 to-accent/10 md:block"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[19px] top-10 z-0 w-px bg-white/5 md:hidden"
          />
          <motion.div
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.3, ease }}
            style={{ originY: 0 }}
            className="absolute bottom-0 left-[19px] top-10 z-10 w-px bg-gradient-to-b from-accent/40 to-accent/10 md:hidden"
          />
        </>
      )}

      <div aria-hidden="true" className="shrink-0 z-20 md:flex md:justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.35, delay: index * 0.15, ease }}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-accent/30 bg-background"
        >
          <div className="h-2.5 w-2.5 rounded-full bg-accent" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.45, delay: index * 0.15 + 0.15, ease }}
        className={`min-w-0 flex-1 md:pt-5 md:text-center ${!isLast ? 'pb-10 md:pb-0' : ''}`}
      >
        <span className="font-heading text-xs font-bold tracking-widest text-accent/85">{number}</span>
        <h3 className="mt-1 font-heading text-sm font-semibold text-white sm:text-base">{title}</h3>
        <p className="mt-2 text-xs leading-relaxed text-secondary sm:text-sm md:mx-auto md:max-w-[150px]">
          {description}
        </p>
      </motion.div>
    </li>
  )
}

function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="process" className="w-full bg-background section-padding">
      <div ref={ref} className="container-page">
        <SectionHeader
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease }}
          className="mb-14 max-w-2xl sm:mb-20"
          eyebrow="How We Work"
          heading={
            <>
              A Process Built for <span className="text-accent">Clarity</span>
            </>
          }
          description="Structured, transparent, and designed to keep you informed at every stage."
        />

        <ol role="list" className="flex flex-col md:flex-row md:items-start">
          {STEPS.map((step, index) => (
            <Step key={step.number} {...step} index={index} total={STEPS.length} />
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Process
