import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, m as motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { ease } from '../lib/motion'
import { CAL_BOOKING_URL } from '../content/company'
import type { NavLink } from '../types'
import Logo from './Logo'

const NAV_LINKS: NavLink[] = [
  { label: 'Work', href: '/work' },
  { label: 'How We Work', href: '/how-we-work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

// The drawer has room for the home anchors too.
const DRAWER_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  ...NAV_LINKS,
]

function isActiveLink(pathname: string, href: string) {
  if (href.includes('#')) return false
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}
const DRAWER_ID = 'mobile-nav-drawer'
const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled])'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 24)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const close = useCallback(() => {
    setMenuOpen(false)
    menuButtonRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!menuOpen) {
      return
    }

    closeButtonRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        close()
        return
      }

      if (event.key !== 'Tab' || !drawerRef.current) {
        return
      }

      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      if (focusable.length === 0) {
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen, close])

  return (
    <>
      <header
        id="navbar"
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'border-b border-white/5 bg-background/85 shadow-[0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6"
        >
          <Link
            to="/"
            onClick={close}
            aria-label="Brew Code Tech — home"
            className="shrink-0"
          >
            <Logo size={36} />
          </Link>

          <ul className="hidden items-center gap-1 md:flex" role="list">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = isActiveLink(pathname, href)

              return (
                <li key={href}>
                  <Link
                    to={href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative rounded-lg px-3 py-2 font-heading text-sm font-medium transition-colors xl:px-4 ${
                      isActive ? 'text-white' : 'text-secondary hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        aria-hidden="true"
                        className="absolute inset-0 rounded-lg bg-white/5"
                        transition={{ duration: 0.25, ease }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={CAL_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary group hidden items-center gap-2 whitespace-nowrap text-sm md:inline-flex"
            >
              Book a Call
              <span className="sr-only"> (opens in new tab)</span>
              <svg
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M2 7h10M8 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls={DRAWER_ID}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-lg transition-colors hover:bg-white/5 md:hidden"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25, ease }}
                className="block h-px w-5 origin-center bg-white"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block h-px w-5 bg-white"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25, ease }}
                className="block h-px w-5 origin-center bg-white"
              />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            <motion.div
              key="drawer"
              ref={drawerRef}
              id={DRAWER_ID}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease }}
              className="fixed right-0 top-0 z-50 flex h-full w-[min(16rem,85vw)] flex-col border-l border-white/5 bg-surface md:hidden"
            >
              <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/5 px-5">
                <Link to="/" onClick={close} aria-label="Brew Code Tech — home">
                  <Logo size={30} />
                </Link>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={close}
                  aria-label="Close menu"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-secondary transition-colors hover:bg-white/5 hover:text-white"
                >
                  <svg
                    aria-hidden="true"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile navigation">
                <ul className="flex flex-col gap-1" role="list">
                  {DRAWER_LINKS.map(({ label, href }, index) => {
                    const isActive = isActiveLink(pathname, href)

                    return (
                      <motion.li
                        key={href}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.22, delay: index * 0.04, ease }}
                      >
                        <Link
                          to={href}
                          onClick={close}
                          aria-current={isActive ? 'page' : undefined}
                          className={`flex items-center gap-3 rounded-xl px-4 py-3 font-heading text-sm font-medium transition-colors ${
                            isActive
                              ? 'bg-white/5 text-white'
                              : 'text-secondary hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          {isActive && (
                            <span aria-hidden="true" className="h-4 w-1 shrink-0 rounded-full bg-accent" />
                          )}
                          {label}
                        </Link>
                      </motion.li>
                    )
                  })}
                </ul>
              </nav>

              <div className="shrink-0 border-t border-white/5 px-5 pb-8 pt-4">
                <a
                  href={CAL_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className="btn-primary block w-full text-center text-sm"
                >
                  Book a Free Call
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
