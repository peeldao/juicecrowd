import { Crowd } from '@/data/crowds'
import { useCountdown } from '@/hooks/useCountdown'
import { CrowdPageProject } from '@/lib/backend/static/crowds'
import { JC01_DATES } from '@/lib/constants'
import {
  OrderDirection,
  Project_OrderBy,
  useProjectsQuery,
} from '@/lib/graphql/hooks'
import { JB_CURRENCIES, PV2 } from 'juice-hooks'
import { useMemo } from 'react'
import { CurrencyAmount } from '../CurrencyAmount'
import { useEthUsdPrice } from '../EthUsdPriceProvider'
import { Badge } from '../ui/badge'
import { ProjectCard } from './ProjectCard'

export function CrowdPage({
  crowd,
  projects,
}: {
  crowd: Crowd
  projects: CrowdPageProject[]
}) {
  const { ethToUsd } = useEthUsdPrice()
  const { timeLeftFormatted } = useCountdown(JC01_DATES.PROJECTS_RUN)

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

  const totalVolumeUsd = projectsWithVolume.reduce((acc, project) => {
    return acc + (project.volumeUsd ?? 0n)
  }, 0n)

  return (
    <div className="mb-36 mt-14 px-4 md:mb-64 md:px-6">
      <h1 className="mb-3 text-center font-heading text-4xl font-medium text-gray-900">
        {crowd.name}
      </h1>

      <div className="mb-8 flex flex-wrap items-center justify-center gap-1">
        <Badge
          className="flex gap-1 text-sm font-normal md:text-base"
          variant="tertiary"
        >
          <CurrencyAmount
            amount={totalVolumeUsd}
            currency={JB_CURRENCIES.USD}
            className="font-medium"
          />
          total raised
        </Badge>
        <Badge
          className="flex gap-1 text-sm font-normal md:text-base"
          variant="tertiary"
        >
          <span className="font-medium">{timeLeftFormatted}</span>
          remaining
        </Badge>
      </div>

      <div className="mx-auto flex max-w-7xl flex-row flex-wrap justify-center gap-3 md:gap-6">
        {projectsWithVolume.map(project => (
          <ProjectCard {...project} key={project.id} />
        ))}
      </div>
    </div>
  )
}
