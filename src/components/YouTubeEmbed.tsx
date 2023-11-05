import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'

export type YouTubeEmbedProps = {
  className?: string
  url: string
}
export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  className,
  url,
}) => {
  const embeddedUrl = useMemo(() => {
    try {
      const urlObj = new URL(url)
      if (
        urlObj.hostname !== 'www.youtube.com' &&
        urlObj.hostname !== 'youtube.com'
      ) {
        return ''
      }
      const videoId = urlObj.searchParams.get('v')
      return `https://www.youtube.com/embed/${videoId}`
    } catch (e) {
      console.error('')
      return ''
    }
  }, [url])

  if (!embeddedUrl) return null

  return (
    <div
      className={twMerge(
        'relative w-full overflow-hidden rounded-lg pt-[56.25%]',
        className,
      )}
    >
      <iframe
        className="absolute left-0 top-0 h-full w-full"
        src={embeddedUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  )
}
