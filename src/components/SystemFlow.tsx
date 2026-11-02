import { Fragment } from 'react'
import { TbArrowDown, TbArrowRight } from 'react-icons/tb'
import type { FlowStep } from '../content/caseStudies'

interface SystemFlowProps {
  steps: FlowStep[]
  note?: string | undefined
}

// A left-to-right pipeline on wide screens, top-to-bottom on phones.
function SystemFlow({ steps, note }: SystemFlowProps) {
  return (
    <figure className="rounded-2xl border border-white/5 bg-surface p-5 sm:p-7">
      <ol role="list" className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-center">
        {steps.map(({ label, detail }, index) => (
          <Fragment key={label}>
            {index > 0 && (
              <li aria-hidden="true" className="flex justify-center text-accent/70">
                <TbArrowDown size={18} className="lg:hidden" />
                <TbArrowRight size={18} className="hidden lg:block" />
              </li>
            )}
            <li
              className={`min-w-0 flex-1 rounded-xl border px-4 py-3 text-center ${
                index === steps.length - 1 ? 'border-accent/30 bg-accent/10' : 'border-white/10 bg-background'
              }`}
            >
              <p className="font-heading text-sm font-semibold text-white">{label}</p>
              {detail && <p className="mt-1 text-xs leading-snug text-secondary">{detail}</p>}
            </li>
          </Fragment>
        ))}
      </ol>
      {note && <figcaption className="mt-5 text-center text-xs text-secondary">{note}</figcaption>}
    </figure>
  )
}

export default SystemFlow
