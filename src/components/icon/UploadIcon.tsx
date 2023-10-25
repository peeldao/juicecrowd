import { CloudArrowUpIcon } from '@heroicons/react/24/outline'
import { twMerge } from 'tailwind-merge'

export type UploadIconProps = {
  className?: string
}

export const UploadIcon: React.FC<UploadIconProps> = ({ className }) => {
  return (
    <div
      className={twMerge(
        'rounded-full bg-blue-50 flex items-center justify-center',
        className,
      )}
    >
      <div className="h-3/4 w-3/4 rounded-full bg-blue-100 flex items-center justify-center">
        <CloudArrowUpIcon className="h-2/3 w-2/3 text-blue-600" />
      </div>
    </div>
  )
}
