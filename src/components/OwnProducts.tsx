import { useRef } from 'react'
import { m as motion, useInView } from 'framer-motion'
import { TbArrowUpRight } from 'react-icons/tb'
import { PRODUCTS, type Product } from '../content/products'
import { fadeUp, inViewConfig, stagger, staggerItem } from '../lib/motion'
import SectionHeader from './SectionHeader'

function ProductCard({ icon: Icon, title, kind, summary, details, stack, url }: Product) {
  return (
    <motion.li
      variants={staggerItem}
      className="flex flex-col gap-5 rounded-2xl border border-white/5 bg-surface p-6 sm:p-7"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-white/5">
          <Icon aria-hidden="true" size={22} className="text-accent" />
        </div>
        <p className="text-right text-xs text-secondary">{kind}</p>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-heading text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm font-medium leading-relaxed text-white/90">{summary}</p>
        <p className="text-sm leading-relaxed text-secondary">{details}</p>
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-5">
        <ul role="list" aria-label="Built with" className="flex flex-wrap gap-2">
          {stack.map((tech) => (
            <li key={tech} className="rounded-md border border-white/5 bg-white/[0.03] px-2.5 py-1 text-xs text-secondary">
              {tech}
            </li>
          ))}
        </ul>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex shrink-0 items-center gap-1 text-sm font-medium text-white transition-colors hover:text-accent"
          >
            Try it live
            <span className="sr-only"> (opens in new tab)</span>
            <TbArrowUpRight aria-hidden="true" size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        )}
      </div>
    </motion.li>
  )
}

function OwnProducts() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, inViewConfig)

  return (
    <section id="products" className="w-full bg-background section-padding pt-0 sm:pt-0">
      <div ref={ref} className="container-page">
        <SectionHeader
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          eyebrow="Built In-House"
          heading={
            <>
              Our Own <span className="text-accent">Products</span>
            </>
          }
          description="Products we designed and built ourselves, end to end — from the first idea to working software."
        />

        <motion.ul
          role="list"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger(0.1)}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
        >
          {PRODUCTS.map((product) => (
            <ProductCard key={product.title} {...product} />
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

export default OwnProducts
