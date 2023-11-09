import confettiAnimation from '@/data/lottie/confetti-animation.json'
import { useJbProject } from '@/hooks/useJbProject'
import { twitterShare } from '@/lib/twitter'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { JBCurrency, JB_CURRENCIES } from 'juice-hooks'
import { template } from 'lodash'
import Lottie from 'lottie-react'
import { useEffect, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { CurrencyAmount } from '../CurrencyAmount'
import { useEthUsdPrice } from '../EthUsdPriceProvider'
import { Link } from '../Link'
import { Button } from '../ui/Button'

function getQueryParam(name: string) {
  const params = new URLSearchParams(window.location.search)
  return params.get(name)
}

const twitterMessage = template(
  'I just contributed to <%= projectName %> on Juicecrowd:',
)

export const ProjectPaySuccessPage = () => {
  const { name, projectId } = useJbProject()

  const { ethToUsd } = useEthUsdPrice()

  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  const payAmount = useMemo(() => {
    const amountEthString = getQueryParam('amount-eth')
    const currencyString = getQueryParam('currency') || JB_CURRENCIES.USD
    if (!amountEthString) return null
    const currency = BigInt(currencyString) as JBCurrency
    let amount = BigInt(amountEthString)
    if (currency === JB_CURRENCIES.USD) {
      amount = ethToUsd(amount)
    }
    return {
      amount,
      currency,
    }
  }, [ethToUsd])

  return (
    <div className="relative mx-auto flex max-w-lg flex-col items-center justify-center pt-48">
      <ConfettiBurst />

      <div className="rounded-full border-[16px] border-green-50">
        <div className="rounded-full border-[16px] border-green-100 bg-green-100">
          <CheckCircleIcon className="h-[50px] w-[50px] rounded-full stroke-2 text-green-600" />
        </div>
      </div>

      <h1 className="mt-8 font-heading text-2xl font-medium">
        Payment successful!
      </h1>
      {payAmount?.amount ? (
        <p className="mt-4 text-center text-gray-600">
          Your payment of{' '}
          <CurrencyAmount
            className="font-semibold"
            hideCurrencyIcon
            {...payAmount}
          />{' '}
          to {name} was successful.
        </p>
      ) : null}
      <div className="mt-12 flex w-full flex-col justify-center gap-3 md:flex-row">
        <Button
          className="flex-1"
          variant="outline"
          onClick={() => {
            twitterShare(
              twitterMessage({
                projectName: name,
              }),
              currentUrl,
            )
          }}
        >
          Share on X
        </Button>
        <Link className="flex flex-1" href={`/p/${projectId}`}>
          <Button className="w-full flex-1">Return to project</Button>
        </Link>
      </div>
    </div>
  )
}

const ConfettiBurst = () => {
  const [confettiVisible, setConfettiVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setConfettiVisible(false)
    }, 4500)
    return () => clearTimeout(timer)
  })

  if (!confettiVisible) return null

  return (
    <Lottie
      className={twMerge(
        'pointer-events-none absolute left-1/2 mx-auto w-full -translate-x-1/2',
      )}
      animationData={confettiAnimation}
    />
  )
}
