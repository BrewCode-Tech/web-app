import { useRef } from 'react'
import { m as motion, useInView } from 'framer-motion'
import type { IconType } from 'react-icons'
import { TbBrain, TbBuildingSkyscraper, TbChartBar, TbChartDots, TbDeviceMobile } from 'react-icons/tb'
import { fadeUp, inViewConfig, stagger, staggerItem } from '../lib/motion'
import SectionHeader from './SectionHeader'

interface CaseStudy {
  icon: IconType
  tag: string
  title: string
  description: string
  tags: string[]
}

const CASE_STUDIES: CaseStudy[] = [
  {
    icon: TbChartDots,
    tag: 'Offshore Team · Backend, Data & DevOps',
    title: 'Social Media Analytics Platform',
    description:
      'Working as part of an offshore engineering team responsible for backend, data, and DevOps on a large-scale social media analytics platform — data systems processing 280+ TB in S3 and 47 TB in Redshift, ingesting 100+ GB and 8–16 billion events daily across 690+ tables. Cut query response times from up to 120 seconds down to under 35, and led a TypeScript migration reaching 93% coverage across 25+ pages.',
    tags: ['AWS Redshift', 'ETL at Scale', 'Query Optimization', 'TypeScript Migration', 'Team Leadership'],
  },
  {
    icon: TbDeviceMobile,
    tag: 'Website · End-to-End Delivery',
    title: 'Social Events & Reviews Platform',
    description:
      'Delivered a business review and social platform end-to-end on the web — business discovery, reviews, save/share, and event scheduling for sharing activities with friends, including a smart caching layer that cut the cost of external API calls.',
    tags: ['End-to-End Delivery', 'Web Platform', 'Smart Caching', 'Product Design'],
  },
  {
    icon: TbBrain,
    tag: 'Web Platform · In Active Development',
    title: 'AI Sales Automation Platform',
    description:
      'Serving as lead engineer on an AI-powered sales automation platform still in active development — personalized AI email workflows, an algorithmic scheduler to manage sending limits across accounts, Stripe-based payments, and a background job system for continuous campaign delivery.',
    tags: ['AI Email Workflows', 'Scheduling Algorithms', 'Stripe', 'Lead Engineering'],
  },
  {
    icon: TbBuildingSkyscraper,
    tag: 'Offshore Team · Feature Delivery',
    title: 'Bid Management Platform',
    description:
      'Working as part of an offshore team implementing new features into an existing enterprise bid management product — ERP integration, Kafka-based event streaming, new vendor-facing modules, and a dedicated automation testing practice covering performance and API regression.',
    tags: ['ERP Integration', 'Kafka', 'Test Automation', 'Vendor Modules'],
  },
  {
    icon: TbChartBar,
    tag: 'Client Engagement · AI Analytics',
    title: 'AI-Powered Analytics Platform',
    description:
      'Contributed AI-powered analytics to an end-to-end lead-to-cash platform, applying AI-assisted engineering practices to speed up development — informed by prior experience scaling analytics infrastructure.',
    tags: ['AI-Assisted Engineering', 'Python & FastAPI', 'Analytics Dashboards'],
  },
]

function CaseStudyCard({ icon: Icon, tag, title, description, tags }: CaseStudy) {
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
        <p className="font-heading text-xs font-medium uppercase tracking-widest text-accent">{tag}</p>
        <h3 className="font-heading text-base font-semibold text-white sm:text-lg">{title}</h3>
        <p className="text-sm leading-relaxed text-secondary">{description}</p>
      </div>

      <ul role="list" className="relative flex flex-wrap gap-2">
        {tags.map((t) => (
          <li
            key={t}
            className="rounded-full border border-white/5 bg-background px-2.5 py-1 text-xs text-secondary"
          >
            {t}
          </li>
        ))}
      </ul>

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-accent/50 to-transparent transition-all duration-500 group-hover:w-full"
      />
    </motion.li>
  )
}

function Portfolio() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, inViewConfig)

  return (
    <section id="portfolio" className="w-full bg-background section-padding">
      <div ref={ref} className="container-page">
        <SectionHeader
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          eyebrow="Our Experience"
          heading={
            <>
              What We&apos;ve <span className="text-accent">Worked On</span>
            </>
          }
          description="Brew Code Tech is a new studio, but our team isn't new to production software. Here's where we've contributed — as embedded offshore engineers, feature teams, and in one case an end-to-end build — described generally out of respect for client confidentiality."
        />

        <motion.ul
          role="list"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger(0.1)}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
        >
          {CASE_STUDIES.map((study) => (
            <CaseStudyCard key={study.title} {...study} />
          ))}
        </motion.ul>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 text-center text-sm text-secondary sm:mt-12"
        >
          Want more detail on any of these?{' '}
          <a href="#contact" className="font-medium text-white transition-colors hover:text-accent">
            Reach out and we&apos;ll walk you through it →
          </a>
        </motion.p>
      </div>
    </section>
  )
}

export default Portfolio
