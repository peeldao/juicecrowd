import { EthUsdPriceProvider } from '@/components/EthUsdPriceProvider'
import { ProjectPaySuccessPage } from '@/components/Project/ProjectPaySuccessPage'
import { SEO } from '@/components/SEO'
import { Layout } from '@/components/layout'
import { JBProjectMetadataProvider } from '@/contexts/ProjectMetadata'
import {
  projectGetStaticPaths,
  projectGetStaticProps,
} from '@/lib/backend/projects/static'
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
      <SEO
        title="Project paid successfully!"
        description="Pay project description"
      />
      <Layout footer="none" navbar="minimal">
        <EthUsdPriceProvider>
          <JBProjectProvider projectId={pid}>
            <JBProjectMetadataProvider metadata={metadata}>
              <ProjectPaySuccessPage />
            </JBProjectMetadataProvider>
          </JBProjectProvider>
        </EthUsdPriceProvider>
      </Layout>
    </>
  )
}

export default Page
