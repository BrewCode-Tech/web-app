import CtaBanner from '../components/CtaBanner'
import OwnProducts from '../components/OwnProducts'
import Portfolio from '../components/Portfolio'
import Seo from '../components/Seo'
import { COMPANY_NAME, CONTENT_UPDATED, SITE_URL } from '../content/company'
import { PRODUCTS } from '../content/products'

// Tells search engines and AI assistants these are software products we built.
const PRODUCTS_JSON_LD = PRODUCTS.map((product) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: product.title,
  description: `${product.summary} ${product.details}`,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  ...(product.url && { url: product.url }),
  dateModified: CONTENT_UPDATED,
  creator: { '@type': 'Organization', name: COMPANY_NAME, url: SITE_URL },
}))

export function Component() {
  return (
    <>
      <Seo
        path="/work"
        title="Our Work"
        description="Production systems our founder and network have built — analytics platforms ingesting billions of events a day, AI analytics, sales automation, enterprise integrations — and the products we've built ourselves."
        jsonLd={PRODUCTS_JSON_LD}
      />
      <Portfolio asPage />
      <OwnProducts />
      <CtaBanner />
    </>
  )
}
