import { useJBProjectMetadata } from '@/contexts/ProjectMetadata'
import { useProjectsQuery } from '@/lib/graphql/hooks'
import { OPEN_IPFS_GATEWAY_HOSTNAME } from '@/lib/ipfs'
import {
  PV2,
  jbTiered721DelegateStoreABI,
  useJBContractContext,
  useJBFundingCycleContext,
  useJb721DelegateTiers,
  useJbProjectsOwnerOf,
} from 'juice-hooks'
import pick from 'lodash/pick'
import { useMemo } from 'react'
import { ReadContractResult } from 'wagmi/dist/actions'

export type UseJbProjectProps = {
  projectId?: number | bigint
}

export type SocialLink = 'twitter' | 'discord' | 'telegram' | 'website'

// TODO: Pulled from juice-hooks

type OpenSeaAttribute = {
  trait_type: string
  value: number | undefined
}

type JB721DelegateTierMetadata = {
  attributes: OpenSeaAttribute[]
  name: string
  symbol: string | undefined
  description: string | undefined
  image: string // same as imageUrl
  imageDataUrl: string | undefined // image_data (Raw SVG image data, if you want to generate images on the fly (not recommended). Only use this if you're not including the image parameter.)
  artifactUri: string | undefined // artifactUri (optional, some legacy UX, wallets use this)
  animationUri: string | undefined // animation_uri (Animation_url also supports HTML pages, allowing you to build rich experiences and interactive NFTs using JavaScript canvas, WebGL, and more. Scripts and relative paths within the HTML page are now supported. However, access to browser extensions is not supported.)
  displayUri: string | undefined // displayUri (optional, some legacy UX, wallets use this)
  externalLink: string | undefined // external_uri (optional, This is the URL that will appear below the asset's image on OpenSea and will allow users to leave OpenSea and view the item on your site.)
  youtubeUri: string | undefined // youtube_uri (optional, A URL to a YouTube video.)
  backgroundColor: string | undefined // background_color, (optional, Background color of the item on OpenSea. Must be a six-character hexadecimal without a pre-pended #.)
}

export type JB721DelegateTierTier = {
  metadata: JB721DelegateTierMetadata
} & ReadContractResult<typeof jbTiered721DelegateStoreABI, 'tierOf'>

// END TODO: Pulled from juice-hooks

/**
 * Returns the project metadata for a given project ID.
 *
 * If no project ID is provided, it will use the project ID from the JB contract context.
 */
export const useJbProject = ({
  projectId: inputProjectId,
}: UseJbProjectProps = {}) => {
  const metadata = useJBProjectMetadata()
  const { fundingCycleMetadata } = useJBFundingCycleContext()

  const nfts: JB721DelegateTierTier[] | undefined = useJb721DelegateTiers(
    fundingCycleMetadata?.data?.dataSource,
    {
      ipfsGatewayHostname: OPEN_IPFS_GATEWAY_HOSTNAME!,
    },
  )

  const { projectId: ctxProjectId } = useJBContractContext()
  const projectId = useMemo(() => {
    if (inputProjectId) {
      // Always use the inputProjectId if it's provided
      return BigInt(inputProjectId)
    }

    // Returns the projectId from the JB contract context if it exists or 0n
    return ctxProjectId
  }, [ctxProjectId, inputProjectId])

  const { data: _projects } = useProjectsQuery({
    variables: {
      where: {
        projectId: Number(projectId),
        pv: PV2,
      },
      first: 1,
    },
  })

  const _graphqlProject = useMemo(() => {
    if (!projectId || !_projects || _projects?.projects.length === 0) {
      return null
    }
    return _projects.projects[0]
  }, [_projects, projectId])

  const createdAt = useMemo(() => {
    if (!_graphqlProject) {
      return undefined
    }
    return new Date(_graphqlProject.createdAt * 1000)
  }, [_graphqlProject])

  const { data: owner } = useJbProjectsOwnerOf({
    args: [BigInt(projectId)],
  })

  const socialLinks: Record<SocialLink, string | undefined> = useMemo(() => {
    return {
      twitter:
        metadata?.twitter && metadata.twitter.length
          ? `https://twitter.com/${metadata.twitter}`
          : undefined,
      discord: linkOrUndefined(metadata?.discord),
      telegram: linkOrUndefined(metadata?.telegram),
      website: linkOrUndefined(metadata?.infoUri),
    }
  }, [
    metadata?.discord,
    metadata?.infoUri,
    metadata?.telegram,
    metadata.twitter,
  ])

  return {
    ...(pick(_graphqlProject, ['handle', 'contributorsCount']) ?? {}),
    ...metadata,
    socialLinks,
    projectId,
    createdAt,
    owner,
    nfts,
    _metadata: metadata,
  }
}

const linkOrUndefined = (link: string | undefined) => {
  if (!link || !link.length) return undefined
  return linkUrl(link)
}
const linkUrl = (url: string) => {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return 'https://' + url
}
