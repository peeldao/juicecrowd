import { ProjectPage } from '@/components/Project'
import { SEO } from '@/components/SEO'
import { Layout } from '@/components/layout'
import { getProjectMetadata } from '@/lib/backend/juicebox/metadata'
import { JBProjectMetadata, JBProjectProvider } from 'juice-hooks'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'

export interface ProjectPageProps {
  metadata?: JBProjectMetadata
  projectId: bigint
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const projects = await paginateDepleteProjectsQueryCall({
  //   variables: { where: { pv: PV_V2 } },
  // });

  const projects = [{ projectId: 1 }] // TODO update with real data

  const paths = projects.map(({ projectId }) => ({
    params: { projectId: String(projectId) },
  }))
  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps<
  ProjectPageProps
> = async context => {
  if (!context.params) throw new Error('params not supplied')

  const projectId = BigInt(context.params.projectId as string)
  try {
    const metadata = await getProjectMetadata(projectId)
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

export default function Page({
  projectId,
  metadata,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(metadata)

  return (
    <>
      {/* // TODO: port over project seo from juicebox? */}
      <SEO title="Project" description="Project description" />
      <Layout navbar="minimal" footer="minimal">
        <JBProjectProvider projectId={projectId}>
          <ProjectPage />
        </JBProjectProvider>
      </Layout>
    </>
  )
}
