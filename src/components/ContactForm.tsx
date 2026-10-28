import { useEffect, useId, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { TbAlertTriangle, TbCalendarEvent, TbCircleCheck, TbSend } from 'react-icons/tb'
import { CAL_BOOKING_URL, CONTACT_EMAIL } from '../content/company'

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY
const TURNSTILE_SCRIPT = 'https://challenges.cloudflare.com/turnstile/v0/api.js'

const BUDGETS = ['Under $10k', '$10k – $25k', '$25k – $50k', '$50k+', 'Monthly retainer', 'Not sure yet']
const TIMELINES = ['ASAP', 'Within a month', '1–3 months', 'Just exploring']

type Status = 'idle' | 'sending' | 'sent' | 'error'

const fieldClass =
  'w-full rounded-lg border border-white/10 bg-background px-3.5 py-3 text-sm text-white placeholder:text-secondary/60 transition-colors focus:border-accent/60'
const labelClass = 'mb-1.5 block text-sm font-medium text-white'

function mailtoFallback(data: Record<string, string>) {
  const body = Object.entries(data)
    .filter(([key, value]) => value && !key.startsWith('cf-'))
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n')
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Project brief')}&body=${encodeURIComponent(body)}`
}

function ContactForm() {
  const id = useId()
  const [status, setStatus] = useState<Status>('idle')
  const [fallbackHref, setFallbackHref] = useState(`mailto:${CONTACT_EMAIL}`)

  // Load Turnstile only on this page, and only when a site key is configured.
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || document.querySelector(`script[src="${TURNSTILE_SCRIPT}"]`)) return
    const script = document.createElement('script')
    script.src = TURNSTILE_SCRIPT
    script.async = true
    script.defer = true
    document.head.appendChild(script)
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(
      Array.from(new FormData(form).entries()).map(([key, value]) => [key, String(value)]),
    )
    setFallbackHref(mailtoFallback(data))
    setStatus('sending')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error(`Request failed: ${response.status}`)
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-2xl border border-accent/20 bg-surface p-6 sm:p-8">
        <TbCircleCheck aria-hidden="true" size={36} className="text-accent" />
        <h2 className="font-heading text-2xl font-bold text-white">Brief received — thank you.</h2>
        <p className="text-sm leading-relaxed text-secondary">
          You&apos;ll hear back from the founder within one business day. Want to skip the wait?
        </p>
        <a
          href={CAL_BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center gap-2 text-sm"
        >
          <TbCalendarEvent aria-hidden="true" size={18} />
          Pick a call time now
          <span className="sr-only"> (opens in new tab)</span>
        </a>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex flex-col gap-5 rounded-2xl border border-white/5 bg-surface p-5 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className={labelClass}>
            Your name
          </label>
          <input id={`${id}-name`} name="name" required autoComplete="name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className={labelClass}>
            Work email
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-company`} className={labelClass}>
          Company <span className="font-normal text-secondary">(optional)</span>
        </label>
        <input id={`${id}-company`} name="company" autoComplete="organization" className={fieldClass} />
      </div>

      <div>
        <label htmlFor={`${id}-project`} className={labelClass}>
          What are you building?
        </label>
        <textarea
          id={`${id}-project`}
          name="project"
          required
          rows={5}
          placeholder="A few lines on the product, where it is today, and what you need help with."
          className={`${fieldClass} resize-y`}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-budget`} className={labelClass}>
            Budget
          </label>
          <select id={`${id}-budget`} name="budget" defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Select a range
            </option>
            {BUDGETS.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-timeline`} className={labelClass}>
            Timeline
          </label>
          <select id={`${id}-timeline`} name="timeline" defaultValue="" className={fieldClass}>
            <option value="" disabled>
              When do you want to start?
            </option>
            {TIMELINES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Honeypot: hidden from people, filled in by naive bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {TURNSTILE_SITE_KEY && <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} data-theme="dark" />}

      {status === 'error' && (
        <div role="alert" className="flex gap-3 rounded-lg border border-amber-400/30 bg-amber-400/5 p-4 text-sm text-secondary">
          <TbAlertTriangle aria-hidden="true" size={20} className="shrink-0 text-amber-400" />
          <p>
            That didn&apos;t send — sorry.{' '}
            <a href={fallbackHref} className="font-medium text-white underline underline-offset-2 hover:text-accent">
              Send it by email instead
            </a>{' '}
            (your answers are pre-filled).
          </p>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-secondary">
          We reply within one business day. NDA on request. See our{' '}
          <Link to="/privacy" className="underline underline-offset-2 hover:text-white">
            privacy policy
          </Link>
          .
        </p>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-primary inline-flex items-center justify-center gap-2 text-sm disabled:cursor-wait disabled:opacity-60"
        >
          <TbSend aria-hidden="true" size={18} />
          {status === 'sending' ? 'Sending…' : 'Send Project Brief'}
        </button>
      </div>
    </form>
  )
}

export default ContactForm
