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
