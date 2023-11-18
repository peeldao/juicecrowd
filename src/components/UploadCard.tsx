import { useIpfsFilePicker } from '@/hooks/useIpfsFilePicker/useIpfsFilePicker'
import { ipfsUriToGatewayUrl } from '@/lib/ipfs'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import { UploadIcon } from './icon/UploadIcon'
import { Progress } from './ui/Progress'
import { Skeleton } from './ui/Skeleton'

export type UploadCardProps = {
  className?: string
  recommendedSize?: {
    width: number
    height: number
  }
  value?: string | undefined
  onChange?: (value: string | undefined) => void
}

export const UploadCard: React.FC<UploadCardProps> = ({
  className,
  recommendedSize,
  value,
  onChange,
}) => {
  const acceptedFileTypes = 'image/jpeg,image/png,image/gif'
  const {
    isUploading,
    uploadProgress,
    FileInput,
    openFilePicker,
    cancelUpload,
    removeFile,
  } = useIpfsFilePicker({
    accept: acceptedFileTypes,
    onFileUrlChange: url => onChange?.(url),
  })

  const imageUrl = useMemo(() => {
    if (value) return ipfsUriToGatewayUrl(value)
  }, [value])

  const recommendedSizeText = useMemo(() => {
    if (!recommendedSize) return null
    return `${recommendedSize.width}x${recommendedSize.height}px`
  }, [recommendedSize])

  if (isUploading) {
    return (
      <div
        className={twMerge(
          'relative h-[140px] w-[180px] overflow-hidden rounded-lg',
          className,
        )}
      >
        <Skeleton className="h-full w-full" />
        <Progress
          className="absolute left-0 top-full h-1 w-full -translate-y-1"
          value={uploadProgress}
        />
        <button
          type="button"
          className="absolute -right-1 -top-1 rounded-lg bg-white p-2"
          onClick={() => {
            cancelUpload()
          }}
        >
          <XMarkIcon className="h-5 w-5 text-gray-500" />
        </button>
      </div>
    )
  }

  if (imageUrl) {
    return (
      <div
        className={twMerge(
          'relative h-[140px] w-[180px] overflow-hidden rounded-lg',
          className,
        )}
      >
        <Image
          fill
          className="object-cover"
          src={imageUrl}
          alt={'Uploaded file'}
        />
        <button
          type="button"
          className="absolute -right-1 -top-1 rounded-lg bg-white p-2"
          onClick={() => {
            removeFile()
            onChange?.('')
          }}
        >
          <XMarkIcon className="h-5 w-5 text-gray-500" />
        </button>
      </div>
    )
  }

  return (
    <>
      {FileInput}

      <button
        type="button"
        className={twMerge(
          'rounded-lg border border-dashed border-gray-300 focus:border-blue-500 focus:outline-none',
          className,
        )}
        onClick={openFilePicker}
      >
        <div className="flex flex-col items-center p-6">
          <UploadIcon className="h-10 w-10" />
          <div className="mt-3 font-medium text-blue-600">Click to upload</div>
          <div className="mt-1 text-xs text-gray-600">
            SVG, PNG, JPG or GIF{' '}
            {recommendedSizeText && `(${recommendedSizeText})`}
          </div>
        </div>
      </button>
    </>
  )
}
