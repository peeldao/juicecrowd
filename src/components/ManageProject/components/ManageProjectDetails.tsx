import ProjectLogo from '@/components/ProjectLogo'
import { ProjectHeaderMetadata } from '../../Project/components/ProjectHeaderMetadata'
import { ProgressBadge } from '../../Project/components/ProgressBadge'
import { useJbProject } from '@/hooks/useJbProject'

export function ManageProjectDetails() {
  const { logoUri, name, projectId } = useJbProject()
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <ProjectLogo
        className="relative flex h-20 w-20 rounded-xl border-white"
        projectId={projectId}
        uri={logoUri}
        name={name}
      />
      <div className="flex h-16 flex-col justify-between">
        <h1 className="font-heading text-2xl font-medium">{name}</h1>
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          <ProjectHeaderMetadata />
          <ProgressBadge />
        </div>
      </div>
    </div>
  )
}
