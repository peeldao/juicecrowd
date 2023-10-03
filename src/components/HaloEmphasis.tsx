import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

export type HaloEmphasisProps = {
  className?: string
  // functonal component to render inside the halo.
  icon: React.FC<{ className?: string }>
}

/**
 * Renders a halo around the icon.
 */
export const HaloEmphasisIcon: React.FC<HaloEmphasisProps> = ({
  className,
  icon: Icon,
}) => {
  return (
    <div
      className={twMerge(
        'flex items-center justify-center rounded-full bg-blue-50',
        className,
      )}
    >
      <div className="flex h-3/4 w-3/4 items-center justify-center rounded-full bg-blue-100">
        <Icon className="h-2/3 w-2/3 text-blue-600" />
      </div>
    </div>
  )
}
