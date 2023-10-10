import { JuiceCrowdError } from '@/lib/error'
import { NextRequest } from 'next/server'
import * as z from 'zod'

/**
 * A function that takes a request and returns a promise of a decoded value.
 * @param request The incoming request.
 */
type Decoder<T> = (request: NextRequest) => Promise<T>

/**
 * A function that takes a schema and returns a decoder.
 * @param schema The schema to use for decoding.
 * @returns A decoder that takes a request and returns a promise of a decoded
 * value.
 */
const schemaDecoder =
  <T>(schema: z.Schema<T>): Decoder<T> =>
  async (request: NextRequest): Promise<T> => {
    let json
    try {
      json = await request.json()
    } catch (e) {
      console.error('Failed to parse request body', e)
      throw new JuiceCrowdError('Failed to parse request body', 400)
    }
    try {
      return schema.parse(json)
    } catch (e) {
      console.error('Failed to validate request body', e)
      if (e instanceof z.ZodError) {
        throw JuiceCrowdError.fromZodError(e, 400)
      }
      throw new JuiceCrowdError('Failed to validate request body', 400)
    }
  }

/**
 * A function that takes a decoded value and a request and returns a promise of
 * a response.
 */
type DataHandler<T> = (data: T, request: NextRequest) => Promise<Response>

/**
 * A function that takes a request and returns a promise of a response.
 */
type NoDataHandler = (request: NextRequest) => Promise<Response>

export function apiWrapper(
  handler: NoDataHandler,
): (request: NextRequest) => Promise<Response>
export function apiWrapper<T>(
  decoder: Decoder<T>,
  handler: DataHandler<T>,
): (request: NextRequest) => Promise<Response>
export function apiWrapper<T>(
  schema: z.Schema<T>,
  handler: DataHandler<T>,
): (request: NextRequest) => Promise<Response>

export function apiWrapper<T>(
  arg1: NoDataHandler | Decoder<T> | z.Schema<T>,
  arg2?: DataHandler<T>,
) {
  return async (request: NextRequest) => {
    try {
      if (arg2 !== undefined) {
        const handler: DataHandler<T> = arg2

        let decoder: Decoder<T>
        if ('parse' in arg1) {
          decoder = schemaDecoder(arg1)
        } else {
          decoder = arg1 as Decoder<T>
        }

        const decoded = await decoder(request)
        return await handler(decoded, request)
      }

      const handler: NoDataHandler = arg1 as NoDataHandler
      return await handler(request)
    } catch (error) {
      console.error('error', error)
      if (error instanceof JuiceCrowdError) {
        return new Response(error.message, { status: error.httpStatus })
      }
      return new Response('Something went wrong', { status: 500 })
    }
  }
}
