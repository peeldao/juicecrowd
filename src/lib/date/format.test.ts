import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import {
  distanceBetweenDates,
  timestampToDateString,
  dateToCountdownString,
} from './format'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

type DateProps = {
  seconds?: number
  minutes?: number
  hours?: number
  days?: number
}

const tsMs = (args: DateProps) => {
  const { seconds = 0, minutes = 0, hours = 0, days = 0 } = args
  return (
    days * 24 * 60 * 60 * 1000 +
    hours * 60 * 60 * 1000 +
    minutes * 60 * 1000 +
    seconds * 1000
  )
}

const date = (args: DateProps) => {
  return new Date(tsMs(args))
}

test.each`
  date                                                       | format
  ${new Date(0)}                                             | ${'just now'}
  ${date({ seconds: 59 })}                                   | ${'just now'}
  ${date({ minutes: 1 })}                                    | ${'1 minute ago'}
  ${date({ minutes: 59, seconds: 59 })}                      | ${'59 minutes ago'}
  ${date({ hours: 1 })}                                      | ${'1 hour ago'}
  ${date({ hours: 1, minutes: 59, seconds: 59 })}            | ${'1 hour ago'}
  ${date({ hours: 2 })}                                      | ${'2 hours ago'}
  ${date({ hours: 23, minutes: 59, seconds: 59 })}           | ${'23 hours ago'}
  ${date({ days: 1 })}                                       | ${'1 day ago'}
  ${date({ days: 1, hours: 23, minutes: 59, seconds: 59 })}  | ${'1 day ago'}
  ${date({ days: 2 })}                                       | ${'2 days ago'}
  ${date({ days: 29, hours: 23, minutes: 59, seconds: 59 })} | ${'29 days ago'}
  ${date({ days: 30 })}                                      | ${'January 1, 1970'}
`('timestampToDateString($date) === $format', ({ date, format }) => {
  vi.setSystemTime(date)
  expect(timestampToDateString(0)).toBe(format)
})

test.each`
  date                     | format
  ${date({ seconds: 0 })}  | ${'0s'}
  ${date({ seconds: 1 })}  | ${'1s'}
  ${date({ seconds: 59 })} | ${'59s'}
  ${date({ minutes: 1 })}  | ${'1m'}
  ${date({ minutes: 2 })}  | ${'2m'}
  ${date({ hours: 1 })}    | ${'1h'}
`('dateToCountdownString($date1, $date2) === $format', ({ date, format }) => {
  vi.setSystemTime(new Date(0))
  expect(dateToCountdownString(date)).toBe(format)
})

test.each`
  date1                                            | format
  ${date({ seconds: 1 })}                          | ${'1 second'}
  ${date({ seconds: 59 })}                         | ${'59 seconds'}
  ${date({ minutes: 1 })}                          | ${'1 minute'}
  ${date({ minutes: 1, seconds: 1 })}              | ${'2 minutes'}
  ${date({ minutes: 59, seconds: 59 })}            | ${'60 minutes'}
  ${date({ hours: 1 })}                            | ${'1 hour'}
  ${date({ hours: 1, seconds: 1 })}                | ${'2 hours'}
  ${date({ hours: 1, minutes: 59, seconds: 59 })}  | ${'2 hours'}
  ${date({ hours: 2 })}                            | ${'2 hours'}
  ${date({ hours: 2, seconds: 1 })}                | ${'3 hours'}
  ${date({ hours: 23, minutes: 59, seconds: 59 })} | ${'24 hours'}
  ${date({ hours: 24 })}                           | ${'1 day'}
  ${date({ days: 1 })}                             | ${'1 day'}
  ${date({ days: 2 })}                             | ${'2 days'}
  ${date({ days: 700 })}                           | ${'700 days'}
`(
  'distanceBetweenDates(new Date(0), $date1) === $format',
  ({ date1, format }) => {
    expect(distanceBetweenDates(new Date(0), date1)).toBe(format)
  },
)
