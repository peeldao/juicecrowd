import Image from 'next/image'
import { TechCrowdCTA } from './TechCrowdCTA'

export const HeroSection: React.FC = () => {
  return (
    <>
      <h1 className="z-10 max-w-xl text-center font-heading text-3xl font-bold md:text-6xl">
        Stand out from the crowd. Get funded.
      </h1>
      <div className="z-10 mt-4 max-w-3xl text-center text-base text-gray-700 md:text-lg">
        Unlock funding to take your project to the next level. Learn how to tell
        your story and tap into your audience to build lasting support
        communities.
      </div>

      <TechCrowdCTA className="z-10 mt-10 md:mt-14" />

      <Image
        className="z-10 mt-14 md:mt-16"
        src="/assets/images/powered-by-juicebox.png"
        alt="Powered by Juicebox"
        width={250}
        height={30}
      />
    </>
  )
}
