import { useJbProject } from '@/hooks/useJbProject'
import { RewardCard, RewardCardSkeleton } from './RewardCard'
import { twMerge } from 'tailwind-merge'

export type RewardsProps = {
  className?: string
}

export const Rewards: React.FC<RewardsProps> = ({ className }) => {
  const { nftData } = useJbProject()

  if (nftData.isLoading) {
    return (
      <div
        className={twMerge(
          'mb-12 mt-8 flex flex-col items-center gap-8',
          className,
        )}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <RewardCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (!nftData.data?.length) {
    return null
  }

  return (
    <div
      className={twMerge(
        'mb-12 mt-8 flex flex-col items-center gap-8',
        className,
      )}
    >
      {nftData.data.map(nft => (
        <RewardCard key={nft.id} nft={nft} />
      ))}
    </div>
  )
}
