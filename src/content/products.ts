import type { IconType } from 'react-icons'
import { TbChecklist, TbReceipt, TbSearch } from 'react-icons/tb'

export interface Product {
  icon: IconType
  title: string
  /** A few words on what kind of product it is. */
  kind: string
  /** One plain-English line: what it does for the person using it. */
  summary: string
  /** How it works, in everyday words. */
  details: string
  stack: string[]
  /** Public link to try the product. Leave out while it isn't publicly available. */
  url?: string
}

// Products we designed and built ourselves. Descriptions only — no metrics or
// claims beyond what each product does. To add one, append an entry.
export const PRODUCTS: Product[] = [
  {
    icon: TbSearch,
    title: 'CiteCheck',
    kind: 'Web tool · AI search visibility',
    summary: 'Shows whether your website gets cited when people ask AI assistants about what you sell.',
    details:
      'It asks an AI search engine the questions your buyers would ask, records which websites get cited, and checks whether AI crawlers can read your site. Then it compares your pages with the ones that won and gives you a ranked list of fixes. Run it again after changes to see what moved.',
    stack: ['Python', 'FastAPI', 'LLMs', 'Web search APIs'],
    url: 'https://citecheck-ysjl.onrender.com/',
  },
  {
    icon: TbReceipt,
    title: 'BillCheck',
    kind: 'Web app · Document AI',
    summary: 'Upload a bill as a PDF, photo, or Word file and get its details back as clean, structured data.',
    details:
      'It pulls out the vendor, invoice number and dates, line items, taxes (including GST splits), and totals, then checks the numbers add up. If anything looks wrong, a second AI model takes another pass before you review and correct the result. Works on desktop and phone, including straight from the camera.',
    stack: ['Next.js', 'FastAPI', 'Supabase', 'OpenAI', 'Claude'],
  },
  {
    icon: TbChecklist,
    title: 'ScoreCheck',
    kind: 'Web tool · OCR',
    summary: "Scores a candidate's exam responses against the official answer key — even when the questions are shuffled.",
    details:
      'Upload the scanned answer key with hand-ticked answers and the candidate\'s response sheet. It reads the scan, matches every question across the two documents by its text, works out which option was ticked, and calculates the score. Anything it is unsure about is flagged for a person to review first.',
    stack: ['Python', 'FastAPI', 'Tesseract OCR', 'OpenCV'],
  },
]
