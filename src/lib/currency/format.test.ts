import { Ether } from 'juice-hooks'
import { expect, test } from 'vitest'
import { formatUsd, formatEth } from './format'

const numToWei = (num: number) => Ether.parse(num.toString(), 18).val

test.each`
  usd                            | expected
  ${numToWei(1)}                 | ${'US$1.00'}
  ${numToWei(2.5)}               | ${'US$2.50'}
  ${numToWei(2)}                 | ${'US$2.00'}
  ${numToWei(3)}                 | ${'US$3.00'}
  ${numToWei(4000)}              | ${'US$4,000.00'}
  ${numToWei(4001)}              | ${'US$4,001.00'}
  ${numToWei(4000.01)}           | ${'US$4,000.01'}
  ${numToWei(4000.1)}            | ${'US$4,000.10'}
  ${numToWei(4000.11)}           | ${'US$4,000.11'}
  ${numToWei(4000.119)}          | ${'US$4,000.12'}
  ${numToWei(12345678901234.21)} | ${'US$12,345,678,901,234.21'}
`('formatUsd($usd) === $expected', ({ usd, expected }) => {
  expect(formatUsd(usd)).toBe(expected)
})

test.each`
  eth                            | expected
  ${numToWei(1)}                 | ${'1 ETH'}
  ${numToWei(2)}                 | ${'2 ETH'}
  ${numToWei(3)}                 | ${'3 ETH'}
  ${numToWei(3.1)}               | ${'3.1 ETH'}
  ${numToWei(3.1234567)}         | ${'3.1234567 ETH'}
  ${numToWei(0.000008)}          | ${'0.000008 ETH'}
  ${numToWei(12345678901234.21)} | ${'12,345,678,901,234.21 ETH'}
`('formatEth($eth) === $expected', ({ eth, expected }) => {
  expect(formatEth(eth)).toBe(expected)
})
