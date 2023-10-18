import { ActivityCard } from './ActivityCard'

export type ActivityTabProps = {
  className?: string
}

export const ActivityTab: React.FC<ActivityTabProps> = ({ className }) => {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 10 }).map((_, i) => (
        <ActivityCard key={i} />
      ))}
    </div>
  )
}
