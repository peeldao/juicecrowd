import { CrowdPage } from '@/components/Crowd'
import { EthUsdPriceProvider } from '@/components/EthUsdPriceProvider'
import { SEO } from '@/components/SEO'
import { Layout } from '@/components/layout'
import { AppProvider } from '@/components/layout/AppProvider'
import {
  crowdGetStaticPaths,
  crowdGetStaticProps,
} from '@/lib/backend/static/crowds'
import { InferGetStaticPropsType } from 'next'

export const getStaticPaths = crowdGetStaticPaths
export const getStaticProps = crowdGetStaticProps

export default function Page({
  crowd,
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <SEO title={crowd.name} description={crowd.description} />
      <AppProvider>
        <Layout>
          <CrowdPage crowd={crowd} projects={projects} />
        </Layout>
      </AppProvider>
    </>
  )
}
