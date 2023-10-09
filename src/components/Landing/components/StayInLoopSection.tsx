import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { twMerge } from 'tailwind-merge'

export type StayInLoopSectionProps = {
  className?: string
}

export const StayInLoopSection: React.FC<StayInLoopSectionProps> = ({
  className,
}) => {
  return (
    <div
      className={twMerge('bg-gray-800 px-5 py-12 text-sm md:px-12', className)}
    >
      <div className="m-auto flex max-w-6xl flex-col items-start justify-between gap-7 md:flex-row md:items-center md:gap-5">
        <div>
          <h3 className="pb-2 font-heading text-2xl font-medium text-white">
            Want to stay in the loop?
          </h3>
          <div className="text-gray-400">
            Be the first to know about new crowds, features and launches.
          </div>
        </div>
        <div className="flex w-full flex-1 flex-col justify-end gap-3 md:flex-row">
          <Input
            placeholder="Enter your email"
            className="border-gray-500 bg-transparent text-base text-white outline-2 md:max-w-xs"
          />
          <Button>Subscribe</Button>
        </div>
      </div>
    </div>
  )
}
