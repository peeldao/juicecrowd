'use client'

import {
  JBProjectMetadataProvider,
  _JBProjectMetadata,
} from '@/contexts/ProjectMetadata'
import apolloClient from '@/lib/graphql/apollo'
import { wagmiConfig } from '@/lib/wagmiConfig'
import { ApolloProvider } from '@apollo/client'
import { ConnectKitProvider } from 'connectkit'
import { JBProjectProvider } from 'juice-hooks'
import * as React from 'react'
import { WagmiConfig } from 'wagmi'
import { EthUsdPriceProvider } from '../EthUsdPriceProvider'

export type AppProviderProps = {
  metadata?: _JBProjectMetadata
  projectId?: bigint
}

export function AppProvider({
  children,
  metadata,
  projectId,
}: React.PropsWithChildren<AppProviderProps>) {
  // Used for wagmi to ensure client side rendering
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  return (
    <ApolloProvider client={apolloClient}>
      <WagmiConfig config={wagmiConfig}>
        <ConnectKitProvider>
          <EthUsdPriceProvider>
            <ProjectWrapper metadata={metadata} projectId={projectId}>
              {mounted && children}
            </ProjectWrapper>
          </EthUsdPriceProvider>
        </ConnectKitProvider>
      </WagmiConfig>
    </ApolloProvider>
  )
}

type ProjectWrapperProps = {
  metadata: _JBProjectMetadata | undefined
  projectId: bigint | undefined
}

const ProjectWrapper: React.FC<
  React.PropsWithChildren<ProjectWrapperProps>
> = ({ children, metadata, projectId }) => {
  if (!projectId) return <>{children}</>

  if (!metadata) {
    return (
      <JBProjectProvider projectId={projectId}>{children}</JBProjectProvider>
    )
  }

  return (
    <JBProjectProvider projectId={projectId}>
      <JBProjectMetadataProvider metadata={metadata}>
        {children}
      </JBProjectMetadataProvider>
    </JBProjectProvider>
  )
}
