import { ConnectKitButton } from '@/components/ConnectKitButton'
import { Button } from '@/components/ui/Button'
import { useJbProject } from '@/hooks/useJbProject'
import {
  Cog6ToothIcon,
  DocumentTextIcon,
  HomeIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Bars3BottomLeftIcon } from '@heroicons/react/24/solid'
import { twMerge } from 'tailwind-merge'
import { useAccount } from 'wagmi'

import { Link } from '@/components/Link'
import DiscordLogo from '@/components/icon/DiscordLogo'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'
import { DISCORD_INVITE_URL } from '@/lib/constants/urls'
import React, { useEffect } from 'react'

export type MinimalNavbarProps = {
  className?: string
}
export const MinimalNavbar: React.FC<MinimalNavbarProps> = ({ className }) => {
  const { owner, projectId } = useJbProject()
  const { address } = useAccount()
  const showManagePageLink = projectId && address && owner && address === owner

  const ref = React.useRef<HTMLDivElement>(null)
  const [width, setWidth] = React.useState(0)
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    const updateWidth = () => {
      setWidth(ref.current?.offsetWidth ?? 0)
    }

    window.addEventListener('resize', updateWidth)

    // Initial width
    setTimeout(updateWidth, 1000)

    return () => {
      window.removeEventListener('resize', updateWidth)
    }
  }, [])

  return (
    <>
      <div
        ref={ref}
        className={twMerge(
          'absolute right-4 top-5 z-10 flex w-fit items-center gap-6 rounded-lg border-gray-300 bg-white px-4 py-3 shadow md:right-12',
          className,
        )}
      >
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger>
            <Button size="child" variant="ghost">
              {!open ? (
                <Bars3BottomLeftIcon className="h-5 w-5" />
              ) : (
                <XMarkIcon className="h-5 w-5" />
              )}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            style={{ width: width }}
            align="start"
            alignOffset={-16}
            side="bottom"
            sideOffset={28}
          >
            <Link href="/" noStyle>
              <DropdownMenuItem className="gap-1.5">
                <HomeIcon className="h-4 w-4" /> Home
              </DropdownMenuItem>
            </Link>
            <Link href="https://docs.juicecrowd.gg/" noStyle>
              <DropdownMenuItem className="gap-1.5">
                <DocumentTextIcon className="h-4 w-4" /> Docs
              </DropdownMenuItem>
            </Link>
            <Link href={DISCORD_INVITE_URL} noStyle>
              <DropdownMenuItem className="gap-1.5">
                <DiscordLogo className="h-4 w-4" />
                Discord
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-3">
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
    </>
  )
}
