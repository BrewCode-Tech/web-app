// Cloudflare Pages Function: POST /api/contact
//
// Receives the project-brief form, checks it, and forwards it to the inbox.
// Configure in Cloudflare → Pages project → Settings → Variables and Secrets:
//   TURNSTILE_SECRET_KEY  (optional) Turnstile secret; when set, every request must pass the challenge
//   RESEND_API_KEY        Resend API key — https://resend.com (free tier: 3,000 emails/month)
//   CONTACT_TO            inbox that receives briefs, e.g. hello@brewcodetech.com
//   CONTACT_FROM          verified sender, e.g. "Brew Code Tech <briefs@brewcodetech.com>"
//   WEBHOOK_URL           (optional) Slack/Discord-compatible webhook, used instead of or as well as email

interface Env {
  TURNSTILE_SECRET_KEY?: string
  RESEND_API_KEY?: string
  CONTACT_TO?: string
  CONTACT_FROM?: string
  WEBHOOK_URL?: string
}

interface PagesContext {
  request: Request
  env: Env
}

const FIELDS = ['name', 'email', 'company', 'project', 'budget', 'timeline'] as const
type Brief = Record<(typeof FIELDS)[number], string>

const MAX_LENGTH = 5000
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function json(status: number, body: object) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)
}

async function passesTurnstile(secret: string, token: string, ip: string | null) {
  const body = new FormData()
  body.append('secret', secret)
  body.append('response', token)
  if (ip) body.append('remoteip', ip)
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body })
  const outcome = (await res.json()) as { success?: boolean }
  return outcome.success === true
}

function formatBrief(brief: Brief) {
  return FIELDS.filter((f) => brief[f]).map((f) => `${f}: ${brief[f]}`).join('\n')
}

async function sendEmail(env: Env, brief: Brief) {
  const html = FIELDS.filter((f) => brief[f])
    .map((f) => `<p><strong>${f}</strong><br>${escapeHtml(brief[f]).replace(/\n/g, '<br>')}</p>`)
    .join('')
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.CONTACT_FROM,
      to: [env.CONTACT_TO],
      reply_to: brief.email,
      subject: `New project brief — ${brief.name}${brief.company ? ` (${brief.company})` : ''}`,
      html,
      text: formatBrief(brief),
    }),
  })
  if (!res.ok) throw new Error(`Resend responded ${res.status}`)
}

async function sendWebhook(url: string, brief: Brief) {
  const text = `New project brief\n${formatBrief(brief)}`
  // `content` is Discord's field, `text` is Slack's — sending both works for either.
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: text.slice(0, 1900), text }),
  })
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`)
}

export async function onRequestPost({ request, env }: PagesContext): Promise<Response> {
  let payload: Record<string, unknown>
  try {
    payload = (await request.json()) as Record<string, unknown>
  } catch {
    return json(400, { error: 'Invalid JSON' })
  }

  // Honeypot filled in → pretend success so bots learn nothing.
  if (typeof payload['website'] === 'string' && payload['website'] !== '') return json(200, { ok: true })

  const brief = Object.fromEntries(
    FIELDS.map((field) => {
      const value = payload[field]
      return [field, typeof value === 'string' ? value.trim().slice(0, MAX_LENGTH) : '']
    }),
  ) as Brief

  if (!brief.name || !brief.project || !EMAIL_PATTERN.test(brief.email)) {
    return json(422, { error: 'Name, a valid email, and a project description are required.' })
  }

  if (env.TURNSTILE_SECRET_KEY) {
    const token = payload['cf-turnstile-response']
    const ip = request.headers.get('CF-Connecting-IP')
    if (typeof token !== 'string' || !(await passesTurnstile(env.TURNSTILE_SECRET_KEY, token, ip))) {
      return json(403, { error: 'Verification failed. Please try again.' })
    }
  }

  const canEmail = Boolean(env.RESEND_API_KEY && env.CONTACT_TO && env.CONTACT_FROM)
  if (!canEmail && !env.WEBHOOK_URL) {
    return json(500, { error: 'Contact form is not configured.' })
  }

  try {
    const deliveries: Promise<void>[] = []
    if (canEmail) deliveries.push(sendEmail(env, brief))
    if (env.WEBHOOK_URL) deliveries.push(sendWebhook(env.WEBHOOK_URL, brief))
    // Succeed if at least one channel delivered — a brief should never be lost to one flaky service.
    const results = await Promise.allSettled(deliveries)
    if (!results.some((r) => r.status === 'fulfilled')) throw new Error('All deliveries failed')
  } catch (error) {
    console.error('contact: delivery failed', error)
    return json(502, { error: 'Could not deliver your message.' })
  }

  return json(200, { ok: true })
}
