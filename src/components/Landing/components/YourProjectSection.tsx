import { CardWithIcon } from "./CardWithIcon"
import { CubeIcon, HeartIcon, ChatBubbleBottomCenterIcon, BanknotesIcon } from "@heroicons/react/24/outline";

export const YourProjectSection: React.FC = () => {
  return (
    <div className='text-center max-w-6xl m-auto py-20'>
      <h2 className="font-heading text-3xl font-bold mb-5">Your project, your way</h2>
      <p className='text-gray-700 text-base max-w-3xl m-auto'>
        As part of the crowd, you get your very own project page that you can share with 
        your network and community. Equipped with thoughtful features to help you grow.
      </p>
      <div className="flex flex-col md:flex-row w-full justify-center gap-8 md:gap-12 bg-swatch-50 pt-16">
        <CardWithIcon title="Tell your story" icon={<ChatBubbleBottomCenterIcon />}>
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
  )
}
