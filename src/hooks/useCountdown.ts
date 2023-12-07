import { distanceBetweenDates } from '@/lib/date/format'
import { useEffect, useState } from 'react'

export function useCountdown(endDate: Date) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    if (!endDate) return
    const interval = setInterval(() => {
      setNow(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [endDate])

  const isComplete = endDate && endDate.getTime() < now.getTime()

  const timeLeftSeconds = endDate
    ? endDate.getTime() - now.getTime() / 1000
    : undefined

  const timeLeftFormatted = !endDate
    ? 'No limit'
    : isComplete
    ? 'Funding closed'
    : distanceBetweenDates(now, endDate)

  return {
    isComplete,
    timeLeftSeconds,
    timeLeftFormatted,
  }
}
