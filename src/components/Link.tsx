import NextLink from 'next/link'
import { twMerge } from 'tailwind-merge'

const isExternal = (href: string) => {
  return href.startsWith('http')
}

type Props = {
  href: string
  className?: string
  children: React.ReactNode
}

export const Link = ({ href, children, className }: Props) => {
  const classNameDefault =
    'text-bluebs-600 hover:text-bluebs-400 transition-colors'
  if (isExternal(href)) {
    return (
      <a
        href={href}
        className={twMerge(classNameDefault, className)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    )
  }
  return (
    <NextLink href={href} className={twMerge(classNameDefault, className)}>
      {children}
    </NextLink>
  )
}
