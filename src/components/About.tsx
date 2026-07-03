import { useEffect, useRef, useState } from 'react'
import { m as motion, useInView } from 'framer-motion'
import { fadeUp, inViewConfig, slideLeft, stagger, staggerItem } from '../lib/motion'
import Eyebrow from './Eyebrow'

interface Stat {
  value: number
  suffix: string
  label: string
}

const STATS: Stat[] = [
  { value: 20, suffix: '+', label: 'Years Combined Experience' },
  { value: 5, suffix: '', label: 'Production Platforms' },
  { value: 12, suffix: '+', label: 'Core Technologies' },
  { value: 100, suffix: '%', label: 'Hands-On Delivery' },
]

interface CountUpProps {
  target: number
  suffix: string
  run: boolean
}

function CountUp({ target, suffix, run }: CountUpProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!run) return

    let current = 0
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
  }, [run, target])

  return (
    <>
      {count}
      {suffix}
    </>
  )
}

function About() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, inViewConfig)

  return (
    <section id="about" className="w-full bg-surface section-padding">
      <div ref={ref} className="container-page">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
          <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={slideLeft}>
            <Eyebrow variants={fadeUp} className="mb-4">
              Who We Are
            </Eyebrow>
            <motion.h2
              variants={fadeUp}
              className="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl"
            >
              A Studio Built for <br className="hidden sm:block" /> Modern Products
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-5 text-sm leading-relaxed text-secondary sm:text-base">
              Brew Code Tech is a software development studio built around a team that has spent
              years working on production software — data-intensive analytics platforms,
              AI-powered automation, mobile apps, and enterprise systems. We partner with founders,
              product teams, and businesses to turn complex problems into elegant, scalable
              solutions.
            </motion.p>
            <motion.p variants={fadeUp} className="mt-4 text-sm leading-relaxed text-secondary sm:text-base">
              We care deeply about code quality, rigorous testing, and shipping products that
              users actually love. Every project we take on is treated as if it were our own.
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
