import { LandingPage } from '@/components/Landing'
import { Layout } from '@/components/layout'
import { AppProvider } from '@/components/layout/AppProvider'
import { ACTIVE_CROWD } from '@/data/crowds'
import { crowdGetStaticProps } from '@/lib/backend/static/crowds'
import { InferGetStaticPropsType } from 'next'

export const getStaticProps = () => {
  return crowdGetStaticProps({
    params: { crowdId: ACTIVE_CROWD.id.toString() },
  })
}

export function Page({
  crowd,
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <AppProvider>
      <Layout>
        <LandingPage
          activeCrowd={{
            crowd,
            projects,
          }}
        />
      </Layout>
    </AppProvider>
  )
}

export default Page
