import { ManageHeader } from "./ManageHeader"
import { Button } from "@/components/ui/Button"
import { ManageProjectDetails } from "./ManageProjectDetails"
import { ManageCardsGrid } from "./ManageCardsGrid"
import { Link } from "@/components/Link"
import { DISCORD_INVITE_URL } from "@/components/layout/Footer"
import { WithdrawButton } from "./WithdrawButton"

export function ManageDashboard() {
  return (
    <>
      <ManageHeader />
      <div className="flex flex-col mx-auto max-w-4xl gap-10">
        <div className="flex justify-between">
          <ManageProjectDetails />
          <WithdrawButton />
        </div>
        <ManageCardsGrid />
        <div className='text-gray-600 mt-5'>
          Need to make changes to your project? Please{' '} 
          <Link href={DISCORD_INVITE_URL}>
            contact us
          </Link>.
        </div>
      </div>
    </>
  )
}

