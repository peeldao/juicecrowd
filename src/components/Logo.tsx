import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import LIGHT_JUICE_LOGO from '/public/assets/images/brand/juicecrowd-logo-full_black.webp'
import DARK_JUICE_LOGO from '/public/assets/images/brand/juicecrowd-logo-full_white.webp'
import LIGHT_MONO_JUICE_LOGO from '/public/assets/images/brand/juicecrowd-logo-full_white_mono.webp'

export default function Logo({
  className,
  theme,
}: {
  className?: string
  theme?: 'dark' | 'light' | 'light-mono'
}) {
  let imgSrc
  switch (theme) {
    case 'dark':
      imgSrc = DARK_JUICE_LOGO
      break
    case 'light':
      imgSrc = LIGHT_JUICE_LOGO
      break
    case 'light-mono':
      imgSrc = LIGHT_MONO_JUICE_LOGO
      break
    default:
      imgSrc = LIGHT_JUICE_LOGO
  }

  return (
    <div className={twMerge('relative flex w-36 md:w-36', className)}>
      <Image src={imgSrc} alt="Juicecrowd logo" className="h-auto w-full" />
    </div>
  )
}
