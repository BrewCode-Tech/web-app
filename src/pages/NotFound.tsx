import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

export function Component() {
  return (
    <>
      <Seo path="/404" title="Page Not Found" description="This page doesn't exist." noindex />
      <section className="container-page flex min-h-[70vh] flex-col items-center justify-center pt-16 text-center">
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-3 font-heading text-4xl font-bold text-white sm:text-5xl">This page didn&apos;t brew.</h1>
        <p className="mt-4 max-w-md text-secondary">The link may be old or mistyped. Here&apos;s a way back.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/" className="btn-primary text-sm">
            Go to the home page
          </Link>
          <Link
            to="/work"
            className="rounded-lg border border-white/10 px-6 py-3 font-heading text-sm font-semibold text-white transition-colors hover:border-accent/60 hover:text-accent"
          >
            See our work
          </Link>
        </div>
      </section>
    </>
  )
}
