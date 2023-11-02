import { useJBProjectMetadata } from '@/contexts/ProjectMetadata'
import { useProjectsQuery } from '@/lib/graphql/hooks'
import { PV2, useJBContractContext, useJbProjectsOwnerOf } from 'juice-hooks'
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
  const { nftData, ...metadata } = useJBProjectMetadata()

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
    // TODO: Remove ! after upgrade
    nftData: nftData!,
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
