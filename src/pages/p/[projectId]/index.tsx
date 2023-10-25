import { ProjectPage } from '@/components/Project'
import { SEO } from '@/components/SEO'
import { Layout } from '@/components/layout'
import { JBProjectMetadataContext } from '@/contexts/ProjectMetadata'
import {
  projectGetStaticPaths,
  projectGetStaticProps,
} from '@/lib/backend/projects/static'
import { JBProjectProvider } from 'juice-hooks'
import { InferGetStaticPropsType } from 'next'

export const getStaticPaths = projectGetStaticPaths
export const getStaticProps = projectGetStaticProps

export default function Page({
  projectId,
  metadata,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const pid = projectId ? BigInt(projectId) : 0n
  return (
    <>
      {/* // TODO: port over project seo from juicebox? */}
      <SEO title="Project" description="Project description" />
      <Layout navbar="minimal" footer="minimal">
        <JBProjectProvider projectId={pid}>
          <JBProjectMetadataContext.Provider value={metadata}>
            <ProjectPage />
          </JBProjectMetadataContext.Provider>
        </JBProjectProvider>
      </Layout>
    </>
  )
}