import Image from 'next/image'
import { Link } from '../Link'
import { Button } from '../ui/Button'

export const SubmitClosedPage = () => {
  return (
    <div className="mt-24 flex flex-col items-center justify-center px-5 text-center md:px-8">
      <Image
        alt="Project created successfully image"
        src={'/assets/images/juicelock.png'}
        width={103}
        height={103}
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
      <div className="pt-4 font-heading text-3xl font-medium md:text-5xl">
        Submissions closed
      </div>
      <div className="mt-4 text-base font-normal text-gray-600 md:text-lg">
        JC01 submissions are now closed. Subscribe below to be the first to know
        when JC02 drops.
      </div>
      <Link href="/" noStyle>
        <Button
          size="lg"
          className="mt-8 flex w-auto items-center gap-3 fill-white text-white"
        >
          Back to home
        </Button>
      </Link>
      <div className="mt-6 flex justify-between"></div>
    </div>
  )
}
