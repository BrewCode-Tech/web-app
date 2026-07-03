import { useEffect, useState } from 'react'
import { AnimatePresence, m as motion } from 'framer-motion'
import { ease } from '../lib/motion'

interface TerminalStep {
  symbol: string
  text: string
  color: string
  delay: number
}

const STEPS: TerminalStep[] = [
  { symbol: '>', text: 'Initializing project...', color: 'text-secondary', delay: 0 },
  { symbol: '✓', text: 'Designing', color: 'text-accent', delay: 1200 },
  { symbol: '✓', text: 'Building', color: 'text-accent', delay: 2200 },
  { symbol: '✓', text: 'Testing', color: 'text-accent', delay: 3200 },
  { symbol: '✓', text: 'Deploying', color: 'text-accent', delay: 4200 },
  { symbol: '✓', text: 'Success', color: 'text-emerald-400', delay: 5200 },
]

function useTerminalSteps() {
  const [visible, setVisible] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (done) return

    const timers = STEPS.map((step, index) =>
      setTimeout(() => {
        setVisible(index + 1)
        if (index === STEPS.length - 1) setDone(true)
      }, step.delay),
    )

    return () => timers.forEach(clearTimeout)
  }, [done])

  useEffect(() => {
    if (!done) return

    const timer = setTimeout(() => {
      setVisible(0)
      setDone(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [done])

  return visible
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
        <span className="ml-3 font-mono text-xs text-secondary">brew-code ~ terminal</span>
      </div>

      <div className="min-h-[220px] rounded-b-xl border border-white/10 bg-[#0f0f0f] px-6 py-6 font-mono text-sm">
        <AnimatePresence>
          {STEPS.slice(0, visible).map((step, index) => (
            <motion.div
              key={`${step.text}-${index}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease }}
              className="mb-3 flex items-center gap-3"
            >
              <span className={`${step.color} w-4 shrink-0 font-bold`}>{step.symbol}</span>
              <span className={step.color}>{step.text}</span>

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
