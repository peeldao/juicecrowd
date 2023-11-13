import Logo from '@/components/Logo'
import { twMerge } from 'tailwind-merge'
import { CopyrightBanner } from './CopyrightBanner'
import { LinkColProps, LinkColumn } from './LinkColumn'
import { DISCORD_INVITE_URL, JB_X_URL } from '@/lib/constants/urls'

export type FullFooterProps = {
  className?: string
}

export const FullFooter: React.FC<FullFooterProps> = ({ className }) => {
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
          link: 'https://docs.juicecrowd.gg',
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
          link: DISCORD_INVITE_URL,
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

        <CopyrightBanner className="mt-8 border-t border-gray-800 pb-8 pt-5 text-gray-500 md:mt-32 md:pb-16" />
      </div>
    </footer>
  )
}
