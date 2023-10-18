import { EthereumIconFilled } from '@/components/icon/EthereumIconFilled'
import { Button } from '@/components/ui/Button'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

export type ActivityCardProps = {
  className?: string
}
export const ActivityCard: React.FC<ActivityCardProps> = ({ className }) => {
  return (
    <div className="flex items-center justify-between rounded-[10px] border border-gray-100 px-5 py-6 shadow-sm">
      <div className="flex gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-100" />
        <div>
          <div className="font-medium">chasemcdude.eth</div>
          <div className="text-gray-500">Paid 5 minutes ago</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-lg font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-bluebs-50">
            <EthereumIconFilled className="inline-block h-5 w-5 text-bluebs-500" />
          </div>
          <span>0.2</span>
        </div>

        <Button size="child" variant="ghost">
          <ArrowTopRightOnSquareIcon className="h-4 w-4 text-gray-400" />
        </Button>
      </div>
    </div>
  )
}
