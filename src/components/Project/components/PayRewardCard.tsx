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
      <PayCardBase className="overflow-hidden" {...props}>
        <div className="relative h-14 w-14 flex-shrink-0 rounded-lg md:h-20 md:w-20">
          <Image
            className="rounded-md"
            fill
            src={nft.metadata.image}
            alt={`${nft.metadata.name}`}
          />
        </div>

        <div className="overflow-hidden">
          <div className="ml-4 flex flex-1 flex-col gap-3 md:gap-2">
            <div className="text-base font-medium">{nft.metadata.name}</div>
            <CurrencyAmount
              className="text-base font-medium leading-none"
              amount={nft.price}
            />
            <div className="flex h-5 gap-4 overflow-hidden text-sm">
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
              <span className="truncate whitespace-nowrap text-gray-400">
                {remainingText}
              </span>
            </div>
          </div>
        </div>
      </PayCardBase>

      <RewardDialogContent nft={nft} />
    </Dialog>
  )
}
