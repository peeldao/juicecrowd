import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { Link } from './Link'
import React from 'react'

export type BreadcrumbsProps = {
  className?: string
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ className }) => {
  const path = usePathname()
  const crumbs = path
    ? path
        .split('/')
        .filter(Boolean)
        .map(decodeURIComponent)
        .map(crumb => {
          return crumb[0].toUpperCase() + crumb.slice(1)
        })
    : []

  return (
    <div className={twMerge('flex', className)}>
      <Link href="/">Home</Link>
      {crumbs.slice(0, -1).map((crumb, i) => (
        <React.Fragment key={crumb}>
          <span className="mx-2">/</span>
          <Link href={`/${crumbs.slice(0, i + 1).join('/')}`}>{crumb}</Link>
        </React.Fragment>
      ))}
      {crumbs.length > 0 && (
        <span className="mx-2">/ {crumbs[crumbs.length - 1]}</span>
      )}
    </div>
  )
}
