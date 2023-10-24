import { JB721DelegateTierTier } from '@/hooks/useJbProject'
import { RewardImage } from './RewardImage'
import { twMerge } from 'tailwind-merge'
import { EthereumIconFilled } from '@/components/icon/EthereumIconFilled'
import { formatEther } from 'juice-hooks'
import { RewardDialog } from './RewardDialog'
import { Button } from '@/components/ui/Button'
import { Separator } from '@/components/ui/Separator'

export type PayRewardCardProps = {
  className?: string
  nft: JB721DelegateTierTier
}

export const PayRewardCard: React.FC<PayRewardCardProps> = ({
  className,
  nft,
}) => {
  const remaining = nft.remainingQuantity.toString()
  return (
    <div
      className={twMerge(
        'flex rounded-[10px] border border-gray-200 p-3',
        className,
      )}
    >
      <RewardImage
        className="h-14 w-14 rounded-lg"
        src={nft.metadata.image}
        alt={nft.metadata.name}
      />

      <div className="ml-4 flex flex-1 flex-col gap-3">
        <div className="font-medium">{nft.metadata.name}</div>
        <div className="flex items-center font-medium">
          <EthereumIconFilled className="inline-block h-5 w-5 text-bluebs-500" />
          {formatEther(nft.price)}
        </div>
        <div className="flex h-5 gap-4 text-sm">
          <RewardDialog nft={nft}>
            <Button size="child" variant="link">
              View details
            </Button>
          </RewardDialog>
          <Separator orientation="vertical" />
          <span className="text-gray-400">{remaining} remaining</span>
        </div>
      </div>

      <div className="h-4 w-4 rounded-full border border-gray-200" />
    </div>
  )
}
