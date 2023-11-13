import { useEffect, useState } from 'react'
import { useJbProject } from './useJbProject'
import { distanceBetweenDates } from '@/lib/date/format'

export function useCampaignEndDate() {
  const { endDate } = useJbProject()
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
    ? 'Complete'
    : distanceBetweenDates(now, endDate)

  return {
    isComplete,
    timeLeftSeconds,
    timeLeftFormatted,
  }
}
