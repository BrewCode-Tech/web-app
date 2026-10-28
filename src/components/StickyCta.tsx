import { useEffect, useState } from 'react'
import { AnimatePresence, m as motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { TbCalendarEvent } from 'react-icons/tb'
import { CAL_BOOKING_URL } from '../content/company'
import { ease } from '../lib/motion'

// Phone-only "Book a call" bar that appears once the hero CTA has scrolled away.
function StickyCta() {
  const [visible, setVisible] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 560)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // The contact page already puts both options above the fold.
  if (pathname === '/contact') return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.25, ease }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-white/5 bg-background/90 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md md:hidden"
        >
          <a
            href={CAL_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex w-full items-center justify-center gap-2 text-sm"
          >
            <TbCalendarEvent aria-hidden="true" size={18} />
            Book a Free 30-Min Call
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default StickyCta
