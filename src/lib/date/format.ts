import { formatDistanceStrict } from 'date-fns'

export const timestampToDate = (timestamp: number) => {
  return new Date(timestamp * 1000)
}

const MINUTE_MS = 60 * 1000
const HOUR_MS = 60 * MINUTE_MS
const DAY_MS = 24 * HOUR_MS
const MONTH_MS = 30 * DAY_MS

/**
 * Formats a timestamp to a human readable date string.
 *
 * Examples:
 * - 'just now' if the timestamp is within the last minute
 * - '5 minutes ago' if the timestamp is within the last hour
 * - '2 hours ago' if the timestamp is within the last day
 * - '3 days ago' if the timestamp is within the last month
 * - 'November 10, 2020' if the timestamp is older than a month
 *
 * @param timestamp - The timestamp to format
 * @returns A human readable date string
 */
export const timestampToDateString = (timestamp: number) => {
  const now = new Date()
  const date = timestampToDate(timestamp)
  const diff = now.getTime() - date.getTime()
  if (diff < MINUTE_MS) {
    return 'just now'
  }
  if (diff < HOUR_MS) {
    const minutes = Math.floor(diff / MINUTE_MS)
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`
  }
  if (diff < DAY_MS) {
    const hours = Math.floor(diff / HOUR_MS)
    return `${hours} hour${hours === 1 ? '' : 's'} ago`
  }
  if (diff < MONTH_MS) {
    const days = Math.floor(diff / DAY_MS)
    return `${days} day${days === 1 ? '' : 's'} ago`
  }
  return timestampToDate(timestamp).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

/**
 * Formats the distance between two dates to a human readable string.
 * @param date1 The first date
 * @param date2 The second date
 */
export const distanceBetweenDates = (date1: Date, date2: Date) => {
  const diff = date2.getTime() - date1.getTime()
  if (diff < MINUTE_MS) {
    return plural(Math.floor(diff / 1000), 'second')
  }
  if (diff < HOUR_MS) {
    return plural(Math.ceil(diff / MINUTE_MS), 'minute')
  }
  if (diff < DAY_MS) {
    return plural(Math.ceil(diff / HOUR_MS), 'hour')
  }
  return plural(Math.ceil(diff / DAY_MS), 'day')
}

const plural = (count: number, singular: string, plural?: string) => {
  return `${count} ${count === 1 ? singular : plural || singular + 's'}`
}

/**
 * Formats a duration in seconds into a human-readable string.
 * @example
 * // Returns "1 minute"
 * formatDuration({ duration: 60 })
 * @param duration - The duration in seconds to format.
 * @returns A human-readable string representing the duration.
 */
export function formatDuration({ duration }: { duration: bigint | undefined }) {
  if (!duration) return '-'
  const durationNumber = parseInt(duration.toString())
  const base = new Date(0)
  const dateWithSeconds = new Date(base.getTime() + durationNumber * 1000)
  return formatDistanceStrict(new Date(0), dateWithSeconds, {
    roundingMethod: 'round',
  })
}
