import { getDefaultConfig } from 'connectkit'
import { goerli } from 'viem/chains'
import { createConfig, mainnet } from 'wagmi'
import { NETWORK } from './backend/config'

const chains = NETWORK === 'mainnet' ? [mainnet] : [goerli]

export const wagmiConfig = createConfig(
  getDefaultConfig({
    autoConnect: true,
    appName: 'Juicecrowd',
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    infuraId: process.env.NEXT_PUBLIC_INFURA_ID!,
    chains,
  }),
)
