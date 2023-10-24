import { EthereumIconFilled } from '@/components/icon/EthereumIconFilled'
import { Button } from '@/components/ui/Button'
import { JB721DelegateTierTier } from '@/hooks/useJbProject'
import { formatEther } from 'juice-hooks'
import { twMerge } from 'tailwind-merge'
import { RewardDialog } from './RewardDialog'
import { RewardImage } from './RewardImage'

export type RewardCardProps = {
  className?: string
  nft: JB721DelegateTierTier
}

export const RewardCard: React.FC<RewardCardProps> = ({ className, nft }) => {
  return (
    <RewardDialog nft={nft}>
      <div className={twMerge('w-72 rounded-lg shadow', className)}>
        <RewardImage
          className="rounded-t-lg"
          src={nft.metadata.image}
          alt={nft.metadata.name}
        />
        <div className="flex flex-col gap-4 p-4 pb-5">
          <div className="text-base font-medium">{nft.metadata.name}</div>
          <div className="flex items-center justify-between gap-5">
            <div className="flex items-center text-xl font-medium">
              <EthereumIconFilled className="inline-block h-5 w-5 text-bluebs-500" />
              {formatEther(nft.price)}
            </div>
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
    </RewardDialog>
  )
}
