import Image from 'next/image'
import { TechCrowdCTA } from './TechCrowdCTA'

export const HeroSection: React.FC = () => {
  return (
    <>
      <h1 className="max-w-xl text-center font-heading text-4xl font-bold md:text-6xl">
        Stand out from the crowd. Get funded.
      </h1>
      <div className="mt-4 max-w-3xl text-center text-base text-gray-700 md:text-lg">
        Unlock funding to take your project to the next level. Tell your story
        and tap into your audience to build lasting support communities.
      </div>

      <TechCrowdCTA className="mt-10 md:mt-14" />

      <Image
        className="mt-14 md:mt-16"
        src="/assets/images/powered-by-juicebox.png"
        alt="Powered by Juicebox"
        width={250}
        height={30}
      />
    </>
  )
}
