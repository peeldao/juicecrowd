import {
  JB_CURRENCIES,
  useEthPaymentTerminalDistributePayouts,
  useJBContractContext,
  useJBFundingCycleContext,
  useEthDistributionLimit,
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
    fundingCycleData: { data },
  } = useJBFundingCycleContext()
  const {
    contracts: {
      primaryTerminalEth: { data: primaryTerminalEth },
    },
  } = useJBContractContext()

  const { data: distributionLimitData } = useEthDistributionLimit({
    projectId,
    configuration: data?.configuration!,
    terminalAddress: primaryTerminalEth!,
  })

  const { distributionLimitCurrency } = distributionLimitData ?? {}
  const currency = distributionLimitCurrency ?? JB_CURRENCIES.ETH

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
