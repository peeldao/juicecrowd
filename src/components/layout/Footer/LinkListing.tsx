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
        <Link className="hover:text-bluebs-500 text-white" href={link}>
          {title}
        </Link>
      </div>
    ))}
  </>
)
