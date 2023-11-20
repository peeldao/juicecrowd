import { useJbProject } from '@/hooks/useJbProject'
import { ipfsUriToGatewayUrl } from '@/lib/ipfs'
import Image from 'next/image'
import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'

export const CoverPhoto = () => {
  const { coverImageUri: coverImageUri, name } = useJbProject()
  const coverImageUrl = useMemo(() => {
    return coverImageUri ? ipfsUriToGatewayUrl(coverImageUri) : undefined
  }, [coverImageUri])
  const coverImageAltText = `Cover image for project ${name}`
  const hasCoverImage = !!coverImageUrl

  return (
    <div
      className={twMerge(
        'relative w-full',
        hasCoverImage ? 'h-72 bg-orange-200 md:h-72' : 'h-[168px]',
      )}
    >
      {coverImageUrl && (
        <>
          <Image
            fill
            src={coverImageUrl}
            className={twMerge(
              'w-full object-cover',
              hasCoverImage ? 'h-72' : 'h-[168px]',
            )}
            crossOrigin="anonymous"
            alt={coverImageAltText}
          />
          <div className="absolute h-72 w-full bg-black opacity-30" />
        </>
      )}
    </div>
  )
}
