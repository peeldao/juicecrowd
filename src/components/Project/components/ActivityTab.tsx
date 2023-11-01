import { usePayEvents } from '@/hooks/usePayEvents'
import { twMerge } from 'tailwind-merge'
import { ActivityCard, ActivityCardSkeleton } from './ActivityCard'

export type ActivityTabProps = {
  className?: string
}

export const ActivityTab: React.FC<ActivityTabProps> = ({ className }) => {
  const { data, isLoading } = usePayEvents()

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <ActivityCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (data?.payEvents.length === 0) {
    return (
      <div className="mx-auto text-center font-medium text-gray-400">
        No activity yet
      </div>
    )
  }

  return (
    <div className={twMerge('flex flex-col gap-3', className)}>
      {data?.payEvents.map(event => (
        <ActivityCard key={event.id} event={event} />
      ))}
    </div>
  )
}
