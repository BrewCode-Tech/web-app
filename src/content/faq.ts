export interface FaqItem {
  question: string
  answer: string
}

// Plain-text answers: they are rendered on the page and also emitted as
// FAQPage structured data for search engines.
export const FAQ: FaqItem[] = [
  {
    question: 'Who owns the code and IP?',
    answer:
      'You do, from the first commit. Work happens in repositories and cloud accounts you own, and the contract assigns all IP to you on payment.',
  },
  {
    question: 'Will you sign an NDA?',
    answer:
      'Yes. We are happy to sign your NDA, or send ours, before the discovery call so you can share details freely.',
  },
  {
    question: 'How do our working hours overlap?',
    answer:
      'We are based in India and keep a fixed daily overlap window with your team for calls, Slack, and pairing. The widget on our home page shows the exact overlap with your timezone.',
  },
  {
    question: 'How do we communicate day to day?',
    answer:
      'Whatever your team already uses — Slack, Teams, Jira, Linear, GitHub. You get a short written update every working day and a live demo every week.',
  },
  {
    question: 'Who will actually work on my project?',
    answer:
      'The founder leads every engagement personally and writes code. When a project needs more capacity — QA automation, data, DevOps, or extra full-stack hands — we bring in engineers from our network who have shipped production systems with us before. You meet everyone before they start.',
  },
  {
    question: 'What if an engineer leaves mid-project?',
    answer:
      'Continuity is built in: documented code, shared repositories, and a founder who stays on the project throughout. If someone has to rotate off, we overlap the handover so you do not lose momentum.',
  },
  {
    question: 'How does pricing and payment work?',
    answer:
      'Fixed-scope projects are priced per milestone. Dedicated engineers and team extension are billed monthly. Invoices are in USD (or your currency on request) and payable by bank transfer or card.',
  },
  {
    question: 'Can we start small?',
    answer:
      'Yes — most engagements start with a 1–2 week pilot sprint on a real part of your product. If it is not a fit, you keep the work and walk away.',
  },
  {
    question: 'How do you handle security and access?',
    answer:
      'Least-privilege access to your systems, credentials kept in your password manager or secrets store, and access revoked the day an engagement ends.',
  },
]

export const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
}
