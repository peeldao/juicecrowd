import { useMemo } from 'react'
import { useContributorAmounts } from './useContributorAmounts'

export const useTotalSupporters = () => {
  const contributorAmounts = useContributorAmounts()
  const totalSupporters = useMemo(() => {
    return Object.keys(contributorAmounts || {}).length
  }, [contributorAmounts])

  return totalSupporters
}
