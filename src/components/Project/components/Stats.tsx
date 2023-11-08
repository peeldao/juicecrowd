import { CurrencyAmount } from '@/components/CurrencyAmount'
import { Link } from '@/components/Link'
import { Button } from '@/components/ui/Button'
import { Progress } from '@/components/ui/Progress'
import { Separator } from '@/components/ui/Separator'
import { useJbProject } from '@/hooks/useJbProject'
import { useProjectVolume } from '@/hooks/useProjectVolume'
import { distanceBetweenDates } from '@/lib/date/format'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { ShareButton } from './ShareButton'

export type StatsProps = {
  className?: string
}

export const Stats: React.FC<StatsProps> = ({ className }) => {
  const { projectId, contributorsCount, softTarget, endDate } = useJbProject()
  const [now, setNow] = useState(new Date())

  const totalRaised = useProjectVolume()

  const progress = useMemo(() => {
    if (!softTarget.amount) return 100
    return Number((Number(totalRaised) / Number(softTarget.amount)) * 100)
  }, [totalRaised, softTarget])

  // Update time every second for optimization
  useEffect(() => {
    if (!endDate) return
    const interval = setInterval(() => {
      setNow(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [endDate])

  return (
    <div className={twMerge('flex flex-col gap-12', className)}>
      <div>
        <Progress className="h-1.5" value={progress} />
        <div className="mt-5 flex items-center gap-3">
          <span className="font-heading text-xl font-medium md:text-2xl">
            {totalRaised ? (
              <CurrencyAmount
                currency={softTarget.currency}
                amount={totalRaised.val}
              />
            ) : null}
          </span>
          <span className="flex items-center gap-1 text-sm text-gray-500">
            raised of{' '}
            <CurrencyAmount
              hideCurrencyIcon
              currency={softTarget.currency}
              amount={softTarget.amount}
            />{' '}
            flexible goal
          </span>
        </div>
      </div>

      <div className="flex w-full flex-wrap items-center justify-between gap-y-8 md:flex-nowrap">
        <div className="flex h-12 w-full flex-shrink-0 space-x-6 md:flex-shrink">
          <StatBlock
            className={
              endDate && (endDate.getTime() - now.getTime()) / 1000 < 60
                ? 'w-[112px] text-yellow-500'
                : undefined
            }
            title="Time left"
            value={
              endDate && endDate.getTime() > now.getTime()
                ? distanceBetweenDates(now, endDate)
                : 'No limit'
            }
          />
          <Separator orientation="vertical" />
          <StatBlock title="Supporters" value={contributorsCount} />
        </div>

        <ShareButton className="h-14 w-full md:h-12 md:w-fit" />
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
