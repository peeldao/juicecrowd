import { useJbProject } from '@/hooks/useJbProject'
import { RewardCard } from './RewardCard'
import { twMerge } from 'tailwind-merge'

export type RewardsProps = {
  className?: string
}

export const Rewards: React.FC<RewardsProps> = ({ className }) => {
  const { nfts } = useJbProject()
  return (
    <div
      className={twMerge(
        'mb-12 mt-8 flex flex-col items-center gap-8',
        className,
      )}
    >
      {nfts?.map(nft => <RewardCard key={nft.id} nft={nft} />)}
    </div>
  )
}
