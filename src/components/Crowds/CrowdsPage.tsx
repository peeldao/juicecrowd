import React, { ReactNode } from 'react'
import { Breadcrumbs } from '../Breadcrumbs'
import { StayInLoopSection } from '../Landing/components/StayInLoopSection'
import { Navbar } from '../layout/Navbar'
import { Link } from '../Link'
import { Button } from '../ui/Button'

const DATE = {
  SUBMISSIONS_CLOSE: '01 November 2023',
  SUCCESSFUL_APPLICANTS_SELECTED: '08 November 2023',
  PROJECTS_LAUNCH: '14 November 2023',
  PROJECTS_RUN: '14 December 2023',
  PRIZE_POOL_AWARDED: '15 December 2023',
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
              Juicecrowd is an all-new program brought to you by the creators of
              Juicebox, designed to take up to 10 projects (per crowd), offering
              them support, funding and infrastructure to help you raise funds
              to achieve your goals in a crowdfunding format.
            </p>
            <p>
              This program is designed to take 10 existing projects (per crowd),
              offering further support, funding and infrastructure to raise
              funds in a crowdfunding format.
            </p>
            <p>
              Plus, we have an additional prize pool of 3 ETH up for grabs 🎉
            </p>
          </HeaderParagraph>

          <HeaderParagraph header="Requirements">
            <ul className="ml-4 list-inside list-disc">
              <li>Project must already exist or have proof of prior work</li>
              <li>
                Project must use web3 or blockchain technology in some way
              </li>
              <li>
                Team must have capacity to work on their crowdfunding campaign
                during specified dates
              </li>
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
              <li>
                If selected, you&apos;ll work with the Juicebox team to refine
                your crowdfunding campaign
              </li>
              <li>
                Launch your campaign on Juicecrowd and crowdfund it in ETH
              </li>
              <li>
                The top 3 projects will receive a proportionate share of the 3
                ETH prize pool
              </li>
            </ul>
          </HeaderParagraph>

          <HeaderParagraph header="Dates">
            <p>Please see important dates for Juicecrowd 01 (JC 01) below:</p>
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
            awarded to the top 3 projects in this crowd. &apos;Top&apos;
            projects are determined on the total funds raised by the project,
            and will be split accordingly. For example:
            <ul className="mt-8 block">
              <li>#1 project raises 2.1 ETH (Receives 70% of prize pool)</li>
              <li>#2 project raises 0.6 ETH (Receives 20% of prize pool)</li>
              <li>#3 project raises 0.3 ETH ((Receives 10% of prize pool)</li>
            </ul>
          </HeaderParagraph>
        </div>

        <Link href="https://form.typeform.com/to/LfNmNKVe">
          <Button size="lg" className="mt-16">
            Submit your project
          </Button>
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
