import React from 'react'
import { DesktopNavbar } from './components/DesktopNavbar'
import { MobileNavbar } from './components/MobileNavbar'
import { twMerge } from 'tailwind-merge'
import { MinimalNavbar } from './components/MinimalNavbar'

export type NavbarProps = {
  type?: 'default' | 'minimal'
  className?: string
  title?: string
  separator?: boolean
}

export const Navbar: React.FC<NavbarProps> = ({
  className,
  type,
  ...props
}) => {
  type = type ? type : 'default'

  if (type === 'minimal') {
    return <MinimalNavbar className={className} {...props} />
  }
  return (
    <>
      <MobileNavbar className={twMerge('md:hidden', className)} {...props} />
      <DesktopNavbar
        className={twMerge('hidden md:block', className)}
        {...props}
      />
    </>
  )
}
