import { Input } from '@/components/Input'
import { EthereumIconFilled } from '@/components/icon/EthereumIconFilled'
import { Button } from '@/components/ui/Button'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useCallback } from 'react'
import { twMerge } from 'tailwind-merge'

export type ProjectPayAmountInputProps = {
  currency: 1n | 2n
  setCurrency: (currency: 1n | 2n) => void
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'>

export const ProjectPayAmountInput: React.FC<ProjectPayAmountInputProps> = ({
  className,
  currency,
  setCurrency,
  ...props
}) => {
  const isEth = currency === 1n
  const toggleCurrency = useCallback(() => {
    setCurrency(isEth ? 2n : 1n)
  }, [isEth, setCurrency])

  return (
    <Input
      prefix={
        isEth ? (
          <EthereumIconFilled className="h-7 w-7 rounded-full bg-bluebs-50 fill-bluebs-500 p-1" />
        ) : (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-green-600">
            $
          </div>
        )
      }
      suffix={
        <Button
          type="button"
          size="child"
          variant="secondary"
          className={twMerge(
            'flex gap-1 rounded-sm py-1.5 pl-1 pr-2 text-xs',
            !isEth && 'bg-green-100 text-green-600',
          )}
          onClick={toggleCurrency}
        >
          <ChevronDownIcon className="h-4 w-4" />
          {isEth ? 'ETH' : 'USD'}
        </Button>
      }
      {...props}
    />
  )
}
