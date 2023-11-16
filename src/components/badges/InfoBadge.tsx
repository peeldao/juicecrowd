import { twMerge } from 'tailwind-merge'

export type InfoBadgeProps = {
  className?: string
  children: React.ReactNode
}

export const InfoBadge: React.FC<InfoBadgeProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={twMerge(
        // TODO: Change to bg-blue-25
        'flex items-center justify-center rounded-2xl bg-blue-50 px-2 py-0.5 text-xs font-medium leading-[18px] tracking-wider text-blue-600',
        className,
      )}
    >
      {children}
    </div>
  )
}
