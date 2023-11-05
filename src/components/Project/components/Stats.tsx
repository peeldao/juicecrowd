import { Link } from '@/components/Link'
import { Button } from '@/components/ui/Button'
import { Progress } from '@/components/ui/Progress'
import { Separator } from '@/components/ui/Separator'
import { useJbProject } from '@/hooks/useJbProject'
import { ReactNode, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import { ShareButton } from './ShareButton'
import { CurrencyAmount } from '@/components/CurrencyAmount'
import { Ether } from 'juice-hooks'

export type StatsProps = {
  className?: string
}

export const Stats: React.FC<StatsProps> = ({ className }) => {
  const { projectId, payEventsData } = useJbProject()

  const contributorAmounts = useMemo(() => {
    return payEventsData.data?.payEvents.reduce(
      (acc, event) => {
        const contributor = event.beneficiary
        const amount = BigInt(event.amount)
        const total = acc[contributor] || 0n
        return { ...acc, [contributor]: total + amount }
      },
      {} as Record<string, bigint>,
    )
  }, [payEventsData.data?.payEvents])

  const totalSupporters = useMemo(() => {
    return Object.keys(contributorAmounts || {}).length
  }, [contributorAmounts])

  const totalRaised = useMemo(() => {
    return Object.values(contributorAmounts || {}).reduce(
      (acc, amount) => acc + amount,
      0n,
    )
  }, [contributorAmounts])

  const flexibleGoal = useMemo(() => {
    // TODO: Replace real
    return Ether.parse('1', 18).val
  }, [])

  const progress = useMemo(() => {
    return Number((Number(totalRaised) / Number(flexibleGoal)) * 100)
  }, [totalRaised, flexibleGoal])

  return (
    <div className={twMerge('flex flex-col gap-12', className)}>
      <div>
        <Progress className="h-1.5" value={progress} />
        <div className="mt-5 flex items-center gap-3">
          <span className="font-heading text-xl font-medium md:text-2xl">
            <CurrencyAmount amount={totalRaised} />
          </span>
          <span className="flex items-center gap-1 text-sm text-gray-500">
            raised of <CurrencyAmount amount={flexibleGoal} /> flexible goal
          </span>
        </div>
      </div>

      <div className="flex w-full flex-wrap items-center justify-between gap-y-8 md:flex-nowrap">
        <div className="flex h-12 w-full flex-shrink-0 space-x-6 md:flex-shrink">
          {/* // TODO: Real data */}
          <StatBlock title="Time left" value="12 days" />
          <Separator orientation="vertical" />
          <StatBlock title="Supporters" value={totalSupporters} />
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
    <div className={twMerge('flex flex-col', className)}>
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-lg font-medium text-gray-900 md:text-xl">
        {value}
      </div>
    </div>
  )
}
