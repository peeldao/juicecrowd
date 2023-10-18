import { Link } from '@/components/Link'
import Logo from '@/components/Logo'
import { CoinLogo } from '@/components/icon/CoinLogo'
import { Button } from '@/components/ui/Button'
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

export type MobileNavbarProps = {
  className?: string
  title?: string
  separator?: boolean
}

export const MobileNavbar: React.FC<MobileNavbarProps> = ({
  className,
  title,
  separator,
}) => {
  const [mobileToggle, setMobileToggle] = useState(false)
  return (
    <div className={twMerge('flex flex-col gap-5 py-7', className)}>
      <div
        className={twMerge(
          'flex flex-1 items-center justify-between gap-5 border-gray-100 px-4',
          separator && 'border-b',
        )}
      >
        <Link className="flex gap-1 text-black hover:text-black" href="/">
          {title ? (
            <>
              <CoinLogo className="h-[26px] w-[23px]" />
              <span className="font-agrandir text-lg font-medium">{title}</span>
            </>
          ) : (
            <Logo />
          )}
        </Link>

        <Button
          variant="ghost"
          className="p-0 text-gray-900"
          onClick={() => setMobileToggle(t => !t)}
        >
          {mobileToggle ? (
            <XMarkIcon className="h-9 w-9" />
          ) : (
            <Bars3Icon className="h-9 w-9" />
          )}
        </Button>
      </div>
      <div
        className={twMerge(
          'flex-col items-center gap-4 border-t border-gray-200 px-4 py-9 text-base font-medium shadow',
          mobileToggle ? 'flex' : 'hidden',
        )}
      >
        <Link className="text-gray-700" href="https://docs.juicecrowd.gg">
          Learn more
        </Link>
        <Link className="text-gray-700" href="/contact">
          Contact
        </Link>
      </div>
    </div>
  )
}
