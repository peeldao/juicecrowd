import { SubmitJc01SuccessPage } from '@/components/SubmitSuccess'
import { Layout } from '@/components/layout'
import { AppProvider } from '@/components/layout/AppProvider'

export default function Page() {
  return (
    <AppProvider>
      <Layout footer="none">
        <SubmitJc01SuccessPage />
      </Layout>
    </AppProvider>
  )
}
