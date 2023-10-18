import { FullFooter } from './components/FullFooter'
import { MinimalFooter } from './components/MinimalFooter'

export const DISCORD_INVITE_URL = 'https://discord.gg/NFTvc93bf6'

export type FooterProps = {
  className?: string
  type?: 'default' | 'minimal'
}

export const Footer: React.FC<FooterProps> = ({ className, type }) => {
  type = type || 'default'

  if (type === 'minimal') {
    return <MinimalFooter className={className} />
  }

  return <FullFooter className={className} />
}
