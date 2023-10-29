import {
  ethToUsdSync,
  fetchEthInUsd,
  usdToEth,
  usdToEthSync,
} from '@/lib/currency'
import axios from 'axios'
import { Ether, formatEther } from 'juice-hooks'
import React, { useCallback, useContext } from 'react'
import { PropsWithChildren, useEffect, useMemo, useState } from 'react'

export const EthUsdPriceContext = React.createContext<{
  /**
   * 1 Ether in USD
   *
   * Default value is 0n
   */
  ethInUsd: bigint
  /**
   * 1 USD in Ether
   *
   * Default value is 0n
   */
  usdInEth: bigint
  /**
   * Converts an amount of Ether to an amount of USD
   */
  ethToUsd: (eth: bigint) => bigint
  /**
   * Converts an amount of USD to an amount of Ether
   */
  usdToEth: (usd: bigint) => bigint
}>({
  ethInUsd: 0n,
  usdInEth: 0n,

  ethToUsd: (eth: bigint) => 0n,
  usdToEth: (usd: bigint) => 0n,
})

const PRICE_REFRESH_INTERVAL_SECONDS = 60 * 5 // 5 minutes in seconds

export const EthUsdPriceProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [ethInUsd, setEthInUsd] = useState(0n)

  useEffect(() => {
    const getAndSetEthInUsd = async () => {
      const ethInUsd = await fetchEthInUsd()
      setEthInUsd(Ether.parse(ethInUsd.toString(), 18).val)
    }
    const interval = setTimeout(
      () => getAndSetEthInUsd(),
      PRICE_REFRESH_INTERVAL_SECONDS * 1000,
    )

    getAndSetEthInUsd()
    return () => clearInterval(interval)
  }, [])

  const usdInEth = useMemo(() => {
    return usdToEthSync(ethInUsd, ethInUsd)
  }, [ethInUsd])

  const _ethToUsd = useCallback(
    (eth: bigint) => {
      return ethToUsdSync(eth, ethInUsd)
    },
    [ethInUsd],
  )

  const _usdToEth = useCallback(
    (usd: bigint) => {
      return usdToEthSync(usd, ethInUsd)
    },
    [ethInUsd],
  )

  return (
    <EthUsdPriceContext.Provider
      value={{ ethInUsd, usdInEth, ethToUsd: _ethToUsd, usdToEth: _usdToEth }}
    >
      {children}
    </EthUsdPriceContext.Provider>
  )
}

export const useEthUsdPrice = () => useContext(EthUsdPriceContext)
