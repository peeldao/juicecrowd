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
    <div className="bg-white">
      <div className={twMerge('m-auto max-w-6xl py-20 text-center', className)}>
        <h2 className="mb-5 font-heading text-3xl font-bold">
          Your project, your way
        </h2>
        <p className="m-auto max-w-3xl text-base text-gray-700">
          As part of the crowd, you get your very own project page that you can
          share with your network and community. Equipped with thoughtful
          features to help you grow.
        </p>
        <div className="bg-swatch-50 flex w-full flex-col justify-center gap-8 pt-16 md:flex-row md:gap-12">
          <CardWithIcon
            title="Tell your story"
            icon={<ChatBubbleBottomCenterIcon />}
          >
            Showcase your brand, history and future.
          </CardWithIcon>
          <CardWithIcon title="Collect payments" icon={<BanknotesIcon />}>
            Accepting fiat or crypto payment methods.
          </CardWithIcon>
          <CardWithIcon title="Offer NFTs & rewards" icon={<CubeIcon />}>
            Build compelling offers for early supporters.
          </CardWithIcon>
          <CardWithIcon title="Engage your community" icon={<HeartIcon />}>
            Send updates, interact and chat with your community.
          </CardWithIcon>
        </div>
      </div>
    </div>
  )
}
