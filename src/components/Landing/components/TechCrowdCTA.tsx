import { twMerge } from 'tailwind-merge'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Link } from '@/components/Link'
import { EthereumIconFilled } from '@/components/icon/EthereumIconFilled'
import { JC01_DATES } from '@/lib/constants/crowds'

export type TechCrowdCTAProps = {
  className?: string
}

export const TechCrowdCTA: React.FC<TechCrowdCTAProps> = ({ className }) => {
  return (
    <div
      className={twMerge(
        className,
        'flex max-w-5xl flex-col items-center justify-between gap-8 rounded-xl border border-gray-100 bg-white px-11 py-10 shadow-sm md:flex-row',
      )}
    >
      <div className="flex flex-col items-center gap-8 md:flex-row">
        <Image
          className="max-h-28"
          src="/assets/images/tech-crowd-cta.png"
          alt="Two squares, one with a schematic eye, and another with a stylized lightning bolt"
          width={195}
          height={115}
        />
        <div className="flex flex-col items-center text-center md:items-start md:text-start">
          <div className="text-lg font-semibold">Juicecrowd 01 (JC01)</div>
          <div className="mt-1.5 text-base text-gray-600">
            Submissions now open for all projects in the blockchain & web3
            space.{' '}
            <Link
              className="text-gray-600 underline"
              href="https://docs.juicecrowd.gg"
            >
              Learn more
            </Link>
          </div>
          <PrizePoolFlair className="mt-3 md:mt-4" prizePool={3} />
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Link href="/crowds" className="w-full">
          <Button size="lg" className="w-full whitespace-nowrap">
            Submit your project
          </Button>
        </Link>
        <div className="whitespace-nowrap text-center text-xs text-gray-400">
          Submissions close {JC01_DATES.SUBMISSIONS_CLOSE}
        </div>
      </div>
    </div>
  )
}

type PrizePoolFlairProps = {
  className?: string
  prizePool: number
}

const PrizePoolFlair: React.FC<PrizePoolFlairProps> = ({
  className,
  prizePool,
}) => {
  return (
    <div
      className={twMerge(
        'flex w-fit items-center gap-1 rounded-full border border-gray-100 py-1 pl-1 pr-3',
        className,
      )}
    >
      <div className="flex items-center justify-center rounded-full bg-bluebs-50 p-1">
        <EthereumIconFilled className="h-5 w-5 text-bluebs-500" />
      </div>
      <div className="text-base font-medium text-gray-800">
        {prizePool} ETH prize pool
      </div>
    </div>
  )
}
