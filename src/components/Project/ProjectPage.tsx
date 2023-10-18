import { useJBContractContext, useJbProjectsOwnerOf } from 'juice-hooks'

export const ProjectPage = () => {
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
