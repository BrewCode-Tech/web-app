/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Cloudflare Turnstile site key. When unset, the contact form submits without a challenge. */
  readonly VITE_TURNSTILE_SITE_KEY?: string
}
