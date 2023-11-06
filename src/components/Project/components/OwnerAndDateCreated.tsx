import { EthereumAddress } from "@/components/EthereumAddress";
import { useJbProject } from "@/hooks/useJbProject";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

export function OwnerAndDateCreated({ className }: { className?: string }) {
  const { createdAt, owner } = useJbProject()

  const createdString = useMemo(
    () =>
      createdAt
        ? // converts date to format "Created 24 August 2023"
          `Created ${createdAt.toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}`
        : undefined,
    [createdAt],
  )

  return (
    <div className={twMerge("flex justify-center divide-x divide-gray-200 text-xs text-gray-500", className)}>
      <span className="py-1 pr-4">
        Owner: <EthereumAddress address={owner} />
      </span>
      <span className="py-1 pl-4">{createdString}</span>
    </div>
  )
}
