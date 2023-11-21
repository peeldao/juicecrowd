import { apiWrapper } from '@/lib/backend/api/apiWrapper'
import { NETWORK } from '@/lib/backend/config'
import { addRowToGoogleSheet } from '@/lib/backend/google-sheets/addRowToGoogleSheet'
import { JuiceCrowdError } from '@/lib/error'
import { etherscanUrlForTx } from '@/lib/etherscan'
import { publicClient } from '@/lib/viem/publicClient'
import { NextResponse } from 'next/server'
import { getAddress } from 'viem'
import { z } from 'zod'

const TTL = 60n // 1 minute
const GOOGLE_SPREADSHEET_ID = '1_OpoitLq1pLQIqsdDGh6SbRrdtmABXdIXuJD6HMAVCo'
const SUCCESS_PAY_SHEET_NUMBER = 2

const schema = z.object({
  email: z.string().email('Invalid email address'),
  walletAddress: z.string(),
  transactionHash: z.string(),
  // TODO: is it possible to validate this from the transaction?
  projectId: z.string(),
})

export const POST = apiWrapper(schema, async data => {
  const now = BigInt(Math.round(Date.now() / 1000))

  const tx = await publicClient.getTransaction({
    hash: data.transactionHash as `0x${string}`,
  })
  if (tx.blockNumber === null) {
    throw new JuiceCrowdError('Transaction not mined', 400)
  }
  if (getAddress(tx.from) !== getAddress(data.walletAddress)) {
    throw new JuiceCrowdError('Mismatched wallet transaction address', 400)
  }

  const block = await publicClient.getBlock({ blockHash: tx.blockHash })
  if (block.timestamp + TTL < now) {
    throw new JuiceCrowdError('Block is too old', 400)
  }

  const projectId = data.projectId
  const network = NETWORK ?? 'mainnet'
  const email = data.email
  const address = getAddress(tx.from)
  const amount = tx.value.toString()
  const txHash = tx.hash
  const etherscanUrl = etherscanUrlForTx(txHash)

  const row = [projectId, network, email, address, amount, txHash, etherscanUrl]

  await addRowToGoogleSheet({
    row,
    sheetId: GOOGLE_SPREADSHEET_ID,
    sheetNumber: SUCCESS_PAY_SHEET_NUMBER,
    unique: true,
  })

  return NextResponse.json({
    success: true,
  })
})
