import { useJbProject } from '@/hooks/useJbProject'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import { RewardCard, RewardCardSkeleton } from './RewardCard'
import { useEffect, useMemo, useState } from 'react'

export type RewardsProps = {
  className?: string
}

export const Rewards: React.FC<RewardsProps> = ({ className }) => {
  const { nftData } = useJbProject()
  const [initialNftDataLoaded, setInitialNftDataLoaded] = useState(false)

  useEffect(() => {
    // This is making assumption that nftData.isLoading is initially false
    if (!nftData.isLoading) return
    setInitialNftDataLoaded(true)
  }, [nftData.isLoading])

  if (nftData.isLoading || !initialNftDataLoaded) {
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
        <div className="font-medium text-gray-400">
          This project has no rewards.
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
