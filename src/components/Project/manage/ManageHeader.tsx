import { Link } from '@/components/Link'
import { useJbProject } from '@/hooks/useJbProject'
import { Cog6ToothIcon, XMarkIcon } from '@heroicons/react/24/solid'

export function ManageHeader() {
  const { projectId } = useJbProject()
  return (
    <header className="sticky top-0 right-0 z-10 mb-8 border-b border-solid border-b-gray-100 bg-white dark:border-b-slate-500 dark:bg-slate-900">
      <div className="mx-auto flex max-w-5xl items-center justify-between p-5">
        <h1 className="m-0 flex items-center gap-2 font-heading text-xl font-medium">
          <Cog6ToothIcon className="h-6 w-6" />
          <span>Manage project</span>
        </h1>

        <Link
          href={`/p/${projectId}`}
          className="text-gray-700"
        >
          <XMarkIcon className="h-6 w-6" />
        </Link>
      </div>
    </header>
  )
}
