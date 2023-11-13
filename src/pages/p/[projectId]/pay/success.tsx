import { EthUsdPriceProvider } from '@/components/EthUsdPriceProvider'
import { ProjectPaySuccessPage } from '@/components/Project/ProjectPaySuccessPage'
import { SEO } from '@/components/SEO'
import { Layout } from '@/components/layout'
import { AppProvider } from '@/components/layout/AppProvider'
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
  const name = metadata.name ? metadata.name : 'Juicecrowd project'
  return (
    <>
      <SEO
        title={`${name} paid successfully`}
        description={`You have successfully paid ${name}!`}
      />
      <AppProvider projectId={pid} metadata={metadata}>
        <Layout footer="none" navbar="minimal">
          <ProjectPaySuccessPage />
        </Layout>
      </AppProvider>
    </>
  )
}

export default Page
