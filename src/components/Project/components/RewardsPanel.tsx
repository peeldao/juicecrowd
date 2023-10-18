import { twMerge } from 'tailwind-merge'
import { RewardCard } from './RewardCard'

export type RewardsPanelProps = {
  className?: string
}

export const RewardsPanel: React.FC<RewardsPanelProps> = ({ className }) => {
  return (
    <div
      className={twMerge(
        'flex flex-col rounded-lg border border-gray-200 bg-white',
        className,
      )}
    >
      <div className="border-b border-gray-200 bg-gray-50 p-5 font-semibold">
        Rewards
      </div>
      <div className="mb-12 mt-8 flex flex-col items-center gap-8">
        <RewardCard title="Early Bird" price="$50" remaining="5" />
        <RewardCard title="Early Bird" price="$50" remaining="5" />
        <RewardCard title="Early Bird" price="$50" remaining="5" />
        <RewardCard title="Early Bird" price="$50" remaining="5" />
      </div>
    </div>
  )
}
