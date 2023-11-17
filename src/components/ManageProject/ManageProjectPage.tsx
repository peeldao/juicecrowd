import { Link } from '@/components/Link'
import { useJbProject } from '@/hooks/useJbProject'
import { PencilIcon } from '@heroicons/react/24/outline'
import { ManageCardsGrid } from './components/ManageCardsGrid'
import { ManageHeader } from './components/ManageHeader'
import { ManageProjectDetails } from './components/ManageProjectDetails'
import { WithdrawButton } from './components/WithdrawButton'

export function ManageProjectPage() {
  return (
    <>
      <ManageHeader />
      <div className="mx-auto flex max-w-4xl flex-col gap-4 px-4 md:gap-10 md:px-6">
        <div className="flex flex-col justify-between gap-20 md:flex-row md:gap-0">
          <ManageProjectDetails />
          <WithdrawButton />
        </div>
        <ManageCardsGrid />
        <EditProjectSettingsButton />
      </div>
    </>
  )
}

const EditProjectSettingsButton = () => {
  const { projectId } = useJbProject()
  return (
    <Link
      href={`/p/${projectId}/manage/general`}
      className="flex gap-1 font-medium text-bluebs-500 hover:text-bluebs-400"
    >
      <PencilIcon className="h-4 w-4 stroke-2" />
      Edit project settings
    </Link>
  )
}
