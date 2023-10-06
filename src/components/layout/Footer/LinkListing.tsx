import { Link } from '@/components/Link'
import { ReactNode } from 'react'

export type LinkItem = {
  title: ReactNode
  link: string
}

export const LinkListing: React.FC<{ items: LinkItem[] }> = ({ items }) => (
  <>
    {items.map(({ title, link }, i) => (
      <div key={i}>
        <Link
          className="text-white hover:text-blue-500"
          href={link}
        >
          {title}
        </Link>
      </div>
    ))}
  </>
)
