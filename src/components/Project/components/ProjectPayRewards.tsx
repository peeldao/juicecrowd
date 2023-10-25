import { useJbProject } from '@/hooks/useJbProject'
import { twMerge } from 'tailwind-merge'
import { PayRewardCard } from './PayRewardCard'
import { useProjectPay } from '../providers/ProjectPayContext'
import { useCallback } from 'react'

export type ProjectPayRewardsProps = {
  className?: string
}

export const ProjectPayRewards: React.FC<ProjectPayRewardsProps> = ({
  className,
}) => {
  const { nfts } = useJbProject()
  const { dispatch, nftRewardIds: selectedNftIds } = useProjectPay()

  const isSelected = useCallback(
    (nftId: bigint) => selectedNftIds.includes(nftId),
    [selectedNftIds],
  )

  const toggleNft = useCallback(
    (nftId: bigint) => {
      if (isSelected(nftId)) {
        dispatch({ type: 'removeNftReward', id: nftId })
        return
      }
      dispatch({ type: 'addNftReward', id: nftId })
    },
    [dispatch, isSelected],
  )

  return (
    <div className={twMerge('flex flex-col gap-3', className)}>
      {nfts?.map(nft => (
        <PayRewardCard
          key={nft.id}
          nft={nft}
          isSelected={isSelected(nft.id)}
          onClick={() => toggleNft(nft.id)}
        />
      ))}
    </div>
  )
}
