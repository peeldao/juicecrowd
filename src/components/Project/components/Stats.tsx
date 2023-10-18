import { ShareIcon } from '@/components/icon/ShareIcon'
import { Button } from '@/components/ui/Button'
import { Progress } from '@/components/ui/Progress'
import { Separator } from '@/components/ui/Separator'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export type StatsProps = {
  className?: string
}

export const Stats: React.FC<StatsProps> = ({ className }) => {
  return (
    <div className={twMerge('flex flex-col gap-12', className)}>
      {/* // TODO: Hook up */}
      <div>
        <Progress className="h-1.5" value={64} />
        <div className="mt-5 flex items-center gap-3">
          <span className="font-heading text-2xl font-medium">
            {/* // TODO: Replace real */}
            $64,976
          </span>
          <span className="text-gray-500">
            {/* // TODO: Replace real */}
            raised of $100,000 flexible goal
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex h-12 space-x-6">
          <StatBlock title="Time left" value="12 days" />
          <Separator orientation="vertical" />
          <StatBlock title="Supporters" value="227" />
        </div>

        <div>
          <Button variant="outline" className="flex gap-2">
            <ShareIcon className="h-5 w-5" />
            Share
          </Button>
        </div>
      </div>

      <Button className="w-full">Support this project</Button>
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
      <div className="text-xl font-medium text-gray-900">{value}</div>
    </div>
  )
}
