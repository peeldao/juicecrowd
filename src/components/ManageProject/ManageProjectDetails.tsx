import ProjectLogo from "@/components/ProjectLogo";
import { OwnerAndDateCreated } from "../Project/components/ProjectHeaderMetadata";
import { ProgressBadge } from "../Project/components/ProgressBadge";
import { useJbProject } from "@/hooks/useJbProject";

export function ManageProjectDetails() {
  const { logoUri, name, projectId } = useJbProject()
  return (
    <div className="flex items-center gap-4">
      <ProjectLogo
        className="relative h-20 w-20 rounded-xl border-[6px] border-white flex"
        projectId={projectId}
        uri={logoUri}
        name={name}
      />
      <div className='flex flex-col justify-between h-16'>
        <h1 className="font-heading text-2xl font-medium">{name}</h1>
        <div className='flex gap-5 items-center'>
          <OwnerAndDateCreated /> 
          <ProgressBadge />
        </div>
      </div>
    </div>
  )
}
