import { apiWrapper } from '@/lib/backend/api/apiWrapper'
import { createContactMessage } from '@/lib/backend/discord/contact'
import { JuiceCrowdError } from '@/lib/error'
import { NextResponse } from 'next/server'
import * as z from 'zod'

const schema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Invalid email address'),
  subject: z
    .string()
    .min(2, 'Subject must be at least 2 characters')
    .max(50, 'Subject must be less than 50 characters'),
  message: z
    .string()
    .min(2, 'Message must be at least 2 characters')
    .max(500, 'Message must be less than 500 characters'),
})

export const POST = apiWrapper(schema, async data => {
  try {
    await createContactMessage(data)
  } catch (e) {
    console.error('Failed to send contact message to Discord', e)
    throw new JuiceCrowdError('Failed to send contact message to Discord')
  }
  return NextResponse.json({ success: true })
})
