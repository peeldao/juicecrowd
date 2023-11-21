import { NETWORK } from './backend/config'

const ETHERSCAN_URL = 'etherscan.io'

export const etherscanUrlForTx = (txHash: string) => {
  const network = NETWORK
  if (network === 'mainnet') {
    return `https://${ETHERSCAN_URL}/tx/${txHash}`
  } else {
    return `https://${network}.${ETHERSCAN_URL}/tx/${txHash}`
  }
}
