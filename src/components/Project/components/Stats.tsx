import { CurrencyAmount } from '@/components/CurrencyAmount'
import { Link } from '@/components/Link'
import { Button } from '@/components/ui/Button'
import { Progress } from '@/components/ui/Progress'
import { Separator } from '@/components/ui/Separator'
import { useCountdown } from '@/hooks/useCountdown'
import { useJbProject } from '@/hooks/useJbProject'
import { useProjectVolume } from '@/hooks/useProjectVolume'
import { ReactNode, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import { ShareButton } from './ShareButton'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip'
import { JC01_DATES } from '@/lib/constants'
import { Ether } from 'juice-hooks'

export type StatsProps = {
  className?: string
}

export const Stats: React.FC<StatsProps> = ({ className }) => {
  const { projectId, contributorsCount, softTarget, name } = useJbProject()

  const totalRaised = useProjectVolume()
  const { timeLeftFormatted, timeLeftSeconds, isComplete } = useCountdown(
    JC01_DATES.PROJECTS_RUN,
  )

  const lessThanOneMinuteLeft = timeLeftSeconds && timeLeftSeconds < 60

  const progress = useMemo(() => {
    if (!softTarget.amount) return 100
    if (!totalRaised) return 0
    const normalTarget = new Ether(softTarget.amount).toFloat()
    const normalRaised = totalRaised.toFloat()
    return Number(normalRaised / normalTarget) * 100
  }, [totalRaised, softTarget])

  return (
    <div className={twMerge('flex flex-col gap-12', className)}>
      <div>
        <Progress className="h-1.5" value={progress} />
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="font-heading text-xl font-medium md:text-2xl">
            {totalRaised ? (
              <CurrencyAmount
                currency={softTarget.currency}
                amount={totalRaised.val}
              />
            ) : null}
          </span>
          <span className="flex items-center gap-1 whitespace-nowrap text-sm text-gray-500">
            raised of{' '}
            <CurrencyAmount
              hideCurrencyIcon
              currency={softTarget.currency}
              amount={softTarget.amount}
            />{' '}
            <FlexibleTooltip /> goal
          </span>
        </div>
      </div>

      <div className="flex w-full flex-wrap items-center justify-between gap-y-8">
        <div className="flex flex-wrap gap-6">
          <StatBlock
            className={twMerge(
              isComplete
                ? 'text-green-500'
                : lessThanOneMinuteLeft
                ? 'text-yellow-500'
                : undefined,
            )}
            title="Time left"
            value={timeLeftFormatted}
          />
          <Separator orientation="vertical" className="h-12" />
          <StatBlock title="Supporters" value={contributorsCount} />
        </div>

        <ShareButton
          className="h-14 w-full md:h-12 md:w-fit"
          projectName={name}
        />
      </div>

      <Link href={`/p/${projectId}/pay`} className="-mt-8 md:mt-0">
        <Button className="h-14 w-full md:h-12">Support this project</Button>
      </Link>
    </div>
  )
}

type StatBlockProps = {
  className?: string
  title: ReactNode
  value: ReactNode
}

const StatBlock: React.FC<StatBlockProps> = ({ className, title, value }) => {
  return (
    <div className={twMerge('flex flex-col text-gray-900', className)}>
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-lg font-medium">{value}</div>
    </div>
  )
}

const FlexibleTooltip: React.FC = () => {
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger className="underline">flexible</TooltipTrigger>
        <TooltipContent>
          <p>
            Project owners will receive all funds regardless of whether the
            target is met.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
