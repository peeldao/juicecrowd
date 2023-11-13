import { Badge } from '@/components/ui/badge'
import { useCampaignEndDate } from '@/hooks/useCampaignEndDate'

export function ProgressBadge() {
  const { isComplete } = useCampaignEndDate()

  return (
    <Badge variant={isComplete ? 'success' : 'warn'} className="w-min">
      {isComplete ? 'Complete' : 'In progress'}
    </Badge>
  )
}
