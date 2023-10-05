import React from 'react'
import { twMerge } from 'tailwind-merge'
import { CoinLogo } from '../icon/CoinLogo'
import { ConnectKitButton } from '../ConnectKitButton'

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
        'flex items-center justify-between gap-5 border-gray-100 px-12 py-6',
        separator && 'border-b',
        className,
      )}
    >
      <div className="flex gap-3">
        <CoinLogo className="h-[26px] w-[23px]" />
        <span className="font-agrandir text-lg font-medium">{title}</span>
      </div>
      <ConnectKitButton />
    </div>
  )
}
