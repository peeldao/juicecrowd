import React, { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type InputProps = {
  className?: string
  placeholder?: string
  prefix?: ReactNode
  prefixSeparator?: boolean
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input: React.FC<InputProps> = ({
  className,
  placeholder,
  prefix,
  prefixSeparator,
  value,
  onChange,
}) => {
  if (prefix) {
    return (
      <div className="flex items-center rounded-lg border border-gray-300 focus-within:outline outline-2 focus-within:outline-blue-500">
        <div
          className={twMerge(
            'pl-3 h-full py-2 text-base text-gray-500 leading-6',
            prefixSeparator ? 'border-r border-gray-300 pr-3' : '',
          )}
        >
          {prefix}
        </div>
        <input
          className={twMerge(
            'w-full pl-2 pr-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none bg-transparent',
            className,
          )}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    )
  }

  return (
    <input
      className={twMerge(
        'w-full rounded-lg border border-gray-300 px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-blue-500',
        className,
      )}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}
