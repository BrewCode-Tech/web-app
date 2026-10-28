import { useRef } from 'react'
import { m as motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { TbArrowRight } from 'react-icons/tb'
import { CASE_STUDIES, type CaseStudy } from '../content/caseStudies'
import { fadeUp, inViewConfig, stagger, staggerItem } from '../lib/motion'
import SectionHeader from './SectionHeader'

function CaseStudyCard({ slug, icon: Icon, role, title, summary, highlight, sector }: CaseStudy) {
  return (
    <motion.li
      variants={staggerItem}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative overflow-hidden rounded-2xl border border-white/5 bg-surface transition-colors duration-300 hover:border-white/10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-12 -top-12 h-40 w-40 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: 'radial-gradient(circle, rgba(45,212,191,0.12) 0%, transparent 70%)' }}
      />

      <Link to={`/work/${slug}`} className="relative flex h-full flex-col gap-5 p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-white/5 transition-colors duration-300 group-hover:border-accent/20 group-hover:bg-accent/10">
            <Icon aria-hidden="true" size={22} className="text-secondary transition-colors duration-300 group-hover:text-accent" />
          </div>
          <p className="text-right text-xs text-secondary">{sector}</p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-heading text-xs font-medium uppercase tracking-widest text-accent">{role}</p>
          <h3 className="font-heading text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm leading-relaxed text-secondary">{summary}</p>
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-white/5 pt-5">
          <div className="min-w-0">
            <p className="font-heading text-2xl font-bold text-white">{highlight.metric}</p>
            <p className="mt-0.5 text-xs text-secondary">{highlight.label}</p>
          </div>
          <span className="flex shrink-0 items-center gap-1 text-sm font-medium text-white transition-colors group-hover:text-accent">
            Read
            <TbArrowRight aria-hidden="true" size={16} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-accent/50 to-transparent transition-all duration-500 group-hover:w-full"
      />
    </motion.li>
  )
}

interface PortfolioProps {
  /** Show only the first N case studies plus a link to /work. */
  limit?: number
  /** Render as the page heading (h1) on /work. */
  asPage?: boolean
}

function Portfolio({ limit, asPage = false }: PortfolioProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, inViewConfig)
  const studies = limit ? CASE_STUDIES.slice(0, limit) : CASE_STUDIES

  return (
    <section id="work" className={`w-full bg-background section-padding ${asPage ? 'pt-28 sm:pt-36' : ''}`}>
      <div ref={ref} className="container-page">
        <SectionHeader
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          as={asPage ? 'h1' : 'h2'}
          eyebrow="Our Experience"
          heading={
            <>
              Production Systems, <span className="text-accent">Real Numbers</span>
            </>
          }
          description="Work shipped by our founder and the engineers in our network — on offshore teams and as lead engineers. Client names are withheld out of respect for confidentiality; the numbers are real."
        />

        <motion.ul
          role="list"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger(0.1)}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
        >
          {studies.map((study) => (
            <CaseStudyCard key={study.slug} {...study} />
          ))}
        </motion.ul>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 text-center text-sm text-secondary sm:mt-12"
        >
          {limit && limit < CASE_STUDIES.length ? (
            <Link to="/work" className="font-medium text-white transition-colors hover:text-accent">
              See all {CASE_STUDIES.length} projects →
            </Link>
          ) : (
            <>
              Want more detail on any of these?{' '}
              <Link to="/contact" className="font-medium text-white transition-colors hover:text-accent">
                Ask us and we&apos;ll walk you through it →
              </Link>
            </>
          )}
        </motion.p>
      </div>
    </section>
  )
}

export default Portfolio
