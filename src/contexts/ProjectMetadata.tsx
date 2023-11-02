import { OPEN_IPFS_GATEWAY_HOSTNAME } from '@/lib/ipfs'
import {
  AsyncData,
  AsyncDataNone,
  JB721DelegateTier,
  JBProjectMetadata,
  useJBFundingCycleContext,
  useJb721DelegateTiers,
} from 'juice-hooks'
import { PropsWithChildren, createContext, useContext } from 'react'

type _JBProjectMetadata = JBProjectMetadata & {
  // TODO: Remove once added to juice-hooks
  infoUri: string | undefined
}

type JBProjectMetadataContext = _JBProjectMetadata & {
  nftData: AsyncData<JB721DelegateTier[]>
}

export const JBProjectMetadataContext = createContext<JBProjectMetadataContext>(
  {
    name: '',
    projectTagline: '',
    logoUri: '',
    coverImageUri: undefined,
    description: '',
    twitter: undefined,
    discord: undefined,
    telegram: undefined,
    infoUri: undefined,
    nftData: AsyncDataNone,
  },
)

export function useJBProjectMetadata() {
  return useContext(JBProjectMetadataContext)
}

export type JBProjectMetadataProviderProps = {
  metadata: _JBProjectMetadata
}

export const JBProjectMetadataProvider: React.FC<
  PropsWithChildren<JBProjectMetadataProviderProps>
> = ({ metadata, children }) => {
  const { fundingCycleMetadata } = useJBFundingCycleContext()

  const nftData: AsyncData<JB721DelegateTier[]> = useJb721DelegateTiers(
    fundingCycleMetadata?.data?.dataSource,
    {
      ipfsGatewayHostname: OPEN_IPFS_GATEWAY_HOSTNAME!,
    },
  )

  return (
    <JBProjectMetadataContext.Provider value={{ ...metadata, nftData }}>
      {children}
    </JBProjectMetadataContext.Provider>
  )
}
