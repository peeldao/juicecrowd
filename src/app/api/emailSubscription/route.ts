import { apiWrapper } from '@/lib/backend/api/apiWrapper'
import { NextResponse } from 'next/server'
import * as z from 'zod'
import { addRowToGoogleSheet } from '@/lib/backend/google-sheets/addRowToGoogleSheet'
import { JuiceCrowdError } from '@/lib/error'

const GOOGLE_SPREADSHEET_ID = '1_OpoitLq1pLQIqsdDGh6SbRrdtmABXdIXuJD6HMAVCo'
const EMAIL_SUBSCRIPTIONS_SHEET_NUMBER = 1

const emailSubscriptionsSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export const POST = apiWrapper(emailSubscriptionsSchema, async data => {
  try {
    await addRowToGoogleSheet({
      row: data.email,
      sheetId: GOOGLE_SPREADSHEET_ID,
      sheetNumber: EMAIL_SUBSCRIPTIONS_SHEET_NUMBER,
      unique: true,
    })
  } catch (e) {
    if (typeof e === 'object' && e instanceof JuiceCrowdError) {
      throw e
    }
    console.error('Server error occurred', e)
    throw new JuiceCrowdError('Unknown error occurred - contact support')
  }
  return NextResponse.json({ success: true })
})
