import { useMemo } from 'react'
import { useJbProject } from './useJbProject'

export const useContributorAmounts = () => {
  const { payEventsData } = useJbProject()

  const contributorAmounts = useMemo(() => {
    return payEventsData.data?.payEvents.reduce(
      (acc, event) => {
        const contributor = event.beneficiary
        const amount = BigInt(event.amount)
        const total = acc[contributor] || 0n
        return { ...acc, [contributor]: total + amount }
      },
      {} as Record<string, bigint>
    )
  }, [payEventsData.data?.payEvents])

  return contributorAmounts
}
