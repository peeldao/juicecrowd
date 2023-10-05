import Image from 'next/image'
import { Navbar } from '../layout/Navbar'
import { TechCrowdCTA } from './components/TechCrowdCTA'
import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import { Button } from '../Button'
import { StayInLoopSection } from './components/StayInLoopSection'
import { YourProjectSection } from './components/YourProjectSection'

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <div className="mt-32 flex flex-col items-center px-5 text-base">
        <h1 className="max-w-xl font-heading text-6xl font-bold">
          Stand out from the crowd. Get funded.
        </h1>
        <div className="mt-4 max-w-3xl text-center text-lg text-gray-700">
          Unlock funding to take your project to the next level. Learn how to
          tell your story and tap into your audience to build lasting support
          communities.
        </div>

        <TechCrowdCTA className="mt-14" />

        <Image
          className="mt-16"
          src="/assets/images/powered-by-juicebox.png"
          alt="Powered by Juicebox"
          width={250}
          height={30}
        />

        <h2 className="mt-32 font-heading text-3xl font-bold">How it works</h2>
        <div className="mt-12 flex max-w-5xl flex-col gap-12">
          <div className="flex items-center gap-16">
            <Image
              src="/assets/images/how-it-works1.png"
              alt="Find your crowd"
              width={400}
              height={400}
            />
            <div className="flex flex-col">
              <h3 className="font-heading text-2xl font-medium">
                Find your crowd
              </h3>
              <div className="mt-4 text-gray-700">
                Around here, things run in &apos;crowds&apos;. They&apos;re
                essentially targeted cohorts. Each crowd has a theme. Keep an
                eye out for crowds that suit your project!
              </div>
              <div className="mt-6 flex flex-wrap gap-x-1 gap-y-1.5">
                {CROWD_BADGES.map(badge => (
                  <Badge key={badge}>{badge}</Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-row-reverse items-center gap-16">
            <Image
              src="/assets/images/how-it-works2.png"
              alt="Submit your project"
              width={400}
              height={400}
            />
            <div className="flex flex-col">
              <h3 className="font-heading text-2xl font-medium">
                Submit your project
              </h3>
              <div className="mt-4 text-gray-700">
                Once your crowd pops up, you&apos;ll need to submit your
                project. The community will vote on their favourite projects,
                and if you make it in, we&apos;re off to the races!
              </div>
              {/* Hardcoded TC01 */}
              <Button className="mt-6 w-fit">Submit to TC01</Button>
            </div>
          </div>

          <div className="flex items-center gap-16">
            <Image
              src="/assets/images/how-it-works3.png"
              alt="Get crowdfunding support"
              width={400}
              height={400}
            />
            <div className="flex flex-col">
              <h3 className="font-heading text-2xl font-medium">
                Get crowdfunding support
              </h3>
              <div className="mt-4 text-gray-700">
                Our team will help you polish your campaign, promote it and
                provide 360° support from start the finish. So you can get the
                very most our of your crowdfund campaign.
              </div>
              <div className="mt-6 text-base font-medium">
                Help where you need it most ♥
              </div>
              <div className="mt-4 flex flex-wrap gap-x-1 gap-y-1.5">
                {SUPPORT_BADGES.map(badge => (
                  <Badge key={badge}>{badge}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Image
          className="mt-24"
          src="/assets/images/how-it-works4.png"
          alt="Project page example"
          height={616}
          width={1010}
        />
        <YourProjectSection />
      </div>
      <StayInLoopSection />
    </>
  )
}

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

type BadgeProps = {
  className?: string
}

const Badge: React.FC<PropsWithChildren<BadgeProps>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={twMerge(
        'w-fit rounded-full bg-gray-100 px-2 py-1.5 text-sm font-medium text-gray-600',
        className,
      )}
    >
      {children}
    </div>
  )
}
