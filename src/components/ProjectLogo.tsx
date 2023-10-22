import { cidFromUrl, ipfsGatewayUrl, ipfsUriToGatewayUrl } from '@/lib/ipfs'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'

// Override some project logos.
const IMAGE_URI_OVERRIDES: { [k: number]: string } = {
  1: '/assets/images/juiceboxdao_logo.webp', // the on-chain logo's filesize is too large. This is a smaller version.
}

export default function ProjectLogo({
  className,
  uri,
  name,
  projectId,
  lazyLoad,
  fallback = '🧃',
}: {
  name: string | undefined
  className?: string
  uri?: string | undefined
  projectId?: bigint | undefined
  lazyLoad?: boolean
  fallback?: string | JSX.Element | null
}) {
  const [srcLoadError, setSrcLoadError] = useState(false)

  const imageSrc = useMemo(() => {
    if (projectId && IMAGE_URI_OVERRIDES[Number(projectId)]) {
      return IMAGE_URI_OVERRIDES[Number(projectId)]
    }

    if (!uri) return undefined

    // Some older JB projects have a logo URI hardcoded to use Pinata.
    // JBM no longer uses Pinata.
    // This rewrites those URLs to use the Infura gateway.
    if (uri.startsWith('https://jbx.mypinata.cloud')) {
      const cid = cidFromUrl(uri)
      return ipfsGatewayUrl(cid)
    }

    return ipfsUriToGatewayUrl(uri)
  }, [uri, projectId])

  const validImg = imageSrc && !srcLoadError

  return (
    <div
      className={twMerge(
        'flex h-20 w-20 items-center justify-center overflow-hidden rounded-lg text-4xl',
        'bg-gray-100',
        className,
      )}
    >
      {validImg ? (
        <Image
          fill
          className="h-full w-full object-cover object-center"
          src={imageSrc}
          alt={name + ' logo'}
          onError={() => setSrcLoadError(true)}
          loading={lazyLoad ? 'lazy' : undefined}
          crossOrigin="anonymous"
          title={name}
        />
      ) : null}

      {!validImg ? <span title={name}>{fallback}</span> : null}
    </div>
  )
}
