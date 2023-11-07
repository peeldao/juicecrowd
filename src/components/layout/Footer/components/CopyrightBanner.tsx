import DiscordLogo from '@/components/icon/DiscordLogo'
import { DISCORD_INVITE_URL } from '../Footer'
import { XLogo } from '@/components/icon/XLogo'
import { Link } from '@/components/Link'
import { twMerge } from 'tailwind-merge'
import { JB_X_URL } from '@/lib/constants/urls'

export type CopyrightBannerProps = {
  className?: string
}
export const CopyrightBanner: React.FC<CopyrightBannerProps> = ({
  className,
}) => {
  return (
    <div
      className={twMerge(
        'flex flex-col justify-between gap-5 md:flex-row',
        className,
      )}
    >
      <span>© Juicecrowd 2023 | All rights reserved</span>

      <div className="flex gap-x-7">
        <ImageButtons />
      </div>
    </div>
  )
}

export const ImageButtons = () => {
  const _ImageButtons = [
    {
      name: 'discord',
      image: <DiscordLogo className="h-6 w-6 text-gray-400" />,
      link: DISCORD_INVITE_URL,
    },
    {
      name: 'twitter',
      image: <XLogo className="h-5 w-5 fill-gray-400" />,
      link: JB_X_URL,
    },
  ]
  return (
    <div className="flex items-center gap-x-4">
      {_ImageButtons.map(({ name, image, link }) => (
        <Link
          key={name}
          className="text-lg leading-none text-gray-400"
          href={link}
        >
          {image}
        </Link>
      ))}
    </div>
  )
}
