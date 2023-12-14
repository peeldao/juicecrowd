import { Link } from '../Link'
import Banner from './Banner'

export function LedgerWarningBanner() {
  return (
    <Banner
      body={
        <>
          <strong>Warning:</strong> On-going <strong>Ledger Connect</strong>{' '}
          vulnerability. Exercise caution.{' '}
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
