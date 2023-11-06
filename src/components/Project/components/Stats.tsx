import { CurrencyAmount } from '@/components/CurrencyAmount'
import { Link } from '@/components/Link'
import { Button } from '@/components/ui/Button'
import { Progress } from '@/components/ui/Progress'
import { Separator } from '@/components/ui/Separator'
import { useJbProject } from '@/hooks/useJbProject'
import { ReactNode, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import { ShareButton } from './ShareButton'
import { useTotalSupporters } from '@/hooks/useTotalSupporters'
import { useTotalRaised } from '@/hooks/useTotalRaised'

export type StatsProps = {
  className?: string
}

export const Stats: React.FC<StatsProps> = ({ className }) => {
  const { projectId, softTarget } = useJbProject()
  const totalSupporters = useTotalSupporters()
  const totalRaised = useTotalRaised()

  const progress = useMemo(() => {
    if (!softTarget.amount) return 100
    return Number((Number(totalRaised) / Number(softTarget.amount)) * 100)
  }, [totalRaised, softTarget])

  return (
    <div className={twMerge('flex flex-col gap-12', className)}>
      <div>
        <Progress className="h-1.5" value={progress} />
        <div className="mt-5 flex items-center gap-3">
          <span className="font-heading text-xl font-medium md:text-2xl">
            <CurrencyAmount
              currency={softTarget.currency}
              amount={totalRaised}
            />
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
      <div className="text-lg font-medium text-gray-900">{value}</div>
    </div>
  )
}
