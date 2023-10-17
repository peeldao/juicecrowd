import React from 'react'
import { DesktopNavbar } from './components/DesktopNavbar'
import { MobileNavbar } from './components/MobileNavbar'
import { twMerge } from 'tailwind-merge'

export type NavbarProps = {
  className?: string
  title?: string
  separator?: boolean
}

export const Navbar: React.FC<NavbarProps> = ({ className, ...props }) => {
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
