import { CROWDS } from '@/data/crowds'
import { OPEN_IPFS_GATEWAY_HOSTNAME } from '@/lib/ipfs'
import { publicClient } from '@/lib/viem/publicClient'
import { JBProjectMetadata, getProjectMetadata } from 'juice-hooks'
import { GetStaticPaths, GetStaticProps } from 'next'

interface ProjectPageProps {
  metadata: JBProjectMetadata & {
    // TODO: add to juice-hooks
    domain: string | undefined
    infoUri: string
    introImageUri: string | undefined
    introVideoUrl: string | undefined
    softTargetAmount: string | undefined
    softTargetCurrency: string | undefined
  }
  projectId: number
}

export const DREAM_DAO = 600n

const ALLOWLIST_PROJECT_IDS = [
  /**
   * DREAM DAO is required for hard code due to a bug in juicebox that
   * accidentally wiped out its domain metadata.
   */
  Number(DREAM_DAO),
]

const getStaticPaths: GetStaticPaths = async () => {
  if (process.env.CI) {
    return { paths: [], fallback: 'blocking' }
  }

  const paths = CROWDS.flatMap(c => c.projectIds).map(projectId => ({
    params: { projectId: String(projectId) },
  }))
  return { paths, fallback: 'blocking' }
}

const getStaticProps: GetStaticProps<ProjectPageProps> = async context => {
  if (!context.params) throw new Error('params not supplied')

  const projectId = parseInt(context.params.projectId as string)
  try {
    const metadata = await getProjectMetadata(
      publicClient,
      {
        projectId: BigInt(projectId),
        domain: 0n,
      },
      {
        ipfsGatewayHostname: OPEN_IPFS_GATEWAY_HOSTNAME!,
      },
    )

    console.info('getStaticProps::metadata', metadata)

    if (!metadata) {
      return { notFound: true }
    }

    if (
      metadata.domain !== 'juicecrowd' &&
      process.env.NODE_ENV !== 'development' &&
      !ALLOWLIST_PROJECT_IDS.includes(projectId)
    ) {
      return { notFound: true }
    }

    return {
      revalidate: 60,
      props: {
        metadata,
        projectId,
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

export type { ProjectPageProps }

export {
  getStaticPaths as projectGetStaticPaths,
  getStaticProps as projectGetStaticProps,
}
