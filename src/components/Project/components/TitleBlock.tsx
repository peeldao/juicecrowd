import { twMerge } from 'tailwind-merge'

export type TitleBlockProps = {
  className?: string
  title: string
  subtitle?: string
  owner: string
  created: Date
}
export const TitleBlock: React.FC<TitleBlockProps> = ({
  className,
  title,
  subtitle,
  owner,
  created,
}) => {
  // converts date to format "Created 24 August 2023"
  const createdString = `Created ${created.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })}`

  return (
    <div className={twMerge('text-center', className)}>
      <h1 className="font-heading text-3xl font-medium">{title}</h1>
      <h2 className="mt-2 text-gray-600">{subtitle}</h2>
      <div className="mt-3 flex justify-center divide-x divide-gray-200 text-xs text-gray-500">
        <span className="py-1 pr-4">Owner: {owner}</span>
        <span className="py-1 pl-4">{createdString}</span>
      </div>
    </div>
  )
}
