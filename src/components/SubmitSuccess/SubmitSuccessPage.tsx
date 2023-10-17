import Image from 'next/image'
import { XLogo } from '../icon/XLogo'
import { Button } from '../ui/Button'
import DeploySuccessHero from '/public/assets/images/create-success-hero.webp'
import DiscordLogo from '../icon/DiscordLogo'
import { Link } from '../Link'

export const SubmitJc01SuccessPage = () => {
  return (
    <div className="mt-4 flex flex-col items-center justify-center px-5 text-center md:px-8">
      <Image
        alt="Project created successfully image"
        src={DeploySuccessHero}
        width={380}
        height={380}
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
      <div className="pt-4 font-display text-3xl font-bold md:text-5xl">
        Congratulations!
      </div>
      <div className="mt-4 text-base font-normal text-gray-600 md:text-lg">
        Your project was successfully submitted to Juicecrowd 01.
      </div>
      <Link href="/#TODO">
        <Button
          size="lg"
          className="mt-8 flex w-auto items-center gap-3 fill-white text-white"
        >
          Join the Discord <DiscordLogo className="h-5 w-5" />
        </Button>
      </Link>
      <div className="mt-6 flex justify-between"></div>
    </div>
  )
}
