import { twMerge } from 'tailwind-merge'
import { RewardCard } from './RewardCard'
import { useJbProject } from '@/hooks/useJbProject'

export type RewardsPanelProps = {
  className?: string
}

export const RewardsPanel: React.FC<RewardsPanelProps> = ({ className }) => {
  const { nfts } = useJbProject()
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
        {nfts?.map(nft => <RewardCard key={nft.id} nft={nft} />)}
      </div>
    </div>
  )
}
