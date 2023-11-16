import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

export type InfoCalloutProps = {
  className?: string
}

export const InfoCallout: React.FC<PropsWithChildren<InfoCalloutProps>> = ({
  className,
  children,
}) => {
  return (
    <div
      className={twMerge(
        // TODO: Should be bg-blue-25
        'rounded-lg flex gap-1 py-2 px-3.5 bg-blue-50 text-blue-700',
        className,
      )}
    >
      <InformationCircleIcon className="h-5 w-5 flex-shrink-0" />
      {children}
    </div>
  )
}
