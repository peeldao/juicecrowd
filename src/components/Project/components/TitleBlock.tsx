import { EthereumAddress } from '@/components/EthereumAddress'
import { useJbProject } from '@/hooks/useJbProject'
import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'

export type TitleBlockProps = {
  className?: string
}
export const TitleBlock: React.FC<TitleBlockProps> = ({ className }) => {
  const { name, projectTagline, createdAt, owner } = useJbProject()

  const createdString = useMemo(
    () =>
      createdAt
        ? // converts date to format "Created 24 August 2023"
          `Created ${createdAt.toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}`
        : undefined,
    [createdAt],
  )

  return (
    <div className={twMerge('text-center', className)}>
      <h1 className="font-heading text-3xl font-medium">{name}</h1>
      <h2 className="mt-2 text-gray-600">{projectTagline}</h2>
      <div className="mt-3 flex justify-center divide-x divide-gray-200 text-xs text-gray-500">
        <span className="py-1 pr-4">
          Owner: <EthereumAddress address={owner} />
        </span>
        <span className="py-1 pl-4">{createdString}</span>
      </div>
    </div>
  )
}
