import CtaBanner from '../components/CtaBanner'
import OwnProducts from '../components/OwnProducts'
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
        path="/products"
        title="Our Products"
        description="Software products we've designed and built ourselves — AI search visibility, document AI for bills and invoices, and OCR exam checking — built with the same engineering we bring to client work."
        jsonLd={PRODUCTS_JSON_LD}
      />
      <OwnProducts asPage />
      <CtaBanner />
    </>
  )
}
