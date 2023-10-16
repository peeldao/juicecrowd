import Image, { ImageProps } from 'next/image'

// TODO: move this
export const JB_X_URL = 'https://twitter.com/Juicebox_Money'

export const XLogo: React.FC<Omit<ImageProps, 'src' | 'alt'>> = ({
  className,
  width = 20,
  height = 20,
}) => {
  return (
    <Image
      src="/assets/images/x-logo.webp"
      alt="X (Twitter) logo"
      width={width}
      height={height}
      className={className}
    />
  )
}
