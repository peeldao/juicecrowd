import { ContactPage } from '@/components/Contact'
import { SEO } from '@/components/SEO'
import { Layout } from '@/components/layout'
import { AppProvider } from '@/components/layout/AppProvider'

export function Page() {
  return (
    <>
      <SEO
        title="Contact"
        description="Contact us to learn more about how Juicecrowd can help your crypto crowdfunding campaign."
      />
      <AppProvider>
        <Layout>
          <ContactPage />
        </Layout>
      </AppProvider>
    </>
  )
}

export default Page
