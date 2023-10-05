import Image from 'next/image'
import { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import LIGHT_JUICE_LOGO from '/public/assets/images/brand/juicecrowd-logo-full_black.webp'
import DARK_JUICE_LOGO from '/public/assets/images/brand/juicecrowd-logo-full_white.webp'

export default function Logo({
  className,
  theme,
}: {
  className?: string
  theme?: 'dark' | 'light'
}) {
  const imgSrc =
    theme === 'dark'
      ? DARK_JUICE_LOGO
      : LIGHT_JUICE_LOGO

  return (
    <div className={twMerge('relative flex w-36 md:w-36', className)}>
      <Image
        src={imgSrc}
        alt="Juicecrowd logo"
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
    </div>
  )
}
