import { ReactNode } from "react"

export function ManageCard({
  name,
  value
}: {
  name: ReactNode,
  value: ReactNode
}) {
  return (
    <div className='flex flex-col gap-2 bg-gray-50 border border-gray-200 rounded-lg px-6 py-4'>
      <div className="text-gray-500 text-sm">
        {name}
      </div>
      <div className="text-gray-900 text-xl">
        {value}
      </div>
    </div>
  )
}
