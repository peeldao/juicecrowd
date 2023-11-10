import { ManageHeader } from './ManageHeader'
import { Button } from '@/components/ui/Button'
import { ManageProjectDetails } from './ManageProjectDetails'
import { ManageCardsGrid } from './ManageCardsGrid'
import { Link } from '@/components/Link'
import { WithdrawButton } from './WithdrawButton'
import { DISCORD_INVITE_URL } from '@/lib/constants/urls'

export function ManageDashboard() {
  return (
    <>
      <ManageHeader />
      <div className="mx-auto flex max-w-4xl flex-col gap-10">
        <div className="flex justify-between">
          <ManageProjectDetails />
          <WithdrawButton />
        </div>
        <ManageCardsGrid />
        <div className="mt-5 text-gray-600">
          Need to make changes to your project? Please{' '}
          <Link href={DISCORD_INVITE_URL}>contact us</Link>.
        </div>
      </div>
    </>
  )
}
