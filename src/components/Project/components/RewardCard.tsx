import { CurrencyAmount } from '@/components/CurrencyAmount'
import { Button } from '@/components/ui/Button'
import { JB721DelegateTierTier } from '@/hooks/useJbProject'
import { twMerge } from 'tailwind-merge'
import { RewardDialogContent } from './RewardDialogContent'
import { RewardImage } from './RewardImage'
import { DialogTrigger, Dialog } from '@/components/ui/Dialog'

export type RewardCardProps = {
  className?: string
  nft: JB721DelegateTierTier
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
            <CurrencyAmount amount={nft.price} />
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
