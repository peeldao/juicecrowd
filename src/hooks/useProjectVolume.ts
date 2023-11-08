import { CURRENCY_USD } from '@/components/CurrencyAmount'
import { useEthUsdPrice } from '@/components/EthUsdPriceProvider'
import { useMemo } from 'react'
import { useJbProject } from './useJbProject'
import { Ether } from 'juice-hooks'

export const useProjectVolume = () => {
  const { softTarget, volume } = useJbProject()
  const { ethToUsd } = useEthUsdPrice()

  const volumeInTargetCurrency = useMemo(() => {
    if (volume && softTarget.currency === CURRENCY_USD) {
      return new Ether(ethToUsd(volume.val)) // the type is Ether, but its still USD; Ether just used for convencience
    }

    return volume
  }, [volume, ethToUsd, softTarget.currency])

  return volumeInTargetCurrency
}
