import { formatEther } from 'juice-hooks'

/**
 * Formats a number to apply commas to every 3 digits.
 *
 * e.g: 1234567 => 1,234,567
 */
const COMMA_REGEX = /(\d)(?=(\d{3})+(?!\d))/g

/**
 * Formats a bigint USD as human readble USD with 2 decimal places.
 *
 * e.g. 1.2345678e+21 => 1,234.57.
 *
 * @param usd The number to format.
 * @returns The formatted number.
 */
export const formatUsd = (usd: bigint) => {
  // 1234.57
  let unformatted = formatEther(usd, { fractionDigits: 2 })
  if (!unformatted.includes('.')) {
    // 1234 => 1234.00
    unformatted += '.00'
  }
  if (unformatted.match(/.*\.\d$/)) {
    // 1234.5 => 1234.50
    unformatted += '0'
  }
  const [int, dec] = unformatted.split('.')
  let formatted = int.replace(COMMA_REGEX, '$1,')
  if (dec) {
    formatted += `.${dec}`
  }

  return `$${formatted}`
}

/**
 * Formats a bigint ETH as human readble ETH with 8 decimal places.
 *
 * e.g. 1.2345678e+21 => 1,234.56780000 ETH
 *
 * @param eth The number to format.
 * @returns The formatted number.
 */
export const formatEth = (eth: bigint) => {
  let unformatted = formatEther(eth, { fractionDigits: 4 })
  const [int, dec] = unformatted.split('.')
  let formatted = int.replace(COMMA_REGEX, '$1,')
  if (dec) {
    formatted += `.${dec}`
  }
  return `${formatted} ETH`
}
