import React, { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  prefix?: ReactNode
  prefixSeparator?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ prefix, prefixSeparator, ...props }, ref) => {
    if (prefix) {
      return (
        <div className="flex items-center rounded-lg border border-gray-300 outline-2 focus-within:outline focus-within:outline-blue-500">
          <div
            className={twMerge(
              'h-full py-2 pl-3 text-base leading-6 text-gray-500',
              prefixSeparator ? 'border-r border-gray-300 pr-3' : '',
            )}
          >
            {prefix}
          </div>
          <input
            {...props}
            ref={ref}
            className={twMerge(
              'w-full bg-transparent py-2 pl-2 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none',
              props.className,
            )}
          />
        </div>
      )
    }

    return (
      <input
        {...props}
        ref={ref}
        className={twMerge(
          'w-full rounded-lg border border-gray-300 px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-blue-500',
          props.className,
        )}
      />
    )
  },
)

Input.displayName = 'Input'

export { Input }
