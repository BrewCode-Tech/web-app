import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m as motion, useInView } from 'framer-motion'
import { TbArrowUp } from 'react-icons/tb'
import { ease, fadeUp, inViewConfig, stagger } from '../lib/motion'
import type { NavLink } from '../types'

const QUICK_LINKS: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Contact', href: '#contact' },
]

const CONTACT_EMAIL = 'brewcodetechnologies@gmail.com'

function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.25, ease }}
          whileHover={{ y: -3, transition: { duration: 0.15 } }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-surface text-secondary transition-colors duration-200 hover:border-accent/30 hover:text-accent"
        >
          <TbArrowUp size={16} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

function Footer() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, inViewConfig)

  return (
    <footer id="footer" className="w-full border-t border-white/5 bg-background">
      <div ref={ref} className="mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 sm:pt-16">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger(0.1)}
          className="mb-10 grid gap-8 sm:mb-14 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-12"
        >
          <motion.div variants={fadeUp} className="sm:col-span-2 lg:col-span-1">
            <a href="#home" className="font-heading text-xl font-bold tracking-tight text-white">
              Brew<span className="text-accent">Code</span>
              <span className="font-medium text-secondary"> Tech</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-secondary">
              A software development studio building reliable, scalable products for startups and
              growing businesses.
            </p>
          </motion.div>

          <motion.nav variants={fadeUp} aria-label="Quick links">
            <h3 className="mb-4 font-heading text-sm font-semibold text-white sm:mb-5">Quick Links</h3>
            <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-2.5 sm:gap-y-3">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-sm text-secondary transition-colors duration-200 hover:text-white">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.div variants={fadeUp}>
            <h3 className="mb-4 font-heading text-sm font-semibold text-white sm:mb-5">Contact</h3>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="break-all text-sm text-secondary transition-colors duration-200 hover:text-white sm:break-normal"
            >
              {CONTACT_EMAIL}
            </a>
          </motion.div>
        </motion.div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 sm:flex-row sm:gap-4 sm:pt-8">
          <p className="text-center text-xs text-secondary sm:text-left">
            &copy; {new Date().getFullYear()} Brew Code Tech. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs text-secondary">Built with React &amp; TypeScript</p>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
