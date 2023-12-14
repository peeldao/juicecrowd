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
          <Link href="https://twitter.com/Ledger/status/1735326240658100414">
            Learn more
          </Link>
        </>
      }
      variant="warning"
      textAlign="center"
    />
  )
}
