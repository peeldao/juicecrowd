import { ReactNode } from 'react'

export function ManageCard({
  name,
  value,
}: {
  name: ReactNode
  value: ReactNode
}) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-gray-50 px-6 py-4">
      <div className="text-sm text-gray-500">{name}</div>
      <div className="text-xl text-gray-900">{value}</div>
    </div>
  )
}
