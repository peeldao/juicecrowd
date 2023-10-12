import React, { ReactNode } from 'react'
import { Breadcrumbs } from '../Breadcrumbs'
import { Button } from '../Button'
import { StayInLoopSection } from '../Landing/components/StayInLoopSection'
import { Navbar } from '../layout/Navbar'
import { Link } from '../Link'

const DATE = {
  SUBMISSIONS_CLOSE: '2023-09-30',
  SUCCESSFUL_APPLICANTS_SELECTED: '2023-10-07',
  PROJECTS_LAUNCH: '2023-10-14',
  PROJECTS_RUN: '2023-10-14',
  PRIZE_POOL_AWARDED: '202r-10-14',
}

const PRIZE_POOL_ETH = 3

export const CrowdsPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="mx-auto flex max-w-5xl flex-col px-5 pt-14 text-base md:pt-20">
        <Breadcrumbs />
        <h1 className="mt-16 font-heading text-3xl font-medium">
          Juicecrowd (JC01) submissions open!
        </h1>

        <div className="font-xl mt-10 flex flex-col gap-8">
          <HeaderParagraph header="About">
            <p>
              Calling all build00rs! The very first, official Juicecrowd program
              is underway - where we support (and fund a little) early-stage
              projects looking to raise funds in the web3/blockchain space.
            </p>
            <p>
              This is an all new program brought to you by the creators of
              <Link
                className="text-black underline"
                href="https://juicebox.money/about"
              >
                Juicebox
              </Link>
              , and we have an additional 3 ETH prize pool up for grabs for the
              top 3 funded projects.
            </p>
            <p>
              This program is designed to take 10 existing projects (per crowd),
              offering further support, funding and infrastructure to raise
              funds in a crowdfunding format.
            </p>
          </HeaderParagraph>

          <HeaderParagraph header="Requirements">
            <ul className="ml-4 list-inside list-disc">
              <li>Technology-focused (e.g. trading bot, etc.)</li>
              <li>Uses web3 technology or is for web3 users in some way</li>
              <li>Lorem ipsum dolor sit amet</li>
              <li>Lorem ipsum dolor sit amet</li>
            </ul>
          </HeaderParagraph>

          <HeaderParagraph header="How it works">
            <p>
              Juicecrowd works in &apos;crowds&apos;, which are like cohorts. Up
              to 10 projects will be selected each crowd.
            </p>
            <ul className="ml-4 list-inside list-decimal">
              <li>Read up on the crowd requirements above</li>
              <li>
                Submit your project details using the &apos;submit your
                project&apos; button below If selected, you&apos;ll work with
                the Juicebox team to refine your crowdfunding campaign
              </li>
              <li>Launch your campaign and crowdfund ETH</li>
              <li>
                The top 3 projects will receive a proportionate share of 3 ETH
              </li>
            </ul>
          </HeaderParagraph>

          <HeaderParagraph header="Dates">
            <ul className="ml-4 list-inside list-disc">
              <li>Submissions close {DATE.SUBMISSIONS_CLOSE}</li>
              <li>
                Successful applicants selected by{' '}
                {DATE.SUCCESSFUL_APPLICANTS_SELECTED}
              </li>
              <li>Projects launch on {DATE.PROJECTS_LAUNCH} </li>
              <li>
                Project campaigns run for 30 days, ending on {DATE.PROJECTS_RUN}
              </li>
              <li>Prize pool awarded on {DATE.PRIZE_POOL_AWARDED}</li>
            </ul>
          </HeaderParagraph>

          <HeaderParagraph header="Prize pool">
            Juicebox has provided{' '}
            <span className="font-semibold">{PRIZE_POOL_ETH} ETH</span> to be
            awarded to the top 3 projects in this crowd. ‘Top’ projects are
            determined on the total funds raised by the project, and will be
            split accordingly. For example:
            <ul className="mt-8 block">
              <li>#1 project raises 2.1 ETH (Receives 70% of prize pool)</li>
              <li>#2 project raises 0.6 ETH (Receives 20% of prize pool)</li>
              <li>#3 project raises 0.3 ETH ((Receives 10% of prize pool)</li>
            </ul>
          </HeaderParagraph>
        </div>

        <Link href="https://form.typeform.com/to/LfNmNKVe">
          <Button className="mt-16 w-fit">Submit your project</Button>
        </Link>

        <div className="mt-10 text-sm text-gray-500">
          By submitting your project, you acknowledge that your personal and
          project information will be collected by the Juicebox team and used
          for planning and selection purposes.
        </div>
      </div>
      <StayInLoopSection className="mt-32" />
    </>
  )
}

type HeaderParagraphProps = {
  className?: string
  header: ReactNode
  children: ReactNode
}

const HeaderParagraph: React.FC<HeaderParagraphProps> = ({
  className,
  header,
  children,
}) => {
  return (
    <div className={className}>
      <h2 className="mb-8 font-semibold">{header}</h2>
      <div className="space-y-6">{children}</div>
    </div>
  )
}
