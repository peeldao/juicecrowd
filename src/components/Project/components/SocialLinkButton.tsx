import { Link } from '@/components/Link'
import DiscordLogo from '@/components/icon/DiscordLogo'
import { TelegramLogo } from '@/components/icon/TelegramLogo'
import { XLogo } from '@/components/icon/XLogo'
import { GlobeAltIcon } from '@heroicons/react/24/outline'
import { useMemo } from 'react'
type SocialLinkButtonType = 'twitter' | 'discord' | 'telegram' | 'website'

export const SocialLinkButton = ({
  type,
  href,
}: {
  type: SocialLinkButtonType
  href: string
}) => {
  const Icon = useMemo(() => {
    switch (type) {
      case 'twitter':
        return XLogo
      case 'discord': {
        const discord = ({ className }: { className?: string }) => (
          <DiscordLogo className={className} />
        )
        return discord
      }
      case 'telegram':
        return TelegramLogo
      case 'website':
        return GlobeAltIcon
    }
  }, [type])

  const text = useMemo(() => {
    return type[0].toUpperCase() + type.slice(1)
  }, [type])

  return (
    <Link className="flex items-center gap-2 font-medium" href={href}>
      <Icon className="h-4 w-4 fill-bluebs-500 text-lg text-bluebs-500" />
      <span className="text-sm">{text}</span>
    </Link>
  )
}
