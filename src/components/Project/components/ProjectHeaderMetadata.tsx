import { EthereumAddress } from '@/components/EthereumAddress'
import { useJbProject } from '@/hooks/useJbProject'
import { JC01_DATES } from '@/lib/constants'
import { FEATURE_FLAGS } from '@/lib/constants/featureFlags'
import { featureFlagEnabled } from '@/lib/featureFlags'
import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'

export function ProjectHeaderMetadata({ className }: { className?: string }) {
  const { createdAt, owner } = useJbProject()

  const createdString = useMemo(() => {
    let date = createdAt
    if (featureFlagEnabled(FEATURE_FLAGS.JC01_HARDCODE_START_DATE)) {
      date = JC01_DATES.PROJECTS_LAUNCH
    }

    return date
      ? // converts date to format "Created 24 August 2023"
        `Created ${date.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}`
      : undefined
  }, [createdAt])

  return (
    <div
      className={twMerge(
        'flex justify-center divide-x divide-gray-200 text-xs text-gray-500',
        className,
      )}
    >
      <span className="py-1 pr-4">
        Owner: <EthereumAddress address={owner} />
      </span>
      <span className="py-1 pl-4">{createdString}</span>
    </div>
  )
}
