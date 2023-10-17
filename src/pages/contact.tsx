import { ContactPage } from '@/components/Contact'
import { SEO } from '@/components/SEO'
import { Layout } from '@/components/layout'

export function Page() {
  return (
    <>
      <SEO
        title="Contact"
        description="Contact us for more information about our services and products. We are here to help you with your business needs."
      />
      <Layout>
        <ContactPage />
      </Layout>
    </>
  )
}

export default Page
