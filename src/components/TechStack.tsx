import { useRef } from 'react'
import { m as motion, useInView } from 'framer-motion'
import { TbBrandAws, TbBrandOpenai, TbBrandPython, TbBrandReact, TbBrandTypescript } from 'react-icons/tb'
import {
  SiApachejmeter,
  SiCucumber,
  SiFastapi,
  SiGithubactions,
  SiJenkins,
  SiPostgresql,
  SiPostman,
  SiRubyonrails,
  SiSelenium,
  SiStripe,
  SiSupabase,
} from 'react-icons/si'
import TechBadge, { type TechBadgeProps } from './TechBadge'
import { fadeUp, inViewConfig, stagger, staggerItem } from '../lib/motion'
import SectionHeader from './SectionHeader'

interface Category {
  label: string
  techs: TechBadgeProps[]
}

const CATEGORIES: Category[] = [
  {
    label: 'Frontend & Mobile',
    techs: [
      { icon: TbBrandReact, label: 'React', color: '#61DAFB' },
      { icon: TbBrandTypescript, label: 'TypeScript', color: '#3178C6' },
      { icon: TbBrandReact, label: 'React Native', color: '#61DAFB' },
    ],
  },
  {
    label: 'Backend',
    techs: [
      { icon: SiRubyonrails, label: 'Ruby on Rails', color: '#CC0000' },
      { icon: TbBrandPython, label: 'Python', color: '#3776AB' },
      { icon: SiFastapi, label: 'FastAPI', color: '#009688' },
    ],
  },
  {
    label: 'Data & Cloud',
    techs: [
      { icon: SiPostgresql, label: 'PostgreSQL', color: '#4169E1' },
      { icon: TbBrandAws, label: 'AWS (S3 & Redshift)', color: '#FF9900' },
      { icon: SiSupabase, label: 'Supabase', color: '#3ECF8E' },
    ],
  },
  {
    label: 'AI & Payments',
    techs: [
      { icon: TbBrandOpenai, label: 'OpenAI / LLMs', color: '#10A37F' },
      { icon: SiStripe, label: 'Stripe', color: '#635BFF' },
    ],
  },
  {
    label: 'QA & Automation',
    techs: [
      { icon: SiSelenium, label: 'Selenium', color: '#43B02A' },
      { icon: SiCucumber, label: 'Cucumber', color: '#3D9B3D' },
      { icon: SiPostman, label: 'Postman', color: '#FF6C37' },
      { icon: SiApachejmeter, label: 'JMeter', color: '#D22128' },
      { icon: SiJenkins, label: 'Jenkins', color: '#D33833' },
      { icon: SiGithubactions, label: 'GitHub Actions', color: '#2088FF' },
    ],
  },
]

function TechStack() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, inViewConfig)

  return (
    <section id="tech-stack" className="w-full bg-surface section-padding">
      <div ref={ref} className="container-page">
        <SectionHeader
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          eyebrow="Our Toolkit"
          heading={
            <>
              Technologies We <span className="text-accent">Work With</span>
            </>
          }
          description="Battle-tested tools chosen for performance, maintainability, and long-term reliability."
        />

        <div className="flex flex-col gap-10 sm:gap-12">
          {CATEGORIES.map(({ label, techs }) => (
            <div key={label}>
              <motion.p
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={fadeUp}
                className="mb-4 font-heading text-xs font-semibold uppercase tracking-widest text-secondary"
              >
                {label}
              </motion.p>
              <motion.div
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={stagger(0.06)}
                className="flex flex-wrap gap-2.5 sm:gap-3"
              >
                {techs.map((tech) => (
                  <motion.div key={tech.label} variants={staggerItem}>
                    <TechBadge {...tech} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechStack
