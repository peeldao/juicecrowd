import { CurrencyDollarIcon } from '@heroicons/react/24/outline'
import { JB_CURRENCIES, formatEther } from 'juice-hooks'
import { useMemo } from 'react'
import { useEthUsdPrice } from './EthUsdPriceProvider'
import { EthereumIconFilled } from './icon/EthereumIconFilled'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/Tooltip'
import { formatEth, formatUsd } from '@/lib/currency/format'
import { twMerge } from 'tailwind-merge'

/**
 * Available currencies of {@link JB_CURRENCIES}
 */
type Currency = 1n | 2n

export type CurrencyAmountProps = {
  className?: string
  amount: bigint
  currency?: Currency
}

/**
 * Displays an amount in ETH and USD.
 *
 * Shows the amount in ETH and USD, with the USD amount being calculated from
 * the ETH amount, or vice versa.
 *
 * @requires {@link EthUsdPriceProvider}
 */
export const CurrencyAmount: React.FC<CurrencyAmountProps> = ({
  className,
  amount,
  currency = JB_CURRENCIES.ETH,
}) => {
  const { ethToUsd, usdToEth } = useEthUsdPrice()

  const formattedAmounts = useMemo(() => {
    const amounts = []
    // The primary amount needs no extra calculation
    if (currency === JB_CURRENCIES.ETH) {
      amounts.push(formatEth(amount))
    } else {
      amounts.push(formatUsd(amount))
    }

    if (currency === JB_CURRENCIES.ETH) {
      // The secondary amount is the primary amount converted to USD
      const usd = ethToUsd(amount)
      amounts.push(formatUsd(usd))
    } else {
      // The secondary amount is the primary amount converted to ETH
      const eth = usdToEth(amount)
      amounts.push(formatEth(eth))
    }

    return amounts
  }, [amount, currency, ethToUsd, usdToEth])

  const currencyIcon = useMemo(() => {
    const ethIcon = (
      <EthereumIconFilled className="inline-block h-5 w-5 text-bluebs-500" />
    )
    if (currency === JB_CURRENCIES.ETH) {
      return ethIcon
    }

    return null
  }, [currency])

  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger
          className={twMerge('flex w-fit items-center', className)}
        >
          {currencyIcon}
          {formattedAmounts[0]}
        </TooltipTrigger>
        <TooltipContent className="flex items-center">
          {formattedAmounts[1]}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
