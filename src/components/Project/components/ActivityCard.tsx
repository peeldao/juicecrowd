import { CurrencyAmount } from '@/components/CurrencyAmount'
import { EthereumAddress } from '@/components/EthereumAddress'
import { Link } from '@/components/Link'
import { Timestamp } from '@/components/Timestamp'
import { Button } from '@/components/ui/Button'
import { ensAvatarUrlForAddress } from '@/lib/ens'
import { etherscanUrlForTx } from '@/lib/etherscan'
import { PayEvent } from '@/lib/graphql/hooks'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import { Skeleton } from '@/components/ui/Skeleton'

type ActivityEvent = Pick<
  PayEvent,
  'amount' | 'beneficiary' | 'timestamp' | 'note' | 'txHash'
>

export type ActivityCardProps = {
  className?: string
  event: ActivityEvent
}
export const ActivityCard: React.FC<ActivityCardProps> = ({
  className,
  event,
}) => {
  return (
    <div
      className={twMerge(
        'flex flex-col gap-4 rounded-[10px] border border-gray-100 px-5 py-6 text-sm shadow-sm',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-5">
        <div className="flex items-center gap-3">
          <Image
            src={ensAvatarUrlForAddress(event.beneficiary, { size: 80 })}
            height={40}
            width={40}
            className="rounded-full"
            alt={`Avatar for ${event.beneficiary}`}
            loading="lazy"
          />
          <div className="flex flex-col">
            <EthereumAddress
              className="font-medium"
              address={event.beneficiary}
            />
            <Timestamp
              className="text-start text-xs text-gray-500"
              timestamp={event.timestamp}
            />
          </div>
        </div>

        <div className="flex flex-col items-end gap-1 md:flex-row md:items-center md:gap-3">
          <CurrencyAmount amount={event.amount} />

          <Link href={etherscanUrlForTx(event.txHash)}>
            <Button size="child" variant="ghost">
              <ArrowTopRightOnSquareIcon className="h-4 w-4 text-gray-400" />
            </Button>
          </Link>
        </div>
      </div>

      {/* // TODO: A little bit more work required for images in note to load properly */}
      {event.note && <div>{event.note}</div>}
    </div>
  )
}

export const ActivityCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 rounded-[10px] border border-gray-100 px-5 py-6 text-sm shadow-sm">
      <div className="flex items-center justify-between gap-5">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex flex-col">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>

        <div className="flex flex-col items-end gap-1 md:flex-row md:items-center md:gap-3">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-6 w-6" />
        </div>
      </div>

      <div className="mt-3 h-4 w-full">
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  )
}
