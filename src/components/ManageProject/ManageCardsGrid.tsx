import { CurrencyAmount } from '@/components/CurrencyAmount'
import { useJbProject } from '@/hooks/useJbProject'
import { useProjectVolume } from '@/hooks/useProjectVolume'
import { useTotalSupporters } from '@/hooks/useTotalSupporters'
import { ReactNode, useState } from 'react'
import { ManageCard } from './ManageCard'
import { useJBFundingCycleContext } from 'juice-hooks'
import { detailedTimeString } from '@/lib/time/formatTime'

interface CardData {
  name: ReactNode
  value: ReactNode
}

export function ManageCardsGrid() {
  const { fundingCycleData: { data }} = useJBFundingCycleContext()

  const [now, setNow] = useState(new Date())

  const { softTarget, endDate } = useJbProject()
  const totalSupporters = useTotalSupporters()
  const totalRaised = useProjectVolume()

  const duration = data?.duration
  const durationFormatted = duration ? detailedTimeString({ timeSeconds: duration, fullWords: true }) : null

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
    { name: 'Campaign duration', value: durationFormatted ?? '-' },
    // TODO: Get end from jbProjectContext
    { name: 'Time left', value: '-' },
  ]

  return (
    <div className="grid grid-cols-3 gap-4">
      {cardData.map((cardData, index) => (
        <ManageCard key={index} name={cardData.name} value={cardData.value} />
      ))}
    </div>
  )
}
