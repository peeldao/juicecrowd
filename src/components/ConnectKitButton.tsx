import { ConnectKitButton as _ConnectKitButton } from 'connectkit'
import { Button, buttonVariants } from './ui/Button'
import { VariantProps } from 'class-variance-authority'
import { useAccount } from 'wagmi'

export type ConnectKitButtonProps = {
  size?: VariantProps<typeof buttonVariants>['size']
  disabled?: boolean
  variant?: VariantProps<typeof buttonVariants>['variant']
  connectText?: string
}

export const ConnectKitButton: React.FC<ConnectKitButtonProps> = ({
  size,
  disabled,
  variant,
  connectText = 'Connect Wallet',
}) => {
  return <Button disabled>Disabled</Button>
  /*<_ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, address, ensName }) => {
        variant = variant ?? (isConnected ? 'secondary' : 'outline-primary')
        address = address
          ? `0x${address.slice(2, 2 + 4)}...${address.slice(-4)}`
          : undefined

        const buttonText = isConnected
          ? ensName || address
          : isConnecting
          ? 'Connecting...'
          : connectText

        return (
          <Button
            type="button"
            size={size}
            variant={variant}
            onClick={show}
            disabled={disabled}
          >
            {buttonText}
          </Button>
        )
      }}
    </_ConnectKitButton.Custom>
  )*/
}
