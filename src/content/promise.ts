import type { IconType } from 'react-icons'
import {
  TbBrandGithub,
  TbCalendarStats,
  TbClockHour4,
  TbDoorExit,
  TbFlask,
  TbLock,
} from 'react-icons/tb'

export interface PromiseItem {
  icon: IconType
  title: string
  description: string
}

// TODO(content): these are commitments, not marketing. Confirm each one is
// something you will honour on every engagement before going live.
export const BREW_PROMISE: PromiseItem[] = [
  {
    icon: TbBrandGithub,
    title: 'You own everything from day one',
    description:
      'Code lives in your GitHub, infrastructure in your cloud account. Full IP assignment in the contract. Nothing is ever held hostage.',
  },
  {
    icon: TbClockHour4,
    title: 'Real overlap with your working day',
    description:
      'A fixed daily window when we are online for calls, Slack, and pairing — agreed before work starts, not "whenever we can".',
  },
  {
    icon: TbCalendarStats,
    title: 'Daily updates, weekly demos',
    description:
      'A short written update every working day and a live demo of working software every week. You always know where things stand.',
  },
  {
    icon: TbLock,
    title: 'NDA before we talk details',
    description:
      'Happy to sign your NDA (or send ours) before the discovery call. Your idea and data stay confidential.',
  },
  {
    icon: TbFlask,
    title: 'Start with a short pilot',
    description:
      'Begin with a 1–2 week pilot sprint on a real piece of your product. Judge us on shipped work before committing to more.',
  },
  {
    icon: TbDoorExit,
    title: 'No lock-in',
    description:
      'Two weeks’ notice ends the engagement — and we hand over code, docs, and credentials cleanly so the next team can pick it up.',
  },
]
