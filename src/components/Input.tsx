import React, { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type InputProps = {
  className?: string
  placeholder?: string
  prefix?: ReactNode
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input: React.FC<InputProps> = ({
  className,
  placeholder,
  prefix,
  value,
  onChange,
}) => {
  if (prefix) {
    return (
      <div className="flex items-center rounded-lg border border-gray-300 focus-within:outline outline-2 focus-within:outline-blue-500">
        <div className="pl-3 text-gray-400">{prefix}</div>
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
