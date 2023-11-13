import { SubmitClosedPage } from '@/components/SubmitClosed/SubmitClosedPage'
import { Layout } from '@/components/layout'
import { AppProvider } from '@/components/layout/AppProvider'

export default function Page() {
  return (
    <AppProvider>
      <Layout footer="none">
        <SubmitClosedPage />
      </Layout>
    </AppProvider>
  )
}
