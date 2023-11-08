import { useMemo } from 'react'
import { useContributorAmounts } from './useContributorAmounts'
import { CURRENCY_USD } from '@/components/CurrencyAmount'
import { useJbProject } from './useJbProject'
import { useEthUsdPrice } from '@/components/EthUsdPriceProvider'

export const useTotalRaised = () => {
  const { softTarget } = useJbProject()
  const { ethToUsd } = useEthUsdPrice()

  const contributorAmounts = useContributorAmounts()
  const totalRaised = useMemo(() => {
    const totalInWei = Object.values(contributorAmounts || {}).reduce(
      (acc, amount) => acc + amount,
      0n,
    )
    if (softTarget.currency === CURRENCY_USD) {
      return ethToUsd(totalInWei)
    }
    return totalInWei
  }, [contributorAmounts, ethToUsd, softTarget.currency])

  return totalRaised
}
