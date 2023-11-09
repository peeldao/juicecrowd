import { twMerge } from 'tailwind-merge'
import { Rewards } from './Rewards'

export type RewardsPanelProps = {
  className?: string
}

export const RewardsPanel: React.FC<RewardsPanelProps> = ({ className }) => {
  return (
    <div
      className={twMerge(
        'flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white',
        className,
      )}
    >
      <div className="border-b border-gray-200 bg-gray-50 p-5 text-base font-semibold">
        Rewards
      </div>

      <Rewards />
    </div>
  )
}
