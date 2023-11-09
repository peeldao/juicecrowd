export function detailedTimeString({
  timeSeconds,
  roundToMinutes,
  fullWords,
}: {
  timeSeconds: BigInt
  roundToMinutes?: boolean
  fullWords?: boolean
}) {
  const timeSecondsNumber = parseInt(timeSeconds.toString())

  const days = Math.floor(timeSecondsNumber / 60 / 60 / 24)
  const hours = (timeSecondsNumber / 60 / 60) % 24
  const minutes = (timeSecondsNumber / 60) % 60
  const seconds = timeSecondsNumber % 60

  const daysString = fullWords ? ' ' + 'days' + ' ' : 'd '
  const hoursString = fullWords ? ' ' + 'hours' + ' ' : 'h '
  const minutesString = fullWords ? ' ' + 'minutes' + ' ' : 'm '
  const secondsString = fullWords ? ' ' + 'seconds' : 's'

  const daysText = `${days && days > 0 ? days.toString() + daysString : ''}`
  const hoursText = `${
    hours && hours >= 1 ? Math.floor(hours) + hoursString : ''
  }`
  const minutesText = `${
    minutes && minutes >= 1 ? Math.floor(minutes) + minutesString : ''
  }`
  const secondsText = `${
    seconds && seconds > 0 && !roundToMinutes
      ? Math.floor(seconds) + secondsString
      : ''
  }`

  return `${daysText}${hoursText}${minutesText}${secondsText}`.trimEnd() || '--'
}
