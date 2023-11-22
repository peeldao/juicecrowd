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
    <div
      className={twMerge(
        'relative h-72 w-full overflow-hidden bg-gray-100',
        className,
      )}
    >
      <Image className="object-cover" fill src={src} alt={alt} />
    </div>
  )
}
