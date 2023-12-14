import { Link } from '../Link'
import Banner from './Banner'

export function LedgerWarningBanner() {
  return (
    <Banner
      body={
        <>
          <strong>Warning:</strong> We have disabled connecting to Juicecrowd
          due to an ongoing Ledger Connect vulnerability.{' '}
          <strong>Exercise caution.</strong>{' '}
          <Link href="https://cointelegraph.com/news/multiple-dapps-using-ledger-connector-compromised">
            Learn more
          </Link>
        </>
      }
      variant="warning"
      textAlign="center"
    />
  )
}
