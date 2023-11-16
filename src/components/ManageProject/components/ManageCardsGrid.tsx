import { CurrencyAmount } from '@/components/CurrencyAmount'
import { useCampaignEndDate } from '@/hooks/useCampaignEndDate'
import { useJbProject } from '@/hooks/useJbProject'
import { useProjectVolume } from '@/hooks/useProjectVolume'
import { useTotalSupporters } from '@/hooks/useTotalSupporters'
import { formatDuration } from '@/lib/date/format'
import {
  Ether,
  useEthTerminalBalance,
  useJBContractContext,
  useJBFundingCycleContext,
  JB_CURRENCIES,
} from 'juice-hooks'
import { ReactNode } from 'react'
import { ManageCard } from './ManageCard'
import { useEthUsdPrice } from '../../EthUsdPriceProvider'

interface CardData {
  name: ReactNode
  value: ReactNode
}

export function ManageCardsGrid() {
  const { softTarget, projectId } = useJbProject()
  const {
    fundingCycleData: { data },
  } = useJBFundingCycleContext()
  const {
    contracts: { primaryTerminalEth },
  } = useJBContractContext()
  const { data: projectBalance } = useEthTerminalBalance({
    projectId,
    terminalAddress: primaryTerminalEth.data,
  })

  const { ethToUsd } = useEthUsdPrice()

  const projectBalanceWei = (projectBalance as Ether)?.val
  const currencyIsUsd = softTarget.currency === JB_CURRENCIES.USD
  const balanceInCurrency =
    projectBalanceWei && currencyIsUsd
      ? ethToUsd(projectBalanceWei)
      : projectBalanceWei

  const totalSupporters = useTotalSupporters()
  const totalRaised = useProjectVolume()
  const { timeLeftFormatted } = useCampaignEndDate()

  const duration = data?.duration
  const durationFormatted = formatDuration({ duration })

  const cardData: CardData[] = [
    {
      name: 'Funding goal',
      value: (
        <CurrencyAmount
          hideCurrencyIcon
          currency={softTarget.currency}
          amount={softTarget.amount}
        />
      ),
    },
    {
      name: 'Total funds raised',
      value: totalRaised ? (
        <CurrencyAmount
          currency={softTarget.currency}
          amount={totalRaised.val}
        />
      ) : (
        '-'
      ),
    },
    {
      name: 'Project balance',
      value: projectBalance ? (
        <CurrencyAmount
          currency={softTarget.currency}
          amount={balanceInCurrency}
        />
      ) : (
        '-'
      ),
    },
    { name: 'Total backers', value: totalSupporters },
    { name: 'Campaign duration', value: durationFormatted },
    { name: 'Time left', value: timeLeftFormatted },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {cardData.map((cardData, index) => (
        <ManageCard key={index} name={cardData.name} value={cardData.value} />
      ))}
    </div>
  )
}
