import { ContactPage } from '@/components/Contact'
import { SEO } from '@/components/SEO'
import { AppProvider } from '@/components/layout/AppProvider'

export function Page() {
  return (
    <>
      <SEO
        title="Contact"
        description="Contact us for more information about our services and products. We are here to help you with your business needs."
      />
      <AppProvider>
        <ContactPage />
      </AppProvider>
    </>
  )
}

export default Page
