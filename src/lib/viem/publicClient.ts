import { createPublicClient, http } from 'viem'
import { goerli, mainnet } from 'viem/chains'
import { INFURA_ID, NETWORK } from '../backend/config'

export const publicClient = createPublicClient({
  chain: NETWORK === 'mainnet' ? mainnet : goerli,
  transport: http(`https://${NETWORK}.infura.io/v3/${INFURA_ID}`),
})
