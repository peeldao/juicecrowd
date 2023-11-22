import { Link } from '@/components/Link'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

export type JuicecrowdCTAProps = {
  className?: string
}

export const JuicecrowdCTA: React.FC<JuicecrowdCTAProps> = ({ className }) => {
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
          <div className="text-lg font-semibold">JC01 Now Live</div>
          <div className="mt-1.5 text-base text-gray-600">
            JC01 is now active, kickstarting our first cohort with a focus on
            web3 & blockchain innovations.
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Link href="/jc/1">
          <Button
            size="lg"
            className="w-full min-w-[200px] gap-2 whitespace-nowrap"
          >
            View projects
          </Button>
        </Link>
      </div>
    </div>
  )
}
