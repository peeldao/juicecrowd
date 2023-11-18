import { CurrencyAmount } from '@/components/CurrencyAmount'
import { Button } from '@/components/ui/Button'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/Dialog'
import { useNftRemainingQuantity } from '@/hooks/useNftRemainingQuantity'
import { JB721DelegateTier, JB_CURRENCIES } from 'juice-hooks'
import { useRouter } from 'next/router'
import React from 'react'
import { RewardImage } from './RewardImage'

export type RewardDialogProps = {
  nft: JB721DelegateTier
  showClaimButton?: boolean
}

/**
 * Reward dialog component.
 * @param nft The nft to display in the dialog.
 */
export const RewardDialogContent: React.FC<RewardDialogProps> = ({
  nft,
  showClaimButton = false,
}) => {
  const { remaining } = useNftRemainingQuantity(nft)
  const initialQuantity = nft.initialQuantity.toString()

  const router = useRouter()

  const goToPayPage = React.useCallback(() => {
    router.push({
      pathname: `${router.pathname}/pay`,
      query: {
        ...router.query,
        'nft-reward-ids': nft.id.toString(),
      },
    })
  }, [nft.id, router])

  return (
    <DialogContent className="py-8" onClick={e => e.stopPropagation()}>
      <RewardImage src={nft.metadata.image} alt={nft.metadata.name} />
      <div className="mt-4 flex flex-col gap-4">
        <DialogHeader className="text-start font-heading text-2xl font-medium">
          {nft.metadata.name}
        </DialogHeader>
        <CurrencyAmount
          className="text-xl font-medium text-gray-800"
          amount={nft.price}
          currency={JB_CURRENCIES.USD}
        />
      </div>

      <DialogDescription className="text-base text-gray-600">
        {nft.metadata.description}
      </DialogDescription>
      <div className="flex gap-5">
        <div className="flex-1 text-sm text-gray-500">
          {remaining.type === 'soldOut' ? (
            'Sold out'
          ) : remaining.type === 'unlimited' ? (
            'Unlimited'
          ) : (
            <>
              {remaining.remaining.toString()}/{initialQuantity} remaining
            </>
          )}
        </div>
        {showClaimButton ? (
          <Button className="flex-1" onClick={goToPayPage}>
            Claim reward
          </Button>
        ) : null}
      </div>
    </DialogContent>
  )
}
