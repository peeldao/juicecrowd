import { CrowdPage } from '@/components/Crowd'
import { SEO } from '@/components/SEO'
import { Layout } from '@/components/layout'
import {
  crowdGetStaticPaths,
  crowdGetStaticProps,
} from '@/lib/backend/static/crowds'
import { useProjectsQuery } from '@/lib/graphql/hooks'
import { PV2 } from 'juice-hooks'
import { InferGetStaticPropsType } from 'next'

export const getStaticPaths = crowdGetStaticPaths
export const getStaticProps = crowdGetStaticProps

export default function Page({
  crowd,
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <SEO title="Project" description="Project description" />
      <Layout>
        <CrowdPage crowd={crowd} projects={projects} />
      </Layout>
    </>
  )
}
