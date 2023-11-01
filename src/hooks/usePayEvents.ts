import {
  OrderDirection,
  PayEvent_OrderBy,
  usePayEventsQuery,
} from '@/lib/graphql/hooks'
import { useJbProject } from './useJbProject'

export const usePayEvents = (projectId?: bigint) => {
  const { projectId: currentProjectId } = useJbProject()

  projectId = projectId || currentProjectId

  const { data, loading: isLoading } = usePayEventsQuery({
    variables: {
      orderBy: PayEvent_OrderBy.id,
      orderDirection: OrderDirection.desc,
      where: {
        projectId: Number(projectId),
        pv: '2',
      },
    },
  })

  return { data, isLoading }
}
