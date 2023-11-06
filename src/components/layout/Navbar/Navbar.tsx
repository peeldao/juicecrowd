import React from 'react'
import { DesktopNavbar } from './components/DesktopNavbar'
import { MobileNavbar } from './components/MobileNavbar'
import { twMerge } from 'tailwind-merge'
import { MinimalNavbar } from './components/MinimalNavbar'

export type NavBarType = 'default' | 'minimal' | 'none'

export type NavbarProps = {
  type?: NavBarType
  className?: string
  title?: string
  separator?: boolean
  projectId?: bigint
}

export const Navbar: React.FC<NavbarProps> = ({
  className,
  type,
  ...props
}) => {
  type = type ? type : 'default'
  if (type === 'none') {
    return null
  }
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
