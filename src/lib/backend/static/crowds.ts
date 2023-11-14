import { CROWDS, Crowd } from '@/data/crowds'
import { OPEN_IPFS_GATEWAY_HOSTNAME } from '@/lib/ipfs'
import { publicClient } from '@/lib/viem/publicClient'
import { getProjectMetadata, readJbProjects } from 'juice-hooks'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Address } from 'viem'

export interface CrowdPageProject {
  id: number
  name: string
  logoUri: string
  ownerAddress: Address
  volumeUsd?: bigint
}

interface CrowdPageProps {
  crowd: Crowd
  projects: CrowdPageProject[]
}

const getStaticPaths: GetStaticPaths = async () => {
  if (process.env.CI) {
    return { paths: [], fallback: 'blocking' }
  }

  const paths = CROWDS.map(({ id: crowdId }) => ({
    params: { crowdId: String(crowdId) },
  }))

  return { paths, fallback: 'blocking' }
}

const getStaticProps: GetStaticProps<CrowdPageProps> = async context => {
  if (!context.params) throw new Error('params not supplied')

  const crowdId = parseInt(context.params.crowdId as string)
  const crowd = CROWDS.find(({ id }) => id === crowdId)
  if (!crowd) {
    return {
      notFound: true,
    }
  }

  const projects = await Promise.all(
    crowd.projectIds.map(async projectId => {
      const [metadata, ownerAddress] = await Promise.all([
        getProjectMetadata(
          publicClient,
          {
            projectId: BigInt(projectId),
            domain: 0n,
          },
          {
            ipfsGatewayHostname: OPEN_IPFS_GATEWAY_HOSTNAME!,
          },
        ),
        readJbProjects({
          chainId: publicClient.chain.id,
          functionName: 'ownerOf',
          args: [BigInt(projectId)],
        }),
      ])

      return {
        id: projectId,
        name: metadata.name,
        logoUri: metadata.logoUri,
        ownerAddress,
      }
    }),
  )

  try {
    return {
      props: {
        crowd,
        projects,
      },
    }
  } catch (e: any) {
    if (
      e?.response?.status === 404 ||
      e?.response?.status === 400 ||
      e?.response?.status === 403
    ) {
      return { notFound: true }
    }

    throw e
  }
}

export type { CrowdPageProps }

export {
  getStaticPaths as crowdGetStaticPaths,
  getStaticProps as crowdGetStaticProps,
}
