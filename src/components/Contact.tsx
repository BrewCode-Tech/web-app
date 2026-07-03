import { useRef } from 'react'
import { m as motion, useInView } from 'framer-motion'
import { TbMail } from 'react-icons/tb'
import { fadeUp, inViewConfig } from '../lib/motion'
import Eyebrow from './Eyebrow'

const CONTACT_EMAIL = 'brewcodetechnologies@gmail.com'

function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, inViewConfig)

  return (
    <section id="contact" className="w-full bg-surface section-padding">
      <div ref={ref} className="container-page">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="mx-auto flex max-w-xl flex-col items-center text-center"
        >
          <Eyebrow className="mb-4">Get in Touch</Eyebrow>
          <h2 className="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Tell Us About <span className="text-accent">Your Project</span>
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-secondary sm:text-base">
            Whether you have a fully scoped project or just an early idea, we&apos;d love to hear
            from you. Send us an email and we&apos;ll get back to you.
          </p>

          <address className="mt-8 not-italic sm:mt-10">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="btn-primary group inline-flex items-center gap-3 text-sm sm:text-base"
            >
              <TbMail aria-hidden="true" size={18} />
              {CONTACT_EMAIL}
            </a>
          </address>

          <div className="mt-8 w-full rounded-2xl border border-white/5 bg-background p-4 sm:mt-10 sm:p-5">
            <p className="text-xs leading-relaxed text-secondary sm:text-sm">
              <span className="font-medium text-white">No commitment required.</span> We&apos;ll
              review your inquiry and schedule a free discovery call to understand your needs
              before any engagement.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
