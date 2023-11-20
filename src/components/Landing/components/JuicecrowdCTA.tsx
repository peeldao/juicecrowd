import { Link } from '@/components/Link'
import { EthereumIconFilled } from '@/components/icon/EthereumIconFilled'
import { Button } from '@/components/ui/Button'
import {
  JC01SubmissionsClosed,
  JC01_DATES,
  JC01_DATE_STRINGS,
} from '@/lib/constants/crowds'
import { dateToCountdownString } from '@/lib/date/format'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export type JuicecrowdCTAProps = {
  className?: string
}

export const JuicecrowdCTA: React.FC<JuicecrowdCTAProps> = ({ className }) => {
  const submissionsAreLocked = JC01SubmissionsClosed()

  return (
    <div
      className={twMerge(
        className,
        'flex max-w-5xl flex-col items-center justify-between gap-8 rounded-xl border border-gray-100 bg-white px-11 py-10 shadow-sm md:flex-row',
      )}
    >
      <div className="flex flex-col items-center gap-8 md:flex-row">
        <Image
          src="/assets/images/tech-crowd-cta.png"
          alt="Two squares, one with a schematic eye, and another with a stylized lightning bolt"
          width={215}
          height={139}
        />
        <div className="flex flex-col items-center text-center md:items-start md:text-start">
          <div className="text-lg font-semibold">
            {!submissionsAreLocked ? (
              <>Juicecrowd 01 (JC01)</>
            ) : (
              <>JC01 Submissions Closed</>
            )}
          </div>
          <div className="mt-1.5 text-base text-gray-600">
            {!submissionsAreLocked ? (
              <>
                Submissions now open for all projects in the blockchain & web3
                space.{' '}
                <Link
                  className="text-gray-600 underline"
                  href="https://docs.juicecrowd.gg"
                >
                  Learn more
                </Link>
              </>
            ) : (
              <>
                Submissions closed for JC01, our first cohort focused on web3 &
                blockchain projects.
              </>
            )}
          </div>
          {!submissionsAreLocked && (
            <PrizePoolFlair className="mt-3 md:mt-4" prizePool={3} />
          )}
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        {!submissionsAreLocked ? (
          <>
            <Link href="/crowds" className="w-full">
              <Button size="lg" className="w-full whitespace-nowrap">
                Submit your project
              </Button>
            </Link>
            <div className="whitespace-nowrap text-center text-xs text-gray-400">
              Submissions close {JC01_DATE_STRINGS.SUBMISSIONS_CLOSE}
            </div>
          </>
        ) : (
          <>
            <Button
              size="lg"
              className="w-full min-w-[200px] gap-2 whitespace-nowrap bg-gray-800 opacity-100 disabled:bg-gray-800 disabled:opacity-100"
              disabled
            >
              <span>🚀</span>
              Launching soon
            </Button>
          </>
        )}
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
