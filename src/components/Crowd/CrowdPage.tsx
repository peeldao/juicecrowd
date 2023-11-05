import { Crowd } from '@/data/crowds'
import { CrowdPageProject } from '@/lib/backend/static/crowds'
import { ProjectCard } from './ProjectCard'

export function CrowdPage({
  crowd,
  projects,
}: {
  crowd: Crowd
  projects: CrowdPageProject[]
}) {
  return (
    <div className="mb-64 mt-14 text-center">
      <h1 className="mb-3 font-heading text-4xl font-medium text-gray-900">
        {crowd.name}
      </h1>
      <p className="mb-14 text-gray-700">{crowd.description}</p>
      <div className="flex flex-wrap justify-center gap-6">
        {projects.map(project => (
          <ProjectCard {...project} key={project.id} />
        ))}
      </div>
    </div>
  )
}
