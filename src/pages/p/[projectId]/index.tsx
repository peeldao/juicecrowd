import { ProjectPage } from '@/components/Project'
import { SEO } from '@/components/SEO'
import { Layout } from '@/components/layout'
import { AppProvider } from '@/components/layout/AppProvider'
import {
  projectGetStaticPaths,
  projectGetStaticProps,
} from '@/lib/backend/static/projects'
import { ipfsUriToGatewayUrl } from '@/lib/ipfs'
import { InferGetStaticPropsType } from 'next'

export const getStaticPaths = projectGetStaticPaths
export const getStaticProps = projectGetStaticProps

export default function Page({
  projectId,
  metadata,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const pid = projectId ? BigInt(projectId) : 0n

  let croppedTagline = ''
  if (metadata.projectTagline) {
    croppedTagline = metadata.projectTagline.substring(0, 160)
    if (croppedTagline !== metadata.projectTagline) {
      croppedTagline =
        croppedTagline.substring(0, croppedTagline.lastIndexOf(' ')) + '...'
    }
  }

  return (
    <>
      <SEO
        title={metadata.name ? metadata.name : 'Juicecrowd Project'}
        description={croppedTagline}
        twitter={{
          card: 'summary',
          creator: metadata.twitter,
          handle: metadata.twitter,
          image: metadata.logoUri
            ? ipfsUriToGatewayUrl(metadata.logoUri)
            : undefined,
        }}
      />
      <AppProvider projectId={pid} metadata={metadata}>
        <Layout navbar="minimal" footer="minimal">
          <ProjectPage />
        </Layout>
      </AppProvider>
    </>
  )
}
