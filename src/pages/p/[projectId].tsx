import {
  JBProjectProvider,
  useJBContractContext,
  useJbProjectsOwnerOf,
} from 'juice-hooks'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'

export const getStaticPaths: GetStaticPaths = async () => {
  // const projects = await paginateDepleteProjectsQueryCall({
  //   variables: { where: { pv: PV_V2 } },
  // });

  const projects = [{ projectId: 1 }] // TODO update with real data

  const paths = projects.map(({ projectId }) => ({
    params: { projectId: String(projectId) },
  }))
  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps<{
  projectId: number
}> = async context => {
  if (!context.params) throw new Error('params not supplied')

  const projectId = parseInt(context.params.projectId as string)

  return {
    props: {
      projectId,
    },
  }
}

function _ProjectPage() {
  const { projectId } = useJBContractContext()
  const { data: address } = useJbProjectsOwnerOf({
    args: [BigInt(projectId)],
  })

  return (
    <div>
      Project owner:
      {address && <div>{address}</div>}
    </div>
  )
}

export default function ProjectPage({
  projectId,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <JBProjectProvider projectId={1n}>
      <_ProjectPage />
    </JBProjectProvider>
  )
}
