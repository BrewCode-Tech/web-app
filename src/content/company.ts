// Single source of truth for facts about the company that appear across pages.
// Anything marked TODO(content) is a placeholder the founder must confirm
// before it goes live — search the codebase for "TODO(content)".

export const SITE_URL = 'https://brewcodetech.com'
export const COMPANY_NAME = 'Brew Code Tech'

export const CAL_BOOKING_URL = 'https://cal.com/brewcode-tech/30min'

// Forwarded to Gmail by Cloudflare Email Routing (README → Hosting, step 4).
// Set that up before this site goes live, or mail to this address bounces.
export const CONTACT_EMAIL = 'hello@brewcodetech.com'

export const LOCATION = 'India'

/**
 * Hours we are reliably online, in IST (UTC+5:30, no daylight saving).
 * Drives the timezone-overlap widget. Use 24h numbers; fractional hours are fine (21.5 = 9:30 PM).
 */
export const WORK_HOURS_IST = { start: 11, end: 21 }

export interface Founder {
  name: string
  title: string
  /** Path under /public, e.g. '/founder.jpg'. Leave empty to show initials. */
  photo: string
  linkedin: string
  note: string
}

export const FOUNDER: Founder = {
  name: 'Mathivanan S',
  title: 'Founder & Lead Engineer',
  photo: '/founder.jpg',
  linkedin: 'https://www.linkedin.com/in/mathi-s/',
  note: "When you work with Brew Code Tech, you talk to me — not a sales rep. I scope the work, write the code, and stay accountable for every release. When a project needs more hands, I bring in engineers I've already shipped production systems with.",
}

export interface Testimonial {
  quote: string
  name: string
  role: string
}

// Add real quotes only. The testimonials section is hidden while this is empty.
export const TESTIMONIALS: Testimonial[] = []

export interface Source {
  label: string
  url: string
}

/**
 * Cost comparison shown on the home page. Every figure is sourced — when you
 * update a number, update its source and `asOf` with it. Review yearly.
 * Set `brewMonthlyUsd` to null to hide the section.
 */
export const COST_COMPARISON: {
  brewMonthlyUsd: number | null
  hoursPerDay: number
  /** Average working days per month (≈ 260 working days / 12). */
  workingDaysPerMonth: number
  asOf: string
  usInHouse: {
    /** Median annual wage, software developers (BLS OEWS, May 2025). */
    medianAnnualWageUsd: number
    /** Wages as a share of employer cost, full-time private-industry workers (BLS ECEC, June 2026). */
    wageShareOfEmployerCost: number
    /** A US full-time day, used to match hours with ours. */
    hoursPerDay: number
    sources: Source[]
  }
  indiaAgency: {
    /** Typical hourly rates Indian offshore agencies bill for senior developers. */
    hourlyLowUsd: number
    hourlyHighUsd: number
    sources: Source[]
  }
} = {
  brewMonthlyUsd: 3000,
  hoursPerDay: 7,
  workingDaysPerMonth: 21.7,
  asOf: 'October 2026',
  usInHouse: {
    medianAnnualWageUsd: 135_980,
    wageShareOfEmployerCost: 0.685,
    hoursPerDay: 8,
    sources: [
      {
        label: 'US Bureau of Labor Statistics — Software Developers, median pay (May 2025)',
        url: 'https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm',
      },
      {
        label: 'US Bureau of Labor Statistics — Employer Costs for Employee Compensation (June 2026)',
        url: 'https://www.bls.gov/news.release/ecec.nr0.htm',
      },
    ],
  },
  indiaAgency: {
    hourlyLowUsd: 25,
    hourlyHighUsd: 60,
    sources: [
      { label: 'Uvik — Offshore developer rates by country (2026)', url: 'https://uvik.net/blog/offshore-software-development-rates-by-country/' },
      { label: 'Gmware — Offshore software development rates (2026)', url: 'https://gmware.com/blog/offshore-software-development-rates/' },
      { label: 'Techvinta — Cost to hire a software engineer in India (2026)', url: 'https://techvinta.com/blog/offshore-software-development-rates-india-2026' },
    ],
  },
}
