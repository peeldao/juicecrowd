const ETHERSCAN_URL = 'https://etherscan.io'

export const etherscanUrlForTx = (txHash: string) => {
  return `${ETHERSCAN_URL}/tx/${txHash}`
}
