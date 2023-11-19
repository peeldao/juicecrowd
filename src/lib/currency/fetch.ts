import axios from 'axios'
import { publicClient } from '../viem/publicClient'
import { goerli } from 'viem/chains'

export const fetchEthInUsd = async () => {
  const isGoerli = publicClient.chain.id === goerli.id
  const prefix = isGoerli ? 'goerli.' : ''
  try {
    const {
      // price is 1 ETH in USD
      data: { price },
    } = await axios.get<{ price: string }>(
      `https://${prefix}juicebox.money/api/juicebox/prices/ethusd`,
    )
    const ethInUsd = parseFloat(price)
    if (isNaN(ethInUsd)) {
      console.error('ethInUsd is NaN', price)
      return 0
    }
    return ethInUsd
  } catch (e) {
    console.error(e)
    return 0
  }
}
