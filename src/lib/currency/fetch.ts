import axios from 'axios'

export const fetchEthInUsd = async () => {
  try {
    const {
      // price is 1 ETH in USD
      data: { price },
    } = await axios.get<{ price: string }>(
      'https://juicebox.money/api/juicebox/prices/ethusd',
    )
    const ethInUsd = parseFloat(price)
    if (isNaN(ethInUsd)) {
      console.error('ethInUsd is NaN', price)
      return 0
    }
    return ethInUsd
  } catch (e) {
    console.error(e)
    return 0
  }
}
