import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { CoinLogo } from '../icon/CoinLogo'
import { Link } from '../Link'
import { Button } from '../Button'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import Logo from '../Logo'

type NavbarProps = {
  className?: string
  title?: string
  separator?: boolean
}

export const Navbar: React.FC<NavbarProps> = ({
  className,
  title,
  separator,
}) => {
  const [mobileToggle, setMobileToggle] = useState(false)
  return (
    <div className="flex flex-col gap-5 py-7 md:py-6">
      <div
        className={twMerge(
          'flex flex-1 items-center justify-between gap-5 border-gray-100 px-4 md:px-12',
          separator && 'border-b',
          className,
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
        <div className="hidden items-center gap-8 md:flex">
          <Link className="text-gray-700" href="https://docs.juicecrowd.gg">
            Learn more
          </Link>
          <Link className="text-gray-700" href="/contact">
            Contact
          </Link>
        </div>

        <Button
          className="bg-transparent p-0 text-gray-900 md:hidden"
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
          'flex-col items-center gap-4 border-t border-gray-200 px-4 py-9 text-base font-medium shadow md:hidden',
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
