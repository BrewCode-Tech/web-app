import { useEffect, useState } from 'react'

export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    const observers = new Map<string, IntersectionObserver>()

    function observe(id: string) {
      if (observers.has(id)) return

      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
      )

      observer.observe(el)
      observers.set(id, observer)
    }

    ids.forEach(observe)

    // Several sections mount lazily behind Suspense after this effect first
    // runs, so their elements may not exist yet — keep watching the DOM
    // until every id has been picked up.
    let mutationObserver: MutationObserver | null = null
    if (observers.size < ids.length) {
      mutationObserver = new MutationObserver(() => {
        ids.forEach(observe)
        if (observers.size === ids.length) {
          mutationObserver?.disconnect()
        }
      })
      mutationObserver.observe(document.body, { childList: true, subtree: true })
    }

    return () => {
      observers.forEach((o) => o.disconnect())
      mutationObserver?.disconnect()
    }
  }, [ids])

  return active
}
