import { formatEth, formatUsd } from '@/lib/currency/format'
import { cnTextHw } from '@/lib/utils'
import { JBCurrency, JB_CURRENCIES } from 'juice-hooks'
import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import { useEthUsdPrice } from './EthUsdPriceProvider'
import { EthereumIconFilled } from './icon/EthereumIconFilled'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/Tooltip'

export type CurrencyAmountProps = {
  className?: string
  amount: bigint
  currency?: JBCurrency
  hideCurrencyIcon?: boolean
  withSecondaryCurrency?: boolean
}

const EthIcon = ({ className }: { className?: string }) => {
  return (
    <EthereumIconFilled
      className={twMerge(
        'inline-block text-bluebs-500',
        'h-5 w-5', // default size
        ...cnTextHw(className),
        className,
      )}
    />
  )
}

const CurrencyIcon = ({
  currency,
  className,
}: {
  currency: JBCurrency
  className?: string
}) => {
  if (currency === JB_CURRENCIES.ETH) {
    return <EthIcon className={className} />
  }

  return null
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
  hideCurrencyIcon,
  withSecondaryCurrency = false,
}) => {
  const { ethToUsd, usdToEth } = useEthUsdPrice()

  const secondaryCurrency =
    currency === JB_CURRENCIES.ETH ? JB_CURRENCIES.USD : JB_CURRENCIES.ETH

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

  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex flex-col">
            <span
              className={twMerge(
                'inline-flex w-fit justify-center whitespace-nowrap',
                className,
              )}
            >
              <CurrencyIcon currency={currency} />
              {formattedAmounts[0]}
            </span>

            {withSecondaryCurrency ? (
              <span className="text-xs font-normal text-gray-400">
                <CurrencyIcon
                  currency={secondaryCurrency}
                  className="text-xs font-normal text-gray-400"
                />
                {formattedAmounts[1]}
              </span>
            ) : null}
          </div>
        </TooltipTrigger>
        <TooltipContent className="flex items-center">
          {formattedAmounts[1]}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
