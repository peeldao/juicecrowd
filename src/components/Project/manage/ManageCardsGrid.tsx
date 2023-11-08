import React, { ReactNode } from 'react'
import { ManageCard } from './ManageCard'
import { useJbProject } from '@/hooks/useJbProject'
import { CurrencyAmount } from '@/components/CurrencyAmount'
import { useTotalSupporters } from '@/hooks/useTotalSupporters'
import { useTotalRaised } from '@/hooks/useTotalRaised'

interface CardData {
  name: ReactNode
  value: ReactNode
}

export function ManageCardsGrid() {
  const { softTarget } = useJbProject()
  const totalSupporters = useTotalSupporters()
  const totalRaised = useTotalRaised()

  const cardData: CardData[] = [
    {
      name: "Funding goal",
      value:
        <CurrencyAmount
          hideCurrencyIcon
          currency={softTarget.currency}
          amount={softTarget.amount}
        />
    },
    {
      name: "Total funds raised",
      value:
        <CurrencyAmount
          currency={softTarget.currency}
          amount={totalRaised}
        />
    },
    {
      name: "Project balance",
      value:
        <CurrencyAmount
          currency={softTarget.currency}
          // TODO: Get real project balance data
          amount={totalRaised}
        />
    },
    { name: "Total backers", value: totalSupporters },
    // TODO: Real time data
    { name: "Campaign duration", value: "30 days" },
    { name: "Time left", value: "12 days" },
  ]

  return (
    <div className="grid grid-cols-3 gap-4">
      {cardData.map((cardData, index) => (
        <ManageCard key={index} name={cardData.name} value={cardData.value} />
      ))}
    </div>
  )
}
