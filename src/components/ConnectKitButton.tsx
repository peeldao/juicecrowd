import { ConnectKitButton as _ConnectKitButton } from 'connectkit'
import { Button, buttonVariants } from './ui/Button'
import { VariantProps } from 'class-variance-authority'

export type ConnectKitButtonProps = {
  size?: VariantProps<typeof buttonVariants>['size']
}

export const ConnectKitButton: React.FC<ConnectKitButtonProps> = ({ size }) => {
  return (
    <_ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, address, ensName }) => {
        address = address
          ? `0x${address.slice(2, 2 + 4)}...${address.slice(-4)}`
          : undefined

        const buttonText = isConnected
          ? ensName || address
          : isConnecting
          ? 'Connecting...'
          : 'Connect Wallet'

        return (
          <Button
            size={size}
            variant={isConnected ? 'secondary' : 'outline-primary'}
            onClick={show}
          >
            {buttonText}
          </Button>
        )
      }}
    </_ConnectKitButton.Custom>
  )
}
