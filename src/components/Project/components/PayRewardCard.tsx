import { CurrencyAmount } from '@/components/CurrencyAmount'
import { Button } from '@/components/ui/Button'
import { Dialog, DialogTrigger } from '@/components/ui/Dialog'
import { Separator } from '@/components/ui/Separator'
import { useNftRemainingQuantity } from '@/hooks/useNftRemainingQuantity'
import { JB721DelegateTier } from 'juice-hooks'
import Image from 'next/image'
import React from 'react'
import { PayCardBase, PayCardBaseProps } from './PayCardBase'
import { RewardDialogContent } from './RewardDialogContent'

export interface PayRewardCardProps extends PayCardBaseProps {
  nft: JB721DelegateTier
}

export const PayRewardCard: React.FC<PayRewardCardProps> = ({
  nft,
  ...props
}) => {
  const { remainingText } = useNftRemainingQuantity(nft)
  return (
    <Dialog>
      <PayCardBase {...props}>
        <div className="relative h-16 w-16 flex-shrink-0 rounded-lg">
          <Image
            className="rounded-lg"
            fill
            src={nft.metadata.image}
            alt={`${nft.metadata.name}`}
          />
        </div>

        {/* Mobile */}
        <div className="block md:hidden">
          <div className="ml-4 flex flex-1 flex-col gap-3">
            <div className="text-base font-medium">{nft.metadata.name}</div>
            <CurrencyAmount
              className="text-base font-medium"
              amount={nft.price}
            />
            <div className="flex h-5 gap-4 text-sm">
              <DialogTrigger onClick={e => e.stopPropagation()}>
                <Button
                  className="whitespace-nowrap"
                  size="child"
                  variant="link"
                >
                  View details
                </Button>
              </DialogTrigger>
              <Separator orientation="vertical" />
              <span className="whitespace-nowrap text-gray-400">
                {remainingText}
              </span>
            </div>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden flex-1 md:flex">
          <div className="ml-4 flex flex-1 flex-col gap-3">
            <div className="text-base font-medium">{nft.metadata.name}</div>
            <div className="flex h-5 gap-4 text-sm">
              <DialogTrigger onClick={e => e.stopPropagation()}>
                <Button
                  className="whitespace-nowrap"
                  size="child"
                  variant="link"
                >
                  View details
                </Button>
              </DialogTrigger>
              <Separator orientation="vertical" />
              <span className="whitespace-nowrap text-gray-400">
                {remainingText}
              </span>
            </div>
          </div>

          <CurrencyAmount
            className="mr-5 text-base font-medium"
            amount={nft.price}
          />
        </div>
      </PayCardBase>

      <RewardDialogContent nft={nft} />
    </Dialog>
  )
}
