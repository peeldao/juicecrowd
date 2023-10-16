import { ContactPage } from '@/components/Contact'
import { SEO } from '@/components/SEO'

export function Page() {
  return (
    <>
      <SEO
        title="Contact"
        description="Contact us for more information about our services and products. We are here to help you with your business needs."
      />
      <ContactPage />
    </>
  )
}

export default Page
