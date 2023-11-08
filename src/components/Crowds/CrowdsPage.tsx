import {
  JC01SubmissionsClosed,
  JC01_DATES,
  JC01_DATE_STRINGS,
} from '@/lib/constants/crowds'
import React, { ReactNode } from 'react'
import { Breadcrumbs } from '../Breadcrumbs'
import { StayInLoopSection } from '../Landing/components/StayInLoopSection'
import { Link } from '../Link'
import { Button } from '../ui/Button'

const PRIZE_POOL_ETH = 3

export const CrowdsPage: React.FC = () => {
  const submissionsAreLocked = JC01SubmissionsClosed()
  return (
    <>
      <div className="mx-auto flex max-w-5xl flex-col px-5 pt-14 text-base md:pt-20">
        <Breadcrumbs />
        <h1 className="mt-16 font-heading text-3xl font-medium">
          Juicecrowd (JC01) submissions open!
        </h1>

        <div className="font-xl mt-10 flex flex-col gap-12">
          <HeaderParagraph header="About">
            <p>
              Juicecrowd is an all new dApp brought to you by the creators of{' '}
              <Link
                href="https://juicebox.money/about"
                className="text-foreground underline"
              >
                juicebox.money
              </Link>{' '}
              - helping creators launch and grow successful crowdfunding
              campaigns. We run things in Crowds - like small cohorts. Each
              Crowd will accept up to ten projects and offer them support,
              guidance, and infrastructure to raise funds in a crowdfunding
              format.
            </p>
            <p>
              Juicecrowd 01 (JC01) is our very first Crowd. We&apos;re looking
              for early-stage projects in the web3/blockchain space that are
              actively raising funds. In addition to support and guidance for
              selected projects, we also have a{' '}
              <span className="font-medium">3 ETH prize pool</span> up for grabs
              🎉
            </p>
          </HeaderParagraph>

          <HeaderParagraph header="Requirements">
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li>
                Your project must already exist or have proof of prior work.
              </li>
              <li>
                Your project must use web3 or blockchain technology in some way.
              </li>
              <li>
                Your team must have capacity to work on your crowdfunding
                campaign during specified dates (see below).
              </li>
            </ul>
          </HeaderParagraph>

          <HeaderParagraph header="How it works">
            <p>
              Juicecrowd works in <span className="font-medium">Crowds</span>{' '}
              which are cohorts unified by a theme. Up to ten projects will be
              selected for each Crowd.
            </p>
            <ol className="ml-4 list-inside list-decimal">
              <li>Read the requirements above carefully.</li>
              <li>
                Submit your project using the &apos;Submit your project&apos;
                button below.
              </li>
              <li>
                If selected, you&apos;ll work with the Juicebox team to refine
                your crowdfunding campaign before launch.
              </li>
              <li>Launch your campaign on Juicecrowd and crowdfund in ETH.</li>
            </ol>
            <p className="mt-5">
              The top 3 projects by amount raised will be awarded from the 3 ETH
              prize pool.
            </p>
          </HeaderParagraph>

          <HeaderParagraph header="Dates">
            <p>Please see important dates for Juicecrowd 01 (JC 01) below:</p>
            <ul className="ml-4 list-inside list-disc">
              <li>
                Submissions close{' '}
                <span className="font-medium">
                  {JC01_DATE_STRINGS.SUBMISSIONS_CLOSE}
                </span>
              </li>
              <li>
                Successful applicants selected by{' '}
                <span className="font-medium">
                  {JC01_DATE_STRINGS.SUCCESSFUL_APPLICANTS_SELECTED}
                </span>
              </li>
              <li>
                Projects launch on{' '}
                <span className="font-medium">
                  {JC01_DATE_STRINGS.PROJECTS_LAUNCH}
                </span>
              </li>
              <li>
                Project campaigns run for 30 days, ending on{' '}
                <span className="font-medium">
                  {JC01_DATE_STRINGS.PROJECTS_RUN}
                </span>
              </li>
              <li>
                Prize pool awarded on{' '}
                <span className="font-medium">
                  {JC01_DATE_STRINGS.PRIZE_POOL_AWARDED}
                </span>
              </li>
            </ul>
          </HeaderParagraph>

          <HeaderParagraph header="Prize pool">
            Juicebox has provided{' '}
            <span className="font-semibold">{PRIZE_POOL_ETH} ETH</span> to be
            awarded to the top 3 projects in this Crowd. Winning projects are
            determined by each project's total funds raised: first place is
            awarded to the project who raises the most.
            <ul className="mt-8 block">
              <li>🥇 First place project receives 1.5 ETH</li>
              <li>🥈 Second place project receives 1 ETH</li>
              <li>🥉 Third place project receives 0.5 ETH</li>
            </ul>
          </HeaderParagraph>
        </div>

        <Link
          href={
            !submissionsAreLocked
              ? 'https://form.typeform.com/to/LfNmNKVe'
              : '/submission-closed'
          }
        >
          <Button size="lg" className="mt-16">
            Submit your project
          </Button>
        </Link>

        <div className="mt-10 text-sm text-gray-500">
          By submitting your project, you acknowledge that your personal and
          project information will be collected by the Juicebox team and used
          for planning and selection purposes. This information will never be
          shared. Note that there is a 2.5% incurred withdrawal fee for
          projects.
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
      <h2 className="mb-4 text-lg font-semibold">{header}</h2>
      <div className="space-y-6">{children}</div>
    </div>
  )
}
