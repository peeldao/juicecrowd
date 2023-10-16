import { LandingPage } from '@/components/Landing'
import { AppProvider } from '@/components/layout/AppProvider'

export function Page() {
  return (
    <>
      <AppProvider>
        <LandingPage />
      </AppProvider>
    </>
  )
}

export default Page
