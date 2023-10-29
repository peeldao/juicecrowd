import { Ether, formatEther } from 'juice-hooks'
import { fetchEthInUsd } from './fetch'

/**
 * Converts ETH to USD
 *
 * If ethInUsd is not provided, it will be fetched from the Juicebox API to
 * ensure the most up-to-date conversion rate is used.
 *
 * It is recommended to provide ethInUsd if you are converting multiple values, or use {@link useEthUsdPrice} utility hook.
 *
 * @param eth The amount of ETH to convert
 * @param ethInUsd The price of 1 ETH in USD
 * @returns The amount of USD equivalent to the provided ETH
 */
export const ethToUsd = async (eth: bigint, ethInUsd?: bigint) => {
  ethInUsd = ethInUsd || Ether.parse((await fetchEthInUsd()).toString(), 18).val
  return ethToUsdSync(eth, ethInUsd)
}

/**
 * Converts ETH to USD
 *
 * @param eth The amount of ETH to convert
 * @param ethInUsd The price of 1 ETH in USD
 * @returns The amount of USD equivalent to the provided ETH
 */
export const ethToUsdSync = (eth: bigint, ethInUsd: bigint) => {
  const ethNormalized = parseFloat(formatEther(eth))
  if (isNaN(ethNormalized)) {
    console.error('ethToUsd: eth is NaN', eth)
    return 0n
  }

  const ethInUsdNum = parseFloat(formatEther(ethInUsd))
  if (!ethNormalized || !ethInUsdNum) return 0n
  const converted = ethNormalized * ethInUsdNum

  return Ether.parse(converted.toString(), 18).val
}

/**
 * Converts USD to ETH
 *
 * If ethInUsd is not provided, it will be fetched from the Juicebox API to
 * ensure the most up-to-date conversion rate is used.
 *
 * It is recommended to provide ethInUsd if you are converting multiple values, or use {@link useEthUsdPrice} utility hook.
 *
 * @param usd The amount of USD to convert
 * @param ethInUsd The price of 1 ETH in USD
 * @returns The amount of ETH equivalent to the provided USD
 */
export const usdToEth = async (usd: bigint, ethInUsd?: bigint) => {
  ethInUsd = ethInUsd || Ether.parse((await fetchEthInUsd()).toString(), 18).val
  return usdToEthSync(usd, ethInUsd)
}

/**
 * Converts USD to ETH
 *
 * @param usd The amount of USD to convert
 * @param ethInUsd The price of 1 ETH in USD
 * @returns The amount of ETH equivalent to the provided USD
 */
export const usdToEthSync = (usd: bigint, ethInUsd: bigint) => {
  const usdNormalized = parseFloat(formatEther(usd))
  if (isNaN(usdNormalized)) {
    console.error('usdToEth: usd is NaN', usd)
    return 0n
  }

  const ethInUsdNum = parseFloat(formatEther(ethInUsd))
  if (!usdNormalized || !ethInUsdNum) return 0n
  const converted = usdNormalized * (1 / ethInUsdNum)
  console.log('wraeth', {
    converted: converted.toString(),
    usdNormalized,
    ethInUsdNum,
  })

  return Ether.parse(converted.toString(), 18).val
}
