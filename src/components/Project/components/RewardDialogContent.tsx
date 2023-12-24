import { CurrencyAmount } from '@/components/CurrencyAmount'
import { Link } from '@/components/Link'
import { Button } from '@/components/ui/Button'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/Dialog'
import { useNftRemainingQuantity } from '@/hooks/useNftRemainingQuantity'
import { URLRegex } from '@/lib/constants/regex/url'
import { JB721DelegateTier, JB_CURRENCIES } from 'juice-hooks'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { RewardImage } from './RewardImage'
import { useCountdown } from '@/hooks/useCountdown'
import { JC01_DATES } from '@/lib/constants'

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

  const { isComplete } = useCountdown(JC01_DATES.PROJECTS_RUN)

  const goToPayPage = React.useCallback(() => {
    router.push({
      pathname: `${router.pathname}/pay`,
      query: {
        ...router.query,
        'nft-reward-ids': nft.id.toString(),
      },
    })
  }, [nft.id, router])

  const description = useMemo(() => {
    if (!nft.metadata.description) return []

    return nft.metadata.description.split('\n').map(line => {
      // Check for URL and process accordingly
      if (URLRegex.test(line)) {
        const url = line.match(URLRegex)?.[0]
        return {
          children: line.split(URLRegex).map((text, index) => ({
            children: text,
            type: index % 2 === 0 ? 'text' : 'a',
            href: index % 2 === 0 ? undefined : url,
          })),
        }
      }

      // Return line as a paragraph if no URL
      return { children: line, type: 'p' }
    })
  }, [nft.metadata.description])

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
        {description?.map((line, i) => (
          <p className="mb-2 hyphens-auto" key={i}>
            {typeof line.children === 'string'
              ? line.children
              : line.children.map((child, i) => {
                  if (child.type === 'text') {
                    return child.children
                  } else {
                    return (
                      <Link
                        key={i}
                        className="break-all text-blue-500 hover:underline"
                        href={child.href ?? child.children}
                      >
                        {child.children}
                      </Link>
                    )
                  }
                })}
          </p>
        ))}
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
          <Button
            className="flex-1"
            disabled={isComplete}
            onClick={goToPayPage}
          >
            Claim reward
          </Button>
        ) : null}
      </div>
    </DialogContent>
  )
}
