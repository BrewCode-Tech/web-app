import type { ReactNode } from 'react'
import { m as motion } from 'framer-motion'
import { fadeUpWithDelay } from '../lib/motion'
import Eyebrow from './Eyebrow'

interface PageHeaderProps {
  eyebrow: ReactNode
  title: ReactNode
  description: ReactNode
  children?: ReactNode
}

// Top-of-page intro for inner pages: clears the fixed navbar and holds the page's h1.
function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <section className="relative w-full overflow-hidden bg-background pb-12 pt-28 sm:pb-16 sm:pt-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-[460px] w-[460px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(45,212,191,0.07) 0%, transparent 70%)' }}
      />
      <div className="container-page relative">
        <Eyebrow {...fadeUpWithDelay(0.05)} className="mb-4">
          {eyebrow}
        </Eyebrow>
        <motion.h1
          {...fadeUpWithDelay(0.1)}
          className="max-w-3xl font-heading text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          {title}
        </motion.h1>
        <motion.p
          {...fadeUpWithDelay(0.2)}
          className="mt-5 max-w-2xl text-base leading-relaxed text-secondary sm:text-lg"
        >
          {description}
        </motion.p>
        {children}
      </div>
    </section>
  )
}

export default PageHeader
