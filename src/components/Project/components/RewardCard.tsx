import { EthereumIconFilled } from '@/components/icon/EthereumIconFilled'
import { Button } from '@/components/ui/Button'
import { JB721DelegateTierTier } from '@/hooks/useJbProject'
import { formatEther } from 'juice-hooks'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

export type RewardCardProps = {
  className?: string
  nft: JB721DelegateTierTier
}

export const RewardCard: React.FC<RewardCardProps> = ({ className, nft }) => {
  return (
    <div className={twMerge('w-72 rounded-lg shadow', className)}>
      <div className="relative h-72 w-full bg-gray-100">
        <Image
          className="rounded-t-lg object-cover"
          fill
          src={nft.metadata.image}
          alt={nft.metadata.name}
        />
      </div>
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
        <Button variant="outline" size="xs" className="text-gray-700">
          Claim reward
        </Button>
      </div>
    </div>
  )
}
