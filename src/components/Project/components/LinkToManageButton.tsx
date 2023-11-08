import { Button } from '@/components/ui/Button'
import { useJbProject } from '@/hooks/useJbProject'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useAccount } from 'wagmi'

export function LinkToManageButton({ projectId }: { projectId?: bigint }) {
  const { owner } = useJbProject()
  const { address } = useAccount()

  if (!projectId || address !== owner) {
    return null
  }

  return (
    <Link href={`/p/${projectId}/manage`} className="text-gray-700">
      <Button size="sm" variant="outline">
        <Cog6ToothIcon className="mr-2 inline h-4 w-4" />
        Manage project
      </Button>
    </Link>
  )
}
