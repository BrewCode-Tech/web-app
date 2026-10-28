import type { IconType } from 'react-icons'
import { TbTarget, TbUser, TbUsersPlus } from 'react-icons/tb'

export interface EngagementModel {
  icon: IconType
  name: string
  bestFor: string
  howItWorks: string[]
  starts: string
}

export const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    icon: TbTarget,
    name: 'Fixed-scope project',
    bestFor: 'An MVP, a new feature, or a well-defined rebuild with a clear finish line.',
    howItWorks: [
      'Discovery call and written scope',
      'Fixed price per milestone',
      'Weekly demos against the plan',
    ],
    starts: 'Starts with a paid scoping sprint',
  },
  {
    icon: TbUser,
    name: 'Dedicated engineer',
    bestFor: 'Ongoing product work where you want a senior engineer embedded in your team.',
    howItWorks: [
      'Works in your tools and rituals',
      'Fixed daily overlap with your team',
      'Monthly billing, two weeks’ notice',
    ],
    starts: 'Starts with a 1–2 week pilot',
  },
  {
    icon: TbUsersPlus,
    name: 'Team extension',
    bestFor: 'Adding several roles at once — full-stack, QA automation, data, or DevOps.',
    howItWorks: [
      'Founder-led, engineers from our network',
      'You meet everyone before they start',
      'Scale up or down month to month',
    ],
    starts: 'Starts with a discovery call',
  },
]
