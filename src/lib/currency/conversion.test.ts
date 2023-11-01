import { expect, test } from 'vitest'
import { vi } from 'vitest'
import { ethToUsd, ethToUsdSync, usdToEth, usdToEthSync } from './conversion'
import { Ether } from 'juice-hooks'

const numToWei = (num: number) => Ether.parse(num.toString(), 18).val

const FETCHED_ETH_IN_USD = 6900

vi.mock('./fetch', () => ({
  fetchEthInUsd: async () => FETCHED_ETH_IN_USD,
}))

/*********************************************************************
 * ethToUsd
 *********************************************************************/

test.each`
  eth            | ethInUsd         | expected
  ${numToWei(1)} | ${numToWei(100)} | ${numToWei(100)}
  ${numToWei(1)} | ${numToWei(200)} | ${numToWei(200)}
  ${numToWei(2)} | ${numToWei(100)} | ${numToWei(200)}
  ${numToWei(2)} | ${numToWei(200)} | ${numToWei(400)}
  ${numToWei(2)} | ${numToWei(0)}   | ${numToWei(0)}
  ${numToWei(0)} | ${numToWei(100)} | ${numToWei(0)}
  ${numToWei(0)} | ${numToWei(0)}   | ${numToWei(0)}
`(
  'ethToUsdSync($eth, $ethInUsd) === $expected',
  ({ eth, ethInUsd, expected }) => {
    expect(ethToUsdSync(eth, ethInUsd)).toBe(expected)
  },
)

test.each`
  eth            | ethInUsd         | expected
  ${numToWei(1)} | ${numToWei(100)} | ${numToWei(100)}
  ${numToWei(1)} | ${numToWei(200)} | ${numToWei(200)}
  ${numToWei(2)} | ${numToWei(100)} | ${numToWei(200)}
  ${numToWei(2)} | ${numToWei(200)} | ${numToWei(400)}
  ${numToWei(2)} | ${numToWei(0)}   | ${numToWei(0)}
  ${numToWei(0)} | ${numToWei(100)} | ${numToWei(0)}
  ${numToWei(0)} | ${numToWei(0)}   | ${numToWei(0)}
`('ethToUsd($eth, $ethInUsd) === $expected', ({ eth, ethInUsd, expected }) => {
  expect(ethToUsd(eth, ethInUsd)).resolves.toBe(expected)
})

test('ethToUsd() fetches ethInUsd from the Juicebox API', async () => {
  expect(ethToUsd(numToWei(1))).resolves.toBe(numToWei(FETCHED_ETH_IN_USD))
})

test.each`
  eth               | ethInUsd
  ${numToWei(1)}    | ${numToWei(-100)}
  ${numToWei(-100)} | ${numToWei(100)}
  ${numToWei(-100)} | ${numToWei(-100)}
`('ethToUsdSync($eth, $ethInUsd) throws', ({ eth, ethInUsd }) => {
  expect(() => ethToUsdSync(eth, ethInUsd)).toThrow()
})

/*********************************************************************
 * usdToEth
 *********************************************************************/

test.each`
  usd            | ethInUsd         | expected
  ${numToWei(1)} | ${numToWei(100)} | ${numToWei(0.01)}
  ${numToWei(1)} | ${numToWei(200)} | ${numToWei(0.005)}
  ${numToWei(2)} | ${numToWei(100)} | ${numToWei(0.02)}
  ${numToWei(2)} | ${numToWei(200)} | ${numToWei(0.01)}
  ${numToWei(2)} | ${numToWei(0)}   | ${numToWei(0)}
  ${numToWei(0)} | ${numToWei(100)} | ${numToWei(0)}
  ${numToWei(0)} | ${numToWei(0)}   | ${numToWei(0)}
`(
  'usdToEthSync($usd, $ethInUsd) === $expected',
  ({ usd, ethInUsd, expected }) => {
    expect(usdToEthSync(usd, ethInUsd)).toBe(expected)
  },
)

test.each`
  usd            | ethInUsd         | expected
  ${numToWei(1)} | ${numToWei(100)} | ${numToWei(0.01)}
  ${numToWei(1)} | ${numToWei(200)} | ${numToWei(0.005)}
  ${numToWei(2)} | ${numToWei(100)} | ${numToWei(0.02)}
  ${numToWei(2)} | ${numToWei(200)} | ${numToWei(0.01)}
  ${numToWei(2)} | ${numToWei(0)}   | ${numToWei(0)}
  ${numToWei(0)} | ${numToWei(100)} | ${numToWei(0)}
  ${numToWei(0)} | ${numToWei(0)}   | ${numToWei(0)}
`('usdToEth($usd, $ethInUsd) === $expected', ({ usd, ethInUsd, expected }) => {
  expect(usdToEth(usd, ethInUsd)).resolves.toBe(expected)
})

test('usdToEth() fetches ethInUsd from the Juicebox API', async () => {
  expect(usdToEth(numToWei(1))).resolves.toBe(numToWei(1 / FETCHED_ETH_IN_USD))
})
