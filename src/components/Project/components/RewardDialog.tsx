import { EthereumIconFilled } from '@/components/icon/EthereumIconFilled'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/Dialog'
import { JB721DelegateTierTier } from '@/hooks/useJbProject'
import { formatEther } from 'juice-hooks'
import { PropsWithChildren } from 'react'
import { RewardImage } from './RewardImage'

export type RewardDialogProps = {
  nft: JB721DelegateTierTier
}

/**
 * Reward dialog component.
 * @param children The trigger component of the dialog.
 * @param nft The nft to display in the dialog.
 */
export const RewardDialog: React.FC<PropsWithChildren<RewardDialogProps>> = ({
  children,
  nft,
}) => {
  const remaining = nft.remainingQuantity.toString()
  const initialQuantity = nft.initialQuantity.toString()
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="py-8">
        <RewardImage src={nft.metadata.image} alt={nft.metadata.name} />
        <div className="mt-4 flex flex-col gap-4">
          <DialogHeader className="text-start font-heading text-2xl font-medium">
            {nft.metadata.name}
          </DialogHeader>
          {/* // TODO: Use currency amount component once finished */}
          <div className="flex items-center text-xl font-medium text-gray-800">
            <EthereumIconFilled className="inline-block h-5 w-5 text-bluebs-500" />
            {formatEther(nft.price)}
          </div>
        </div>

        <DialogDescription className="text-base text-gray-600">
          {nft.metadata.description}
        </DialogDescription>
        <div className="text-sm text-gray-500">
          Remaining: {remaining}/{initialQuantity}
        </div>
      </DialogContent>
    </Dialog>
  )
}
