import { RichPreview } from '@/components/RichPreview'
import { SocialLink, useJbProject } from '@/hooks/useJbProject'
import { SocialLinkButton } from './SocialLinkButton'
import { useMemo } from 'react'

export type AboutTabProps = {
  className?: string
}

export const AboutTab: React.FC<AboutTabProps> = ({ className }) => {
  const { socialLinks, description } = useJbProject()
  const hasLinks = useMemo(
    () => Object.entries(socialLinks).filter(([_, v]) => !!v).length > 0,
    [socialLinks],
  )
  return (
    <>
      {hasLinks ? (
        <div className="flex gap-10">
          {Object.entries(socialLinks)
            .filter(([, href]) => !!href)
            .map(([type, href]) => (
              <SocialLinkButton
                key={type}
                type={type as SocialLink}
                href={href ?? ''}
              />
            ))}
        </div>
      ) : null}
      <div className="mt-10">
        {description ? <RichPreview source={description} /> : undefined}
      </div>
    </>
  )
}
