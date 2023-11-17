import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { Link } from './Link'
import React, { ReactNode, useMemo } from 'react'

export type BreadcrumbsProps = {
  className?: string
  rootKey?: string
  delimiter?: ReactNode
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  className,
  rootKey,
  delimiter = '/',
}) => {
  const path = usePathname()
  const crumbs = useMemo(() => {
    if (!path) return []
    if (rootKey) {
      const rootIndex = path.indexOf(rootKey)
      return path
        .slice(rootIndex + rootKey.length)
        .split('/')
        .filter(Boolean)
        .map(decodeURIComponent)
        .map(crumb => {
          return crumb[0].toUpperCase() + crumb.slice(1)
        })
    }
    return path
      .split('/')
      .filter(Boolean)
      .map(decodeURIComponent)
      .map(crumb => {
        return crumb[0].toUpperCase() + crumb.slice(1)
      })
  }, [path, rootKey])

  const root = useMemo(() => {
    if (!rootKey) return 'Home'

    return rootKey[0].toUpperCase() + rootKey.slice(1)
  }, [rootKey])

  const rootPath = useMemo(() => {
    if (!rootKey || !path) return '/'

    return path.slice(0, path.indexOf(rootKey) + rootKey.length)
  }, [rootKey, path])

  return (
    <div className={twMerge('flex text-sm text-gray-700', className)}>
      <Link href={rootPath}>{root}</Link>

      {crumbs.slice(0, -1).map((crumb, i) => (
        <React.Fragment key={crumb}>
          <span className="mx-2">{delimiter}</span>
          <Link href={`/${crumbs.slice(0, i + 1).join('/')}`}>{crumb}</Link>
        </React.Fragment>
      ))}

      {crumbs.length > 0 && (
        <span className="mx-2">
          {delimiter} {crumbs[crumbs.length - 1]}
        </span>
      )}
    </div>
  )
}
