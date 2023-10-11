import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import { Spinner } from './Spinner'
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  loading?: boolean
}

const Button = React.forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonProps>
>(({ className, children, loading, ...props }, ref) => {
  return (
    <button
      className={twMerge(
        'bg-bluebs-500 hover:bg-bluebs-600 flex items-center justify-center rounded-lg px-6 py-3 text-base font-medium text-white transition-colors focus:outline-none',
        className,
      )}
      {...props}
      ref={ref}
    >
      {loading && (
        <div className="mr-2">
          <Spinner className="h-5 w-5 text-gray-900" />
        </div>
      )}
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export { Button }
