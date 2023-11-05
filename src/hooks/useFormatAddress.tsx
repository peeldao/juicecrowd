import { AsyncData, formatEthAddress } from 'juice-hooks'
import { useMemo } from 'react'
import { Address, useEnsName } from 'wagmi'

/**
 * TODO USE HOOK FROM JUICEHOOKS INSTEAD
 *
 * Return a formatted representation of an Ethereum address.
 * If the address resolves to an ENS name, it will be returned instead.
 *
 * @param address The address to format
 * @param opts.disableEns If true, the ENS name will not be fetched or returned.
 * @param opts.truncateTo If the return value is a full-length Address (not an ENS name), truncate the Address to the given number of characters.
 */
export function useFormatEthAddress(
  address: Address | undefined,
  opts?: { disableEns?: boolean; truncateTo?: number },
): AsyncData<string | null> {
  const { data: ensName, isLoading } = useEnsName({
    address: !opts?.disableEns ? address : undefined,
    enabled: !opts?.disableEns,
  })

  const formattedAddress = useMemo(() => {
    if (!address) return null

    if (!opts?.disableEns && ensName) {
      return ensName
    }

    return formatEthAddress(address, { truncateTo: opts?.truncateTo })
  }, [address, opts, ensName])

  return {
    isLoading,
    data: formattedAddress,
  }
}
