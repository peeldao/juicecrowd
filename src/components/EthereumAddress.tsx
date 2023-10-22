import { truncateEthAddress } from '@/lib/address/format'
import { ensAvatarUrlForAddress } from '@/lib/ens'
import Image from 'next/image'
import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import { useEnsName } from 'wagmi'
import { Link } from './Link'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/HoverCard'
import { Skeleton } from './ui/Skeleton'

export type EthereumAddressProps = {
  className?: string
  address: `0x${string}` | undefined
  showEnsLoading?: boolean
  ensDisabled?: boolean
  truncateTo?: number
}

export const EthereumAddress: React.FC<EthereumAddressProps> = ({
  className,
  address,
  ensDisabled = false,
  showEnsLoading = false,
  truncateTo,
}) => {
  const { data: ensName, isLoading } = useEnsName({
    address,
    enabled: !ensDisabled,
  })

  const formattedAddress = useMemo(() => {
    if (!ensDisabled && ensName) return ensName
    if (!address) return null

    return truncateEthAddress({ address, truncateTo })
  }, [address, ensDisabled, ensName, truncateTo])

  return (
    <HoverCard openDelay={150}>
      <HoverCardTrigger
        className={twMerge(
          'hover:underline',
          showEnsLoading && isLoading && 'animate-pulse',
          className,
        )}
      >
        {formattedAddress}
      </HoverCardTrigger>
      <HoverCardContent className="text-start">
        <div className="flex items-center gap-5">
          {address ? (
            <Image
              src={ensAvatarUrlForAddress(address, { size: 80 })}
              height={40}
              width={40}
              className={twMerge('h-10 w-10 rounded-full')}
              alt={`Avatar for ${ensName ?? address}`}
              loading="lazy"
            />
          ) : (
            <Skeleton className="h-10 w-10 rounded-full" />
          )}
          <div className="space-y-1 font-medium">
            <div>{ensName}</div>
            <div>
              <Link
                className="text-gray-500"
                href={`https://etherscan.io/address/${address}`}
              >
                {address
                  ? truncateEthAddress({ address, truncateTo: 8 })
                  : undefined}
              </Link>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
