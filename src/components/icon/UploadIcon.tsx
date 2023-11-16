import { CloudArrowUpIcon } from '@heroicons/react/24/outline'
import { HaloEmphasisIcon } from '../HaloEmphasis'

export type UploadIconProps = {
  className?: string
}

export const UploadIcon: React.FC<UploadIconProps> = ({ className }) => {
  return <HaloEmphasisIcon className={className} icon={CloudArrowUpIcon} />
}
