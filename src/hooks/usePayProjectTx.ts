import {
  DEFAULT_MEMO,
  JB_ETHER_ADDRESS,
  useJBContractContext,
  usePayEthPaymentTerminal,
  usePrepareJbethPaymentTerminal3_1_2Pay,
} from 'juice-hooks'
import {
  Address,
  UsePrepareContractWriteConfig,
  useAccount,
  useContractWrite,
} from 'wagmi'
import { useJbProject } from './useJbProject'
import { Abi } from 'viem'

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
  const { address: defaultBeneficiaryAddress } = useAccount()
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
