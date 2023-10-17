import Image from 'next/image'
import { Link } from '../Link'
import DiscordLogo from '../icon/DiscordLogo'
import { Button } from '../ui/Button'
import DeploySuccessHero from '/public/assets/images/create-success-hero.webp'
import { DISCORD_INVITE_URL } from '../layout/Footer'

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
        Your project was successfully submitted to JC01.
      </div>
      <Link href={DISCORD_INVITE_URL}>
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
