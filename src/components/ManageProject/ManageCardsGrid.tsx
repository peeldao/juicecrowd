import { CurrencyAmount } from '@/components/CurrencyAmount'
import { useJbProject } from '@/hooks/useJbProject'
import { useProjectVolume } from '@/hooks/useProjectVolume'
import { useTotalSupporters } from '@/hooks/useTotalSupporters'
import { ReactNode } from 'react'
import { ManageCard } from './ManageCard'
import { useEthTerminalBalance } from 'juice-hooks'
import { useCampaignEndDate } from '@/hooks/useCampaignEndDate'

interface CardData {
  name: ReactNode
  value: ReactNode
}

export function ManageCardsGrid() {
  const { softTarget } = useJbProject()
  const { data: projectBalance } = useEthTerminalBalance()
  const totalSupporters = useTotalSupporters()
  const totalRaised = useProjectVolume()
  const { timeLeftFormatted } = useCampaignEndDate()

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
          amount={projectBalance}
        />
      ) : (
        '-'
      ),
    },
    { name: 'Total backers', value: totalSupporters },
    { name: 'Campaign duration', value: '3 days' },
    { name: 'Time left', value: timeLeftFormatted },
  ]

  return (
    <div className="grid grid-cols-3 gap-4">
      {cardData.map((cardData, index) => (
        <ManageCard key={index} name={cardData.name} value={cardData.value} />
      ))}
    </div>
  )
}
