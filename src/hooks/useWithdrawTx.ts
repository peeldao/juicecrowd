import {
  JBCurrency,
  JB_CURRENCIES,
  useEthPaymentTerminalDistributePayouts,
  useJBContractContext,
  useProjectDistributionLimit,
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
  const { data: distributionLimit } = useProjectDistributionLimit()

  const currency =
    distributionLimit.distributionLimitCurrency ??
    (JB_CURRENCIES.ETH as JBCurrency)

  const {
    contracts: {
      primaryTerminalEth: { data: primaryTerminalEth },
    },
  } = useJBContractContext()

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
