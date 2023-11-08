import { EthUsdPriceProvider } from '@/components/EthUsdPriceProvider'
import { ManageDashboard } from '@/components/ManageProject/ManageDashboard'
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

export default function Page({
  projectId,
  metadata,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const pid = projectId ? BigInt(projectId) : 0n
  return (
    <>
      <SEO
        title="Manage project"
        description="Manage your Juicecrowd project"
      />
      <Layout navbar="none" footer="minimal">
        <EthUsdPriceProvider>
          <JBProjectProvider projectId={pid}>
            <JBProjectMetadataProvider metadata={metadata}>
              <ManageDashboard />
            </JBProjectMetadataProvider>
          </JBProjectProvider>
        </EthUsdPriceProvider>
      </Layout>
    </>
  )
}
