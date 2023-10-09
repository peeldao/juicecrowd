import React, { ReactNode } from 'react'
import { Breadcrumbs } from '../Breadcrumbs'
import { StayInLoopSection } from '../Landing/components/StayInLoopSection'
import { Navbar } from '../layout/Navbar'
import { Button } from '../Button'

export const CrowdsPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="mx-auto flex max-w-5xl flex-col px-5 pt-14 text-base md:pt-32">
        <Breadcrumbs />
        <h1 className="mt-16 font-heading text-3xl font-medium">
          Tech crowd 01 (TC01) submissions open!
        </h1>

        <div className="font-xl mt-10 flex flex-col gap-8">
          <HeaderParagraph header="About">
            Calling all techies! Submissions are now open for
            technology-orientated projects in the web3 space looking to
            crowdfund US$10-$25k to take their project to the next level.
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip.
          </HeaderParagraph>

          <HeaderParagraph header="Dates">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip.
          </HeaderParagraph>

          <HeaderParagraph header="Prize pool">
            Juicebox has provided 5 ETH (US$8215.60) to be awarded to the top 3
            projects in this crowd. &apos;Top&apos; projects are determined on
            the total funds raised by the project, and will be split
            accordingly. For example:
            <ul className="mt-8 block">
              <li>#1 project raises 7 ETH (Receives 70% of prize pool)</li>
              <li>#2 project raises 2 ETH (Receives 20% of prize pool)</li>
              <li>#3 project raises 1 ETH ((Receives 10% of prize pool)</li>
            </ul>
          </HeaderParagraph>
        </div>

        <Button className="mt-16 w-fit">Submit your project</Button>

        <div className="mt-10 text-sm text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip.
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
      <h2 className="font-semibold">{header}</h2>
      <p className="mt-8">{children}</p>
    </div>
  )
}
