import { ManageProjectGeneralSettingsPage } from '@/components/ManageProject/ManageProjectGeneralSettingsPage'
import { SEO } from '@/components/SEO'
import { Layout } from '@/components/layout'
import { AppProvider } from '@/components/layout/AppProvider'
import {
  projectGetStaticPaths,
  projectGetStaticProps,
} from '@/lib/backend/static/projects'
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
        title="Edit General Settings - Manage project"
        description="Edit your Juicerowd basic settings"
      />
      <AppProvider projectId={pid} metadata={metadata}>
        <Layout navbar="none" footer="none">
          <ManageProjectGeneralSettingsPage />
        </Layout>
      </AppProvider>
    </>
  )
}
