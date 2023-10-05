import { twMerge } from 'tailwind-merge'
import Image from 'next/image'
import { Button } from '@/components/Button'
import { Link } from '@/components/Link'

export type TechCrowdCTAProps = {
  className?: string
}

export const TechCrowdCTA: React.FC<TechCrowdCTAProps> = ({ className }) => {
  return (
    <div
      className={twMerge(
        className,
        'flex max-w-5xl justify-between gap-10 rounded-xl border border-gray-100 px-11 py-10 shadow-sm',
      )}
    >
      <div className="flex gap-8">
        <Image
          className="max-h-28"
          src="/assets/images/tech-crowd-cta.png"
          alt="Two squares, one with a schematic eye, and another with a stylized lightning bolt"
          width={195}
          height={115}
        />
        <div className="flex flex-col">
          <div className="text-lg font-semibold">Tech Crowd 01 (TC01)</div>
          <div className="mt-1.5 text-base text-gray-600">
            Submissions now open for all technology-focused projects in the web3
            space.
          </div>
          <div className="mt-3">5 ETH prize pool</div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-5">
        <Button className="whitespace-nowrap px-7 py-4">
          Submit your project
        </Button>
        <Link href="#TODO">Learn more</Link>
      </div>
    </div>
  )
}
