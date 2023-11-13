import { LoadingButton } from '@/components/LoadingButton'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip'
import { useToast } from '@/components/ui/useToast'
import { useCampaignEndDate } from '@/hooks/useCampaignEndDate'
import { useJbProject } from '@/hooks/useJbProject'
import { useWithdrawTx } from '@/hooks/useWithdrawTx'
import { Ether, useEthTerminalBalance, useJBContractContext } from 'juice-hooks'
import { useCallback, useEffect } from 'react'

export function WithdrawButton() {
  const { isComplete } = useCampaignEndDate()
  const fundingInProgress = !isComplete

  const { projectId } = useJbProject()
  const {
    contracts: { primaryTerminalEth },
  } = useJBContractContext()

  const { data: projectBalance } = useEthTerminalBalance({
    projectId,
    terminalAddress: primaryTerminalEth.data,
  })

  const _balance = (projectBalance as Ether)?.val

  const { prepare, contractWrite, transaction } = useWithdrawTx({
    amountWei: _balance,
  })

  const { toast } = useToast()

  const handleWithdraw = useCallback(async () => {
    contractWrite.write?.()
  }, [contractWrite])

  /**
   * Displays error toast if contract write fails or is terminated.
   */
  useEffect(() => {
    if (!contractWrite.error || !contractWrite.isError) return
    toast({
      title: 'Error',
      description: (contractWrite.error?.cause as any)?.shortMessage,
      variant: 'destructive',
    })
  }, [toast, contractWrite.error, contractWrite.isError])

  /**
   * Displays success toast if withdraw tx is successful.
   */
  useEffect(() => {
    if (!transaction.isSuccess) return
    toast({
      title: 'Funds withdrawn successfully',
      variant: 'default',
    })
  }, [toast, transaction.isSuccess])

  const hasBalance = Boolean(_balance && _balance > 0n)

  const disabled = fundingInProgress || !hasBalance

  const tooltipMessage = !hasBalance ? (
    <>The project balance has no funds to withdraw.</>
  ) : fundingInProgress ? (
    <>Funds cannot be withdrawn until the campaign is complete.</>
  ) : null

  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger>
          <LoadingButton
            disabled={disabled}
            loading={
              prepare.isLoading ||
              transaction.isLoading ||
              contractWrite.isLoading
            }
            onClick={handleWithdraw}
            className="w-full"
          >
            Withdraw funds
          </LoadingButton>
        </TooltipTrigger>
        {disabled && <TooltipContent>{tooltipMessage}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  )
}
