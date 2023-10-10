import * as z from 'zod'

export class JuiceCrowdError extends Error {
  readonly httpStatus: number
  constructor(message: string, httpStatus = 500) {
    super(message)
    this.name = 'JuiceCrowdError'
    this.message = message
    this.httpStatus = httpStatus
  }

  static fromZodError(error: z.ZodError, httpStatus = 400): JuiceCrowdError {
    const firstError = Object.entries(error.format()).filter(
      a => a[0] !== '_errors',
    )[0]
    if (!firstError) {
      return new JuiceCrowdError('Unknown error')
    }
    const message = `${firstError[0]}: ${(firstError[1] as any)._errors[0]}`
    if (!message) {
      return new JuiceCrowdError('Unknown error')
    }
    return new JuiceCrowdError(message, httpStatus)
  }
}
