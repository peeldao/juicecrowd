import { EthUsdPriceProvider } from '@/components/EthUsdPriceProvider'
import { ProjectPayPage } from '@/components/Project/ProjectPayPage'
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
        title={`Pay ${name}`}
        description={`Make a payment to ${name} and get rewards!`}
      />
      <AppProvider projectId={pid} metadata={metadata}>
        <Layout footer="none" navbar="minimal">
          <ProjectPayPage />
        </Layout>
      </AppProvider>
    </>
  )
}

export default Page
