import { Link, useParams } from 'react-router-dom'
import { TbArrowLeft, TbArrowRight, TbCheck } from 'react-icons/tb'
import CtaBanner from '../components/CtaBanner'
import PageHeader from '../components/PageHeader'
import Seo from '../components/Seo'
import SystemFlow from '../components/SystemFlow'
import { CASE_STUDIES, findCaseStudy } from '../content/caseStudies'
import { SITE_URL } from '../content/company'
import { Component as NotFound } from './NotFound'

export function Component() {
  const { slug } = useParams()
  const study = findCaseStudy(slug)
  if (!study) return <NotFound />

  const index = CASE_STUDIES.indexOf(study)
  const next = CASE_STUDIES[(index + 1) % CASE_STUDIES.length]

  return (
    <>
      <Seo
        path={`/work/${study.slug}`}
        title={`${study.title} — Case Study`}
        description={`${study.summary} ${study.highlight.label}: ${study.highlight.metric}.`}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: study.title,
            about: study.sector,
            abstract: study.summary,
            url: `${SITE_URL}/work/${study.slug}`,
            creator: { '@type': 'Organization', name: 'Brew Code Tech', url: SITE_URL },
          },
        ]}
      />

      <PageHeader
        eyebrow={study.role}
        title={study.title}
        description={study.summary}
      >
        <div className="mt-6 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full border border-white/10 px-3 py-1 text-secondary">{study.sector}</span>
          {study.status && (
            <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-accent">{study.status}</span>
          )}
        </div>
      </PageHeader>

      <section aria-label="Results" className="w-full border-y border-white/5 bg-surface">
        <ul role="list" className="container-page grid grid-cols-2 gap-x-6 gap-y-8 py-10 sm:py-12 lg:grid-cols-4">
          {study.results.map(({ metric, label }) => (
            <li key={label} className="min-w-0">
              <p className="font-heading text-2xl font-bold text-white sm:text-3xl">{metric}</p>
              <p className="mt-1 text-xs leading-snug text-secondary sm:text-sm">{label}</p>
            </li>
          ))}
        </ul>
      </section>

      <article className="w-full bg-background section-padding">
        <section className="container-page mb-14 sm:mb-16">
          <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">How it fits together</h2>
          <div className="mt-5">
            <SystemFlow steps={study.flow} note={study.flowNote} />
          </div>
        </section>

        <div className="container-page grid gap-12 lg:grid-cols-[1.6fr,1fr] lg:gap-16">
          <div className="flex min-w-0 flex-col gap-12">
            <section>
              <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">The challenge</h2>
              <p className="mt-4 text-base leading-relaxed text-secondary">{study.challenge}</p>
            </section>
            <section>
              <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">What we did</h2>
              <ul role="list" className="mt-5 flex flex-col gap-4">
                {study.approach.map((step) => (
                  <li key={step} className="flex gap-3 text-base leading-relaxed text-secondary">
                    <TbCheck aria-hidden="true" size={20} className="mt-1 shrink-0 text-accent" />
                    {step}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-white/5 bg-surface p-6">
              <h2 className="font-heading text-sm font-semibold uppercase tracking-widest text-accent">Stack & skills</h2>
              <ul role="list" className="mt-4 flex flex-wrap gap-2">
                {study.stack.map((item) => (
                  <li key={item} className="rounded-full border border-white/5 bg-background px-2.5 py-1 text-xs text-secondary">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="rounded-2xl border border-white/5 bg-surface p-6 text-xs leading-relaxed text-secondary">
              Client details are withheld out of respect for confidentiality. We&apos;re happy to walk you
              through this work in more depth on a call.
            </p>
          </aside>
        </div>

        <nav aria-label="More case studies" className="container-page mt-16 flex flex-col gap-4 border-t border-white/5 pt-8 sm:flex-row sm:justify-between">
          <Link to="/work" className="inline-flex items-center gap-2 text-sm text-secondary transition-colors hover:text-white">
            <TbArrowLeft aria-hidden="true" size={16} />
            All case studies
          </Link>
          {next && next !== study && (
            <Link
              to={`/work/${next.slug}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-accent"
            >
              Next: {next.title}
              <TbArrowRight aria-hidden="true" size={16} />
            </Link>
          )}
        </nav>
      </article>

      <CtaBanner />
    </>
  )
}
