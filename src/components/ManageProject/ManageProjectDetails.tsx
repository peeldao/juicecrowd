import ProjectLogo from '@/components/ProjectLogo'
import { ProjectHeaderMetadata } from '../Project/components/ProjectHeaderMetadata'
import { ProgressBadge } from '../Project/components/ProgressBadge'
import { useJbProject } from '@/hooks/useJbProject'

export function ManageProjectDetails() {
  const { logoUri, name, projectId } = useJbProject()
  return (
    <div className="flex items-center gap-4">
      <ProjectLogo
        className="relative flex h-20 w-20 rounded-xl border-[6px] border-white"
        projectId={projectId}
        uri={logoUri}
        name={name}
      />
      <div className="flex h-16 flex-col justify-between">
        <h1 className="font-heading text-2xl font-medium">{name}</h1>
        <div className="flex items-center gap-5">
          <ProjectHeaderMetadata />
          <ProgressBadge />
        </div>
      </div>
    </div>
  )
}
