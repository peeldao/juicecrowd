import { twMerge } from 'tailwind-merge'
import { CardWithIcon } from './CardWithIcon'
import {
  CubeIcon,
  HeartIcon,
  ChatBubbleBottomCenterIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline'

export type YourProjectSectionProps = {
  className?: string
}

export const YourProjectSection: React.FC<YourProjectSectionProps> = ({
  className,
}) => {
  return (
    <div className={twMerge('bg-white', className)}>
      <div className={'mx-auto max-w-6xl bg-white py-20 text-center'}>
        <h2 className="mb-5 font-heading text-3xl font-bold">
          Your project, your way
        </h2>
        <p className="m-auto max-w-3xl text-gray-700 md:text-lg">
          As part of the crowd, you get your own fully customizable project page
          to share with your community, pull in supporters, and build momentum.
        </p>
        <div className="bg-swatch-50 flex w-full flex-col justify-center gap-8 pt-16 md:flex-row md:gap-12">
          <CardWithIcon
            title="Tell your story"
            icon={<ChatBubbleBottomCenterIcon />}
          >
            Introduce your project team, vision, and goals.
          </CardWithIcon>
          <CardWithIcon title="Collect payments" icon={<BanknotesIcon />}>
            Accept global payments instantly with ETH.
          </CardWithIcon>
          <CardWithIcon title="Offer NFTs & rewards" icon={<CubeIcon />}>
            Build compelling perks for early supporters.
          </CardWithIcon>
          <CardWithIcon title="Engage your community" icon={<HeartIcon />}>
            Send updates and interact with your community.
          </CardWithIcon>
        </div>
      </div>
    </div>
  )
}
