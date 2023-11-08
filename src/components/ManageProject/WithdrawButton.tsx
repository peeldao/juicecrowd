import { Button } from '@/components/ui/Button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip'

export function WithdrawButton() {
  // TODO: Get real isComplete data based on cycle end
  const isComplete = false
  const tooltipText = 'Funds cannot be withdrawn until the campaign is complete'

  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger>
          <Button className="h-11" disabled={!isComplete}>
            Withdraw funds
          </Button>
        </TooltipTrigger>
        {!isComplete && <TooltipContent>{tooltipText}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  )
}
