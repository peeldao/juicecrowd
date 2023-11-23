import { ProjectPage } from '@/components/Project'
import { SEO } from '@/components/SEO'
import { Layout } from '@/components/layout'
import { AppProvider } from '@/components/layout/AppProvider'
import {
  projectGetStaticPaths,
  projectGetStaticProps,
} from '@/lib/backend/static/projects'
import { ipfsUriToGatewayUrl } from '@/lib/ipfs'
import { sanitizeDescriptionContent } from '@/lib/utils'
import { InferGetStaticPropsType } from 'next'

export const getStaticPaths = projectGetStaticPaths
export const getStaticProps = projectGetStaticProps

export default function Page({
  projectId,
  metadata,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const pid = projectId ? BigInt(projectId) : 0n
  // Sanitize before slicing to prevent partial HTML tags at the end.
  const sanitizedDescription = metadata?.description
    ? sanitizeDescriptionContent(metadata.description).slice(0, 160)
    : ''

  return (
    <>
      <SEO
        title={metadata.name ? metadata.name : 'Juicecrowd Project'}
        description={sanitizedDescription}
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
