import { useJbProject } from '@/hooks/useJbProject'
import { twMerge } from 'tailwind-merge'
import { ProjectHeaderMetadata } from './ProjectHeaderMetadata'

export type TitleBlockProps = {
  className?: string
}
export const TitleBlock: React.FC<TitleBlockProps> = ({ className }) => {
  const { name, projectTagline } = useJbProject()

  return (
    <div className={twMerge('text-center', className)}>
      <h1 className="font-heading text-3xl font-medium">{name}</h1>
      <h2 className="mt-2 text-base text-gray-600">{projectTagline}</h2>
      <ProjectHeaderMetadata className="mt-3" />
    </div>
  )
}
