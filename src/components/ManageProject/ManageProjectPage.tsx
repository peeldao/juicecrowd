import { ManageHeader } from './components/ManageHeader'
import { ManageProjectDetails } from './components/ManageProjectDetails'
import { ManageCardsGrid } from './components/ManageCardsGrid'
import { Link } from '@/components/Link'
import { WithdrawButton } from './components/WithdrawButton'
import { DISCORD_INVITE_URL } from '@/lib/constants/urls'

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
        <div className="pb-10 pt-5 text-gray-600 md:pb-0">
          Need to make changes to your project? Please{' '}
          <Link href={DISCORD_INVITE_URL}>contact us</Link>.
        </div>
      </div>
    </>
  )
}
