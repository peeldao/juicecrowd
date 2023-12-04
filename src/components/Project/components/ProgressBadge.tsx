import { Badge } from '@/components/ui/badge'
import { useCountdown } from '@/hooks/useCountdown'
import { JC01_DATES } from '@/lib/constants'

export function ProgressBadge() {
  const { isComplete } = useCountdown(JC01_DATES.PROJECTS_RUN)

  return (
    <Badge variant={isComplete ? 'success' : 'warn'} className="w-fit">
      {isComplete ? 'Complete' : 'In progress'}
    </Badge>
  )
}
