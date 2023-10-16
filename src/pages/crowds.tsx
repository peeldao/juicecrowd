import { CrowdsPage } from '@/components/Crowds'
import { SEO } from '@/components/SEO'
import { AppProvider } from '@/components/layout/AppProvider'

export function Page() {
  return (
    <>
      <SEO
        title="JC01 Submission"
        description="JC01 Crowd submission is now open! Submit your project to be part of the JC01 Crowd."
      />
      <AppProvider>
        <CrowdsPage />
      </AppProvider>
    </>
  )
}

export default Page
