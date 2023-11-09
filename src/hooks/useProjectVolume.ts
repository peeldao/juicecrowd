import { useEthUsdPrice } from '@/components/EthUsdPriceProvider'
import { Ether, JB_CURRENCIES } from 'juice-hooks'
import { useMemo } from 'react'
import { useJbProject } from './useJbProject'

export const useProjectVolume = () => {
  const { softTarget, volume } = useJbProject()
  const { ethToUsd } = useEthUsdPrice()

  const volumeInTargetCurrency = useMemo(() => {
    if (volume && softTarget.currency === JB_CURRENCIES.USD) {
      return new Ether(ethToUsd(volume.val)) // the type is Ether, but its still USD; Ether just used for convencience
    }

    return volume
  }, [volume, ethToUsd, softTarget.currency])

  return volumeInTargetCurrency
}
