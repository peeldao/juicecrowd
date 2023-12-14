import { Link } from '../Link'
import Banner from './Banner'

export function LedgerWarningBanner() {
  return (
    <Banner
      body={
        <>
          <strong>Warning:</strong> An ongoing Ledger Connect vulnerability
          could affect many dapps. Juicecrowd should be safe, but{' '}
          <strong>exercise caution.</strong>{' '}
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
