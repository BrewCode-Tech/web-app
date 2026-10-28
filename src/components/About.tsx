import { useEffect, useRef, useState } from 'react'
import { m as motion, useInView, useReducedMotion } from 'framer-motion'
import { fadeUp, inViewConfig, slideLeft, stagger, staggerItem } from '../lib/motion'
import Eyebrow from './Eyebrow'

interface Stat {
  value: number
  suffix: string
  label: string
}

const STATS: Stat[] = [
  { value: 5, suffix: '', label: 'Production platforms shipped' },
  { value: 280, suffix: '+ TB', label: 'Largest dataset we have run' },
  { value: 12, suffix: '+', label: 'Core technologies' },
  { value: 100, suffix: '%', label: 'Founder-led engagements' },
]

interface CountUpProps {
  target: number
  suffix: string
  run: boolean
}

function CountUp({ target, suffix, run }: CountUpProps) {
  // Start at the real value so the pre-rendered HTML never says "0".
  const [count, setCount] = useState(target)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!run || reduceMotion) return

    let current = 0
    setCount(0)
    const duration = 1200
    const step = 16
    const increment = target / (duration / step)

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, step)

    return () => clearInterval(timer)
  }, [run, target, reduceMotion])

  return (
    <>
      {count}
      {suffix}
    </>
  )
}

interface AboutProps {
  /** Render as the page heading (h1) on /about. */
  asPage?: boolean
}

function About({ asPage = false }: AboutProps) {
  const Heading = asPage ? motion.h1 : motion.h2
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, inViewConfig)

  return (
    <section id="about" className={`w-full bg-surface section-padding ${asPage ? 'pt-28 sm:pt-36' : ''}`}>
      <div ref={ref} className="container-page">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
          <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={slideLeft}>
            <Eyebrow variants={fadeUp} className="mb-4">
              Who We Are
            </Eyebrow>
            <Heading
              variants={fadeUp}
              className="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl"
            >
              A Small Studio, <br className="hidden sm:block" /> Built on Big Systems
            </Heading>
            <motion.p variants={fadeUp} className="mt-5 text-sm leading-relaxed text-secondary sm:text-base">
              Brew Code Tech is a founder-led software studio in India. Our founder and the
              engineers in our network have spent years inside production software — analytics
              platforms ingesting billions of events a day, AI-powered automation, and enterprise
              systems — much of it as part of offshore teams for clients abroad. We know what makes
              offshore work go right, and what makes it go wrong.
            </motion.p>
            <motion.p variants={fadeUp} className="mt-4 text-sm leading-relaxed text-secondary sm:text-base">
              So we stay deliberately small: you work directly with the person building your
              product, you own every line of code from day one, and we only scale the team with
              engineers we have already shipped with.
            </motion.p>
          </motion.div>

          <motion.ul
            role="list"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={stagger(0.1)}
            className="grid grid-cols-2 gap-4 sm:gap-5"
          >
            {STATS.map(({ value, suffix, label }) => (
              <motion.li
                key={label}
                variants={staggerItem}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="rounded-2xl border border-white/5 bg-background p-5 transition-colors duration-300 hover:border-white/10 sm:p-6"
              >
                <span className="font-heading text-3xl font-bold text-accent sm:text-4xl">
                  <CountUp target={value} suffix={suffix} run={inView} />
                </span>
                <p className="mt-2 text-xs text-secondary sm:text-sm">{label}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}

export default About
