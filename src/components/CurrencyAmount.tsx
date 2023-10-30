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

/**
 * Available currencies of {@link JB_CURRENCIES}
 */
type Currency = 1n | 2n

export type CurrencyAmountProps = {
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
  amount,
  currency = JB_CURRENCIES.ETH,
}) => {
  const { ethToUsd, usdToEth } = useEthUsdPrice()

  const currencyStrings = useMemo(
    () => (currency === JB_CURRENCIES.ETH ? ['ETH', 'USD'] : ['USD', 'ETH']),
    [currency],
  )

  const formattedAmounts = useMemo(() => {
    const amounts = []
    // The primary amount needs no extra calculation
    amounts.push(formatEther(amount))

    if (currency === JB_CURRENCIES.ETH) {
      // The secondary amount is the primary amount converted to USD
      const usd = ethToUsd(amount)
      amounts.push(formatEther(usd, { decimals: 2 }))
    } else {
      // The secondary amount is the primary amount converted to ETH
      const eth = usdToEth(amount)
      amounts.push(formatEther(eth, { decimals: 8 }))
    }

    return amounts
  }, [amount, currency, ethToUsd, usdToEth])

  const currencyIcon = useMemo(() => {
    const ethIcon = (
      <EthereumIconFilled className="inline-block h-5 w-5 text-bluebs-500" />
    )
    const usdIcon = (
      <CurrencyDollarIcon className="mr-0.5 inline-block h-5 w-5 text-green-600" />
    )
    if (currency === JB_CURRENCIES.ETH) {
      return ethIcon
    }

    return usdIcon
  }, [currency])

  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger className="flex items-center text-xl font-medium">
          {currencyIcon}
          {formattedAmounts[0]} {currencyStrings[0]}
        </TooltipTrigger>
        <TooltipContent className="flex items-center">
          {formattedAmounts[1]} {currencyStrings[1]}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
