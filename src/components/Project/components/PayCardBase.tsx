import { CheckIcon } from '@heroicons/react/24/solid'
import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

export type PayCardBaseProps = {
  className?: string
  isSelected?: boolean
  onClick?: () => void
}

export const PayCardBase: React.FC<PropsWithChildren<PayCardBaseProps>> = ({
  className,
  children,
  isSelected,
  onClick,
}) => {
  return (
    <div
      className={twMerge(
        'flex cursor-pointer items-center rounded-[10px] border border-gray-200 p-3 pr-5 shadow-card transition-all hover:border-gray-300 hover:shadow-md',
        isSelected &&
          '-m-[1px] border-2 border-bluebs-500 shadow-md hover:border-bluebs-500',
      )}
      onClick={onClick}
    >
      <div className={twMerge('flex flex-1', className)}>{children}</div>

      <div
        className={twMerge(
          'flex h-5 w-5 flex-shrink-0 items-center justify-center self-start rounded-full border',
          isSelected ? 'border-bluebs-500 bg-bluebs-500' : 'border-gray-200',
        )}
      >
        <CheckIcon
          className={twMerge(
            'h-4 w-4 flex-shrink-0 stroke-2 text-white',
            isSelected ? 'inline' : 'hidden',
          )}
        />
      </div>
    </div>
  )
}
