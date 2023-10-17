import { ContactPage } from '@/components/Contact'
import { SEO } from '@/components/SEO'
import { Layout } from '@/components/layout'

export function Page() {
  return (
    <>
      <SEO
        title="Contact"
        description="Contact us to learn more about how Juicecrowd can help your crypto crowdfunding campaign"
      />
      <Layout>
        <ContactPage />
      </Layout>
    </>
  )
}

export default Page
