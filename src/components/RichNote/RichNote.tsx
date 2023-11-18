import Autolinker from 'autolinker'
import { twMerge } from 'tailwind-merge'
import { useProcessedRichNote } from './hooks'
import Image from 'next/image'
import { useMemo } from 'react'

type RichNoteProps = {
  className?: string
  note: string | undefined
  ignoreMediaLinks?: boolean
}

export function RichNote({
  className,
  note,
  ignoreMediaLinks,
  children,
}: React.PropsWithChildren<RichNoteProps>) {
  const { trimmedNote, formattedMediaLinks } = useProcessedRichNote(note)

  const memoImageLink = useMemo(() => {
    if (!formattedMediaLinks?.length) return null

    try {
      const urls = formattedMediaLinks.map(link => new URL(link))
      for (const url of urls) {
        if (!isNftEmbedUrl(url)) {
          // Only ever return the first non-NFT image
          return url.toString()
        }
      }
    } catch (e) {
      console.error('error', e)
    }
  }, [formattedMediaLinks])

  const memoRewardUrls = useMemo(() => {
    if (!formattedMediaLinks?.length) return null
    try {
      const urls = formattedMediaLinks
        .map(link => new URL(link))
        .filter(isNftEmbedUrl)
      return urls
    } catch (e) {
      console.error('error', e)
    }
  }, [formattedMediaLinks])

  const noteToRender = ignoreMediaLinks ? note : trimmedNote

  if (noteToRender === undefined) return null

  return (
    <div className={twMerge('mt-1', className)}>
      {noteToRender.length ? (
        <span
          className="break-words pr-2"
          dangerouslySetInnerHTML={{
            __html: Autolinker.link(noteToRender, {
              sanitizeHtml: true,
              truncate: {
                length: 30,
                location: 'smart',
              },
            }).replaceAll('\n', '<br>'),
          }}
        ></span>
      ) : null}

      {children}

      {!ignoreMediaLinks && (
        <>
          {memoImageLink?.length ? (
            <div className="mt-2 flex flex-wrap gap-x-4 rounded-lg">
              <Image
                className="rounded-lg"
                src={memoImageLink}
                alt="User uploaded image"
                width={96}
                height={96}
              />
            </div>
          ) : null}

          {/* rewards receipt */}
          {memoRewardUrls?.length ? (
            <div className="mt-5">
              {memoRewardUrls.map((url, i) => (
                <div
                  key={i}
                  className="mt-2 flex flex-wrap items-center gap-x-4 rounded-lg"
                >
                  <Image
                    className="rounded-lg"
                    src={url.toString()}
                    alt={url.searchParams.get('name') ?? 'NFT'}
                    width={56}
                    height={56}
                  />
                  <div className="text-sm font-medium">
                    {decodeURIComponent(
                      url.searchParams.get('name') ?? 'NFT Reward',
                    ) ?? 'NFT Reward'}{' '}
                    x {url.searchParams.get('quantity') ?? '1'}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}

const isNftEmbedUrl = (url: URL) =>
  url.searchParams.has('embed') && url.searchParams.get('embed') === 'true'
