import Image from 'next/image'
import { Navbar } from '../layout/Navbar'
import { TechCrowdCTA } from './components/TechCrowdCTA'

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <div className="mt-32 flex flex-col items-center px-5">
        <h1 className="max-w-xl font-heading text-6xl font-bold">
          Stand out from the crowd. Get funded.
        </h1>
        <div className="mt-4 max-w-3xl text-center text-lg text-gray-700">
          Unlock funding to take your project to the next level. Learn how to
          tell your story and tap into your audience to build lasting support
          communities.
        </div>

        <TechCrowdCTA className="mt-14" />

        <Image
          className="mt-16"
          src="/assets/images/powered-by-juicebox.png"
          alt="Powered by Juicebox"
          width={250}
          height={30}
        />
      </div>
    </>
  )
}
