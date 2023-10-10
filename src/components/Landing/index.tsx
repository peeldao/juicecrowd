import { BoltIcon, ShieldCheckIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import React, { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { Button } from '../Button'
import { Link } from '../Link'
import { JuiceboxLogo } from '../icon/JuiceboxLogo'
import { Navbar } from '../layout/Navbar'
import { HeroSection } from './components/HeroSection'
import { HowItWorksSection } from './components/HowItWorksSection'
import { StayInLoopSection } from './components/StayInLoopSection'
import { YourProjectSection } from './components/YourProjectSection'
import { GradientBackground } from './components/GradientBackground'

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <div className="relative mt-14 flex flex-col items-center overflow-hidden px-4 text-base md:mt-32 md:px-5">
        <GradientBackground className="absolute left-1/2 top-0 -translate-x-1/2" />
        <GradientBackground className="absolute left-1/2 top-1/2 -translate-x-1/2" />
        <GradientBackground className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-full" />

        <HeroSection />

        <HowItWorksSection className="mt-20 md:mt-32" />

        <div className="relative">
          <Image
            className="mt-24 md:hidden"
            src="/assets/images/example-sm.png"
            alt="Project page example"
            height={868}
            width={300}
          />
          <Image
            className="mt-24 hidden md:block"
            src="/assets/images/example-md.png"
            alt="Project page example"
            height={616}
            width={1010}
          />
        </div>

        <YourProjectSection />
        <PoweredByTheBestSection className="mt-20" />
        <div className="mb-28 mt-20 flex flex-col gap-12 md:mb-44 md:mt-32 md:flex-row md:gap-8">
          <EndStatement icon={<ShieldCheckIcon className="h-7 w-7" />}>
            Secured by audited smart contracts
          </EndStatement>
          <EndStatement icon={<JuiceboxLogo className="h-7 w-7 fill-white" />}>
            Powered by Juicebox, built on Ethereum
          </EndStatement>
          <EndStatement icon={<BoltIcon className="h-7 w-7" />}>
            Enabling fast, borderless funding
          </EndStatement>
        </div>
      </div>
      <StayInLoopSection />
    </>
  )
}

type PoweredByTheBestSectionProps = {
  className?: string
}

const PoweredByTheBestSection: React.FC<PoweredByTheBestSectionProps> = ({
  className,
}) => {
  return (
    // TODO: Should be bg-gray-25
    <div
      className={twMerge(
        'flex w-full max-w-6xl flex-col items-center gap-16 rounded-xl border border-gray-100 bg-gray-50 px-4 pb-12 pt-8 text-center md:px-28 md:py-16',
        className,
      )}
    >
      <div className="max-w-3xl">
        <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">
          Powered by the best ⚡️
        </h2>
        <div className="mt-5 text-base md:text-lg">
          Brought to you by the team at Juicebox, responsible for helping over
          1,200 projects raise over{' '}
          <span className="font-semibold">US$177,000,000</span>.
        </div>
        <Image
          className="mt-12 md:hidden"
          src="/assets/images/powered-by-the-best-sm.png"
          alt="Successful Juicebox Projects"
          width={295}
          height={290}
        />
        <Image
          className="mt-16 hidden md:block"
          src="/assets/images/powered-by-the-best-md.png"
          alt="Successful Juicebox Projects"
          width={966}
          height={376}
        />

        <Link href="https://juicebox.money">
          <Button className="m-auto mt-12 w-fit border border-gray-300 bg-white text-black drop-shadow md:mt-16">
            Visit Juicebox
          </Button>
        </Link>
      </div>
    </div>
  )
}

type EndStatementProps = {
  className?: string
  icon: ReactNode
  children: ReactNode
}

const EndStatement: React.FC<EndStatementProps> = ({
  className,
  icon,
  children,
}) => {
  return (
    <div className={twMerge('flex items-center gap-5', className)}>
      <BlackWhiteBorderIcon icon={icon} />
      <span className="max-w-[208px] font-medium text-gray-800">
        {children}
      </span>
    </div>
  )
}

const BlackWhiteBorderIcon: React.FC<{ icon: ReactNode }> = ({ icon }) => {
  return (
    <div className="h-fit w-fit rounded-xl border-4 border-white bg-black p-1.5 text-white">
      {icon}
    </div>
  )
}
