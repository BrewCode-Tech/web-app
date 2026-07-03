import { useRef } from 'react'
import { m as motion, useInView } from 'framer-motion'
import type { IconType } from 'react-icons'
import { TbBrain, TbBug, TbBulb, TbDatabase, TbDeviceMobile, TbWorldWww } from 'react-icons/tb'
import { fadeUp, inViewConfig, stagger, staggerItem } from '../lib/motion'
import SectionHeader from './SectionHeader'

interface Service {
  icon: IconType
  title: string
  description: string
}

const SERVICES: Service[] = [
  {
    icon: TbWorldWww,
    title: 'Full-Stack Web & SaaS Development',
    description:
      'End-to-end web application and SaaS development with React, TypeScript, Ruby on Rails, and Python — from first architecture decision to production release.',
  },
  {
    icon: TbBrain,
    title: 'AI Integration & Automation',
    description:
      'LLM-powered workflows, AI-assisted engineering, and intelligent automation embedded directly into your product — not bolted on as an afterthought.',
  },
  {
    icon: TbDatabase,
    title: 'Data Engineering & Analytics',
    description:
      'Team members with hands-on experience in large-scale data systems — ETL pipelines, data warehousing, and analytics dashboards for data-intensive products.',
  },
  {
    icon: TbDeviceMobile,
    title: 'Mobile App Development',
    description:
      'Cross-platform mobile apps built end-to-end with React Native, from architecture through app store release.',
  },
  {
    icon: TbBug,
    title: 'QA & Test Automation',
    description:
      'Dedicated test automation and quality engineering on every project — not developers testing their own code, but a real automation practice.',
  },
  {
    icon: TbBulb,
    title: 'Product Discovery & Business Analysis',
    description:
      'Structured requirements gathering, scoping, and stakeholder alignment before a single line of code — so the right thing gets built the first time.',
  },
]

function ServiceCard({ icon: Icon, title, description }: Service) {
  return (
    <motion.li
      variants={staggerItem}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-white/5 bg-surface p-6 transition-colors duration-300 hover:border-white/10 sm:p-7"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-12 -top-12 h-40 w-40 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: 'radial-gradient(circle, rgba(255,122,24,0.12) 0%, transparent 70%)' }}
      />

      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-white/5 transition-colors duration-300 group-hover:border-accent/20 group-hover:bg-accent/10">
        <Icon size={22} className="text-secondary transition-colors duration-300 group-hover:text-accent" />
      </div>

      <div className="relative flex flex-col gap-2">
        <h3 className="font-heading text-base font-semibold text-white sm:text-lg">{title}</h3>
        <p className="text-sm leading-relaxed text-secondary">{description}</p>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-accent/60 to-transparent transition-all duration-500 group-hover:w-full"
      />
    </motion.li>
  )
}

function Services() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, inViewConfig)

  return (
    <section id="services" className="w-full bg-background section-padding">
      <div ref={ref} className="container-page">
        <SectionHeader
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          eyebrow="What We Do"
          heading={
            <>
              Focused on What We&apos;ve <span className="text-accent">Actually Done</span>
            </>
          }
          description="No padded list of everything under the sun — just the services our team has real, hands-on production experience delivering."
        />

        <motion.ul
          role="list"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger(0.08)}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
        >
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

export default Services
