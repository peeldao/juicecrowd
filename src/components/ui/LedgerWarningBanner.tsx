import { Link } from '../Link'
import Banner from './Banner'

export function LedgerWarningBanner() {
  return (
    <Banner
      body={
        <>
          <strong>Warning:</strong> Connecting to Juicecrowd is disabled due to
          an ongoing Ledger Connect vulnerability.{' '}
          <strong>Clear your cache before using Juicecrowd.</strong> Exercise
          caution.{' '}
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
