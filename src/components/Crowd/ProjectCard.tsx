import { useFormattedEthAddress } from 'juice-hooks'
import { CrowdPageProject } from '@/lib/backend/static/crowds'
import { ipfsUriToGatewayUrl } from '@/lib/ipfs'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export function ProjectCard({
  id,
  name,
  ownerAddress,
  logoUri,
}: CrowdPageProject) {
  const [imgError, setImgError] = useState<boolean>(false)

  const { data: formattedOwnerAddress } = useFormattedEthAddress(ownerAddress)

  return (
    <Link href={`/p/${id}`}>
      <div className="group relative flex h-64 w-64 overflow-hidden rounded-xl md:h-72 md:w-72">
        {!imgError ? (
          <Image
            src={ipfsUriToGatewayUrl(logoUri)}
            className="absolute h-full w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105"
            fill
            alt={`${name}'s project logo`}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute h-full w-full bg-bluebs-500" />
        )}

        <div className="z-10 flex h-full w-full flex-col justify-between bg-gradient-to-t from-[#000000bf] to-transparent p-4">
          {/* todo current volume here */}
          <div></div>
          <div className="text-white">
            <div className="font-medium">{name}</div>
            <div className="text-xs opacity-70">{formattedOwnerAddress}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
