import { useJbProject } from '@/hooks/useJbProject'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import { RewardCard, RewardCardSkeleton } from './RewardCard'

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
    return (
      <div
        className={twMerge(
          'mb-12 mt-8 flex flex-col items-center gap-8',
          className,
        )}
      >
        <Image
          src="/assets/images/bag-of-eth.png"
          width={162}
          height={189}
          alt="Empty"
        />
        <div className="font-medium text-gray-400">
          This project has no rewards
        </div>
      </div>
    )
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
