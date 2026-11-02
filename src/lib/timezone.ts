// Time-of-day math for the timezone-overlap widget. Everything is expressed in
// minutes since midnight in the *visitor's* timezone, on a 24h (1440 min) circle.

const DAY = 24 * 60

/** India Standard Time is UTC+5:30 all year (no daylight saving). */
export const IST_TIME_ZONE = 'Asia/Kolkata'

export interface Segment {
  start: number
  end: number
}

/** Offset of `timeZone` from UTC in minutes at `date`, e.g. 330 for IST, -240 for New York in summer. */
export function tzOffsetMinutes(timeZone: string, date: Date): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(date)
  const get = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((p) => p.type === type)?.value ?? 0)
  const asUtc = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'), get('second'))
  return Math.round((asUtc - date.getTime()) / 60000)
}

/** Split a window that may wrap past midnight into one or two non-wrapping segments. */
export function toSegments(start: number, length: number): Segment[] {
  const s = ((start % DAY) + DAY) % DAY
  if (length >= DAY) return [{ start: 0, end: DAY }]
  if (s + length <= DAY) return [{ start: s, end: s + length }]
  return [
    { start: s, end: DAY },
    { start: 0, end: s + length - DAY },
  ]
}

export function intersect(a: Segment[], b: Segment[]): Segment[] {
  const out: Segment[] = []
  for (const x of a) {
    for (const y of b) {
      const start = Math.max(x.start, y.start)
      const end = Math.min(x.end, y.end)
      if (end > start) out.push({ start, end })
    }
  }
  return out.sort((p, q) => p.start - q.start)
}

export function totalMinutes(segments: Segment[]): number {
  return segments.reduce((sum, s) => sum + s.end - s.start, 0)
}

export interface OverlapResult {
  /** Our online window, in the visitor's local time. */
  ours: Segment[]
  /** The visitor's working day, in their local time. */
  theirs: Segment[]
  overlap: Segment[]
  overlapMinutes: number
}

/**
 * @param ourHoursIst  our online window in IST hours, e.g. { start: 11, end: 21 }
 * @param theirHours   the visitor's working day in their local hours
 * @param visitorOffset visitor's UTC offset in minutes (from tzOffsetMinutes)
 * @param istOffset     IST's UTC offset in minutes (330)
 */
export function computeOverlap(
  ourHoursIst: { start: number; end: number },
  theirHours: { start: number; end: number },
  visitorOffset: number,
  istOffset: number,
): OverlapResult {
  const ourStartLocal = ourHoursIst.start * 60 - istOffset + visitorOffset
  const ours = toSegments(ourStartLocal, (ourHoursIst.end - ourHoursIst.start) * 60)
  const theirs = toSegments(theirHours.start * 60, (theirHours.end - theirHours.start) * 60)
  const overlap = intersect(ours, theirs)
  return { ours, theirs, overlap, overlapMinutes: totalMinutes(overlap) }
}

/** 570 → "9:30 AM" */
export function formatMinutes(minutes: number): string {
  const m = ((minutes % DAY) + DAY) % DAY
  const h24 = Math.floor(m / 60)
  const mm = m % 60
  const suffix = h24 < 12 ? 'AM' : 'PM'
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12
  return `${h12}:${String(mm).padStart(2, '0')} ${suffix}`
}

/** 270 → "4.5", 240 → "4" */
export function formatHours(minutes: number): string {
  const hours = Math.round((minutes / 60) * 2) / 2
  return Number.isInteger(hours) ? String(hours) : hours.toFixed(1)
}
