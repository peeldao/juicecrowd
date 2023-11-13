import { CrowdsPage } from '@/components/Crowds'
import { SEO } from '@/components/SEO'
import { Layout } from '@/components/layout'
import { AppProvider } from '@/components/layout/AppProvider'

export function Page() {
  return (
    <>
      <SEO
        title="JC01 Submission"
        description="Submit your project to be part of Juicecrowd's crypto crowdfunding program."
      />
      <AppProvider>
        <Layout>
          <CrowdsPage />
        </Layout>
      </AppProvider>
    </>
  )
}

export default Page
