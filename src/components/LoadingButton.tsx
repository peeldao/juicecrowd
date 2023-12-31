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
    <Button {...props} disabled={props.disabled || loading} ref={ref}>
      {loading && (
        <div className="mr-2">
          <Spinner className="h-5 w-5 text-white" />
        </div>
      )}
      {children}
    </Button>
  )
})

LoadingButton.displayName = 'LoadingButton'

export { LoadingButton }
