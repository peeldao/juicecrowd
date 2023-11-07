import { Link } from '@/components/Link'
import { CopyrightBanner } from './CopyrightBanner'
import Logo from '@/components/Logo'
import { featureFlagEnabled } from '@/lib/featureFlags'
import { FEATURE_FLAGS } from '@/lib/constants/featureFlags'

export type MinimalFooterProps = {
  className?: string
}

export const MinimalFooter: React.FC<MinimalFooterProps> = ({ className }) => {
  return (
    <footer className={className}>
      <div className="flex flex-col justify-between gap-8 bg-gray-50 px-10 py-5 md:flex-row md:items-center md:px-20 md:py-10">
        <div className="flex flex-col gap-3 font-medium text-gray-500">
          <span>Published on </span>
          <Logo theme="light-mono" />
        </div>

        <div className="flex w-full max-w-xl flex-col justify-end gap-x-12 gap-y-4 text-sm md:flex-row">
          <Link href="/#TODO" className="font-medium text-gray-600 underline">
            How Juicecrowd works
          </Link>
          <Link href="/#TODO" className="font-medium text-gray-600 underline">
            Smart contract guarantee
          </Link>
          {featureFlagEnabled(FEATURE_FLAGS.CREATE_PROJECT) ? (
            <Link
              href="/create"
              className="font-medium text-gray-600 underline"
            >
              Launch a campaign
            </Link>
          ) : null}
        </div>
      </div>
      <CopyrightBanner className="bg-gray-100 px-10 py-5 text-sm text-gray-400 md:px-20" />
    </footer>
  )
}
