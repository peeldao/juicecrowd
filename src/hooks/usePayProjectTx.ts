import { useJBContractContext, usePayEthPaymentTerminal } from 'juice-hooks'
import { useJbProject } from './useJbProject'

export type UsePayProjectTxProps = {
  projectId?: bigint
  amountWei: bigint
  beneficiaryAddress?: `0x${string}`
  memo?: string
}

export const usePayProjectTx = ({
  projectId,
  amountWei,
  beneficiaryAddress,
  memo,
}: UsePayProjectTxProps) => {
  const { projectId: currentProjectId } = useJbProject()
  projectId = projectId ?? currentProjectId
  const {
    contracts: {
      primaryTerminalEth: { data: primaryTerminalEth },
    },
  } = useJBContractContext()

  const { contractWrite, prepare, transaction } = usePayEthPaymentTerminal({
    projectId,
    amountWei,
    terminalAddress: primaryTerminalEth,
    memo,
    beneficiaryAddress,
  })

  return {
    prepare,
    contractWrite,
    transaction,
  }
}
