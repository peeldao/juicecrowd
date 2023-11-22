import { Input } from '@/components/Input'
import { Link } from '@/components/Link'
import { useIpfsFilePicker } from '@/hooks/useIpfsFilePicker/useIpfsFilePicker'
import { XCircleIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

export type ProjectPayMessageInputProps = {
  attachedUrl: string | undefined
  setAttachedUrl: (url: string | undefined) => void
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'>

export const ProjectPayMessageInput: React.FC<ProjectPayMessageInputProps> = ({
  className,
  attachedUrl,
  setAttachedUrl,
  ...props
}) => {
  const acceptedFileTypes = 'image/jpeg,image/png,image/gif'
  const {
    uploadedUrl,
    isUploading,
    selectedFile,
    uploadProgress,
    FileInput,
    openFilePicker,
    cancelUpload,
    removeFile,
  } = useIpfsFilePicker({
    accept: acceptedFileTypes,
    onFileUrlChange: url => setAttachedUrl(url),
  })
  return (
    <>
      {FileInput}
      <Input
        className="text-sm"
        placeholder="Attach an onchain message to this payment"
        // suffix={
        //   <Button
        //     type="button"
        //     size="child"
        //     variant="link"
        //     onClick={openFilePicker}
        //   >
        //     <PhotoIcon className="h-6 w-6 text-bluebs-500" />
        //   </Button>
        // }
        {...props}
      />

      {isUploading ? (
        <div>
          <div className="mt-2 flex items-center justify-between">
            <div className="h-1 flex-1">
              <div
                role="progressbar"
                className="relative h-full w-full overflow-hidden rounded-lg bg-gray-200"
              >
                <div
                  className="absolute left-0 top-0 h-full bg-bluebs-500"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
            <button
              type="button"
              className="h-fit p-0"
              onClick={cancelUpload}
              aria-label="Cancel upload"
            >
              <XCircleIcon className="ml-4 h-5 w-5 flex-none text-gray-400" />
            </button>
          </div>
        </div>
      ) : (
        uploadedUrl &&
        selectedFile && (
          <div className="mt-4 flex">
            <div className="relative h-12 w-12 overflow-hidden rounded-md">
              <Image
                fill
                className="absolute h-full w-full object-cover"
                src={uploadedUrl}
                alt={selectedFile.name}
              />
            </div>
            <button
              type="button"
              className="h-fit p-0"
              onClick={removeFile}
              aria-label="Remove attached file"
            >
              <XCircleIcon className="ml-2 h-5 w-5 flex-none text-gray-400" />
            </button>
            <span className="ml-8 max-w-xs truncate text-xs text-gray-500">
              Uploaded to: <Link href={uploadedUrl}>{uploadedUrl}</Link>
            </span>
          </div>
        )
      )}
    </>
  )
}
