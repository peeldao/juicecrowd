import { timestampToDateString } from '@/lib/date/format'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/Tooltip'

export type TimestampProps = {
  className?: string
  /**
   * The timestamp to display.
   *
   * Can be a number (in milliseconds) or a {@link Date} object.
   */
  timestamp: number | Date
}

/**
 * A component that displays a timestamp in a human-readable format.
 *
 * @remarks
 * This component has a {@link Tooltip} that displays the timestamp in a human-readable format.
 *
 * @example
 * ```tsx
 * <Timestamp timestamp={new Date()} />
 * ```
 */
export const Timestamp: React.FC<TimestampProps> = ({
  className,
  timestamp,
}) => {
  timestamp = typeof timestamp === 'number' ? timestamp : timestamp.getTime()

  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger className={className}>
          {timestampToDateString(timestamp)}
        </TooltipTrigger>
        <TooltipContent>
          {new Date(timestamp * 1000).toLocaleString('en-US', {
            timeZoneName: 'short',
          })}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
