import { LandingPage } from '@/components/Landing'
import { Layout } from '@/components/layout'
import { AppProvider } from '@/components/layout/AppProvider'

export function Page() {
  return (
    <AppProvider>
      <Layout>
        <LandingPage />
      </Layout>
    </AppProvider>
  )
}

export default Page
