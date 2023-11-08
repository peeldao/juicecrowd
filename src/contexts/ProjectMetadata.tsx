import {
  OrderDirection,
  PayEvent_OrderBy,
  usePayEventsQuery,
} from '@/lib/graphql/hooks'
import { QueryResultNone } from '@/lib/graphql/types'
import { OPEN_IPFS_GATEWAY_HOSTNAME } from '@/lib/ipfs'
import {
  AsyncData,
  AsyncDataNone,
  JB721DelegateTier,
  JBProjectMetadata,
  useJBContractContext,
  useJBFundingCycleContext,
  useJb721DelegateTiers,
} from 'juice-hooks'
import { PropsWithChildren, createContext, useContext } from 'react'

export type _JBProjectMetadata = JBProjectMetadata & {
  // TODO: Remove once added to juice-hooks
  infoUri: string | undefined
  introVideoUrl: string | undefined
  softTargetAmount: string | undefined
  softTargetCurrency: string | undefined
}

type JBProjectMetadataContext = _JBProjectMetadata & {
  nftData: AsyncData<JB721DelegateTier[]>
  payEventsData: ReturnType<typeof usePayEventsQuery>
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
    introVideoUrl: undefined,
    softTargetAmount: undefined,
    softTargetCurrency: undefined,
    nftData: AsyncDataNone,
    payEventsData: QueryResultNone,
  },
)

export function useJBProjectMetadata() {
  return useContext(JBProjectMetadataContext)
}

export type JBProjectMetadataProviderProps = {
  metadata: _JBProjectMetadata
}

/**
 * Provides the project metadata to the context.
 *
 * This is used to provide the project metadata to the JBProjectMetadataContext.
 *
 * @requires JBProjectProvider
 */
export const JBProjectMetadataProvider: React.FC<
  PropsWithChildren<JBProjectMetadataProviderProps>
> = ({ metadata, children }) => {
  const { projectId } = useJBContractContext()
  const { fundingCycleMetadata } = useJBFundingCycleContext()
  const nftData: AsyncData<JB721DelegateTier[]> = useJb721DelegateTiers(
    fundingCycleMetadata?.data?.dataSource,
    {
      ipfsGatewayHostname: OPEN_IPFS_GATEWAY_HOSTNAME!,
    },
  )

  const payEventsData = usePayEventsQuery({
    variables: {
      orderBy: PayEvent_OrderBy.id,
      orderDirection: OrderDirection.desc,
      where: {
        projectId: Number(projectId),
        pv: '2',
      },
    },
  })

  return (
    <JBProjectMetadataContext.Provider
      value={{ ...metadata, nftData, payEventsData }}
    >
      {children}
    </JBProjectMetadataContext.Provider>
  )
}
