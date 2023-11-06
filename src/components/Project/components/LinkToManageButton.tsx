import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import { useJbProject } from "@/hooks/useJbProject";
import { useAccount } from "wagmi";

export function LinkToManageButton({ projectId }: { projectId?: bigint}) {
  const { owner } = useJbProject()
  const { address } = useAccount()
  if (!projectId || address !== owner) {
    return null
  }
  return (
    <Link
      href={`/p/${projectId}/manage`}
      legacyBehavior
    >
      <Button size="sm" variant="outline">
        <span className="text-grey-700">
          <Cog6ToothIcon className="mr-2 inline h-4 w-4" />
          <span>Manage project</span>
        </span>
      </Button>
    </Link>
  )
}
