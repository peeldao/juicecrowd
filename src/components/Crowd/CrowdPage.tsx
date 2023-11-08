import { Crowd } from '@/data/crowds'
import { CrowdPageProject } from '@/lib/backend/static/crowds'
import {
  OrderDirection,
  Project_OrderBy,
  useProjectsQuery,
} from '@/lib/graphql/hooks'
import { PV2 } from 'juice-hooks'
import { useMemo } from 'react'
import { useEthUsdPrice } from '../EthUsdPriceProvider'
import { ProjectCard } from './ProjectCard'

export function CrowdPage({
  crowd,
  projects,
}: {
  crowd: Crowd
  projects: CrowdPageProject[]
}) {
  const { ethToUsd } = useEthUsdPrice()

  const { data } = useProjectsQuery({
    variables: {
      where: { projectId_in: projects.map(p => p.id), pv: PV2 },
      orderBy: Project_OrderBy.projectId,
      orderDirection: OrderDirection.desc,
    },
  })
  const projectsWithVolume = useMemo(
    () =>
      projects.map((p, idx) => {
        const volumeEth = data?.projects[idx]?.volume
        const volumeUsd =
          typeof volumeEth !== 'undefined'
            ? ethToUsd(BigInt(volumeEth))
            : undefined

        return {
          ...p,
          volumeUsd,
        }
      }),
    [ethToUsd, data, projects],
  )

  return (
    <div className="mb-36 mt-14 px-2 md:mb-64">
      <h1 className="mb-3 text-center font-heading text-4xl font-medium text-gray-900">
        {crowd.name}
      </h1>
      <p className="mb-14 text-center text-gray-700">{crowd.description}</p>
      <div className="flex flex-wrap justify-center gap-3 md:gap-6">
        {projectsWithVolume.map(project => (
          <ProjectCard {...project} key={project.id} />
        ))}
      </div>
    </div>
  )
}
