import { useEffect, useMemo, useState } from 'react'
import { useJbProject } from './useJbProject'
import { distanceBetweenDates } from '@/lib/date/format'
import { JC01_DATES } from '@/lib/constants'

export function useCampaignEndDate(useFundingCycleEndDate = false) {
  const { endDate: fundingCycleEndDate } = useJbProject()
  const [now, setNow] = useState(new Date())

  const endDate = useMemo(() => {
    if (useFundingCycleEndDate) return fundingCycleEndDate

    return JC01_DATES.PROJECTS_RUN
  }, [fundingCycleEndDate, useFundingCycleEndDate])

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
