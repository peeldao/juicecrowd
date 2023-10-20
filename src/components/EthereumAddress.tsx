import { truncateEthAddress } from '@/lib/address/format'
import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import { useEnsName } from 'wagmi'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/Tooltip'

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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className={twMerge(
            showEnsLoading && isLoading && 'animate-pulse',
            className,
          )}
        >
          {formattedAddress}
        </TooltipTrigger>
        <TooltipContent>
          <p>{address}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
