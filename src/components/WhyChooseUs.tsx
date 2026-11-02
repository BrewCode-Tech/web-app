import { useRef } from 'react'
import { m as motion, useInView } from 'framer-motion'
import type { IconType } from 'react-icons'
import { TbBrain, TbBuildingArch, TbHeartHandshake, TbRocket, TbShieldCheck, TbTestPipe } from 'react-icons/tb'
import { fadeUp, inViewConfig, stagger, staggerItem } from '../lib/motion'
import SectionHeader from './SectionHeader'

interface Reason {
  icon: IconType
  title: string
  description: string
}

const REASONS: Reason[] = [
  {
    icon: TbShieldCheck,
    title: 'Senior Hands Only',
    description:
      'Every engagement is led by an engineer with years of production experience — no juniors learning on your budget.',
  },
  {
    icon: TbBrain,
    title: 'AI Where It Pays Off',
    description:
      'LLM features shipped to production with guardrails, evals, and cost controls — and AI-assisted engineering that speeds up delivery, not just demos.',
  },
  {
    icon: TbBuildingArch,
    title: 'Scalable Architecture',
    description:
      'Systems designed to grow with your business — from MVP to millions of users without a painful rewrite.',
  },
  {
    icon: TbTestPipe,
    title: 'Quality Engineering Built In',
    description:
      'Automated tests and CI from the first sprint, plus a real QA automation practice — not developers clicking through their own work.',
  },
  {
    icon: TbRocket,
    title: 'Fast Delivery',
    description:
      'Lean processes and focused sprints mean you get working software in your hands quickly, without cutting corners.',
  },
  {
    icon: TbHeartHandshake,
    title: 'Long-term Support',
    description:
      'We stay invested after launch — monitoring, maintaining, and evolving your product as your needs change.',
  },
]

function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, inViewConfig)

  return (
    <section id="why-us" className="w-full bg-surface section-padding">
      <div ref={ref} className="container-page">
        <SectionHeader
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          eyebrow="Why Brew Code Tech"
          heading={
            <>
              Built Different, <span className="text-accent">By Design</span>
            </>
          }
          description="There are a lot of dev shops out there. Here's what you get from a small, senior studio instead."
        />

        <motion.ul
          role="list"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger(0.09)}
          className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
        >
          {REASONS.map(({ icon: Icon, title, description }) => (
            <motion.li
              key={title}
              variants={staggerItem}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-white/5 bg-background p-6 transition-colors duration-300 hover:border-white/10 sm:p-8"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: 'radial-gradient(circle, rgba(45,212,191,0.10) 0%, transparent 70%)' }}
              />

              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-white/5 transition-all duration-300 group-hover:border-accent/20 group-hover:bg-accent/10">
                <Icon size={22} className="text-secondary transition-colors duration-300 group-hover:text-accent" />
              </div>

              <div className="relative flex flex-col gap-2">
                <h3 className="font-heading text-sm font-semibold text-white sm:text-base">{title}</h3>
                <p className="text-xs leading-relaxed text-secondary sm:text-sm">{description}</p>
              </div>

              <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-accent/50 to-transparent transition-all duration-500 group-hover:w-full"
              />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

export default WhyChooseUs
