import { useJBProjectMetadata } from '@/contexts/ProjectMetadata'
import { useProjectsQuery } from '@/lib/graphql/hooks'
import { PV2, useJBContractContext, useJbProjectsOwnerOf } from 'juice-hooks'
import pick from 'lodash/pick'
import { useMemo } from 'react'

export type UseJbProjectProps = {
  projectId?: number | bigint
}

/**
 * Returns the project metadata for a given project ID.
 *
 * If no project ID is provided, it will use the project ID from the JB contract context.
 */
export const useJbProject = ({
  projectId: inputProjectId,
}: UseJbProjectProps = {}) => {
  const metadata = useJBProjectMetadata()

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

  return {
    ...(pick(_graphqlProject, ['handle', 'contributorsCount']) ?? {}),
    ...metadata,
    projectId,
    createdAt,
    owner,
    _metadata: metadata,
  }
}
