import React from 'react'
import { twMerge } from 'tailwind-merge'
import { CoinLogo } from '../icon/CoinLogo'
import { Link } from '../Link'
import { Button } from '../Button'
import { Bars3Icon } from '@heroicons/react/24/solid'

type NavbarProps = {
  className?: string
  title?: string
  separator?: boolean
}

export const Navbar: React.FC<NavbarProps> = ({
  className,
  title = 'Juicecrowd',
  separator,
}) => {
  return (
    <div
      className={twMerge(
        'flex items-center justify-between gap-5 border-gray-100 px-4 py-7 md:px-12 md:py-6',
        separator && 'border-b',
        className,
      )}
    >
      <Link className="flex gap-1 text-black hover:text-black" href="/">
        <CoinLogo className="h-[26px] w-[23px]" />
        <span className="font-agrandir text-lg font-medium">{title}</span>
      </Link>
      <div className="hidden items-center gap-8 md:flex">
        <Link className="text-gray-700" href="/#TODO">
          Learn more
        </Link>
        <Link className="text-gray-700" href="/contact">
          Contact
        </Link>
      </div>

      {/* TODO: Functionality */}
      <Button className="bg-transparent p-0 text-gray-900 md:hidden">
        <Bars3Icon className="h-9 w-9" />
      </Button>

      {/* Disable connect kit for now */}
      {/* <ConnectKitButton /> */}
    </div>
  )
}
