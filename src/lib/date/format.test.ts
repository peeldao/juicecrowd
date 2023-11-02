import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { timestampToDateString } from './format'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

const timestampMs = (args: {
  seconds?: number
  minutes?: number
  hours?: number
  days?: number
}) => {
  const { seconds = 0, minutes = 0, hours = 0, days = 0 } = args
  return (
    days * 24 * 60 * 60 * 1000 +
    hours * 60 * 60 * 1000 +
    minutes * 60 * 1000 +
    seconds * 1000
  )
}

test.each`
  date                                                                        | format
  ${new Date(0)}                                                              | ${'just now'}
  ${new Date(timestampMs({ seconds: 59 }))}                                   | ${'just now'}
  ${new Date(timestampMs({ minutes: 1 }))}                                    | ${'1 minute ago'}
  ${new Date(timestampMs({ minutes: 59, seconds: 59 }))}                      | ${'59 minutes ago'}
  ${new Date(timestampMs({ hours: 1 }))}                                      | ${'1 hour ago'}
  ${new Date(timestampMs({ hours: 1, minutes: 59, seconds: 59 }))}            | ${'1 hour ago'}
  ${new Date(timestampMs({ hours: 2 }))}                                      | ${'2 hours ago'}
  ${new Date(timestampMs({ hours: 23, minutes: 59, seconds: 59 }))}           | ${'23 hours ago'}
  ${new Date(timestampMs({ days: 1 }))}                                       | ${'1 day ago'}
  ${new Date(timestampMs({ days: 1, hours: 23, minutes: 59, seconds: 59 }))}  | ${'1 day ago'}
  ${new Date(timestampMs({ days: 2 }))}                                       | ${'2 days ago'}
  ${new Date(timestampMs({ days: 29, hours: 23, minutes: 59, seconds: 59 }))} | ${'29 days ago'}
  ${new Date(timestampMs({ days: 30 }))}                                      | ${'January 1, 1970'}
`('timestampToDateString($date) === $format', ({ date, format }) => {
  vi.setSystemTime(date)
  expect(timestampToDateString(0)).toBe(format)
})
