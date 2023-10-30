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
  showEnsIcon?: boolean
  showEnsLoading?: boolean
  ensDisabled?: boolean
  truncateTo?: number
}

export const EthereumAddress: React.FC<EthereumAddressProps> = ({
  className,
  address,
  showEnsIcon,
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

  const ensAvatarIcon = useMemo(
    () =>
      address ? (
        <Image
          src={ensAvatarUrlForAddress(address, { size: 80 })}
          fill
          className="rounded-full"
          alt={`Avatar for ${ensName ?? address}`}
          loading="lazy"
        />
      ) : null,
    [address, ensName],
  )

  return (
    <HoverCard openDelay={150}>
      <HoverCardTrigger
        className={twMerge(
          'inline-flex items-center gap-2',
          showEnsLoading && isLoading && 'animate-pulse',
          className,
        )}
      >
        {showEnsIcon && ensAvatarIcon ? (
          <div className="relative h-7 w-7 rounded-full bg-gray-100">
            {ensAvatarIcon}
          </div>
        ) : null}
        {formattedAddress}
      </HoverCardTrigger>
      <HoverCardContent className="w-fit text-start">
        <div className="flex items-center gap-5">
          {ensAvatarIcon ? (
            <div className="relative h-10 w-10 rounded-full bg-gray-100">
              {ensAvatarIcon}
            </div>
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
