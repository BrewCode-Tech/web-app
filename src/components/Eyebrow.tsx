import type { HTMLMotionProps } from 'framer-motion'
import { m as motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface EyebrowProps extends Omit<HTMLMotionProps<'p'>, 'children'> {
  centered?: boolean
  children: ReactNode
}

function Eyebrow({ centered = false, children, className = '', ...motionProps }: EyebrowProps) {
  return (
    <motion.p
      {...motionProps}
      className={`inline-flex items-center gap-2 font-heading text-xs font-medium uppercase tracking-widest text-accent ${className}`}
    >
      <span className="h-px w-5 shrink-0 bg-accent" />
      {children}
      {centered && <span className="h-px w-5 shrink-0 bg-accent" />}
    </motion.p>
  )
}

export default Eyebrow
