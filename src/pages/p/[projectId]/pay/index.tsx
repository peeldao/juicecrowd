import { EthUsdPriceProvider } from '@/components/EthUsdPriceProvider'
import { ProjectPayPage } from '@/components/Project/ProjectPayPage'
import { SEO } from '@/components/SEO'
import { Layout } from '@/components/layout'
import { JBProjectMetadataProvider } from '@/contexts/ProjectMetadata'
import {
  projectGetStaticPaths,
  projectGetStaticProps,
} from '@/lib/backend/static/projects'
import { JBProjectProvider } from 'juice-hooks'
import { InferGetStaticPropsType } from 'next'

export const getStaticPaths = projectGetStaticPaths
export const getStaticProps = projectGetStaticProps

export function Page({
  projectId,
  metadata,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const pid = projectId ? BigInt(projectId) : 0n
  return (
    <>
      {/* // TODO: port over project seo from juicebox? */}
      <SEO title="Pay project" description="Pay project description" />
      <Layout footer="none" navbar="minimal">
        <EthUsdPriceProvider>
          <JBProjectProvider projectId={pid}>
            <JBProjectMetadataProvider metadata={metadata}>
              <ProjectPayPage />
            </JBProjectMetadataProvider>
          </JBProjectProvider>
        </EthUsdPriceProvider>
      </Layout>
    </>
  )
}

export default Page
