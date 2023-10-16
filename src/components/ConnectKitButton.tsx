import { ConnectKitButton as _ConnectKitButton } from 'connectkit'
import { useMemo } from 'react'
import { Button } from './ui/Button'

export const ConnectKitButton = () => {
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
            // TODO: Fit in with ui button variants
            className="bg-bluebs-50 px-4 py-2.5 text-bluebs-700"
            onClick={show}
          >
            {buttonText}
          </Button>
        )
      }}
    </_ConnectKitButton.Custom>
  )
}
