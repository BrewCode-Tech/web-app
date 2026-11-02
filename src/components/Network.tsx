import { useRef } from 'react'
import { m as motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { IconType } from 'react-icons'
import { TbClipboardList, TbCode, TbServerCog, TbTestPipe } from 'react-icons/tb'
import { fadeUp, inViewConfig, stagger, staggerItem } from '../lib/motion'
import SectionHeader from './SectionHeader'

interface Role {
  icon: IconType
  title: string
  description: string
}

const ROLES: Role[] = [
  {
    icon: TbClipboardList,
    title: 'Business Analysis & Client Support',
    description:
      'Requirements analysis and stakeholder alignment, from engineers with real enterprise product delivery behind them — so what gets built matches what you actually need.',
  },
  {
    icon: TbCode,
    title: 'Full-Stack Engineering',
    description:
      'Architecture to deployment in React, TypeScript, Next.js, Node.js, Python, and Ruby on Rails — with AI integrations built into production features, not bolted on after.',
  },
  {
    icon: TbServerCog,
    title: 'Backend, Data & DevOps',
    description:
      'Engineers who have run production systems holding hundreds of terabytes — query optimization, cloud infrastructure, and the deployment pipelines that keep releases safe.',
  },
  {
    icon: TbTestPipe,
    title: 'QA & Test Automation',
    description:
      'Automation frameworks built with Selenium, Playwright, and Cypress, covering UI, API, regression, and performance testing — quality engineering as a discipline, not an afterthought.',
  },
]

function Network() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, inViewConfig)

  return (
    <section id="network" className="w-full bg-background section-padding">
      <div ref={ref} className="container-page">
        <SectionHeader
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          eyebrow="Our Network"
          heading={
            <>
              Start Lean, <span className="text-accent">Scale With People We Trust</span>
            </>
          }
          description="Every engagement is founder-led. When your project needs more hands, we bring in engineers we have shipped production systems with before — not strangers from a job board. You meet each one before they join."
        />

        <motion.ul
          role="list"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger(0.09)}
          className="grid gap-4 sm:grid-cols-2 sm:gap-5"
        >
          {ROLES.map(({ icon: Icon, title, description }) => (
            <motion.li
              key={title}
              variants={staggerItem}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-white/5 bg-surface p-6 transition-colors duration-300 hover:border-white/10 sm:p-7"
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
                <h3 className="font-heading text-base font-semibold text-white sm:text-lg">{title}</h3>
                <p className="text-sm leading-relaxed text-secondary">{description}</p>
              </div>

              <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-accent/50 to-transparent transition-all duration-500 group-hover:w-full"
              />
            </motion.li>
          ))}
        </motion.ul>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 text-center text-sm text-secondary sm:mt-12"
        >
          Tell us what you&apos;re building and we&apos;ll propose the right mix.{' '}
          <Link to="/contact" className="font-medium text-white transition-colors hover:text-accent">
            Start the conversation →
          </Link>
        </motion.p>
      </div>
    </section>
  )
}

export default Network
