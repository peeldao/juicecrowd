import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

export type RewardImageProps = {
  className?: string
  src: string
  alt: string
}

export const RewardImage: React.FC<RewardImageProps> = ({
  className,
  src,
  alt,
}) => {
  return (
    <div className={twMerge('relative h-72 w-full overflow-hidden', className)}>
      <Image className="object-contain" fill src={src} alt={alt} />
    </div>
  )
}
