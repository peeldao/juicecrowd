import { ethToUsdSync, fetchEthInUsd, usdToEthSync } from '@/lib/currency'
import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { parseEther } from 'viem'

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

const PRICE_REFRESH_INTERVAL_SECONDS = 5

export const EthUsdPriceProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [ethInUsd, setEthInUsd] = useState(0n)

  useEffect(() => {
    const getAndSetEthInUsd = async () => {
      const ethInUsdRes = await fetchEthInUsd()
      const ethInUsdNew = parseEther(ethInUsdRes.toString())
      console.info('updating USD price::', ethInUsdNew)
      setEthInUsd(ethInUsdNew)
    }

    // Refresh price every PRICE_REFRESH_INTERVAL_SECONDS seconds
    const interval = setInterval(
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
