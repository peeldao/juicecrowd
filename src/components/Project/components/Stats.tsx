import { Link } from '@/components/Link'
import { ShareIcon } from '@/components/icon/ShareIcon'
import { Button } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import { Progress } from '@/components/ui/Progress'
import { Separator } from '@/components/ui/Separator'
import { useJbProject } from '@/hooks/useJbProject'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { ShareButton } from './ShareButton'

export type StatsProps = {
  className?: string
}

export const Stats: React.FC<StatsProps> = ({ className }) => {
  const { projectId } = useJbProject()
  return (
    <div className={twMerge('flex flex-col gap-12', className)}>
      {/* // TODO: Hook up */}
      <div>
        <Progress className="h-1.5" value={64} />
        <div className="mt-5 flex items-center gap-3">
          <span className="font-heading text-xl font-medium md:text-2xl">
            {/* // TODO: Replace real */}
            $64,976
          </span>
          <span className="text-sm text-gray-500">
            {/* // TODO: Replace real */}
            raised of $100,000 flexible goal
          </span>
        </div>
      </div>

      <div className="flex w-full flex-wrap items-center justify-between gap-y-8 md:flex-nowrap">
        <div className="flex h-12 w-full flex-shrink-0 space-x-6 md:flex-shrink">
          <StatBlock title="Time left" value="12 days" />
          <Separator orientation="vertical" />
          <StatBlock title="Supporters" value="227" />
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
