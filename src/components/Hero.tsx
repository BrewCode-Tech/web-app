import { m as motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { IconType } from 'react-icons'
import { TbBrandGithub, TbClockHour4, TbLock } from 'react-icons/tb'
import { ease, fadeUpWithDelay } from '../lib/motion'
import { CAL_BOOKING_URL } from '../content/company'
import Eyebrow from './Eyebrow'
import Terminal from './Terminal'

// The three things offshore buyers worry about most, answered up front.
const TRUST_CHIPS: { icon: IconType; label: string }[] = [
  { icon: TbBrandGithub, label: 'Code in your GitHub from day one' },
  { icon: TbClockHour4, label: 'Daily overlap with your hours' },
  { icon: TbLock, label: 'NDA before we talk details' },
]

function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-background pt-16"
    >
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full">
        <defs>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          </pattern>
          <radialGradient id="grid-fade" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="grid-mask">
            <rect width="100%" height="100%" fill="url(#grid-fade)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" mask="url(#grid-mask)" />
      </svg>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(45,212,191,0.07) 0%, transparent 70%)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(45,212,191,0.05) 0%, transparent 70%)' }}
      />

      <div className="container-page relative z-10 py-12 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <Eyebrow {...fadeUpWithDelay(0.1)} className="mb-5">
              Founder-led offshore engineering
            </Eyebrow>

            <h1 className="font-heading text-[2.25rem] font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              The Offshore Partner
              <br />
              You Don&apos;t Have to{' '}
              <span className="relative inline-block">
                <span className="text-accent">Chase.</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.9, ease }}
                  style={{ originX: 0 }}
                  className="absolute -bottom-1 left-0 h-0.5 w-full bg-accent/40"
                />
              </span>
            </h1>

            <motion.p
              {...fadeUpWithDelay(0.35)}
              className="mt-6 max-w-lg text-base leading-relaxed text-secondary sm:text-lg md:text-xl"
            >
              A senior engineer in India who builds your web, SaaS, data, and AI products — working
              in your hours, shipping in your repos, and bringing in vetted engineers when you need
              more hands.
            </motion.p>

            <motion.div {...fadeUpWithDelay(0.5)} className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row">
              <a
                href={CAL_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary group flex items-center justify-center gap-2 text-center text-sm sm:text-base"
              >
                Book a Free 30-Min Call
                <span className="sr-only"> (opens in new tab)</span>
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <Link
                to="/work"
                className="rounded-lg border border-white/10 px-5 py-3 text-center font-heading text-sm font-semibold text-white transition-colors hover:border-accent/60 hover:text-accent sm:text-base"
              >
                See Our Work
              </Link>
            </motion.div>

            <motion.ul
              {...fadeUpWithDelay(0.65)}
              role="list"
              className="mt-10 flex flex-col gap-3 border-t border-white/5 pt-8 sm:flex-row sm:flex-wrap sm:gap-x-6"
            >
              {TRUST_CHIPS.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-sm text-secondary">
                  <Icon aria-hidden="true" size={18} className="shrink-0 text-accent" />
                  {label}
                </li>
              ))}
            </motion.ul>
          </div>

          <div className="flex justify-center lg:justify-end">
            <Terminal />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
