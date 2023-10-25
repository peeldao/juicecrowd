import { JB721DelegateTierTier } from '@/hooks/useJbProject'
import { RewardImage } from './RewardImage'
import { twMerge } from 'tailwind-merge'
import { EthereumIconFilled } from '@/components/icon/EthereumIconFilled'
import { formatEther } from 'juice-hooks'
import { RewardDialog } from './RewardDialog'
import { Button } from '@/components/ui/Button'
import { Separator } from '@/components/ui/Separator'
import React from 'react'
import { CheckIcon } from '@heroicons/react/24/solid'

export type PayRewardCardProps = {
  className?: string
  nft: JB721DelegateTierTier
  isSelected?: boolean
  onClick?: () => void
}

export const PayRewardCard: React.FC<PayRewardCardProps> = ({
  className,
  nft,
  isSelected,
  onClick,
}) => {
  const remaining = nft.remainingQuantity.toString()
  return (
    <div
      className={twMerge(
        'flex cursor-pointer rounded-[10px] border border-gray-200 p-3 shadow-sm',
        isSelected && '-m-[1px] border-2 border-bluebs-500',
        className,
      )}
      onClick={onClick}
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

      <div
        className={twMerge(
          'flex h-5 w-5 items-center justify-center rounded-full border',
          isSelected ? 'border-bluebs-500 bg-bluebs-500' : 'border-gray-200',
        )}
      >
        <CheckIcon
          className={twMerge(
            'h-4 w-4 stroke-2 text-white',
            isSelected ? 'inline' : 'hidden',
          )}
        />
      </div>
    </div>
  )
}
