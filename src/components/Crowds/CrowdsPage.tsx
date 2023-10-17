import React, { ReactNode } from 'react'
import { Breadcrumbs } from '../Breadcrumbs'
import { StayInLoopSection } from '../Landing/components/StayInLoopSection'
import { Link } from '../Link'
import { Button } from '../ui/Button'
import { JC01_DATES } from '@/lib/constants/crowds'

const PRIZE_POOL_ETH = 3

export const CrowdsPage: React.FC = () => {
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
                Juicebox
              </Link>{' '}
              - helping creators launch and grow successful crowdfunding
              campaigns. We run things in crowds - like small cohorts. Each
              crowd will accept up to ten projects and offer them support,
              guidance, and infrastructure to raise funds in a crowdfunding
              format.
            </p>
            <p>
              Juicecrowd 01 (JC01) is our very first crowd. We&apos;re looking
              for early-stage projects in the web3/blockchain space that are
              actively raising funds. In addition to support and guidance for
              selected projects, we also have a{' '}
              <span className="text-bold">3 ETH prize pool</span> up for grabs
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
              Juicecrowd works in <span className="italic">crowds</span> which
              are cohorts unified by a theme. Up to ten projects will be
              selected for each crowd.
            </p>
            <ul className="ml-4 list-inside list-decimal">
              <li>Carefully read the crowd requirements above</li>
              <li>
                Submit your project using the &apos;Submit your project&apos;
                button below
              </li>
              <li>
                If selected, you&apos;ll work with the Juicebox team to refine
                your crowdfunding campaign before launch
              </li>
              <li>Launch your campaign on Juicecrowd and crowdfund in ETH</li>
              <li>
                The top 3 projects by amount raised will receive a proportionate
                share of the 3 ETH prize pool
              </li>
            </ul>
          </HeaderParagraph>

          <HeaderParagraph header="Dates">
            <p>Please see important dates for Juicecrowd 01 (JC 01) below:</p>
            <ul className="ml-4 list-inside list-disc">
              <li>
                Submissions close{' '}
                <span className="font-medium">
                  {JC01_DATES.SUBMISSIONS_CLOSE}
                </span>
              </li>
              <li>
                Successful applicants selected by{' '}
                <span className="font-medium">
                  {JC01_DATES.SUCCESSFUL_APPLICANTS_SELECTED}
                </span>
              </li>
              <li>
                Projects launch on
                <span className="font-medium">
                  {JC01_DATES.PROJECTS_LAUNCH}
                </span>
              </li>
              <li>
                Project campaigns run for 30 days, ending on{' '}
                <span className="font-medium">{JC01_DATES.PROJECTS_RUN}</span>
              </li>
              <li>
                Prize pool awarded on{' '}
                <span className="font-medium">
                  {JC01_DATES.PRIZE_POOL_AWARDED}
                </span>
              </li>
            </ul>
          </HeaderParagraph>

          <HeaderParagraph header="Prize pool">
            Juicebox has provided{' '}
            <span className="font-semibold">{PRIZE_POOL_ETH} ETH</span> to be
            awarded to the top 3 projects in this crowd. &apos;Top&apos;
            projects are determined on the total funds raised by the project,
            and will be split accordingly. For example:
            <ul className="mt-8 block">
              <li>#1 project raises 1.5 ETH</li>
              <li>#2 project raises 1.0 ETH</li>
              <li>#3 project raises 0.5 ETH</li>
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
