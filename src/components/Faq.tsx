import { useRef } from 'react'
import { m as motion, useInView } from 'framer-motion'
import { TbPlus } from 'react-icons/tb'
import { FAQ } from '../content/faq'
import { fadeUp, inViewConfig } from '../lib/motion'
import SectionHeader from './SectionHeader'

function Faq() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, inViewConfig)

  return (
    <section id="faq" className="w-full bg-background section-padding">
      <div ref={ref} className="container-page grid gap-10 lg:grid-cols-[1fr,1.6fr] lg:gap-16">
        <SectionHeader
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="max-w-xl lg:sticky lg:top-28 lg:self-start"
          eyebrow="FAQ"
          heading={
            <>
              Straight <span className="text-accent">Answers</span>
            </>
          }
          description="The questions every team asks before hiring offshore. If yours isn't here, ask us on the call."
        />

        {/* Native <details> keeps every answer in the HTML and works without JavaScript. */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="divide-y divide-white/5 rounded-2xl border border-white/5 bg-surface"
        >
          {FAQ.map(({ question, answer }) => (
            <details key={question} className="group px-5 sm:px-7">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-heading text-base font-semibold text-white [&::-webkit-details-marker]:hidden">
                {question}
                <TbPlus
                  aria-hidden="true"
                  size={18}
                  className="shrink-0 text-accent transition-transform duration-200 group-open:rotate-45"
                />
              </summary>
              <p className="-mt-1 pb-5 text-sm leading-relaxed text-secondary">{answer}</p>
            </details>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Faq
