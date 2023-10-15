import { apiWrapper } from '@/lib/backend/api/apiWrapper'
import { NextResponse } from 'next/server'
import * as z from 'zod'
import { addEmailSubscription } from '@/lib/backend/emailSubscriptions.ts/addEmailSubscription'
import { JuiceCrowdError } from '@/lib/error'

const emailSubscriptionsSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export const POST = apiWrapper(emailSubscriptionsSchema, async data => {
  try {
    await addEmailSubscription(data.email)
  } catch (e) {
    console.error('Failed to subscribe email', e)
    throw new JuiceCrowdError('Unkown error occurred - contact support')
  }
  return NextResponse.json({ success: true })
})
