import { Link } from '@/components/Link'
import { CoinLogo } from '@/components/icon/CoinLogo'
import Logo from '@/components/Logo'
import { twMerge } from 'tailwind-merge'

export type DesktopNavbarProps = {
  className?: string
  title?: string
  separator?: boolean
}

export const DesktopNavbar: React.FC<DesktopNavbarProps> = ({
  className,
  title,
  separator,
}) => {
  return (
    <div className={twMerge('flex flex-col gap-5 py-6', className)}>
      <div
        className={twMerge(
          'flex flex-1 items-center justify-between gap-5 border-gray-100 px-12',
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
        <div className="flex items-center gap-8">
          <Link className="text-gray-700" href="https://docs.juicecrowd.gg">
            Learn more
          </Link>
          <Link className="text-gray-700" href="/contact">
            Contact
          </Link>
        </div>
      </div>
    </div>
  )
}
