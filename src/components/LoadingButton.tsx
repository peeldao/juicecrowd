import { PropsWithChildren } from 'react'
import { Spinner } from './Spinner'
import React from 'react'
import { Button, ButtonProps } from './ui/Button'

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean
}

const LoadingButton = React.forwardRef<
  HTMLButtonElement,
  PropsWithChildren<LoadingButtonProps>
>(({ children, loading, ...props }, ref) => {
  return (
    <Button {...props} ref={ref}>
      {loading && (
        <div className="mr-2">
          <Spinner className="h-5 w-5 text-gray-900" />
        </div>
      )}
      {children}
    </Button>
  )
})

LoadingButton.displayName = 'Button'

export { LoadingButton }
