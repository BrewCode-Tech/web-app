interface LogoProps {
  /** Mark height in px; the wordmark scales with it. */
  size?: number
  className?: string
}

// Inline so it renders with the first paint and needs no extra request.
// Same artwork as public/logo-mark.svg and public/favicon.svg.
export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <path d="M27 6c-2.5 2.5 2.5 5 0 7.5s2.5 5 0 7.5" stroke="#2DD4BF" strokeWidth="3" className="logo-steam" />
      <path d="M35 10c-2 2 2 4 0 6s2 4 0 6" stroke="#2DD4BF" strokeWidth="3" opacity=".6" className="logo-steam logo-steam-delay" />
      <path d="M30 27H10v13a16 16 0 0 0 16 16h4" stroke="#FFFFFF" strokeWidth="4" />
      <path d="M30 27h20v13a16 16 0 0 1-16 16h-4" stroke="#2DD4BF" strokeWidth="4" />
      <path d="M50 31h2.5a7 7 0 0 1 0 14H49" stroke="#2DD4BF" strokeWidth="4" />
      <path d="M23 36.5l-4 4 4 4M37 36.5l4 4-4 4M32.5 35l-5 11" stroke="#FFFFFF" strokeWidth="2.6" />
    </svg>
  )
}

function Logo({ size = 36, className = '' }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} />
      <span className="flex flex-col leading-none" style={{ fontSize: size * 0.5 }}>
        <span className="font-heading font-bold uppercase tracking-wide text-white">
          Brew <span className="text-accent">Code</span>
        </span>
        <span
          className="mt-[0.3em] flex items-center gap-[0.4em] font-heading font-medium uppercase text-white/80"
          style={{ fontSize: '0.5em', letterSpacing: '0.45em' }}
        >
          <span aria-hidden="true" className="h-px flex-1 bg-accent" />
          Tech
          <span aria-hidden="true" className="h-px flex-1 bg-accent" />
        </span>
      </span>
    </span>
  )
}

export default Logo
