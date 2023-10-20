import { wagmiConfig } from '@/lib/wagmiConfig'
import { ApolloProvider } from '@apollo/client'
import { ConnectKitProvider } from 'connectkit'
import * as React from 'react'
import { WagmiConfig } from 'wagmi'
import apolloClient from '@/lib/graphql/apollo'

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  return (
    <ApolloProvider client={apolloClient}>
      <WagmiConfig config={wagmiConfig}>
        <ConnectKitProvider>{mounted && children}</ConnectKitProvider>
      </WagmiConfig>
    </ApolloProvider>
  )
}
