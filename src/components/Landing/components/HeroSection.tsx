import Image from "next/image";
import { TechCrowdCTA } from "./TechCrowdCTA";

export const HeroSection: React.FC = () => {
  return (
    <>
      <h1 className="max-w-xl font-heading text-6xl font-bold z-10">
        Stand out from the crowd. Get funded.
      </h1>
      <div className="mt-4 max-w-3xl text-center text-lg text-gray-700 z-10">
        Unlock funding to take your project to the next level. Learn how to
        tell your story and tap into your audience to build lasting support
        communities.
      </div>

      <TechCrowdCTA className="mt-14 z-10" />

      <Image
        className="mt-16 z-10"
        src="/assets/images/powered-by-juicebox.png"
        alt="Powered by Juicebox"
        width={250}
        height={30}
      />
    </>
  )
}
