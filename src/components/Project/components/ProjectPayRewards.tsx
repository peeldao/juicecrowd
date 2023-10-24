import { useJbProject } from '@/hooks/useJbProject'
import { twMerge } from 'tailwind-merge'
import { PayRewardCard } from './PayRewardCard'

export type ProjectPayRewardsProps = {
  className?: string
}

export const ProjectPayRewards: React.FC<ProjectPayRewardsProps> = ({
  className,
}) => {
  const { nfts } = useJbProject()

  return (
    <div className={twMerge('flex flex-col gap-3', className)}>
      {nfts?.map(nft => <PayRewardCard key={nft.id} nft={nft} />)}
    </div>
  )
}
