import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  // const projects = await paginateDepleteProjectsQueryCall({
  //   variables: { where: { pv: PV_V2 } },
  // });

  const projects = [{ projectId: 1 }];
  const paths = projects.map(({ projectId }) => ({
    params: { projectId: String(projectId) },
  }));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<{ projectId: number }> = async (
  context
) => {
  if (!context.params) throw new Error("params not supplied");

  const projectId = parseInt(context.params.projectId as string);

  return {
    props: {
      projectId,
    },
  };
};

export default function ProjectPage({
  projectId,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <>Hello {projectId}</>;
}
