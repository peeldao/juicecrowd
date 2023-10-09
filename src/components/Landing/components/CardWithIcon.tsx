import { ReactNode } from 'react'

export const CardWithIcon: React.FC<{
  children?: ReactNode
  title: ReactNode
  icon: ReactNode
}> = ({ title, icon, children }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 text-center">
      <div className="rounded-full bg-blue-50 p-2">
        <div className="rounded-full bg-blue-100 p-1.5">
          <div className="h-6 w-6 text-blue-600">{icon}</div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="font-heading text-xl">{title}</div>
        <div className="text-base text-gray-700">{children}</div>
      </div>
    </div>
  )
}
