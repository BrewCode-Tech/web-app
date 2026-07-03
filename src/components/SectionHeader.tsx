import type { HTMLMotionProps } from 'framer-motion'
import { m as motion } from 'framer-motion'
import type { ReactNode } from 'react'
import Eyebrow from './Eyebrow'

interface SectionHeaderProps extends HTMLMotionProps<'div'> {
  eyebrow: ReactNode
  heading: ReactNode
  description: ReactNode
}

function SectionHeader({
  eyebrow,
  heading,
  description,
  className = 'mb-12 max-w-2xl sm:mb-16',
  ...motionProps
}: SectionHeaderProps) {
  return (
    <motion.div {...motionProps} className={className}>
      <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
      <h2 className="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
        {heading}
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-secondary sm:text-base">{description}</p>
    </motion.div>
  )
}

export default SectionHeader
