import { ensAvatarUrlForAddress } from '@/lib/ens'
import { formatEthAddress } from 'juice-hooks'
import Image from 'next/image'
import { useCallback, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { useEnsName } from 'wagmi'
import { Link } from './Link'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/HoverCard'
import { Skeleton } from './ui/Skeleton'
import { Button } from './ui/Button'
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import { useToast } from './ui/useToast'

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

    return formatEthAddress(address, { truncateTo })
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
          <div className="space-y-1">
            <div className="font-medium">{ensName}</div>
            {address ? (
              <div className="flex items-center gap-1">
                <Link
                  className="text-sm leading-none text-gray-500"
                  href={`https://etherscan.io/address/${address}`}
                >
                  {formatEthAddress(address, { truncateTo: 8 })}
                </Link>
                <CopyButton className="text-gray-500" textToCopy={address} />
              </div>
            ) : null}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

const CopyButton = ({
  className,
  textToCopy,
}: {
  className?: string
  textToCopy: string
}) => {
  const { toast } = useToast()
  const onClick = useCallback(() => {
    navigator.clipboard.writeText(textToCopy)
    toast({
      title: 'Copied to clipboard',
      duration: 2000,
    })
  }, [textToCopy, toast])

  return (
    <Button
      className={twMerge('hover:text-bluebs-500', className)}
      size="child"
      variant="link"
      onClick={onClick}
    >
      <DocumentDuplicateIcon className="h-4 w-4" />
    </Button>
  )
}
