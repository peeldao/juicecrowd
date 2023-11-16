import { Button } from '@/components/ui/Button'
import { HaloEmphasisIcon } from '@/components/HaloEmphasis'
import { InfoBadge } from '@/components/badges'
import { PlusIcon } from '@heroicons/react/24/outline'
import { twMerge } from 'tailwind-merge'

export const RewardsPanel: React.FC = () => {
  return (
    <div className="flex flex-col">
      <div className="flex gap-2">
        <h2 className="font-agrandir text-2xl font-medium">Rewards</h2>
        <InfoBadge>Optional</InfoBadge>
      </div>
      <div className="mt-3 text-gray-600">
        Reward your supporters with custom NFTs.
      </div>
      <AddNftButton className="mt-8 flex-1" />

      <Button className="mt-12 w-fit self-end">Next: Rewards</Button>
    </div>
  )
}

type AddNftButtonProps = {
  className?: string
}

const AddNftButton: React.FC<AddNftButtonProps> = ({ className }) => {
  return (
    <button
      className={twMerge(
        // TODO: Should be bg-blue-25
        'flex flex-col items-center rounded-lg border border-dashed border-blue-300 bg-blue-50 py-6 focus:border-blue-500',
        className,
      )}
    >
      {/* TODO: This currently looks wrong because of the bg-blue-50, once 25 it'll be fine */}
      <HaloEmphasisIcon icon={PlusIcon} className="h-10 w-10" />
      <div className="mt-3 font-medium text-blue-700">Add NFT</div>
      <div className="mt-1 text-xs text-gray-500">
        SVG, PNG, JPG, MP4 or GIF supported.
      </div>
    </button>
  )
}
