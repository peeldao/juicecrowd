import { EthUsdPriceProvider } from '@/components/EthUsdPriceProvider'
import { ProjectPage } from '@/components/Project'
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
        title={metadata.name ? metadata.name : 'Juicecrowd Project'}
        description={
          metadata.description ? metadata.description.slice(0, 160) : ''
        }
      />
      <Layout navbar="minimal" footer="minimal">
        <EthUsdPriceProvider>
          <JBProjectProvider projectId={pid}>
            <JBProjectMetadataProvider metadata={metadata}>
              <ProjectPage />
            </JBProjectMetadataProvider>
          </JBProjectProvider>
        </EthUsdPriceProvider>
      </Layout>
    </>
  )
}
