import { CrowdPageProject } from '@/lib/backend/static/crowds'

export function CrowdPage({
  crowdId,
  projects,
}: {
  crowdId: number
  projects: CrowdPageProject[]
}) {
  console.log(projects)
  return <div>Crowd {crowdId}</div>
}
