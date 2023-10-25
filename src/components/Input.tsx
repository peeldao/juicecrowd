import React, { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  prefix?: ReactNode
  prefixSeparator?: boolean
  suffix?: ReactNode
  suffixSeparator?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, prefix, prefixSeparator, suffix, suffixSeparator, ...props },
    ref,
  ) => {
    if (prefix) {
      return (
        <div className="flex items-center rounded-lg border border-gray-300 bg-white outline-2 focus-within:outline focus-within:outline-bluebs-500">
          <div
            className={twMerge(
              'h-full py-2 pl-3 text-base leading-6 text-gray-500',
              prefixSeparator ? 'border-r border-gray-300 pr-3' : '',
            )}
          >
            {prefix}
          </div>

          <input
            ref={ref}
            className={twMerge(
              'w-full bg-transparent py-2 pl-2 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none',
              className,
            )}
            {...props}
          />

          <div
            className={twMerge(
              'h-full py-2 pr-3 text-base leading-6 text-gray-500',
              suffixSeparator ? 'border-l border-gray-300 pl-3' : '',
            )}
          >
            {suffix}
          </div>
        </div>
      )
    }

    return (
      <input
        ref={ref}
        className={twMerge(
          'w-full rounded-lg border border-gray-300 px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-bluebs-500',
          className,
        )}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'

export { Input }
