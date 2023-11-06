import { ConnectKitButton } from '@/components/ConnectKitButton'
import { Link } from '@/components/Link'
import { LinkToManageButton } from '@/components/Project/components/LinkToManageButton'
import { Button } from '@/components/ui/Button'
import { HomeIcon } from '@heroicons/react/24/outline'
import { Bars3BottomLeftIcon } from '@heroicons/react/24/solid'
import { twMerge } from 'tailwind-merge'

export type MinimalNavbarProps = {
  className?: string
  projectId?: bigint
}
export const MinimalNavbar: React.FC<MinimalNavbarProps> = ({ className, projectId }) => {
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
      <div className='flex gap-3'>
        <LinkToManageButton projectId={projectId} />
        <ConnectKitButton size="sm" />
      </div>
    </div>
  )
}
