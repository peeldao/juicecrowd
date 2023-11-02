import { CurrencyAmount } from '@/components/CurrencyAmount'
import { Button } from '@/components/ui/Button'
import { twMerge } from 'tailwind-merge'
import { RewardDialogContent } from './RewardDialogContent'
import { RewardImage } from './RewardImage'
import { DialogTrigger, Dialog } from '@/components/ui/Dialog'
import { Skeleton } from '@/components/ui/Skeleton'
import { JB721DelegateTier } from 'juice-hooks'

export type RewardCardProps = {
  className?: string
  nft: JB721DelegateTier
}

export const RewardCard: React.FC<RewardCardProps> = ({ className, nft }) => {
  return (
    <Dialog>
      <div className={twMerge('w-72 rounded-lg shadow', className)}>
        <DialogTrigger className="w-72 rounded-lg">
          <RewardImage
            className="rounded-t-lg"
            src={nft.metadata.image}
            alt={nft.metadata.name}
          />
        </DialogTrigger>
        <div className="flex flex-col gap-4 p-4 pb-5">
          <div className="text-base font-medium">{nft.metadata.name}</div>
          <div className="flex items-center justify-between gap-5">
            <CurrencyAmount
              className="text-xl font-medium"
              amount={nft.price}
            />
            <div className="text-gray-400">
              {nft.remainingQuantity.toString()} remaining
            </div>
          </div>
          <Button
            variant="outline"
            size="xs"
            className="text-gray-700"
            onClick={e => e.stopPropagation()}
          >
            Claim reward
          </Button>
        </div>
      </div>

      <RewardDialogContent nft={nft} />
    </Dialog>
  )
}

export const RewardCardSkeleton: React.FC = () => {
  return (
    <div className="w-72 rounded-lg shadow">
      <Skeleton className="h-72 rounded-t-lg" />
      <div className="flex flex-col gap-4 p-4 pb-5">
        <Skeleton className="h-4 w-2/3 font-medium" />
        <div className="flex items-center justify-between gap-5">
          <Skeleton className="h-6 w-3/12 font-medium" />
          <Skeleton className="h-4 w-6/12 text-gray-400" />
        </div>
        <Skeleton className="h-9 w-full" />
      </div>
    </div>
  )
}
