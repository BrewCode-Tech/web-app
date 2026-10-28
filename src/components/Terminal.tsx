import { useEffect, useState } from 'react'
import { AnimatePresence, m as motion, useReducedMotion } from 'framer-motion'
import { ease } from '../lib/motion'

interface TerminalStep {
  symbol: string
  text: string
  color: string
  delay: number
}

const STEPS: TerminalStep[] = [
  { symbol: '>', text: 'brew start --client=you', color: 'text-secondary', delay: 0 },
  { symbol: '✓', text: 'NDA signed', color: 'text-accent', delay: 1200 },
  { symbol: '✓', text: 'Repo created in your GitHub', color: 'text-accent', delay: 2200 },
  { symbol: '✓', text: 'Standup at 9:30 AM your time', color: 'text-accent', delay: 3200 },
  { symbol: '✓', text: 'Weekly demo shipped', color: 'text-accent', delay: 4200 },
  { symbol: '✓', text: 'Release deployed — on schedule', color: 'text-emerald-400', delay: 5200 },
]

function useTerminalSteps() {
  const reduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (done || reduceMotion) return

    const timers = STEPS.map((step, index) =>
      setTimeout(() => {
        setVisible(index + 1)
        if (index === STEPS.length - 1) setDone(true)
      }, step.delay),
    )

    return () => timers.forEach(clearTimeout)
  }, [done, reduceMotion])

  useEffect(() => {
    if (!done || reduceMotion) return

    const timer = setTimeout(() => {
      setVisible(0)
      setDone(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [done, reduceMotion])

  // Reduced motion: show the finished run instead of looping it.
  return reduceMotion ? STEPS.length : visible
}

function Terminal() {
  const visible = useTerminalSteps()

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.6, ease }}
      className="w-full max-w-lg"
    >
      <div className="flex items-center gap-2 rounded-t-xl border border-b-0 border-white/10 bg-[#1a1a1a] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
        <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
        <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        <span className="ml-3 truncate font-mono text-xs text-secondary">brew-code ~ your-project</span>
      </div>

      <div aria-hidden="true"
        className="min-h-[196px] rounded-b-xl border border-white/10 bg-[#0f0f0f] px-4 py-5 font-mono text-xs sm:min-h-[228px] sm:px-6 sm:py-6 sm:text-sm">
        <AnimatePresence>
          {STEPS.slice(0, visible).map((step, index) => (
            <motion.div
              key={`${step.text}-${index}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease }}
              className="mb-2.5 flex items-center gap-3 sm:mb-3"
            >
              <span className={`${step.color} w-4 shrink-0 font-bold`}>{step.symbol}</span>
              <span className={`${step.color} min-w-0 truncate`}>{step.text}</span>

              {index === visible - 1 && step.symbol === '>' && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.7, repeat: Infinity, repeatType: 'reverse' }}
                  className="inline-block h-4 w-2 bg-secondary align-middle"
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {visible === 0 && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.7, repeat: Infinity, repeatType: 'reverse' }}
            className="inline-block h-4 w-2 bg-secondary align-middle"
          />
        )}
      </div>
    </motion.div>
  )
}

export default Terminal
