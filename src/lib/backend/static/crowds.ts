import { CROWDS } from '@/data/crowds'
import { OPEN_IPFS_GATEWAY_HOSTNAME } from '@/lib/ipfs'
import { publicClient } from '@/lib/viem/publicClient'
import { getProjectMetadata } from 'juice-hooks'
import { GetStaticPaths, GetStaticProps } from 'next'

export interface CrowdPageProject {
  id: number
  name: string
  logoUri: string
  owner: string
}

interface CrowdPageProps {
  crowdId: number
  projects: CrowdPageProject[]
}

const getStaticPaths: GetStaticPaths = async () => {
  const paths = CROWDS.map(({ id: crowdId }) => ({
    params: { crowdId: String(crowdId) },
  }))

  return { paths, fallback: 'blocking' }
}

const getStaticProps: GetStaticProps<CrowdPageProps> = async context => {
  if (!context.params) throw new Error('params not supplied')

  const crowdId = parseInt(context.params.crowdId as string)
  const { projectIds } = CROWDS.find(({ id }) => id === crowdId) ?? {}
  if (!projectIds)
    return {
      notFound: true,
    }

  const projects = await Promise.all(
    projectIds.map(async projectId => {
      const [metadata, owner] = await Promise.all([
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
        // TODO fetch from chain
        Promise.resolve('todo.eth'),
      ])

      return {
        id: projectId,
        name: metadata.name,
        logoUri: metadata.logoUri,
        owner,
      }
    }),
  )

  try {
    return {
      props: {
        crowdId,
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
