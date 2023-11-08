import { ConnectKitButton } from '@/components/ConnectKitButton'
import { Link } from '@/components/Link'
import { Button } from '@/components/ui/Button'
import { useJbProject } from '@/hooks/useJbProject'
import { Cog6ToothIcon, HomeIcon } from '@heroicons/react/24/outline'
import { Bars3BottomLeftIcon } from '@heroicons/react/24/solid'
import { twMerge } from 'tailwind-merge'
import { useAccount } from 'wagmi'

export type MinimalNavbarProps = {
  className?: string
}
export const MinimalNavbar: React.FC<MinimalNavbarProps> = ({ className }) => {
  const { owner, projectId } = useJbProject()
  const { address } = useAccount()
  const showManagePageLink = projectId && address === owner

  return (
    <div
      className={twMerge(
        'absolute right-4 top-5 z-10 flex w-fit items-center gap-6 rounded-lg border-gray-300 bg-white px-4 py-3 shadow md:right-12',
        className,
      )}
    >
      <Button asChild size="child" variant="ghost">
        <Link noStyle href="/">
          <HomeIcon className="h-5 w-5" />
        </Link>
      </Button>
      <Button size="child" variant="ghost">
        <Bars3BottomLeftIcon className="h-5 w-5" />
      </Button>
      <div className="flex gap-3">
        {showManagePageLink ? (
          <Link href={`/p/${projectId}/manage`} className="text-gray-700">
            <Button size="sm" variant="outline">
              <Cog6ToothIcon className="mr-2 inline h-4 w-4" />
              Manage project
            </Button>
          </Link>
        ) : null}

        <ConnectKitButton size="sm" />
      </div>
    </div>
  )
}
