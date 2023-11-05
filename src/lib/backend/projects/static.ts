import { OPEN_IPFS_GATEWAY_HOSTNAME } from '@/lib/ipfs'
import { publicClient } from '@/lib/viem/publicClient'
import { JBProjectMetadata, getProjectMetadata } from 'juice-hooks'
import { GetStaticPaths, GetStaticProps } from 'next'

interface ProjectPageProps {
  metadata: JBProjectMetadata & {
    // TODO: add to juice-hooks
    infoUri: string
    introVideoUrl: string | undefined
    softTargetAmount: string | undefined
    softTargetCurrency: string | undefined
  }
  projectId: number
}

const getStaticPaths: GetStaticPaths = async () => {
  // const projects = await paginateDepleteProjectsQueryCall({
  //   variables: { where: { pv: PV_V2 } },
  // });

  const projects = [
    {
      projectId: 578, // a project with NFTS
    },
  ]

  // TODO: Disable for now
  const paths = projects.map(({ projectId }) => ({
    params: { projectId: String(projectId) },
  }))
  return { paths: [], fallback: 'blocking' }
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
    if (!metadata) {
      return { notFound: true }
    }

    return {
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
