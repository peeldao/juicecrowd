import { CurrencyAmount } from '@/components/CurrencyAmount'
import { Button } from '@/components/ui/Button'
import { Dialog, DialogTrigger } from '@/components/ui/Dialog'
import { Skeleton } from '@/components/ui/Skeleton'
import { useNftRemainingQuantity } from '@/hooks/useNftRemainingQuantity'
import { JB721DelegateTier, JB_CURRENCIES } from 'juice-hooks'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { twMerge } from 'tailwind-merge'
import { RewardDialogContent } from './RewardDialogContent'
import { RewardImage } from './RewardImage'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

export type RewardCardProps = {
  className?: string
  nft: JB721DelegateTier
}

export const RewardCard: React.FC<RewardCardProps> = ({ className, nft }) => {
  const router = useRouter()

  const goToPayPage = useCallback(() => {
    router.push({
      pathname: `${router.pathname}/pay`,
      query: {
        ...router.query,
        'nft-reward-ids': nft.id.toString(),
      },
    })
  }, [nft.id, router])

  const { remainingText } = useNftRemainingQuantity(nft)

  return (
    <Dialog>
      <div
        className={twMerge(
          'w-72 rounded-lg border border-gray-200 shadow-card',
          className,
        )}
      >
        <DialogTrigger className="w-72 rounded-lg">
          <RewardImage
            className="rounded-t-lg"
            src={nft.metadata.image}
            alt={nft.metadata.name}
          />
        </DialogTrigger>
        <div className="flex flex-col gap-4 p-4 pb-5">
          <div className="flex items-center justify-between gap-5">
            <div className="text-base font-medium text-gray-900">
              {nft.metadata.name}
            </div>
            <DialogTrigger>
              <div className="flex items-center gap-1 text-end text-gray-400 hover:text-blue-400">
                <InformationCircleIcon className="h-5 w-5" />
                Perks
              </div>
            </DialogTrigger>
          </div>
          <div className="flex items-center justify-between gap-5">
            <CurrencyAmount
              className="text-base font-medium text-gray-800"
              amount={nft.price}
              currency={JB_CURRENCIES.USD}
            />
            <div className="text-end text-gray-400">{remainingText}</div>
          </div>
          <Button
            variant="outline"
            size="xs"
            className="text-gray-700"
            onClick={e => {
              e.stopPropagation()
              goToPayPage()
            }}
          >
            Claim reward
          </Button>
        </div>
      </div>

      <RewardDialogContent showClaimButton nft={nft} />
    </Dialog>
  )
}

export const RewardCardSkeleton: React.FC = () => {
  return (
    <div className="w-72 rounded-lg shadow">
      <Skeleton className="h-72 rounded-t-lg" />
      <div className="flex flex-col gap-4 p-4 pb-5">
        <Skeleton className="h-4 w-2/3 font-medium" />
        <div className="flex items-center justify-between gap-5">
          <Skeleton className="h-6 w-3/12 font-medium" />
          <Skeleton className="h-4 w-6/12 text-gray-400" />
        </div>
        <Skeleton className="h-9 w-full" />
      </div>
    </div>
  )
}
