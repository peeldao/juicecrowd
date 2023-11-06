import {
  JB721DelegateTier,
  useJBContractContext,
  usePayEthPaymentTerminal,
} from 'juice-hooks'
import { useJbProject } from './useJbProject'
import { useMemo } from 'react'

export type UsePayProjectTxProps = {
  projectId?: bigint
  amountWei: bigint
  beneficiaryAddress?: `0x${string}`
  memo?: string
  tiersToMint?: JB721DelegateTier[]
}

export const usePayProjectTx = ({
  projectId,
  amountWei,
  beneficiaryAddress,
  memo: _memo,
  tiersToMint,
}: UsePayProjectTxProps) => {
  const { projectId: currentProjectId } = useJbProject()
  projectId = projectId ?? currentProjectId
  const {
    contracts: {
      primaryTerminalEth: { data: primaryTerminalEth },
    },
  } = useJBContractContext()

  const nftIdsToMint = useMemo(
    () => tiersToMint?.map(tier => tier.id),
    [tiersToMint],
  )

  const memo = useMemo(() => {
    let m = _memo ?? ''
    const nftEmbeds = tiersToMint?.map(createEmbedLinkForNft) ?? []
    if (nftEmbeds.length > 0) {
      if (m.length > 0) m += '\n'
      for (const embed of nftEmbeds) {
        m += embed + '\n'
      }
    }
    if (!m.length) return undefined
    return m
  }, [_memo, tiersToMint])

  console.log('memo', memo)

  const { contractWrite, prepare, transaction } = usePayEthPaymentTerminal({
    projectId,
    amountWei,
    terminalAddress: primaryTerminalEth,
    memo,
    beneficiaryAddress,
    dataSourceArgs:
      nftIdsToMint && nftIdsToMint.length > 0
        ? {
            jb721Delegate: {
              tierIdsToMint: nftIdsToMint?.map(Number),
            },
          }
        : undefined,
  })

  return {
    prepare,
    contractWrite,
    transaction,
  }
}

const createEmbedLinkForNft = (nft: JB721DelegateTier) => {
  const baseUrl = nft.metadata.image
  const url = new URL(baseUrl)
  url.searchParams.set('embed', 'true')
  url.searchParams.set('name', encodeURIComponent(nft.metadata.name))
  // Always 1 for now
  url.searchParams.set('quantity', '1')

  return url.toString()
}
