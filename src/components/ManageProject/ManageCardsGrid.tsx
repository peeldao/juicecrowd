import { CurrencyAmount } from '@/components/CurrencyAmount'
import { useJbProject } from '@/hooks/useJbProject'
import { useProjectVolume } from '@/hooks/useProjectVolume'
import { useTotalSupporters } from '@/hooks/useTotalSupporters'
import { ReactNode } from 'react'
import { ManageCard } from './ManageCard'

interface CardData {
  name: ReactNode
  value: ReactNode
}

export function ManageCardsGrid() {
  const { softTarget } = useJbProject()
  const totalSupporters = useTotalSupporters()
  const totalRaised = useProjectVolume()

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
      ) : null,
    },
    {
      name: 'Project balance',
      value: totalRaised ? (
        <CurrencyAmount
          currency={softTarget.currency}
          // TODO: Get real project balance data

          amount={totalRaised.val}
        />
      ) : null,
    },
    { name: 'Total backers', value: totalSupporters },
    // TODO: Real time data
    { name: 'Campaign duration', value: '30 days' },
    { name: 'Time left', value: '12 days' },
  ]

  return (
    <div className="grid grid-cols-3 gap-4">
      {cardData.map((cardData, index) => (
        <ManageCard key={index} name={cardData.name} value={cardData.value} />
      ))}
    </div>
  )
}
