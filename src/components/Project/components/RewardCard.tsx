import { EthereumIconFilled } from '@/components/icon/EthereumIconFilled'
import { Button } from '@/components/ui/Button'
import { twMerge } from 'tailwind-merge'

export type RewardCardProps = {
  className?: string
  title: string
  price: string
  remaining: string
}

export const RewardCard: React.FC<RewardCardProps> = ({
  className,
  // TODO
  title,
  price,
  remaining,
}) => {
  return (
    <div className={twMerge('w-72 rounded-lg shadow', className)}>
      <div className="h-72 w-full rounded-t-lg bg-orange-200" />
      <div className="flex flex-col gap-4 p-4 pb-5">
        <div className="text-base font-medium">Exclusive Download</div>
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center text-xl font-medium">
            <EthereumIconFilled className="inline-block h-5 w-5 text-bluebs-500" />
            0.2
          </div>
          <div className="text-gray-400">564 remaining</div>
        </div>
        <Button variant="outline" size="xs" className="text-gray-700">
          Claim reward
        </Button>
      </div>
    </div>
  )
}
