import type { IconType } from 'react-icons'
import { TbBrain, TbBuildingSkyscraper, TbChartBar, TbChartDots, TbDeviceMobile } from 'react-icons/tb'

export interface CaseStudyResult {
  metric: string
  label: string
}

export interface FlowStep {
  label: string
  detail?: string
}

export interface CaseStudy {
  slug: string
  icon: IconType
  title: string
  sector: string
  /** How our people were engaged — e.g. "Offshore team · Backend, Data & DevOps". */
  role: string
  /** One line for cards. */
  summary: string
  /** The headline number shown on cards. */
  highlight: CaseStudyResult
  challenge: string
  approach: string[]
  results: CaseStudyResult[]
  stack: string[]
  status?: string
  /** Left-to-right system flow for the "How it fits together" diagram. Facts only. */
  flow: FlowStep[]
  flowNote?: string
}

// Every figure here comes from real delivery work by our founder and network.
// Client names are withheld for confidentiality. To add a project, append an
// entry — the /work index, its detail page, and the sitemap pick it up.
export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'social-media-analytics-platform',
    icon: TbChartDots,
    title: 'Social Media Analytics Platform',
    sector: 'Marketing analytics · SaaS',
    role: 'Offshore team · Backend, Data & DevOps',
    summary:
      'Backend, data, and DevOps for a large-scale analytics platform ingesting billions of events a day.',
    highlight: { metric: '120s → <35s', label: 'Query response time' },
    challenge:
      'The platform ingested 100+ GB and 8–16 billion events every day across 690+ tables, with 280+ TB in S3 and 47 TB in Redshift. Dashboard queries took up to two minutes, and a growing JavaScript frontend was getting harder to change safely.',
    approach: [
      'Worked as part of the offshore engineering team owning backend, data pipelines, and DevOps.',
      'Profiled the slowest Redshift queries and reworked table design, sort/dist keys, and query shape.',
      'Hardened the ETL that moves daily event volume from S3 into the warehouse.',
      'Led an incremental TypeScript migration of the frontend, page by page, without freezing feature work.',
    ],
    results: [
      { metric: '120s → <35s', label: 'Dashboard query response time' },
      { metric: '280+ TB', label: 'Data under management in S3' },
      { metric: '8–16B', label: 'Events ingested per day' },
      { metric: '93%', label: 'TypeScript coverage across 25+ pages' },
    ],
    stack: ['AWS Redshift', 'S3', 'ETL at scale', 'Query optimization', 'TypeScript', 'Team leadership'],
    flow: [
      { label: 'Event sources', detail: '8–16B events a day' },
      { label: 'S3 data lake', detail: '280+ TB' },
      { label: 'ETL pipelines', detail: '100+ GB a day · 690+ tables' },
      { label: 'Redshift warehouse', detail: '47 TB · tuned queries' },
      { label: 'Dashboards', detail: 'TypeScript frontend · <35s queries' },
    ],
  },
  {
    slug: 'self-serve-ai-analytics',
    icon: TbChartBar,
    title: 'Self-Serve AI Analytics Platform',
    sector: 'Business intelligence · AI',
    role: 'Lead engineering · AI analytics',
    summary:
      'Natural-language analytics: ask a question in plain English, get accurate SQL and a report.',
    highlight: { metric: '~2 min → <40s', label: 'Report generation time' },
    challenge:
      'Business users depended on analysts for every report. The goal was self-service analytics through natural-language questions — without the hallucinated or slow SQL that makes most text-to-SQL tools unusable on real data.',
    approach: [
      'Co-designed a hybrid AI analytics platform with workspace-based dashboards and automated reports.',
      'Built a schema-aware natural-language-to-SQL pipeline using structured outputs.',
      'Added safety guardrails so generated SQL is read-only, validated, and performant across arbitrary datasets.',
      'Optimised prompts and query plans to cut end-to-end latency.',
    ],
    results: [
      { metric: '~2 min → <40s', label: 'Report generation time' },
      { metric: 'Any dataset', label: 'Schema-aware SQL generation' },
      { metric: 'Guardrailed', label: 'Read-only, validated queries' },
    ],
    stack: ['Python', 'FastAPI', 'LLMs', 'Structured outputs', 'Prompt optimization', 'SQL'],
    flow: [
      { label: 'Business question', detail: 'Plain English' },
      { label: 'Schema-aware prompt', detail: 'Tables and columns in context' },
      { label: 'LLM', detail: 'Structured output' },
      { label: 'SQL guardrails', detail: 'Read-only · validated' },
      { label: 'Reports & dashboards', detail: '<40s end to end' },
    ],
  },
  {
    slug: 'ai-sales-automation',
    icon: TbBrain,
    title: 'AI Sales Automation Platform',
    sector: 'Sales tech · AI',
    role: 'Lead engineer · Web platform',
    status: 'In active development',
    summary:
      'Personalised AI email campaigns with smart scheduling across sender accounts and Stripe billing.',
    highlight: { metric: 'Lead', label: 'Engineering ownership' },
    challenge:
      'Sales teams wanted personalised outreach at volume, but every sending account has limits — exceed them and deliverability collapses. The product needed AI-written emails, safe scheduling, and billing from day one.',
    approach: [
      'Leading engineering on the platform end to end.',
      'Built personalised AI email workflows for campaign content.',
      'Designed an algorithmic scheduler that spreads sends across accounts within their limits.',
      'Added Stripe payments and a background job system for continuous campaign delivery.',
    ],
    results: [
      { metric: 'Multi-account', label: 'Limit-aware send scheduling' },
      { metric: 'Stripe', label: 'Subscriptions and payments built in' },
      { metric: '24/7', label: 'Background campaign delivery' },
    ],
    stack: ['AI email workflows', 'Scheduling algorithms', 'Stripe', 'Background jobs', 'Lead engineering'],
    flow: [
      { label: 'Campaign & leads' },
      { label: 'AI email writer', detail: 'Personalised per lead' },
      { label: 'Limit-aware scheduler', detail: 'Spreads sends across accounts' },
      { label: 'Background jobs', detail: 'Continuous delivery' },
      { label: 'Sender accounts', detail: 'Within sending limits' },
    ],
    flowNote: 'Stripe handles subscriptions and payments alongside the campaign pipeline.',
  },
  {
    slug: 'bid-management-platform',
    icon: TbBuildingSkyscraper,
    title: 'Enterprise Bid Management Platform',
    sector: 'Procurement · Enterprise',
    role: 'Offshore team · Feature delivery & QA',
    summary:
      'New modules, ERP integration, and event streaming for an established enterprise product.',
    highlight: { metric: 'Kafka + ERP', label: 'Integrations delivered' },
    challenge:
      'An established enterprise bid management product needed new vendor-facing modules and ERP integration — shipped into a live system that customers depended on, without regressions.',
    approach: [
      'Worked as part of the offshore team delivering new features into the existing codebase.',
      'Integrated the product with customer ERP systems.',
      'Introduced Kafka-based event streaming between services.',
      'Set up a dedicated automation testing practice covering performance and API regression.',
    ],
    results: [
      { metric: 'ERP', label: 'Integration shipped to production' },
      { metric: 'Kafka', label: 'Event streaming between services' },
      { metric: 'Automated', label: 'Performance and API regression suites' },
    ],
    stack: ['ERP integration', 'Kafka', 'Test automation', 'API testing', 'Performance testing'],
    flow: [
      { label: 'Vendor-facing modules', detail: 'New features' },
      { label: 'Core platform', detail: 'Existing product' },
      { label: 'Kafka', detail: 'Event streaming' },
      { label: 'Customer ERP', detail: 'Integration' },
    ],
    flowNote: 'Covered end to end by automated performance and API regression suites.',
  },
  {
    slug: 'social-events-reviews-platform',
    icon: TbDeviceMobile,
    title: 'Social Events & Reviews Platform',
    sector: 'Consumer · Local discovery',
    role: 'End-to-end delivery · Web',
    summary:
      'Business discovery, reviews, and event scheduling with friends — built end to end.',
    highlight: { metric: 'End-to-end', label: 'Design to launch' },
    challenge:
      'A consumer platform for discovering local businesses, reviewing them, and planning activities with friends — relying on external APIs whose per-call costs grow with every user.',
    approach: [
      'Delivered the web platform end to end, from product design to launch.',
      'Built business discovery, reviews, save/share, and event scheduling.',
      'Designed a smart caching layer in front of external APIs to keep running costs down.',
    ],
    results: [
      { metric: 'End-to-end', label: 'Product design to production' },
      { metric: 'Lower API spend', label: 'Smart caching of third-party calls' },
    ],
    stack: ['End-to-end delivery', 'Web platform', 'Smart caching', 'Product design'],
    flow: [
      { label: 'Web app', detail: 'Discovery · reviews · events' },
      { label: 'Caching layer', detail: 'Cuts repeat API calls' },
      { label: 'External APIs', detail: 'Business and review data' },
    ],
  },
]

export function findCaseStudy(slug: string | undefined): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug)
}
