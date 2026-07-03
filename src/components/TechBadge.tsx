import { m as motion, type MotionStyle } from 'framer-motion'
import type { IconType } from 'react-icons'
import { ease } from '../lib/motion'

export interface TechBadgeProps {
  icon: IconType
  label: string
  color: string
}

function TechBadge({ icon: Icon, label, color }: TechBadgeProps) {
  return (
    <motion.div
      whileHover={{ y: -3, transition: { duration: 0.2, ease } }}
      style={{ '--brand': color } as unknown as MotionStyle}
      className="group flex w-[90px] cursor-default select-none flex-col items-center gap-2.5 rounded-2xl border border-white/5 bg-surface px-4 py-4 transition-colors duration-300 hover:border-white/10 hover:bg-white/[0.03] sm:w-[104px]"
    >
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 sm:h-10 sm:w-10"
        style={{ backgroundColor: `${color}14` }}
      >
        <Icon size={20} className="text-secondary transition-[color] duration-300 group-hover:[color:var(--brand)]" />
      </div>
      <span className="text-center font-heading text-[10px] font-medium leading-tight text-secondary transition-colors duration-300 group-hover:text-white sm:text-[11px]">
        {label}
      </span>
    </motion.div>
  )
}

export default TechBadge
