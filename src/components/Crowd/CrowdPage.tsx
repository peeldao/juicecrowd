import { Crowd } from '@/data/crowds'
import { CrowdPageProject } from '@/lib/backend/static/crowds'
import {
  OrderDirection,
  Project_OrderBy,
  useProjectsQuery,
} from '@/lib/graphql/hooks'
import { PV2 } from 'juice-hooks'
import { ProjectCard } from './ProjectCard'

export function CrowdPage({
  crowd,
  projects,
}: {
  crowd: Crowd
  projects: CrowdPageProject[]
}) {
  const { data } = useProjectsQuery({
    variables: {
      where: { projectId_in: projects.map(p => p.id), pv: PV2 },
      orderBy: Project_OrderBy.projectId,
      orderDirection: OrderDirection.desc,
    },
  })
  const projectsWithVolume = projects.map((p, idx) => {
    const volumeUsdRaw = data?.projects[idx]?.volumeUSD
    const volumeUsd =
      typeof volumeUsdRaw !== 'undefined' ? BigInt(volumeUsdRaw) : undefined
    return {
      ...p,
      volumeUsd,
    }
  })

  return (
    <div className="mb-64 mt-14">
      <h1 className="mb-3 text-center font-heading text-4xl font-medium text-gray-900">
        {crowd.name}
      </h1>
      <p className="mb-14 text-center text-gray-700">{crowd.description}</p>
      <div className="flex flex-wrap justify-center gap-6">
        {projectsWithVolume.map(project => (
          <ProjectCard {...project} key={project.id} />
        ))}
      </div>
    </div>
  )
}
