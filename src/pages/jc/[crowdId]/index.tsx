import { CrowdPage } from '@/components/Crowd'
import { SEO } from '@/components/SEO'
import { Layout } from '@/components/layout'
import {
  crowdGetStaticPaths,
  crowdGetStaticProps,
} from '@/lib/backend/static/crowds'
import { InferGetStaticPropsType } from 'next'

export const getStaticPaths = crowdGetStaticPaths
export const getStaticProps = crowdGetStaticProps

export default function Page({
  crowdId,
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <SEO title="Project" description="Project description" />
      <Layout navbar="minimal" footer="minimal">
        <CrowdPage crowdId={crowdId} projects={projects} />
      </Layout>
    </>
  )
}
