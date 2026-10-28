import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { m as motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { WORK_HOURS_IST } from '../content/company'
import { fadeUp, inViewConfig } from '../lib/motion'
import {
  IST_TIME_ZONE,
  computeOverlap,
  formatHours,
  formatMinutes,
  tzOffsetMinutes,
  type Segment,
} from '../lib/timezone'
import SectionHeader from './SectionHeader'

const VISITOR_WORKDAY = { start: 9, end: 18 }

const PRESET_ZONES = [
  { zone: 'America/Los_Angeles', label: 'San Francisco' },
  { zone: 'America/New_York', label: 'New York' },
  { zone: 'Europe/London', label: 'London' },
  { zone: 'Europe/Berlin', label: 'Berlin' },
  { zone: 'Asia/Dubai', label: 'Dubai' },
  { zone: 'Asia/Singapore', label: 'Singapore' },
  { zone: 'Australia/Sydney', label: 'Sydney' },
]

// The pre-rendered HTML uses this zone and date; the browser swaps in the
// visitor's real timezone and the current time after hydration.
const DEFAULT_ZONE = 'America/New_York'
const BUILD_REFERENCE_DATE = new Date(Date.UTC(2026, 0, 15, 12))

const pct = (minutes: number) => `${(minutes / 1440) * 100}%`

function Band({ segments, className }: { segments: Segment[]; className: string }) {
  return (
    <>
      {segments.map((s) => (
        <span
          key={s.start}
          className={`absolute inset-y-0 rounded-md ${className}`}
          style={{ left: pct(s.start), width: pct(s.end - s.start) }}
        />
      ))}
    </>
  )
}

function zoneLabel(zone: string) {
  return PRESET_ZONES.find((p) => p.zone === zone)?.label ?? zone.split('/').pop()?.replace(/_/g, ' ') ?? zone
}

function TimezoneOverlap() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, inViewConfig)
  const selectId = useId()

  const [zone, setZone] = useState(DEFAULT_ZONE)
  const [detectedZone, setDetectedZone] = useState<string | null>(null)
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    const detected = Intl.DateTimeFormat().resolvedOptions().timeZone
    // Visitors in India don't need an overlap chart — show New York instead.
    if (detected && detected !== IST_TIME_ZONE && detected !== 'Asia/Calcutta') {
      setDetectedZone(detected)
      setZone(detected)
    }
    setNow(new Date())
    const timer = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(timer)
  }, [])

  const date = now ?? BUILD_REFERENCE_DATE
  const result = useMemo(
    () =>
      computeOverlap(
        WORK_HOURS_IST,
        VISITOR_WORKDAY,
        tzOffsetMinutes(zone, date),
        tzOffsetMinutes(IST_TIME_ZONE, date),
      ),
    [zone, date],
  )

  const istNowMinutes = now ? (now.getUTCHours() * 60 + now.getUTCMinutes() + tzOffsetMinutes(IST_TIME_ZONE, now)) % 1440 : null
  const weAreOnline =
    istNowMinutes !== null &&
    istNowMinutes >= WORK_HOURS_IST.start * 60 &&
    istNowMinutes < WORK_HOURS_IST.end * 60

  const city = zoneLabel(zone)
  const overlapText = result.overlap
    .map((s) => `${formatMinutes(s.start)} – ${formatMinutes(s.end)}`)
    .join(' and ')

  const zoneOptions = detectedZone && !PRESET_ZONES.some((p) => p.zone === detectedZone)
    ? [{ zone: detectedZone, label: `${zoneLabel(detectedZone)} (you)` }, ...PRESET_ZONES]
    : PRESET_ZONES

  return (
    <section id="overlap" className="w-full bg-background section-padding">
      <div ref={ref} className="container-page">
        <SectionHeader
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          eyebrow="Working Hours"
          heading={
            <>
              Offshore, <span className="text-accent">Not Out of Reach</span>
            </>
          }
          description="The biggest worry with an offshore team is waiting a day for every answer. Here's exactly when we overlap with your working day."
        />

        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="rounded-2xl border border-white/5 bg-surface p-5 sm:p-8"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <p className="font-heading text-4xl font-bold text-white sm:text-5xl">
                {result.overlapMinutes > 0 ? (
                  <>
                    {formatHours(result.overlapMinutes)}
                    <span className="text-accent"> hrs</span>
                  </>
                ) : (
                  <span className="text-accent">Flexible</span>
                )}
              </p>
              <p className="mt-1 text-sm text-secondary" aria-live="polite">
                {result.overlapMinutes > 0 ? (
                  <>
                    of live overlap with a 9–6 workday in <span className="text-white">{city}</span>
                    {' '}— {overlapText} your time.
                  </>
                ) : (
                  <>
                    No default overlap with {city} — we shift our hours for teams in your timezone.
                  </>
                )}
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor={selectId} className="text-xs text-secondary">
                Your city
              </label>
              <select
                id={selectId}
                value={zone}
                onChange={(event) => setZone(event.target.value)}
                className="rounded-lg border border-white/10 bg-background px-3 py-2.5 text-sm text-white focus:border-accent/60"
              >
                {zoneOptions.map(({ zone: z, label }) => (
                  <option key={z} value={z}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-8" role="img" aria-label={`24-hour timeline in ${city} time showing your 9 AM to 6 PM workday, our online hours, and the overlap.`}>
            <div className="mb-2 flex items-center justify-between text-xs text-secondary">
              <span>Your workday</span>
            </div>
            <div className="relative h-7 rounded-md bg-white/[0.03]">
              <Band segments={result.theirs} className="bg-white/15" />
            </div>

            <div className="mb-2 mt-4 flex items-center justify-between text-xs text-secondary">
              <span>Brew Code Tech online</span>
            </div>
            <div className="relative h-7 rounded-md bg-white/[0.03]">
              <Band segments={result.ours} className="bg-accent/25" />
              <Band segments={result.overlap} className="bg-accent shadow-[0_0_16px_rgba(45,212,191,0.35)]" />
            </div>

            <div className="relative mt-2 h-4 text-[10px] text-secondary sm:text-xs" aria-hidden="true">
              {[0, 6, 12, 18, 24].map((h) => (
                <span
                  key={h}
                  className={`absolute top-0 whitespace-nowrap ${h === 0 ? '' : h === 24 ? '-translate-x-full' : '-translate-x-1/2'}`}
                  style={{ left: pct(h * 60) }}
                >
                  {h === 0 || h === 24 ? '12 AM' : h === 12 ? '12 PM' : h < 12 ? `${h} AM` : `${h - 12} PM`}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-white/5 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2.5 text-secondary">
              <span
                aria-hidden="true"
                className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                  now === null ? 'bg-white/20' : weAreOnline ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]' : 'bg-amber-400'
                }`}
              />
              {now === null || istNowMinutes === null ? (
                <>We&apos;re in India (IST, UTC+5:30).</>
              ) : weAreOnline ? (
                <>
                  It&apos;s {formatMinutes(istNowMinutes)} in India —{' '}
                  <span className="text-white">we&apos;re online now.</span>
                </>
              ) : (
                <>
                  It&apos;s {formatMinutes(istNowMinutes)} in India — we&apos;ll reply first thing in our
                  morning.
                </>
              )}
            </p>
            <Link to="/contact" className="shrink-0 font-medium text-white transition-colors hover:text-accent">
              Need a different window? Ask us →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TimezoneOverlap
