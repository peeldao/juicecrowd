import {
  JB_CURRENCIES,
  useEthPaymentTerminalDistributePayouts,
  useJBContractContext,
} from 'juice-hooks'
import { useJbProject } from './useJbProject'

export type UseWithdrawTxProps = {
  /**
   * Amount to withdraw in wei
   * Must be denominated in fundAccessConstaints->distributionLimitCurrency
   */
  amountWei: bigint
}

export const useWithdrawTx = ({ amountWei }: UseWithdrawTxProps) => {
  const { projectId } = useJbProject()
  const {
    contracts: {
      primaryTerminalEth: { data: primaryTerminalEth },
    },
  } = useJBContractContext()

  const currency = JB_CURRENCIES.ETH // TODO: get from distributionLimitOf juice-hooks

  const { contractWrite, prepare, transaction } =
    useEthPaymentTerminalDistributePayouts({
      projectId,
      terminalAddress: primaryTerminalEth!,
      amountWei,
      currency,
    })

  return {
    prepare,
    contractWrite,
    transaction,
  }
}
