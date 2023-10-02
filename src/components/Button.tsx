import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import { Spinner } from './Spinner'

type ButtonProps = {
  className?: string
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  className,
  children,
  onClick,
  disabled,
  loading,
  type = 'button',
}) => {
  return (
    <button
      className={twMerge(
        'flex bg-blue-500 items-center justify-center rounded-lg px-6 py-3 text-base text-white font-medium focus:outline-none',
        className,
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {loading && (
        <div className="mr-2">
          <Spinner className="h-5 w-5 text-gray-900" />
        </div>
      )}
      {children}
    </button>
  )
}
