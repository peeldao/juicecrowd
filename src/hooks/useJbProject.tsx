import { useJBProjectMetadata } from '@/contexts/ProjectMetadata'
import { DREAM_DAO } from '@/lib/backend/static/projects'
import { useProjectsQuery } from '@/lib/graphql/hooks'
import {
  Ether,
  JBCurrency,
  JB_CURRENCIES,
  PV2,
  useJBContractContext,
  useJBFundingCycleContext,
  useJbProjectsOwnerOf,
} from 'juice-hooks'
import pick from 'lodash/pick'
import { useMemo } from 'react'

export type UseJbProjectProps = {
  projectId?: number | bigint
}

export type SocialLink = 'twitter' | 'discord' | 'telegram' | 'website'

/**
 * Returns the project metadata for a given project ID.
 *
 * If no project ID is provided, it will use the project ID from the JB contract context.
 */
export const useJbProject = ({
  projectId: inputProjectId,
}: UseJbProjectProps = {}) => {
  const { nftData, payEventsData, ...metadata } = useJBProjectMetadata()
  const { fundingCycleData } = useJBFundingCycleContext()

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

  const volume = _graphqlProject?.volume
    ? new Ether(_graphqlProject.volume)
    : undefined

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

  const softTarget = useMemo(() => {
    // TODO: Remove this once DREAM DAO has rectified metadata
    // checking for undefined domain allows dream dao to update eventually with no interruption
    if (projectId === DREAM_DAO && metadata.domain === undefined) {
      return {
        amount: Ether.parse('50000', 18).val,
        currency: JB_CURRENCIES.USD,
      }
    }
    if (metadata.softTargetAmount) {
      return {
        amount: Ether.parse(metadata.softTargetAmount, 0).val,
        currency: metadata.softTargetCurrency
          ? (BigInt(metadata.softTargetCurrency) as JBCurrency)
          : JB_CURRENCIES.USD,
      }
    }
    return {
      amount: 0n,
      currency: JB_CURRENCIES.USD,
    }
  }, [
    metadata.domain,
    metadata.softTargetAmount,
    metadata.softTargetCurrency,
    projectId,
  ])

  const endDate = useMemo(() => {
    if (!fundingCycleData.data) return undefined

    const start = Number(fundingCycleData.data.start)
    const duration = Number(fundingCycleData.data.duration)
    if (!start || !duration) return undefined

    return new Date((start + duration) * 1000)
  }, [fundingCycleData.data])

  const introVideoUrl = useMemo(() => {
    // TODO: Remove this once DREAM DAO has rectified metadata
    // checking for undefined domain allows dream dao to update eventually with no interruption
    if (projectId === DREAM_DAO && metadata.domain === undefined) {
      return 'https://www.youtube.com/watch?v=r603LXdSQjY'
    }

    return metadata.introVideoUrl
  }, [metadata.domain, metadata.introVideoUrl, projectId])

  return {
    ...(pick(_graphqlProject, ['handle', 'contributorsCount']) ?? {}),
    ...metadata,
    introVideoUrl,
    softTarget,
    endDate,
    socialLinks,
    projectId,
    createdAt,
    owner,
    nftData: nftData,
    payEventsData,
    volume,
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
