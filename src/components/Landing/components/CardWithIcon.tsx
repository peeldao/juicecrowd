import { ReactNode } from 'react'

export const CardWithIcon: React.FC<{
  children?: ReactNode
  title: ReactNode
  icon: ReactNode
}> = ({ title, icon, children }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 text-center">
      <div className="bg-bluebs-50 rounded-full p-2">
        <div className="bg-bluebs-100 rounded-full p-1.5">
          <div className="text-bluebs-600 h-6 w-6">{icon}</div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="font-heading text-xl">{title}</div>
        <div className="text-base text-gray-700">{children}</div>
      </div>
    </div>
  )
}
