import { Badge } from '@/components/ui/badge'

export function ProgressBadge() {
  // TODO: hook to determine if project is in progress or complete (reuse for Withdraw button)
  const isComplete = false

  return (
    <Badge variant={isComplete ? 'success' : 'warn'}>
      {isComplete ? 'Complete' : 'In progress'}
    </Badge>
  )
}
