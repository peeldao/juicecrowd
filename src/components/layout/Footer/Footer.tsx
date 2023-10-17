import { LinkColProps, LinkColumn } from './LinkColumn'
import { Link } from '@/components/Link'
import DiscordLogo, {
  JB_DISCORD_INVITE_URL,
} from '@/components/icon/DiscordLogo'
import { JB_X_URL, XLogo } from '@/components/icon/XLogo'
import Logo from '@/components/Logo'
import { twMerge } from 'tailwind-merge'

const ImageButtons = [
  {
    name: 'discord',
    image: <DiscordLogo className="h-6 w-6 text-gray-400" />,
    link: JB_DISCORD_INVITE_URL,
  },
  {
    name: 'twitter',
    image: <XLogo className="h-5 w-5 fill-gray-400" />,
    link: JB_X_URL,
  },
]

export type FooterProps = {
  className?: string
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  const LinkCols: LinkColProps[] = [
    {
      title: 'Juicecrowd',
      items: [
        {
          title: 'Crowds',
          link: '/crowds',
        },
        {
          title: 'Submit your project',
          link: 'https://form.typeform.com/to/LfNmNKVe',
        },
      ],
    },
    {
      title: 'Resources',
      items: [
        {
          title: 'Docs',
          link: 'https://docs.juicebox.money',
        },
        {
          title: 'Contact',
          link: '/contact',
        },
      ],
    },
    {
      title: 'Socials',
      items: [
        {
          title: 'Discord',
          link: JB_DISCORD_INVITE_URL,
        },
        {
          title: 'X (Twitter)',
          link: JB_X_URL,
        },
      ],
    },
  ]

  return (
    <footer
      className={twMerge('bg-slate-900 px-5 pt-12 text-sm md:px-12', className)}
    >
      <div className="m-auto max-w-6xl">
        <div className="flex flex-col gap-y-10 md:grid md:grid-cols-5 md:items-start md:gap-x-10">
          <div className="flex flex-col gap-y-5 text-gray-400 md:col-span-2 md:items-start">
            <Logo theme="dark" />
            Made with 🤍 on Ethereum, by a community of amazing & talented
            contributors.
          </div>
          {LinkCols.map((props, i) => (
            <LinkColumn key={i} {...props} />
          ))}
        </div>

        <div className="mt-8 flex flex-col justify-between gap-5 border-t border-gray-800 pb-8 pt-5 md:mt-32 md:flex-row md:pb-16">
          <span className="text-gray-500">
            © Juicecrowd 2023 | All rights reserved
          </span>

          <div className="flex gap-x-7">
            <div className="flex items-center gap-x-4 ">
              {ImageButtons.map(({ name, image, link }) => (
                <Link
                  key={name}
                  className="text-lg leading-none text-gray-400"
                  href={link}
                >
                  {image}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
