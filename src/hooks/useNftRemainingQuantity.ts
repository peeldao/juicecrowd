import { NFT_MAX_SUPPLY } from '@/lib/constants/nfts'
import { JB721DelegateTier } from 'juice-hooks'
import { useMemo } from 'react'

export type RemainingQuantityType = 'soldOut' | 'limited' | 'unlimited'

export type RemainingQuantity =
  | {
      type: 'soldOut' | 'limited'
      remaining: bigint
    }
  | {
      type: 'unlimited'
    }

export const useNftRemainingQuantity = ({
  remainingQuantity,
  initialQuantity,
}: Pick<JB721DelegateTier, 'remainingQuantity' | 'initialQuantity'>) => {
  const isUnlimited = useMemo(
    () => initialQuantity === NFT_MAX_SUPPLY,
    [initialQuantity],
  )
  const remaining: RemainingQuantity = useMemo(() => {
    if (isUnlimited) return { type: 'unlimited' }
    if (!remainingQuantity) return { type: 'soldOut', remaining: 0n }
    return { type: 'limited', remaining: remainingQuantity }
  }, [isUnlimited, remainingQuantity])

  const remainingText = useMemo(() => nftRemainingText(remaining), [remaining])

  return { remaining, remainingText }
}

const nftRemainingText = (remaining: RemainingQuantity) => {
  switch (remaining.type) {
    case 'soldOut':
      return 'Sold Out'
    case 'unlimited':
      return 'Unlimited'
    case 'limited':
      return `${remaining.remaining} remaining`
  }
}
