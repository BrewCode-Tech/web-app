import { useId, useRef, useState } from 'react'
import { m as motion, useInView } from 'framer-motion'
import { COST_COMPARISON } from '../content/company'
import { fadeUp, inViewConfig } from '../lib/motion'
import SectionHeader from './SectionHeader'

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
const roundTo = (value: number, step: number) => Math.round(value / step) * step

interface BarProps {
  label: string
  value: string
  /** Bar width as a % of the largest bar. */
  width: number
  /** Optional lighter extension, for a range (e.g. agency low → high). */
  rangeTo?: number
  tone: 'muted' | 'range' | 'accent'
}

function Bar({ label, value, width, rangeTo, tone }: BarProps) {
  const fill = tone === 'accent' ? 'bg-accent' : tone === 'range' ? 'bg-white/30' : 'bg-white/15'
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 text-sm">
        <span className="text-secondary">{label}</span>
        <span className={`shrink-0 font-semibold ${tone === 'accent' ? 'text-accent' : 'text-white'}`}>{value}</span>
      </div>
      <div className="relative mt-2 h-3 rounded-full bg-white/[0.03]">
        {rangeTo !== undefined && (
          <div className="absolute inset-y-0 left-0 rounded-full bg-white/10" style={{ width: `${rangeTo}%` }} />
        )}
        <div className={`absolute inset-y-0 left-0 rounded-full transition-[width] duration-300 ${fill}`} style={{ width: `${width}%` }} />
      </div>
    </div>
  )
}

// Hidden while COST_COMPARISON.brewMonthlyUsd is null.
function CostCompare() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, inViewConfig)
  const headcountId = useId()
  const [engineers, setEngineers] = useState(1)

  const { brewMonthlyUsd, hoursPerDay, workingDaysPerMonth, asOf, usInHouse, indiaAgency } = COST_COMPARISON
  if (brewMonthlyUsd === null) return null

  const hoursPerMonth = Math.round(hoursPerDay * workingDaysPerMonth)

  // US: median wage grossed up to full employer cost, then scaled to our hours
  // so both sides buy the same number of engineering hours.
  const usFullTimeMonthly = usInHouse.medianAnnualWageUsd / usInHouse.wageShareOfEmployerCost / 12
  const usMonthly = roundTo(usFullTimeMonthly * (hoursPerDay / usInHouse.hoursPerDay), 100) * engineers
  const agencyLow = roundTo(indiaAgency.hourlyLowUsd * hoursPerMonth, 100) * engineers
  const agencyHigh = roundTo(indiaAgency.hourlyHighUsd * hoursPerMonth, 100) * engineers
  const ours = brewMonthlyUsd * engineers
  const ourHourly = brewMonthlyUsd / hoursPerMonth
  const yearlySaving = roundTo((usMonthly - ours) * 12, 1000)

  const pct = (value: number) => Math.min(100, (value / usMonthly) * 100)
  const sources = [...usInHouse.sources, ...indiaAgency.sources]

  return (
    <section id="cost" className="w-full bg-background section-padding">
      <div ref={ref} className="container-page">
        <SectionHeader
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          eyebrow="The Numbers"
          heading={
            <>
              Senior Engineering, <span className="text-accent">Sensible Cost</span>
            </>
          }
          description={`A dedicated senior engineer, ${hoursPerDay} hours a day — compared like for like with hiring in the US or going through a typical Indian offshore agency.`}
        />

        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="rounded-2xl border border-white/5 bg-surface p-5 sm:p-8"
        >
          <div className="grid gap-8 lg:grid-cols-[1fr,1.6fr] lg:gap-12">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1.5">
                <label htmlFor={headcountId} className="flex justify-between text-xs text-secondary">
                  Engineers <span className="font-semibold text-white">{engineers}</span>
                </label>
                <input
                  id={headcountId}
                  type="range"
                  min={1}
                  max={5}
                  value={engineers}
                  onChange={(event) => setEngineers(Number(event.target.value))}
                  className="accent-[#2DD4BF]"
                />
              </div>
              <div className="border-t border-white/5 pt-6">
                <p className="font-heading text-3xl font-bold text-white sm:text-4xl">{usd.format(yearlySaving)}</p>
                <p className="mt-1 text-sm text-secondary">
                  estimated yearly saving versus hiring {engineers === 1 ? 'a developer' : `${engineers} developers`} in
                  the US
                </p>
              </div>
              <p className="text-sm text-secondary">
                That&apos;s about <span className="font-semibold text-white">{usd.format(ourHourly)}/hour</span> — below
                the {usd.format(indiaAgency.hourlyLowUsd)}–{usd.format(indiaAgency.hourlyHighUsd)}/hour typical of
                Indian offshore agencies.
              </p>
            </div>

            <div className="flex flex-col justify-center gap-6">
              <Bar label="In-house, United States" value={`${usd.format(usMonthly)}/mo`} width={100} tone="muted" />
              <Bar
                label="Typical Indian offshore agency"
                value={`${usd.format(agencyLow)}–${usd.format(agencyHigh)}/mo`}
                width={pct(agencyLow)}
                rangeTo={pct(agencyHigh)}
                tone="range"
              />
              <Bar label={`Brew Code Tech, ${hoursPerDay} h/day`} value={`${usd.format(ours)}/mo`} width={pct(ours)} tone="accent" />
            </div>
          </div>

          <details className="mt-8 border-t border-white/5 pt-5 text-xs text-secondary">
            <summary className="cursor-pointer font-medium text-white hover:text-accent">How we calculated this</summary>
            <div className="mt-3 flex flex-col gap-2 leading-relaxed">
              <p>
                <span className="text-white">US in-house:</span> median software developer wage of{' '}
                {usd.format(usInHouse.medianAnnualWageUsd)}/year, divided by{' '}
                {Math.round(usInHouse.wageShareOfEmployerCost * 1000) / 10}% — the share of a full-time employee&apos;s
                cost that is wages, the rest being benefits and payroll costs — then scaled from{' '}
                {usInHouse.hoursPerDay} to {hoursPerDay} hours a day. It excludes recruiting, equipment, and office
                costs, so the real figure is higher.
              </p>
              <p>
                <span className="text-white">Offshore agency:</span> typical senior developer rates of{' '}
                {usd.format(indiaAgency.hourlyLowUsd)}–{usd.format(indiaAgency.hourlyHighUsd)}/hour from published
                2026 rate guides, at {hoursPerMonth} hours a month.
              </p>
              <p>Figures as of {asOf}. Your costs will vary by city, role, and seniority.</p>
              <ul role="list" className="mt-1 flex flex-col gap-1">
                {sources.map(({ label, url }) => (
                  <li key={url}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-white/20 underline-offset-2 hover:text-accent"
                    >
                      {label}
                      <span className="sr-only"> (opens in new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </motion.div>
      </div>
    </section>
  )
}

export default CostCompare
