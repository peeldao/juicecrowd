export const NETWORK: 'mainnet' | 'goerli' | undefined = process.env
  .NEXT_PUBLIC_INFURA_NETWORK as 'mainnet' | 'goerli' | undefined
export const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_ID
