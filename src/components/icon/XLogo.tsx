import Image, { ImageProps } from 'next/image'

export const JB_X_URL = 'https://x.com/juiceboxETH'

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
