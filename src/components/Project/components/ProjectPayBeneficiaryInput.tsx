import { EthereumAddress } from '@/components/EthereumAddress'
import { Input } from '@/components/Input'
import { Spinner } from '@/components/Spinner'
import { Button } from '@/components/ui/Button'
import { publicClient } from '@/lib/viem/publicClient'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { isAddress } from 'viem'
import { useAccount, useEnsName } from 'wagmi'

export type ProjectPayBeneficiaryInputProps = {} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'prefix'
>

export const ProjectPayBeneficiaryInput: React.FC<
  ProjectPayBeneficiaryInputProps
> = ({ className, onChange: _onChange, ...props }) => {
  const { address: ownerAddress } = useAccount()

  const currentAddress = useMemo(() => {
    if (!props.value) return ownerAddress
    if (!isAddress(props.value as string)) return ownerAddress

    return props.value as `0x${string}`
  }, [ownerAddress, props.value])

  const { data: currentEnsFromAddress } = useEnsName({
    address: currentAddress,
  })
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  /**
   * hijacks the onChange event to check if the value is an ENS name or address
   */
  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    async e => {
      const value = e.target.value
      _onChange?.(e)
      if (isEnsName(value)) {
        setIsLoading(true)
        try {
          const ensAddress = await publicClient.getEnsAddress({ name: value })
          if (!ensAddress) return
          _onChange?.({ ...e, target: { ...e.target, value: ensAddress } })
          setIsEditing(false)
        } catch (e) {
          console.error(e)
        } finally {
          setIsLoading(false)
        }
      } else if (isAddress(value)) {
        setIsEditing(false)
      }
    },
    [_onChange],
  )

  useEffect(() => {
    if (!isEditing) return
    inputRef.current?.focus()
  }, [isEditing])

  if (!isEditing) {
    return (
      <div className="flex h-11 justify-between gap-5 overflow-hidden rounded-lg border border-gray-200 bg-muted px-[14px] py-3 text-base leading-none">
        {currentAddress ? (
          <EthereumAddress showEnsIcon address={currentAddress} />
        ) : (
          <>Payer's address</>
        )}
        <Button
          size="child"
          variant="ghost"
          className="p-0"
          onClick={() => setIsEditing(true)}
        >
          <PencilSquareIcon className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <>
      <Input
        {...props}
        onChange={onChange}
        ref={inputRef}
        disabled={isLoading}
        suffix={
          isLoading ? <Spinner className="h-5 w-5 text-gray-900" /> : null
        }
        onBlur={() => setIsEditing(false)}
      />
    </>
  )
}

const isEnsName = (value: string) => {
  return value.endsWith('.eth')
}
