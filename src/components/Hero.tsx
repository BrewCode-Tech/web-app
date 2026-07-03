import { m as motion } from 'framer-motion'
import { ease, fadeUpWithDelay } from '../lib/motion'
import Eyebrow from './Eyebrow'
import Terminal from './Terminal'

const STATS = [
  { value: '20+', label: 'Years Combined Experience' },
  { value: '5', label: 'Production Platforms' },
  { value: '100%', label: 'Hands-On Delivery' },
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
        style={{ background: 'radial-gradient(circle, rgba(255,122,24,0.07) 0%, transparent 70%)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,122,24,0.05) 0%, transparent 70%)' }}
      />

      <div className="container-page relative z-10 py-16 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <Eyebrow {...fadeUpWithDelay(0.1)} className="mb-5">
              Software Development Studio
            </Eyebrow>

            <h1 className="font-heading text-[2.25rem] font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl xl:text-7xl">
              Ideas Brewed
              <br />
              Into{' '}
              <span className="relative inline-block">
                <span className="text-accent">Software.</span>
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
              We design, build and maintain reliable software that helps businesses grow.
            </motion.p>

            <motion.div {...fadeUpWithDelay(0.5)} className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row">
              <a
                href="#contact"
                className="btn-primary group flex items-center justify-center gap-2 text-center text-sm sm:text-base"
              >
                Start Your Project
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
              <a
                href="#services"
                className="rounded-lg border border-white/10 px-5 py-3 text-center font-heading font-semibold text-sm text-white transition-colors hover:border-accent/60 hover:text-accent sm:text-base"
              >
                Explore Services
              </a>
            </motion.div>

            <motion.div
              {...fadeUpWithDelay(0.65)}
              className="mt-10 flex items-center gap-5 border-t border-white/5 pt-8 sm:gap-8"
            >
              {STATS.map(({ value, label }) => (
                <div key={label} className="min-w-0">
                  <p className="font-heading text-xl font-bold text-white sm:text-2xl">{value}</p>
                  <p className="mt-0.5 text-xs text-secondary">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="hidden justify-center sm:flex lg:justify-end">
            <Terminal />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
