import { ProjectPage } from '@/components/Project'
import { SEO } from '@/components/SEO'
import { Layout } from '@/components/layout'
import { JBProjectProvider } from 'juice-hooks'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'

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

export const getStaticProps: GetStaticProps<{
  projectId: number
}> = async context => {
  if (!context.params) throw new Error('params not supplied')

  const projectId = parseInt(context.params.projectId as string)

  return {
    props: {
      projectId,
    },
  }
}

export default function Page({
  projectId,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      {/* // TODO: port over project seo from juicebox? */}
      <SEO title="Project" description="Project description" />
      <Layout navbar="minimal" footer="minimal">
        <JBProjectProvider projectId={1n}>
          <ProjectPage />
        </JBProjectProvider>
      </Layout>
    </>
  )
}
