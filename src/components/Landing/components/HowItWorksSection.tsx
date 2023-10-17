import { Button } from '@/components/ui/Button'
import { Link } from '@/components/Link'
import Image from 'next/image'
import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

// hardcoded for now
const CROWD_BADGES = [
  'Art',
  'Film & photography',
  'Games',
  'Impact & causes',
  'Music',
  'Design & technology',
  'Health & wellness',
]

// harcoded for now
const SUPPORT_BADGES = [
  'Story telling',
  'Branding & imagery',
  'Offers & rewards',
  'Partnerships',
  'Target & duration',
  'Community',
  'Marketing',
  'Much more',
]

export type HowItWorksSectionProps = {
  className?: string
}
export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  className,
}) => {
  return (
    <>
      <h2 className={twMerge('font-heading text-3xl font-bold', className)}>
        How it works
      </h2>
      <div className="mt-5 flex max-w-5xl flex-col gap-14 md:mt-12 md:gap-12">
        <div className="flex flex-col items-center md:flex-row md:gap-16">
          <Image
            src="/assets/images/how-it-works-1.png"
            alt="Find your crowd"
            width={400}
            height={400}
          />
          <div className="flex flex-col">
            <h3 className="font-heading text-2xl font-medium">
              Find your crowd
            </h3>
            <div className="mt-4 text-gray-700">
              Around here, things run in *crowds*. Each crowd is a small cohort
              of projects unified by a theme. Keep an eye out for crowds that
              suit your project!
            </div>
            <div className="mt-6 flex flex-wrap gap-x-1 gap-y-1.5">
              {CROWD_BADGES.map(badge => (
                <Badge key={badge} type="crowd">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-8 md:flex-row-reverse md:gap-16">
          <Image
            src="/assets/images/how-it-works-2.png"
            alt="Submit your project"
            width={400}
            height={400}
          />
          <div className="flex flex-col">
            <h3 className="font-heading text-2xl font-medium">
              Submit your project
            </h3>
            <div className="mt-4 text-gray-700">
              If you vibe with a crowd&apos;s theme, submit your project for the
              chance to join a tight-knit cohort of builders and creators.If
              you&apos;re accepted, then we&apos;re off to the races!
            </div>
            <Link href="/crowds">
              {/* Hardcoded JC01 */}
              <Button className="mt-6">Submit to JC01</Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center gap-8 md:flex-row md:gap-16">
          <Image
            src="/assets/images/how-it-works-3.png"
            alt="Get crowdfunding support"
            width={400}
            height={400}
          />
          <div className="flex flex-col">
            <h3 className="font-heading text-2xl font-medium">
              Get crowdfunding support
            </h3>
            <div className="mt-4 text-gray-700">
              Our team will help you polish your campaign, promote it, and
              provide support from start to finish. Let&apos;s work together to
              get the most out of your crowdfunding campaign.
            </div>
            <div className="mt-6 text-base font-medium">
              Help where you need it most ♥
            </div>
            <div className="mt-4 flex flex-wrap gap-x-1 gap-y-1.5">
              {SUPPORT_BADGES.map(badge => (
                <Badge key={badge} type="support">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

type BadgeProps = {
  className?: string
  type: 'crowd' | 'support'
}

const Badge: React.FC<PropsWithChildren<BadgeProps>> = ({
  children,
  className,
  type,
}) => {
  return (
    <div
      className={twMerge(
        'w-fit text-sm font-medium leading-5',
        type === 'crowd' &&
          'rounded-full bg-gray-100 px-2 py-1.5 text-gray-600',
        type === 'support' &&
          'rounded-md border border-gray-300 bg-white px-2.5 py-1 text-gray-700',
        className,
      )}
    >
      {children}
    </div>
  )
}
