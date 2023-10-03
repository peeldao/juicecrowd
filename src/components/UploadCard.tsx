import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import { UploadIcon } from './icon/UploadIcon'

export type UploadCardProps = {
  className?: string
  recommendedSize?: {
    width: number
    height: number
  }
}

export const UploadCard: React.FC<UploadCardProps> = ({
  className,
  recommendedSize,
}) => {
  const recommendedSizeText = useMemo(() => {
    if (!recommendedSize) return null
    return `${recommendedSize.width}x${recommendedSize.height}px`
  }, [recommendedSize])

  return (
    <button
      className={twMerge(
        'border border-dashed border-gray-300 rounded-lg focus:outline-none focus:border-blue-500',
        className,
      )}
    >
      <div className="flex flex-col p-6 items-center">
        <UploadIcon className="h-10 w-10" />
        <div className="text-blue-600 font-medium mt-3">Click to upload</div>
        <div className="text-gray-600 text-xs mt-1">
          SVG, PNG, JPG or GIF{' '}
          {recommendedSizeText && `(${recommendedSizeText})`}
        </div>
      </div>
    </button>
  )
}
